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

    private final LeadRepository leadRepository;

    @GetMapping
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    @PostMapping
    public Lead createLead(@RequestBody Lead lead) {
        return leadRepository.save(lead);
    }

    @PatchMapping("/{id}/status")
    public Lead updateStatus(@PathVariable UUID id, @RequestParam Lead.LeadStatus status) {
        Lead lead = leadRepository.findById(id).orElseThrow();
        lead.setStatus(status);
        return leadRepository.save(lead);
    }
}
