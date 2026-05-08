import { API_URL } from '../../../config';

export const PaymentService = {
    async processMockPayment(bookingId, token) {
        const response = await fetch(`${API_URL}/api/payments/mock/${bookingId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Payment failed');
        }
        return response.json();
    }
};
