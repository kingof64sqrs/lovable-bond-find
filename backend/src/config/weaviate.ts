import weaviate from 'weaviate-ts-client';

const scheme = process.env.WEAVIATE_SCHEME || 'http';
const host = process.env.WEAVIATE_HOST || 'localhost:8080';

const client = weaviate.client({
  scheme: scheme as 'http' | 'https',
  host: host,
});

// Test connection
const testConnection = async (): Promise<void> => {
  try {
    await client.misc.liveChecker().do();
    console.log('✓ Weaviate is live and ready');
  } catch (err) {
    console.error('✗ Weaviate connection failed:', err instanceof Error ? err.message : err);
  }
};

testConnection();

export default client;
