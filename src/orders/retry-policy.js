const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BASE_DELAY_MS = 500;

function exponentialBackoff(attempt, baseDelay = DEFAULT_BASE_DELAY_MS) {
  return baseDelay * Math.pow(2, attempt);
}

async function withRetry(fn, options = {}) {
  const maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, exponentialBackoff(attempt, options.baseDelay)));
      }
    }
  }

  throw lastError;
}

module.exports = { withRetry, exponentialBackoff };
