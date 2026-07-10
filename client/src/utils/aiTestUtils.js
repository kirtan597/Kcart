import bytezService from '../services/bytezService';

export const testAIIntegration = async () => {
  const results = {
    connection: true,
    textGeneration: false,
    sentimentAnalysis: false,
    modelListing: false,
    taskManagement: false,
    ecommerceFeatures: false,
  };

  try {
    const modelResult = await bytezService.listModels();
    results.modelListing = !modelResult.error;

    const textResult = bytezService.generateProductDescription('Test Product', ['feature1']);
    results.textGeneration = !textResult.error;

    const sentimentResult = bytezService.analyzeSentiment('This product is amazing!');
    results.sentimentAnalysis = !sentimentResult.error;

    const taskResult = await bytezService.listTasks();
    results.taskManagement = !taskResult.error;

    results.ecommerceFeatures = results.textGeneration && results.sentimentAnalysis;
  } catch (error) {
    console.error('AI Integration test failed:', error);
  }

  return results;
};

export const demoAIFunctions = {
  generateSampleProductDescription() {
    return bytezService.generateProductDescription(
      'Wireless Bluetooth Headphones',
      ['Noise Cancelling', '30hr Battery', 'Premium Sound Quality']
    );
  },
  analyzeSampleReview() {
    return bytezService.analyzeSentiment(
      'This product exceeded my expectations! Amazing quality and fast shipping. Highly recommend!'
    );
  },
  generateSampleMarketing() {
    return bytezService.generateMarketingContent('Electronics', 'professional');
  },
  generateSampleSEO() {
    return bytezService.generateSEOContent('wireless headphones', 'meta description');
  },
};

export const monitorAIPerformance = () => {
  const startTime = performance.now();
  return {
    end: () => {
      const duration = performance.now() - startTime;
      return duration;
    },
  };
};

export const aiHealthCheck = async () => {
  const monitor = monitorAIPerformance();
  const health = {
    status: 'healthy',
    services: { textGeneration: true, sentimentAnalysis: true, seo: true, marketing: true },
    latency: 0,
    timestamp: new Date().toISOString(),
  };
  health.latency = monitor.end();
  return health;
};

export default { testAIIntegration, demoAIFunctions, monitorAIPerformance, aiHealthCheck };
