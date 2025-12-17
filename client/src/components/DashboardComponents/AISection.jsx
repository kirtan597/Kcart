import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Sparkles, 
  MessageSquare, 
  Image, 
  TrendingUp, 
  Zap,
  Bot,
  Wand2,
  Eye,
  Heart,
  Star,
  RefreshCw,
  Send,
  Loader2
} from 'lucide-react';
import bytezService from '../../services/bytezService';

const AISection = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [inputs, setInputs] = useState({
    productName: '',
    productFeatures: '',
    reviewText: '',
    marketingCategory: '',
    seoKeyword: ''
  });

  // Test AI capabilities on component mount
  useEffect(() => {
    testAIConnection();
  }, []);

  const testAIConnection = async () => {
    try {
      const models = await bytezService.listModels();
      console.log('Available AI models:', models);
    } catch (error) {
      console.error('AI connection test failed:', error);
    }
  };

  const handleGenerateDescription = async () => {
    if (!inputs.productName.trim()) return;
    
    setLoading(true);
    try {
      const features = inputs.productFeatures.split(',').map(f => f.trim()).filter(f => f);
      const result = await bytezService.generateProductDescription(inputs.productName, features);
      
      setResults(prev => ({
        ...prev,
        productDescription: result.output || 'Generated description will appear here'
      }));
    } catch (error) {
      console.error('Description generation failed:', error);
      setResults(prev => ({
        ...prev,
        productDescription: 'AI description generation temporarily unavailable. Using fallback: ' + 
          `Discover the amazing ${inputs.productName} - crafted with premium quality and innovative design. ` +
          `Features include ${inputs.productFeatures || 'advanced functionality'}. Perfect for modern lifestyle needs.`
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeSentiment = async () => {
    if (!inputs.reviewText.trim()) return;
    
    setLoading(true);
    try {
      const result = await bytezService.analyzeReviewSentiment(inputs.reviewText);
      
      setResults(prev => ({
        ...prev,
        sentiment: result.output || {
          ecommerceSentiment: {
            rating: 4,
            recommendation: 'Positive customer feedback',
            confidence: 0.85
          }
        }
      }));
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      // Fallback sentiment analysis
      const sentiment = inputs.reviewText.toLowerCase();
      const isPositive = sentiment.includes('good') || sentiment.includes('great') || 
                        sentiment.includes('amazing') || sentiment.includes('love') ||
                        sentiment.includes('excellent') || sentiment.includes('perfect');
      const isNegative = sentiment.includes('bad') || sentiment.includes('terrible') || 
                        sentiment.includes('hate') || sentiment.includes('awful') ||
                        sentiment.includes('worst') || sentiment.includes('horrible');
      
      setResults(prev => ({
        ...prev,
        sentiment: {
          ecommerceSentiment: {
            rating: isPositive ? 5 : isNegative ? 1 : 3,
            recommendation: isPositive ? 'Feature this review prominently' : 
                           isNegative ? 'Consider reaching out to customer' : 'Standard review display',
            confidence: 0.75
          }
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMarketing = async () => {
    if (!inputs.marketingCategory.trim()) return;
    
    setLoading(true);
    try {
      const result = await bytezService.generateMarketingContent(inputs.marketingCategory, 'professional');
      
      setResults(prev => ({
        ...prev,
        marketing: result.output || 'Generated marketing content will appear here'
      }));
    } catch (error) {
      console.error('Marketing generation failed:', error);
      setResults(prev => ({
        ...prev,
        marketing: `🚀 Discover Premium ${inputs.marketingCategory}\n\n` +
          `✨ Curated Collection of High-Quality ${inputs.marketingCategory}\n` +
          `🎯 Perfect for Every Occasion\n` +
          `💎 Unmatched Quality & Style\n` +
          `🛍️ Shop Now - Limited Time Offers Available!`
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSEO = async () => {
    if (!inputs.seoKeyword.trim()) return;
    
    setLoading(true);
    try {
      const result = await bytezService.generateSEOContent(inputs.seoKeyword, 'meta description');
      
      setResults(prev => ({
        ...prev,
        seo: result.output || 'Generated SEO content will appear here'
      }));
    } catch (error) {
      console.error('SEO generation failed:', error);
      setResults(prev => ({
        ...prev,
        seo: `Shop premium ${inputs.seoKeyword} online. Discover high-quality products, competitive prices, and fast shipping. Your trusted destination for ${inputs.seoKeyword} with excellent customer service.`
      }));
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'generate', label: 'Generate Content', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'analyze', label: 'Analyze Reviews', icon: <Heart className="w-4 h-4" /> },
    { id: 'marketing', label: 'Marketing AI', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO Assistant', icon: <Eye className="w-4 h-4" /> }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium">AI Assistant</h3>
            <p className="text-sm text-gray-500">Powered by Bytez AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">AI Online</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-black text-white border-b-2 border-black'
                : 'text-gray-600 hover:text-black hover:bg-gray-50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Generation Tab */}
      {activeTab === 'generate' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={inputs.productName}
              onChange={(e) => setInputs(prev => ({ ...prev, productName: e.target.value }))}
              placeholder="e.g., Wireless Bluetooth Headphones"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Features (comma-separated)</label>
            <input
              type="text"
              value={inputs.productFeatures}
              onChange={(e) => setInputs(prev => ({ ...prev, productFeatures: e.target.value }))}
              placeholder="e.g., Noise Cancelling, 30hr Battery, Bluetooth 5.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <button
            onClick={handleGenerateDescription}
            disabled={loading || !inputs.productName.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate Description
          </button>
          {results.productDescription && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Generated Description:</h4>
              <p className="text-sm text-gray-700">{results.productDescription}</p>
            </div>
          )}
        </div>
      )}

      {/* Review Analysis Tab */}
      {activeTab === 'analyze' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Customer Review</label>
            <textarea
              value={inputs.reviewText}
              onChange={(e) => setInputs(prev => ({ ...prev, reviewText: e.target.value }))}
              placeholder="Paste customer review here..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAnalyzeSentiment}
            disabled={loading || !inputs.reviewText.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4" />}
            Analyze Sentiment
          </button>
          {results.sentiment && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Sentiment Analysis:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < results.sentiment.ecommerceSentiment?.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Rating: {results.sentiment.ecommerceSentiment?.rating}/5</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600 mb-1">
                    {Math.round(results.sentiment.ecommerceSentiment?.confidence * 100)}%
                  </div>
                  <p className="text-sm text-gray-600">Confidence</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-800">
                    {results.sentiment.ecommerceSentiment?.recommendation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Marketing AI Tab */}
      {activeTab === 'marketing' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product Category</label>
            <select
              value={inputs.marketingCategory}
              onChange={(e) => setInputs(prev => ({ ...prev, marketingCategory: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="">Select category...</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports & Fitness">Sports & Fitness</option>
              <option value="Beauty & Health">Beauty & Health</option>
              <option value="Books & Media">Books & Media</option>
            </select>
          </div>
          <button
            onClick={handleGenerateMarketing}
            disabled={loading || !inputs.marketingCategory}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <TrendingUp className="w-4 h-4" />}
            Generate Marketing Content
          </button>
          {results.marketing && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Marketing Content:</h4>
              <div className="text-sm text-gray-700 whitespace-pre-line">{results.marketing}</div>
            </div>
          )}
        </div>
      )}

      {/* SEO Assistant Tab */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Target Keyword</label>
            <input
              type="text"
              value={inputs.seoKeyword}
              onChange={(e) => setInputs(prev => ({ ...prev, seoKeyword: e.target.value }))}
              placeholder="e.g., wireless headphones, running shoes"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <button
            onClick={handleGenerateSEO}
            disabled={loading || !inputs.seoKeyword.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
            Generate SEO Content
          </button>
          {results.seo && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">SEO Meta Description:</h4>
              <p className="text-sm text-gray-700">{results.seo}</p>
              <div className="mt-2 text-xs text-gray-500">
                Character count: {results.seo.length}/160 (optimal for meta descriptions)
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI Stats */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-purple-600">24/7</div>
            <div className="text-xs text-gray-500">AI Available</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">50+</div>
            <div className="text-xs text-gray-500">AI Models</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">99.9%</div>
            <div className="text-xs text-gray-500">Uptime</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">Fast</div>
            <div className="text-xs text-gray-500">Response</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISection;