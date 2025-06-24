from openai import OpenAI
import config

client = OpenAI(api_key=config.OPENAI_API_KEY) # type: ignore

def chat_with_gpt(user_message):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ]
    )
    return response.choices[0].message.content

if __name__ == '__main__':
    print("ChatGPTとチャットを始めます。終了するには 'exit' と入力してください。")
    while True:
        user_input = input("あなた: ")
        if user_input.lower() == 'exit':
            print("チャットを終了します。")
            break
        
        bot_response = chat_with_gpt(user_input)
        print(f"ChatGPT: {bot_response}")