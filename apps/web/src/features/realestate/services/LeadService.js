import { API_URL } from '../../../config';

export const LeadService = {
    async getAgentLeads(token) {
        const response = await fetch(`${API_URL}/api/realestate/leads/agent`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch leads');
        return response.json();
    },

    async updateLeadStatus(leadId, status, token) {
        const response = await fetch(`${API_URL}/api/realestate/leads/${leadId}/status?status=${status}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to update lead status');
        return response.json();
    }
};
