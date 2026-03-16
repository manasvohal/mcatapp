import React, { createContext, useContext } from 'react';
import { supabase } from '../lib/supabase';

const UserContext = createContext(null);

export function UserProvider({ session, profile, children }) {
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{
        user: session?.user ?? null,
        profile,
        session,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
}
