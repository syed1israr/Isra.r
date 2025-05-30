'use client'

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-2xl space-y-6">
        <img
          src="/logo.svg"
          alt="Isra.r Logo"
          className="mx-auto h-20 w-20 animate-bounce"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-900">
          Meet <span className="text-green-700">Isra.r</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Your AI-powered meeting scheduling companion for students and researchers.
        </p>
        <p className="text-md md:text-lg text-gray-500">
          Schedule meetings with a real-time AI tutor, coach, or interviewer.<br />
          Describe your goals, join a live call, and get intelligent help instantly.<br />
          Get summaries, notes, and call recordings — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <Link href="/sign-up">
            <Button className="text-lg px-6 py-3">Get Started</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="text-lg px-6 py-3">
              Learn More
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 w-full max-w-4xl mx-auto grid gap-6 md:grid-cols-3 px-4 text-left">
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🎓 AI Language Tutor</h3>
          <p className="text-gray-600 text-sm">
            Practice live with a smart tutor who adapts to your speaking level, corrects mistakes, and guides your learning.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-lg font-semibold text-green-800 mb-2">💼 Mock Interviews</h3>
          <p className="text-gray-600 text-sm">
            Schedule a technical or behavioral mock interview with our AI to sharpen your confidence before the real one.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🧠 Instant Summaries</h3>
          <p className="text-gray-600 text-sm">
            Each session is auto-summarized with bullet points, takeaways, and a video archive — ready to review anytime.
          </p>
        </div>
      </div>

      <p className="mt-16 text-xs text-gray-400">
        © {new Date().getFullYear()} Isra.r — Built with ❤️ for curious minds.
      </p>
    </main>
  );
}
