import { API_URL } from '../../../config';

export const PropertyService = {
    async getAllProperties() {
        const response = await fetch(`${API_URL}/api/realestate/properties`);
        if (!response.ok) throw new Error('Failed to fetch properties');
        return response.json();
    },

    async getPropertyById(id) {
        const response = await fetch(`${API_URL}/api/realestate/properties/${id}`);
        if (!response.ok) throw new Error('Failed to fetch property details');
        return response.json();
    },

    async getAgentProperties(token) {
        const response = await fetch(`${API_URL}/api/realestate/properties/agent`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch agent properties');
        return response.json();
    }
};
