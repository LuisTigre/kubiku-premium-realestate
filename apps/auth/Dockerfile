FROM quay.io/keycloak/keycloak:24.0.5

# Copy the realm export file
COPY realm-export.json /opt/keycloak/data/import/

# Enable health and metrics
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Set the import command
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--import-realm"]
