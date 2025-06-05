'use client';
import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({text:"warahmatullahi wabarakatuh"}));


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-sidebar-accent via-sidebar/50 to-sidebar/50 text-white px-6">
      <div className="p-10 rounded-2xl border border-[#5D6B68]/10 bg-linear-to-r/oklch from-sidebar-accent via-sidebar/50 to-sidebar/50 shadow-lg backdrop-blur-sm max-w-3xl w-full text-center">
        <h1 className="text-5xl font-bold text-[#5D6B68] tracking-tight mb-4">
            {data?.greeting || 'Welcome to Isra.r'}
        </h1>

        <p className="text-md text-gray-300 mb-6">
          Logged in as: <span className="font-semibold text-white">{session?.user?.email || 'Unknown User'}</span>
        </p>

        <p className="text-gray-400 leading-relaxed mb-4">
          <strong>Isra.r</strong> is your AI-powered real-time video calling platform. Choose AI agents tailored for
          language learning, corporate coaching, or mock interviews. Describe your needs, join a call, and talk to a live AI
          that adapts to you.
        </p>

        <ul className="text-sm text-gray-400 text-left list-disc list-inside mx-auto max-w-lg space-y-1">
          <li>Schedule topic-specific meetings with AI</li>
          <li>Customize agent tone and communication style</li>
          <li>Live 1-on-1 AI calls with real-time responses</li>
          <li>Get meeting notes, summaries, and recordings</li>
        </ul>

        <p className="mt-8 text-sm text-[#5D6B68]">
          🚀 Start your smart conversations today.
        </p>
      </div>
    </div>
  );
};
