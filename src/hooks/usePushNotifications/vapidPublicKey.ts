/**
 * Учебный VAPID public key для демо PushManager.subscribe.
 * Private key намеренно отсутствует в репозитории — без backend отправка push невозможна.
 */
export const VAPID_PUBLIC_KEY =
	'BIJ0fdgYLxnWgYN6csxcwF1bXh3Jww2IRNs7nETuTvsbldRli08vmfRHHyuFMJVtCRDCoLMQBltLVOjjcmNrsGI';

/** Преобразует base64url VAPID-ключ в Uint8Array для applicationServerKey. */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
	const rawData = globalThis.atob(base64);
	const output = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; i += 1) {
		output[i] = rawData.charCodeAt(i);
	}

	return output;
}
