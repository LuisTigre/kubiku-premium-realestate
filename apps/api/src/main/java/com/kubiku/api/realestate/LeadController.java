package com.kubiku.api.realestate;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/realestate/leads")
@RequiredArgsConstructor
@Tag(name = "Real Estate Leads", description = "Inquiry and contact management")
public class LeadController {

    private final LeadService leadService;

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadService.getAllLeads();
    }

    @GetMapping("/agent")
    public List<Lead> getAgentLeads() {
        return leadService.getAgentLeads();
    }

    @PostMapping
    public Lead createLead(@RequestBody LeadRequestDTO request) {
        return leadService.createLead(request);
    }

    @PatchMapping("/{id}/status")
    public Lead updateStatus(@PathVariable UUID id, @RequestParam Lead.LeadStatus status) {
        return leadService.updateLeadStatus(id, status);
    }
}
