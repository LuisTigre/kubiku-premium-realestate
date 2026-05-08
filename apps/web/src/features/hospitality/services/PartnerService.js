import { API_URL } from '../../../config';

export const PartnerService = {
    /**
     * Fetch all bookings for properties owned by the authenticated partner.
     */
    async getBookings(token) {
        const response = await fetch(`${API_URL}/api/hospitality/bookings/partner`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch bookings');
        return response.json();
    },

    /**
     * Update a booking status (Approve/Reject).
     */
    async updateBookingStatus(bookingId, status, token) {
        const response = await fetch(`${API_URL}/api/hospitality/bookings/${bookingId}/status?status=${status}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update booking status');
        }
        return response.json();
    }
};
