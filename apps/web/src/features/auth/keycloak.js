import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8082',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'kubiku',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'kubiku-web',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
