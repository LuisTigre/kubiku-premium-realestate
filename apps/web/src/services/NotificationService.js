import { API_URL } from '../config';

export const NotificationService = {
    async getMyNotifications(token) {
        const response = await fetch(`${API_URL}/api/notifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch notifications');
        return response.json();
    },

    async getUnreadCount(token) {
        const response = await fetch(`${API_URL}/api/notifications/unread/count`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch count');
        return response.json();
    },

    async markAsRead(id, token) {
        const response = await fetch(`${API_URL}/api/notifications/${id}/read`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to mark as read');
        return true;
    }
};
