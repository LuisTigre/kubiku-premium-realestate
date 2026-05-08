import { API_URL } from '../../../config';

export const BookingService = {
    /**
     * Fetch stay details including room units.
     */
    async getStayDetails(id) {
        const response = await fetch(`${API_URL}/api/hospitality/stays/${id}`);
        if (!response.ok) throw new Error('Failed to fetch stay details');
        return response.json();
    },

    /**
     * Check availability for a room unit and date range.
     */
    async checkAvailability(roomUnitId, checkIn, checkOut) {
        const response = await fetch(
            `${API_URL}/api/hospitality/availability/check?roomUnitId=${roomUnitId}&checkIn=${checkIn}&checkOut=${checkOut}`
        );
        if (!response.ok) throw new Error('Failed to check availability');
        return response.json();
    },

    /**
     * Submit a booking request.
     */
    async requestBooking(bookingRequest, token) {
        const response = await fetch(`${API_URL}/api/hospitality/bookings/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookingRequest)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit booking request');
        }
        return response.json();
    },

    /**
     * Fetch bookings for the current authenticated user.
     */
    async getMyBookings(token) {
        const response = await fetch(`${API_URL}/api/hospitality/bookings/my`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch my bookings');
        return response.json();
    }
};
