'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

export const HomeView = () => {
  const { data: session } = authClient.useSession();
 const router = useRouter()


  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='bg-blue-50 text-teal-600 text-4xl'>
        Logged Email :- {session?.user?.email || 'Unknown User'}
      </p>
      <Button
        className='mt-4'
        onClick={() => {
          authClient.signOut({fetchOptions:{onSuccess: ()=> router.push('/sign-in')}});
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};


