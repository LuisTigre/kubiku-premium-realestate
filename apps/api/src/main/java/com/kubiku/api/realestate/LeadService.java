package com.kubiku.api.realestate;

import com.kubiku.api.user.User;
import com.kubiku.api.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;
    private final PropertyRepository propertyRepository;
    private final UserService userService;
    private final com.kubiku.api.notification.NotificationService notificationService;

    @Transactional
    public Lead createLead(LeadRequestDTO request) {
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        User currentUser = null;
        try {
            currentUser = userService.syncUserWithAuth();
        } catch (Exception e) {
            // Guest lead
        }

        Lead lead = Lead.builder()
                .property(property)
                .user(currentUser)
                .contactName(request.getContactName())
                .contactEmail(request.getContactEmail())
                .contactPhone(request.getContactPhone())
                .message(request.getMessage())
                .status(Lead.LeadStatus.NEW)
                .build();

        lead = leadRepository.save(lead);

        // Notify property agent
        notificationService.createNotification(
            property.getAgent().getId(),
            "New Sales Lead",
            "You have a new inquiry for " + property.getListing().getTitle() + " from " + request.getContactName() + ".",
            com.kubiku.api.notification.Notification.NotificationType.LEAD
        );

        return lead;
    }

    public java.util.List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public java.util.List<Lead> getAgentLeads() {
        User currentUser = userService.syncUserWithAuth();
        return leadRepository.findByPropertyAgentIdOrderByCreatedAtDesc(currentUser.getId());
    }

    @Transactional
    public Lead updateLeadStatus(java.util.UUID leadId, Lead.LeadStatus status) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        lead.setStatus(status);
        return leadRepository.save(lead);
    }
}
