import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        syncWithBackend(session.access_token);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        syncWithBackend(session.access_token);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const syncWithBackend = async (token) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8088';
      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setProfile(userData);
      } else {
        console.error("Backend sync failed", await response.text());
      }
    } catch (err) {
      console.error("Backend sync failed", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const register = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    if (error) throw error;
    return data;
  };

  const logout = () => supabase.auth.signOut();

  const hasRole = (role) => {
    return profile?.role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      authenticated: !!session, 
      session, 
      profile, 
      loading, 
      login, 
      register, 
      logout, 
      hasRole, 
      token: session?.access_token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
