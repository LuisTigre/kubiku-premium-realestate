import { API_URL } from '../config';

export const UserService = {
    async getCurrentUser(token) {
        const response = await fetch(`${API_URL}/api/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch user profile');
        return response.json();
    },

    async updateProfile(data, token) {
        const response = await fetch(`${API_URL}/api/users/me`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
    }
};
