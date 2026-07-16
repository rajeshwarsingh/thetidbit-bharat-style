/**
 * Legacy PhonePe initiate route — delegates to /api/payment/initiate.
 * Kept so older clients / bookmarks still work.
 */
export { POST, runtime, dynamic } from '../../payment/initiate/route';
