# chatbot-practice


AIチャットアプリ（Next.js + OpenAI API）
このプロジェクトは、Next.js App Router 構成と OpenAI API (gpt-4o) を使用したAIチャットアプリです。ユーザーの入力をフロントエンドから /api/chat APIルートを通じて OpenAI に送信し、返答を画面に表示します。

⸻

✅ 特徴
	•	Next.js 14 (App Router構成)
	•	OpenAI GPT-4o API接続（ChatGPT PlusアカウントのGPT-4o利用可）
	•	フロント・バックエンド一体型（別サーバー不要）
	•	Tailwind CSSによるUI
	•	VSCodeでシンプル開発
	•	ローカルサーバー起動のみで完結

⸻

🚀 開発環境の起動手順

1. このリポジトリをクローン

git clone https://github.com/yuuki-s118/chatbot-practice.git
cd chatbot-practice/cretetest

2. 必要なパッケージのインストール

npm install

インストールされる主な依存パッケージ：
	•	next
	•	react
	•	react-dom
	•	openai
	•	tailwindcss

3. 環境変数（APIキー）の設定

プロジェクトルート直下に .env.local ファイルを作成し、以下を記入：

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

ChatGPT Plusのサブスクリプションとは別に、OpenAI PlatformのAPIキーが必要です。

4. ローカルサーバー起動

npm run dev

正常に起動すると次のようなメッセージが表示されます：

Local: http://localhost:3000


⸻

💡 補足情報
	•	/app/page.jsx にチャットUI、/api/chat/route.js にOpenAI API呼び出しロジックがあります。


	•	天気・時刻等のリアルタイムデータはChatGPT API経由では取得不可。必要に応じて別API連携可能。


	•	開発中は http://localhost:3000 または http://localhost:3000/ai-chat にアクセスし、正しいパスを確認してください。

⸻

## スクリーンショット
![スクリーンショット 2025-06-23 11 41 08](https://github.com/user-attachments/assets/57d4f963-37bb-4c06-a96b-3ee08a5d6374)
