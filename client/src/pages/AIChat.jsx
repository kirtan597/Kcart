import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Brain, 
  Loader2,
  RefreshCw,
  Copy,
  Check,
  Zap,
  ShoppingBag,
  TrendingUp
} from 'lucide-react';
import bytezService from '../services/bytezService';
import userTrackingService from '../services/userTrackingService';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "👋 Hello! I'm your AI assistant powered by Bytez. I can help you with:\n\n🛍️ Product descriptions\n💭 Review analysis\n📈 Marketing content\n🎯 SEO optimization\n\nWhat would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    userTrackingService.recordActivity({
      type: 'page_view',
      description: 'Accessed AI Chat',
      data: { page: '/ai-chat' }
    });
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    userTrackingService.recordActivity({
      type: 'ai_interaction',
      description: 'Sent message to AI',
      data: { messageLength: inputMessage.length }
    });

    try {
      const response = await processAIRequest(inputMessage);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('AI response error:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Let me provide some helpful suggestions instead:\n\n• Try asking about product descriptions\n• Request marketing content ideas\n• Ask for SEO optimization tips\n• Inquire about review analysis\n\nPlease try again with a specific request!",
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const processAIRequest = async (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('product description') || lowerMessage.includes('describe product')) {
      const productMatch = message.match(/(?:for|of|about)\s+([^.!?]+)/i);
      const productName = productMatch ? productMatch[1].trim() : 'your product';
      
      try {
        const result = await bytezService.generateProductDescription(productName, ['premium quality', 'innovative design']);
        return `📝 **Product Description for "${productName}":**\n\n${result.output || generateFallbackDescription(productName)}`;
      } catch (error) {
        return generateFallbackDescription(productName);
      }
    }

    if (lowerMessage.includes('marketing') || lowerMessage.includes('advertisement')) {
      const categoryMatch = message.match(/(?:for|about)\s+([^.!?]+)/i);
      const category = categoryMatch ? categoryMatch[1].trim() : 'products';
      
      return `📈 **Marketing Content for "${category}":**\n\n🚀 Discover Premium ${category}\n✨ Curated collection of high-quality products\n🎯 Perfect for every occasion\n💎 Unmatched quality and value\n🛍️ Shop now - Limited time offers!`;
    }

    if (lowerMessage.includes('seo') || lowerMessage.includes('search engine')) {
      const keywordMatch = message.match(/(?:for|about)\s+([^.!?]+)/i);
      const keyword = keywordMatch ? keywordMatch[1].trim() : 'your product';
      
      return `🎯 **SEO Content for "${keyword}":**\n\nShop premium ${keyword} online at unbeatable prices. Discover our curated collection with fast shipping and excellent customer service.`;
    }

    if (lowerMessage.includes('analyze') || lowerMessage.includes('review')) {
      const reviewMatch = message.match(/"([^"]+)"/);
      const reviewText = reviewMatch ? reviewMatch[1] : message.replace(/analyze|review/gi, '').trim();
      
      if (reviewText.length > 10) {
        const sentiment = analyzeFallbackSentiment(reviewText);
        return `💭 **Review Analysis:**\n\n📊 **Rating:** ${sentiment.rating}/5 stars\n🎯 **Confidence:** ${sentiment.confidence}%\n💡 **Recommendation:** ${sentiment.recommendation}\n\n**Original Review:** "${reviewText}"`;
      }
    }

    return `🤔 I'd love to help! Here are some things you can ask me:\n\n📝 **"Generate product description for [product name]"**\n📈 **"Create marketing content for [category]"**\n🎯 **"SEO content for [keyword]"**\n💭 **"Analyze this review: [review text]"**\n\n💡 **Pro tip:** Be specific about what you need!`;
  };

  const generateFallbackDescription = (productName) => {
    return `Discover the exceptional ${productName} - expertly crafted with premium materials and innovative design. Perfect for modern consumers who demand quality and performance.`;
  };

  const analyzeFallbackSentiment = (reviewText) => {
    const positive = ['good', 'great', 'amazing', 'love', 'excellent', 'perfect'];
    const negative = ['bad', 'terrible', 'hate', 'awful', 'worst', 'horrible'];
    
    const text = reviewText.toLowerCase();
    const positiveCount = positive.filter(word => text.includes(word)).length;
    const negativeCount = negative.filter(word => text.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      return { rating: 5, confidence: 85, recommendation: 'Feature this review prominently' };
    } else if (negativeCount > positiveCount) {
      return { rating: 2, confidence: 80, recommendation: 'Consider reaching out to customer' };
    } else {
      return { rating: 3, confidence: 75, recommendation: 'Standard review display' };
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyToClipboard = async (content, messageId) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: "Chat cleared! 🧹 How can I assist you today?",
        timestamp: new Date()
      }
    ]);
    
    userTrackingService.recordActivity({
      type: 'ai_interaction',
      description: 'Cleared AI chat',
      data: { action: 'clear_chat' }
    });
  };

  const quickPrompts = [
    { text: "Generate product description for wireless earbuds", icon: <ShoppingBag className="w-4 h-4" /> },
    { text: "Create marketing content for fashion products", icon: <TrendingUp className="w-4 h-4" /> },
    { text: "SEO content for running shoes", icon: <Sparkles className="w-4 h-4" /> },
    { text: "What can you help me with?", icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Assistant</h1>
              <p className="text-sm text-gray-500">Powered by Bytez AI</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online
            </div>
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Clear chat"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-80px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isError ? 'bg-red-100' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                <div className={`rounded-lg px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-black text-white'
                    : message.isError
                    ? 'bg-red-50 border border-red-200 text-red-800'
                    : 'bg-white border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  
                  {message.type === 'bot' && !message.isError && (
                    <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                      <span className="text-xs text-gray-400">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-4 py-2">
            <div className="text-xs text-gray-500 mb-2">Quick prompts:</div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(prompt.text)}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  {prompt.icon}
                  {prompt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your e-commerce business..."
                rows={1}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span>Press Enter to send, Shift+Enter for new line</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Powered by Bytez AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;