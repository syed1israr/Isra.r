'use client';
import { motion } from 'framer-motion';

export const HomeView = () => {
 

  return (
    <main className="min-h-screen bg-white text-black px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to <span className="text-[#16A34A]">Tandemly</span>
          </h1>
        </motion.header>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                Your AI-Powered Meeting Companion
              </h2>
              <p className="text-gray-700 leading-relaxed">
                <strong>Tandemly</strong> is a collaborative AI-enhanced video meeting
                platform. Easily host real-time meetings, assign smart AI agents,
                and receive automatic transcripts and summaries — all in one place.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Create and manage meetings with intelligent status tracking</li>
                <li>Assign custom agents with adaptable behavior and tone</li>
                <li>Join Stream-powered real-time video calls with AI integration</li>
                <li>Receive transcripts, auto-summaries, and status updates live</li>
                <li>Responsive UI, accessible components, and mobile-friendly views</li>
              </ul>
              <p className="text-[#16A34A] font-medium mt-4">
                🚀 Start your smart conversations today.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-inner space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">Application Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Tandemly</strong> is a full-stack collaborative platform for
              real-time meetings. Built with <strong>Next.js</strong> and
              <strong> tRPC</strong>, it enables seamless scheduling,
              participation, and summarization of AI-assisted calls.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Email & OAuth authentication with persistent sessions</li>
              <li>Dynamic meeting status: active, upcoming, completed, cancelled</li>
              <li>Webhook-based real-time meeting updates</li>
              <li>Agent management: creation, filtering, and customization</li>
              <li>Responsive dashboard for meetings, agents, and upgrades</li>
              <li>Transcription & summaries with OpenAI integration</li>
              <li>Pagination, filtering, and search across all views</li>
              <li>Custom UI components using shadcn/ui and Radix</li>
              <li>Error boundaries and graceful loading states</li>
              <li>Stream Video for real-time calling and event handling</li>
              <li>Drizzle ORM for database access, React Query for state</li>
            </ul>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
};