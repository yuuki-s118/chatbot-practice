"use client";
import React from "react";

function MainComponent() {
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: "こんにちは！何かお手伝いできることはありますか？",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = React.useState("");
  const [theme, setTheme] = React.useState("light");
  const [isListening, setIsListening] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  // Auto scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      // バックエンドAPIに送信
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: inputText }),
        });
        const data = await res.json();
        const aiResponse = {
          id: Date.now() + 1,
          text: data.reply || "AIからの返答がありません。",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      } catch (error) {
        const aiResponse = {
          id: Date.now() + 1,
          text: "エラーが発生しました。もう一度お試しください。",
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      console.log("音声入力を開始しました");
    } else {
      console.log("音声入力を停止しました");
    }
  };

  const themeStyles = {
    light: {
      bg: "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100",
      text: "text-gray-800",
      userBg: "bg-gradient-to-r from-blue-500 to-purple-600",
      userText: "text-white",
      aiBg: "bg-gradient-to-r from-emerald-400 to-cyan-500",
      aiText: "text-white",
      headerBg: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600",
      inputBg: "bg-white/80 backdrop-blur-sm",
      cardShadow: "shadow-lg shadow-purple-200/50",
    },
    dark: {
      bg: "bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900",
      text: "text-gray-100",
      userBg: "bg-gradient-to-r from-blue-600 to-purple-700",
      userText: "text-white",
      aiBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
      aiText: "text-white",
      headerBg: "bg-gradient-to-r from-gray-800 via-purple-800 to-indigo-800",
      inputBg: "bg-gray-800/80 backdrop-blur-sm",
      cardShadow: "shadow-lg shadow-purple-900/30",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div
      className={`h-screen flex flex-col ${currentTheme.bg} ${currentTheme.text} font-roboto relative overflow-hidden`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`${currentTheme.headerBg} text-white p-4 shadow-xl relative z-10`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-robot text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                AIチャット
              </h1>
              <p className="text-xs text-white/70">あなたのAIアシスタント</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-sm"></i>
              </div>
              <span className="hidden md:block text-sm">ユーザー</span>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="設定"
            >
              <i className="fas fa-cog text-lg"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div
          className={`${currentTheme.inputBg} p-4 border-b border-white/20 backdrop-blur-md relative z-10`}
        >
          <div className="flex items-center space-x-4">
            <span className="font-medium">テーマ:</span>
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-200/50 text-gray-700 hover:bg-gray-200/70"
              }`}
            >
              <i className="fas fa-sun mr-2"></i>ライト
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "bg-gray-200/50 text-gray-700 hover:bg-gray-200/70"
              }`}
            >
              <i className="fas fa-moon mr-2"></i>ダーク
            </button>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } animate-fadeIn`}
          >
            <div className="flex items-end space-x-2 max-w-xs md:max-w-md lg:max-w-lg">
              {message.sender === "ai" && (
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center mb-1 shadow-lg">
                  <i className="fas fa-robot text-white text-sm"></i>
                </div>
              )}
              <div
                className={`px-4 py-3 rounded-2xl ${currentTheme.cardShadow} ${
                  message.sender === "user"
                    ? `${currentTheme.userBg} ${currentTheme.userText} rounded-br-md`
                    : `${currentTheme.aiBg} ${currentTheme.aiText} rounded-bl-md`
                } backdrop-blur-sm border border-white/20`}
              >
                <p className="text-sm md:text-base leading-relaxed">
                  {message.text}
                </p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString("ja-JP", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.sender === "user" && (
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-1 shadow-lg">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div
        className={`${currentTheme.inputBg} p-4 border-t border-white/20 backdrop-blur-md relative z-10`}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="メッセージを入力してください✨"
              className={`w-full p-4 pr-12 rounded-2xl border-2 border-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${currentTheme.inputBg} ${currentTheme.text} shadow-lg backdrop-blur-sm transition-all duration-300`}
              rows="1"
              style={{ minHeight: "56px", maxHeight: "120px" }}
              aria-label="メッセージ入力"
            />
          </div>

          <button
            onClick={toggleVoiceInput}
            className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
              isListening
                ? "bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse"
                : "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:from-orange-500 hover:to-pink-600"
            }`}
            aria-label="音声入力"
          >
            <i
              className={`fas ${
                isListening ? "fa-stop" : "fa-microphone"
              } text-lg`}
            ></i>
          </button>

          <button
            className="p-4 bg-gradient-to-r from-emerald-400 to-cyan-500 text-white hover:from-emerald-500 hover:to-cyan-600 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            aria-label="ファイル添付"
          >
            <i className="fas fa-paperclip text-lg"></i>
          </button>

          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
              inputText.trim()
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            aria-label="送信"
          >
            <i className="fas fa-paper-plane text-lg"></i>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;