import React, { createContext, useContext, useEffect, useState } from 'react';
import keycloak from './keycloak';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256'
    }).then(auth => {
      setAuthenticated(auth);
      if (auth) {
        // Load Keycloak profile
        keycloak.loadUserProfile().then(up => {
          setProfile(up);
          
          // Sync with backend
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
          fetch(`${apiUrl}/api/users/me`, {
            headers: {
              'Authorization': `Bearer ${keycloak.token}`
            }
          })
          .then(res => res.json())
          .then(userData => {
            setProfile(prev => ({ ...prev, dbUser: userData }));
            setLoading(false);
          })
          .catch(err => {
            console.error("Backend sync failed", err);
            setLoading(false);
          });
        });
      } else {
        setLoading(false);
      }
    }).catch(() => {
      console.error("Authenticated Failed");
      setLoading(false);
    });
  }, []);

  const login = (options = {}) => keycloak.login(options);
  const register = (options = {}) => keycloak.login({ action: 'register', ...options });
  const logout = () => keycloak.logout();

  const hasRole = (role) => {
    return keycloak.hasRealmRole(role);
  };

  return (
    <AuthContext.Provider value={{ authenticated, profile, loading, login, register, logout, hasRole, token: keycloak.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
