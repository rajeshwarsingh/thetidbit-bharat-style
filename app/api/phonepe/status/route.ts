/**
 * Legacy PhonePe status route — delegates to /api/payment/status.
 * Kept so older clients / bookmarks still work.
 */
export { GET, POST, runtime, dynamic } from '../../payment/status/route';
