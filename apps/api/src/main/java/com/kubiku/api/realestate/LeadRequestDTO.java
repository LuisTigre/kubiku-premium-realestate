package com.kubiku.api.realestate;

import lombok.Data;
import java.util.UUID;

@Data
public class LeadRequestDTO {
    private UUID propertyId;
    private String contactName;
    private String contactEmail;
    private String contactPhone;
    private String message;
}
