import React, { useState } from 'react';
import { User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ProfileOverlay } from './ProfileOverlay';

export function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useAuth();
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="absolute top-6 right-6 z-40 p-3 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full transition-all text-white backdrop-blur-md flex items-center justify-center gap-2 group"
      >
        {profile?.photoURL ? (
           <img src={profile.photoURL} alt="User" className="w-6 h-6 rounded-full" />
        ) : (
           <UserIcon className="w-6 h-6 text-white/70 group-hover:text-white" />
        )}
      </button>
      
      {isOpen && <ProfileOverlay onClose={() => setIsOpen(false)} />}
    </>
  );
}
