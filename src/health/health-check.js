const checks = {
  database: () => ({ status: 'ok', latencyMs: 12 }),
  cache: () => ({ status: 'ok', latencyMs: 3 }),
  externalApi: () => ({ status: 'ok', latencyMs: 45 }),
};

function runHealthCheck() {
  const results = {};
  let healthy = true;

  for (const [name, check] of Object.entries(checks)) {
    try {
      results[name] = check();
    } catch (err) {
      results[name] = { status: 'error', message: err.message };
      healthy = false;
    }
  }

  return { healthy, checks: results, timestamp: new Date().toISOString() };
}

module.exports = { runHealthCheck };
