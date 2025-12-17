import Bytez from "bytez.js";

// Initialize Bytez SDK with API key
const sdk = new Bytez("461454da3fddf9f5d3baaec6ce8dd0b9");

// Bytez API configuration
const BYTEZ_CONFIG = {
  baseURL: 'https://api.bytez.com/models/v2',
  apiKey: '461454da3fddf9f5d3baaec6ce8dd0b9',
  providerKey: '' // Optional - leave empty if not required by specific models
};

// Bytez service for e-commerce operations
class BytezService {
  constructor() {
    this.sdk = sdk;
    this.config = BYTEZ_CONFIG;
  }

  // Get default headers for API calls
  getHeaders(additionalHeaders = {}) {
    return {
      'Authorization': this.config.apiKey,
      'provider-key': this.config.providerKey,
      'Content-Type': 'application/json',
      ...additionalHeaders
    };
  }

  // Generic API call method using fetch
  async apiCall(endpoint, method = 'GET', data = null, headers = {}) {
    try {
      const url = `${this.config.baseURL}/${endpoint}`;
      const requestHeaders = this.getHeaders(headers);
      
      const options = {
        method,
        headers: requestHeaders,
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`API call error (${method} ${endpoint}):`, error);
      throw error;
    }
  }

  // SDK-based methods (if SDK supports them)
  async processPayment(paymentData) {
    try {
      // Using SDK if available, otherwise fallback to API call
      if (this.sdk.payments) {
        const response = await this.sdk.payments.create(paymentData);
        return response;
      } else {
        return await this.apiCall('payments', 'POST', paymentData);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }

  // User authentication
  async authenticateUser(credentials) {
    try {
      if (this.sdk.auth) {
        const response = await this.sdk.auth.login(credentials);
        return response;
      } else {
        return await this.apiCall('auth/login', 'POST', credentials);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  // Product management
  async getProducts(filters = {}) {
    try {
      if (this.sdk.products) {
        const response = await this.sdk.products.list(filters);
        return response;
      } else {
        const queryParams = new URLSearchParams(filters).toString();
        const endpoint = queryParams ? `products?${queryParams}` : 'products';
        return await this.apiCall(endpoint);
      }
    } catch (error) {
      console.error('Product fetch error:', error);
      throw error;
    }
  }

  // Order processing
  async createOrder(orderData) {
    try {
      if (this.sdk.orders) {
        const response = await this.sdk.orders.create(orderData);
        return response;
      } else {
        return await this.apiCall('orders', 'POST', orderData);
      }
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  }

  // Analytics
  async getAnalytics(params = {}) {
    try {
      if (this.sdk.analytics) {
        const response = await this.sdk.analytics.get(params);
        return response;
      } else {
        const queryParams = new URLSearchParams(params).toString();
        const endpoint = queryParams ? `analytics?${queryParams}` : 'analytics';
        return await this.apiCall(endpoint);
      }
    } catch (error) {
      console.error('Analytics fetch error:', error);
      throw error;
    }
  }

  // Test API connection
  async testConnection() {
    try {
      const response = await this.apiCall('health');
      console.log('Bytez API connection successful:', response);
      return response;
    } catch (error) {
      console.error('Bytez API connection failed:', error);
      throw error;
    }
  }

  // Task management methods
  async listTasks() {
    try {
      const { error, output } = await this.sdk.list.tasks();
      
      if (error) {
        console.error('Task listing error:', error);
        return { error, output: null };
      }
      
      console.log('Tasks listed successfully:', output);
      return { error: null, output };
    } catch (error) {
      console.error('Task listing failed:', error);
      return { error: error.message, output: null };
    }
  }

  // Get task details by ID
  async getTask(taskId) {
    try {
      const { error, output } = await this.sdk.get.task(taskId);
      
      if (error) {
        console.error('Task retrieval error:', error);
        return { error, output: null };
      }
      
      console.log('Task retrieved successfully:', output);
      return { error: null, output };
    } catch (error) {
      console.error('Task retrieval failed:', error);
      return { error: error.message, output: null };
    }
  }

  // Create a new task
  async createTask(taskData) {
    try {
      const { error, output } = await this.sdk.create.task(taskData);
      
      if (error) {
        console.error('Task creation error:', error);
        return { error, output: null };
      }
      
      console.log('Task created successfully:', output);
      return { error: null, output };
    } catch (error) {
      console.error('Task creation failed:', error);
      return { error: error.message, output: null };
    }
  }

  // Delete a task
  async deleteTask(taskId) {
    try {
      const { error, output } = await this.sdk.delete.task(taskId);
      
      if (error) {
        console.error('Task deletion error:', error);
        return { error, output: null };
      }
      
      console.log('Task deleted successfully:', output);
      return { error: null, output };
    } catch (error) {
      console.error('Task deletion failed:', error);
      return { error: error.message, output: null };
    }
  }

  // List all available models
  async listModels() {
    try {
      const { error, output } = await this.sdk.list.models();
      
      if (error) {
        console.error('Model listing error:', error);
        return { error, output: null };
      }
      
      console.log('Models listed successfully:', output);
      return { error: null, output };
    } catch (error) {
      console.error('Model listing failed:', error);
      return { error: error.message, output: null };
    }
  }

  // Get models by task type
  async getModelsByTask(taskType) {
    try {
      const { error, output } = await this.listModels();
      
      if (error) {
        return { error, output: null };
      }
      
      // Filter models by task type
      const filteredModels = output?.filter(model => 
        model.task === taskType || model.tasks?.includes(taskType)
      ) || [];
      
      return { error: null, output: filteredModels };
    } catch (error) {
      console.error('Models by task filtering error:', error);
      return { error: error.message, output: null };
    }
  }

  // Get text generation models
  async getTextGenerationModels() {
    return await this.getModelsByTask('text-generation');
  }

  // Get image classification models
  async getImageClassificationModels() {
    return await this.getModelsByTask('image-classification');
  }

  // Get image generation models
  async getImageGenerationModels() {
    return await this.getModelsByTask('image-generation');
  }

  // Get sentiment analysis models
  async getSentimentAnalysisModels() {
    return await this.getModelsByTask('sentiment-analysis');
  }

  // Get translation models
  async getTranslationModels() {
    return await this.getModelsByTask('translation');
  }

  // Get model details by ID
  async getModelDetails(modelId) {
    try {
      const { error, output } = await this.listModels();
      
      if (error) {
        return { error, output: null };
      }
      
      const model = output?.find(m => m.id === modelId);
      
      if (!model) {
        return { error: 'Model not found', output: null };
      }
      
      return { error: null, output: model };
    } catch (error) {
      console.error('Model details retrieval error:', error);
      return { error: error.message, output: null };
    }
  }

  // Model execution methods
  async runModel(modelId, input, options = {}) {
    try {
      const model = this.sdk.model(modelId);
      const { error, output } = await model.run(input, options);
      
      if (error) {
        console.error('Model execution error:', error);
        return { error, output: null };
      }
      
      console.log('Model execution successful:', { modelId, output });
      return { error: null, output };
    } catch (error) {
      console.error('Model execution failed:', error);
      return { error: error.message, output: null };
    }
  }

  // Predefined model methods for common use cases
  async generateText(prompt, modelId = "openai-community/gpt-2") {
    try {
      const result = await this.runModel(modelId, prompt);
      return result;
    } catch (error) {
      console.error('Text generation error:', error);
      throw error;
    }
  }

  // Generate product descriptions
  async generateProductDescription(productName, features = []) {
    try {
      const prompt = `Generate a compelling product description for ${productName}. Features: ${features.join(', ')}. Make it engaging and professional for an e-commerce website.`;
      const result = await this.generateText(prompt);
      return result;
    } catch (error) {
      console.error('Product description generation error:', error);
      throw error;
    }
  }

  // Generate marketing content
  async generateMarketingContent(productCategory, tone = 'professional') {
    try {
      const prompt = `Create engaging marketing content for ${productCategory} products. Tone should be ${tone}. Include compelling headlines and descriptions suitable for an e-commerce platform.`;
      const result = await this.generateText(prompt);
      return result;
    } catch (error) {
      console.error('Marketing content generation error:', error);
      throw error;
    }
  }

  // Generate customer support responses
  async generateSupportResponse(customerQuery) {
    try {
      const prompt = `Generate a helpful and professional customer support response for this query: "${customerQuery}". The response should be friendly, informative, and solution-oriented for an e-commerce context.`;
      const result = await this.generateText(prompt);
      return result;
    } catch (error) {
      console.error('Support response generation error:', error);
      throw error;
    }
  }

  // Generate SEO content
  async generateSEOContent(keyword, contentType = 'meta description') {
    try {
      const prompt = `Generate SEO-optimized ${contentType} for the keyword "${keyword}" for an e-commerce website. Make it compelling and within appropriate character limits.`;
      const result = await this.generateText(prompt);
      return result;
    } catch (error) {
      console.error('SEO content generation error:', error);
      throw error;
    }
  }

  // Batch model execution for multiple inputs
  async runModelBatch(modelId, inputs, options = {}) {
    try {
      const results = await Promise.all(
        inputs.map(input => this.runModel(modelId, input, options))
      );
      return results;
    } catch (error) {
      console.error('Batch model execution error:', error);
      throw error;
    }
  }

  // Specialized model execution methods
  
  // Image classification (e.g., google/vit-base-patch16-224)
  async classifyImage(imageInput, modelId = "google/vit-base-patch16-224") {
    try {
      const result = await this.runModel(modelId, imageInput);
      return result;
    } catch (error) {
      console.error('Image classification error:', error);
      throw error;
    }
  }

  // Sentiment analysis
  async analyzeSentiment(text, modelId = "cardiffnlp/twitter-roberta-base-sentiment-latest") {
    try {
      const result = await this.runModel(modelId, text);
      return result;
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      throw error;
    }
  }

  // Text translation
  async translateText(text, modelId = "Helsinki-NLP/opus-mt-en-fr") {
    try {
      const result = await this.runModel(modelId, text);
      return result;
    } catch (error) {
      console.error('Text translation error:', error);
      throw error;
    }
  }

  // Image generation
  async generateImage(prompt, modelId = "runwayml/stable-diffusion-v1-5") {
    try {
      const result = await this.runModel(modelId, prompt);
      return result;
    } catch (error) {
      console.error('Image generation error:', error);
      throw error;
    }
  }

  // E-commerce specific AI methods using different models

  // Classify product images for automatic categorization
  async classifyProductImage(imageInput) {
    try {
      const result = await this.classifyImage(imageInput);
      
      if (result.error) {
        return result;
      }
      
      // Process classification results for e-commerce categories
      const categories = this.mapToEcommerceCategories(result.output);
      
      return { error: null, output: { ...result.output, ecommerceCategories: categories } };
    } catch (error) {
      console.error('Product image classification error:', error);
      throw error;
    }
  }

  // Analyze customer review sentiment
  async analyzeReviewSentiment(reviewText) {
    try {
      const result = await this.analyzeSentiment(reviewText);
      
      if (result.error) {
        return result;
      }
      
      // Process sentiment for e-commerce context
      const sentiment = this.processSentimentForEcommerce(result.output);
      
      return { error: null, output: { ...result.output, ecommerceSentiment: sentiment } };
    } catch (error) {
      console.error('Review sentiment analysis error:', error);
      throw error;
    }
  }

  // Generate product images from descriptions
  async generateProductImage(productDescription) {
    try {
      const prompt = `High-quality product photography of ${productDescription}, professional lighting, white background, e-commerce style`;
      const result = await this.generateImage(prompt);
      return result;
    } catch (error) {
      console.error('Product image generation error:', error);
      throw error;
    }
  }

  // Helper methods for e-commerce processing
  mapToEcommerceCategories(classificationOutput) {
    // Map AI classification results to e-commerce categories
    const categoryMappings = {
      'clothing': ['Men', 'Women', 'Kids'],
      'electronics': ['Electronics'],
      'furniture': ['Home & Garden'],
      'food': ['Food & Beverages'],
      'book': ['Books & Media'],
      'toy': ['Kids', 'Toys & Games']
    };
    
    // Process and return mapped categories
    return classificationOutput?.labels?.map(label => {
      const category = Object.keys(categoryMappings).find(key => 
        label.toLowerCase().includes(key)
      );
      return category ? categoryMappings[category] : ['Other'];
    }).flat() || ['Other'];
  }

  processSentimentForEcommerce(sentimentOutput) {
    // Process sentiment analysis for e-commerce context
    const sentiment = sentimentOutput?.label?.toLowerCase();
    
    return {
      rating: this.sentimentToRating(sentiment),
      recommendation: this.getSentimentRecommendation(sentiment),
      confidence: sentimentOutput?.score || 0
    };
  }

  sentimentToRating(sentiment) {
    const ratingMap = {
      'positive': 5,
      'neutral': 3,
      'negative': 1
    };
    return ratingMap[sentiment] || 3;
  }

  getSentimentRecommendation(sentiment) {
    const recommendations = {
      'positive': 'Feature this review prominently',
      'neutral': 'Standard review display',
      'negative': 'Consider reaching out to customer for feedback'
    };
    return recommendations[sentiment] || 'Review for quality assurance';
  }

  // E-commerce specific task management
  async createProductDescriptionTask(productData) {
    try {
      const taskData = {
        type: 'product_description',
        input: {
          name: productData.name,
          features: productData.features,
          category: productData.category
        },
        model: 'openai-community/gpt-2'
      };
      
      const result = await this.createTask(taskData);
      return result;
    } catch (error) {
      console.error('Product description task creation error:', error);
      throw error;
    }
  }

  async createSEOTask(seoData) {
    try {
      const taskData = {
        type: 'seo_content',
        input: {
          keyword: seoData.keyword,
          contentType: seoData.contentType,
          targetLength: seoData.targetLength
        },
        model: 'openai-community/gpt-2'
      };
      
      const result = await this.createTask(taskData);
      return result;
    } catch (error) {
      console.error('SEO task creation error:', error);
      throw error;
    }
  }

  async createMarketingTask(marketingData) {
    try {
      const taskData = {
        type: 'marketing_content',
        input: {
          productCategory: marketingData.category,
          tone: marketingData.tone,
          platform: marketingData.platform
        },
        model: 'openai-community/gpt-2'
      };
      
      const result = await this.createTask(taskData);
      return result;
    } catch (error) {
      console.error('Marketing task creation error:', error);
      throw error;
    }
  }

  // Get all tasks for the e-commerce application
  async getEcommerceTasks() {
    try {
      const { error, output } = await this.listTasks();
      
      if (error) {
        return { error, output: null };
      }
      
      // Filter tasks related to e-commerce
      const ecommerceTasks = output?.filter(task => 
        ['product_description', 'seo_content', 'marketing_content', 'support_response'].includes(task.type)
      ) || [];
      
      return { error: null, output: ecommerceTasks };
    } catch (error) {
      console.error('E-commerce tasks retrieval error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new BytezService();

// Also export the raw SDK instance if needed
export { sdk };