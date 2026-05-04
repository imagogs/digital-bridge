import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  level: 'none' | 'beginner' | 'intermediate' | 'advanced';
  assessmentCompleted: boolean;
  createdAt: number;
  updatedAt: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrCreateProfile = async (u: User) => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', u.id)
        .single();

      if (data) {
        // Sync Google photo if the profile has no photo yet
        const googlePhoto = u.user_metadata?.avatar_url || u.user_metadata?.picture || '';
        if (!data.photoURL && googlePhoto) {
          const updated = { ...data, photoURL: googlePhoto } as UserProfile;
          setProfile(updated);
          supabase.from('profiles').update({ photoURL: googlePhoto }).eq('id', u.id).then(() => {});
        } else {
          setProfile(data as UserProfile);
        }
        return;
      }

      // Profile doesn't exist — create it
      const newProfile: UserProfile = {
        id: u.id,
        email: u.email || '',
        displayName: u.user_metadata?.full_name || u.user_metadata?.name || '',
        photoURL: u.user_metadata?.avatar_url || u.user_metadata?.picture || '',
        level: 'none',
        assessmentCompleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const { data: inserted } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single();

      setProfile(inserted ? (inserted as UserProfile) : newProfile);
    } catch (e) {
      console.warn('Profile fetch failed (tables may not exist yet):', e);
    }
  };

  useEffect(() => {
    // Safety timeout: if Supabase doesn't respond within 5s, show login anyway
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeout);
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        fetchOrCreateProfile(u).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }).catch(() => {
      clearTimeout(timeout);
      setLoading(false);
    });

    // Listen for auth state changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          await fetchOrCreateProfile(u);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...profile, ...data, updatedAt: Date.now() } as UserProfile;
    setProfile(updated);
    try {
      await supabase
        .from('profiles')
        .upsert({ id: user.id, ...data, updatedAt: Date.now() });
    } catch (e) {
      console.warn('Profile update failed:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
