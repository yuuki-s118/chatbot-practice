from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.documents import Document
from langchain.chains.retrieval import create_retrieval_chain
from langchain.chains.history_aware_retriever import create_history_aware_retriever
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
import config

# ========= セットアップ =========

# ドキュメント定義（後でファイルから読ませることも可能）
documents = [
    Document(page_content="櫻井祐冴は、AIスタートアップで働いており、自然言語処理の研究をしている。")
]

# 埋め込みモデル
embeddings = OpenAIEmbeddings(
    model="text-embedding-ada-002",
    openai_api_key=config.OPENAI_API_KEY  # type: ignore
)

# ベクトルストア
vector_store = FAISS.from_documents(documents, embeddings)
retriever = vector_store.as_retriever()

# LLM（GPTモデル）
llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",  # type: ignore
    temperature=0,
    openai_api_key=config.OPENAI_API_KEY  # type: ignore
)

# 検索用の質問生成プロンプト
question_prompt = ChatPromptTemplate.from_messages([
    ("system", "会話履歴と現在の質問に基づいて、検索に適した質問を生成してください。"),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])
history_aware_retriever = create_history_aware_retriever(
    llm=llm,
    retriever=retriever,
    prompt=question_prompt
)

# 回答生成プロンプト
qa_prompt = ChatPromptTemplate.from_messages([
    ("system", "あなたはコンテキストに厳密に従って回答するAIです。コンテキストにない情報は絶対に使わず、「分かりません」とだけ答えてください。"),
    ("system", "{context}"),  # ← context を明示的に渡す
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])

# 非推奨のLLMChainを避けてpipe構文を使用
qa_chain = qa_prompt | llm

# Retrieval-Augmented Generation チェーン
rag_chain = create_retrieval_chain(
    retriever=history_aware_retriever,
    combine_docs_chain=qa_chain # type: ignore
)

# ========= チャットループ =========

def generate_response(user_input, chat_history):
    result = rag_chain.invoke({
        "input": user_input,
        "chat_history": chat_history
    })
    return result["answer"].content

if __name__ == "__main__":
    print("\U0001f9e0 RAGチャットを開始します。'exit' で終了。\n")
    chat_history = []

    while True:
        user_input = input("User: ")
        if user_input.lower() in ["exit", "quit"]:
            print("終了します。")
            break

        response = generate_response(user_input, chat_history)
        print(f"Assistant: {response}\n")

        # 履歴に追加
        chat_history.append(HumanMessage(content=user_input))
        chat_history.append(AIMessage(content=response))