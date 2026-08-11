/**
 * Handles detection and cleanup of orphan charges that fail to associate
 * with a valid order, preventing incorrect fault event generation.
 */

const ORPHAN_CHARGE_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes

function isOrphanCharge(charge) {
  const age = Date.now() - new Date(charge.createdAt).getTime();
  return !charge.orderId && age > ORPHAN_CHARGE_THRESHOLD_MS;
}

function detectOrphanCharges(charges) {
  return charges.filter(isOrphanCharge);
}

function resolveOrphanCharge(charge) {
  // Mark as resolved to suppress fault event generation
  return {
    ...charge,
    status: 'ORPHAN_RESOLVED',
    resolvedAt: new Date().toISOString(),
  };
}

module.exports = { detectOrphanCharges, resolveOrphanCharge, isOrphanCharge };
