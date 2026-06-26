'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

const summaryMetrics = [
  {
    title: 'Skin Health',
    value: 'Balanced',
    description: 'Your skin is well hydrated and shows healthy tone symmetry.',
  },
  {
    title: 'Oil Level',
    value: 'Moderate',
    description: 'Slight shine in the T-zone, with good overall moisture control.',
  },
  {
    title: 'Recommended Routine',
    value: '4 steps',
    description: 'A simple daily regimen to support your personalized skin goals.',
  },
];

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-white text-[#1A1B1C] antialiased">
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10 sm:px-8 lg:px-12">
        <div className="space-y-8">
          <section className="rounded-[32px] border border-slate-200 bg-slate-50/80 p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Summary Report
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1B1C] sm:text-4xl">
                  Your Personalized Skinstric Summary
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  This page gives you a concise overview of your current skin profile, recommended care, and the next best actions.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/phase-1" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                  Re-run Assessment
                </Link>
                <Link href="/" className="inline-flex items-center justify-center rounded-full bg-[#1A1B1C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-900">
                  Back to Home
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            {summaryMetrics.map((metric) => (
              <article key={metric.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {metric.title}
                </p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-[#1A1B1C]">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {metric.description}
                </p>
              </article>
            ))}
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-slate-50/80 p-8 shadow-sm">
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[#1A1B1C]">
                  What this means for you
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Keep following a gentle routine, support hydration with lightweight products, and review targeted treatments for areas that need extra balance.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Key focus</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Maintain a consistent cleansing and SPF routine while minimizing overly aggressive actives.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-500">Next step</p>
                  <p className="mt-3 text-base leading-7 text-slate-700">
                    Explore our recommended products to support gentle barrier repair and balanced hydration.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
