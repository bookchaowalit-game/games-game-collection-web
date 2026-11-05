import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'More projects - Book Arcade',
  description: 'The rest of the bookchaowalit portfolio: productivity tools, dev tools, and a few full products.',
  keywords: ['related projects', 'more apps', 'bookchaowalit', 'web applications'],
  alternates: { canonical: '/more-projects' },
  openGraph: {
    title: 'More projects - Book Arcade',
    description: 'The rest of the bookchaowalit portfolio.',
    type: 'website',
  },
};

export default function RelatedProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-paper py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-center mb-4 text-ink">
          More Projects
        </h1>
        <p className="text-center text-ink-dim mb-12">
          Explore our collection of web applications and tools
        </p>

        
        <section className="mb-12">
          <h2 className="text-sm font-semibold tracking-wide text-ink-faint uppercase mb-6">
            {'productivity'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link
              href="https://bookchaowalit-pomodoro-timer-fronte.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Pomodoro Timer
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-pomodoro-timer-fronte.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-habit-tracker-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Habit Tracker
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-habit-tracker-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-goal-tracker-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Goal Tracker
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-goal-tracker-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-time-tracker-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Time Tracker
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-time-tracker-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-todo-board-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Todo Board
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-todo-board-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-calendar-app-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Calendar App
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-calendar-app-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-reminders-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Reminders
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-reminders-frontend.vercel.app →
              </p>
            </Link>
            
          </div>
        </section>
        
        
        <section className="mb-12">
          <h2 className="text-sm font-semibold tracking-wide text-ink-faint uppercase mb-6">
            {'dev tools'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link
              href="https://bookchaowalit-jsonconverter-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                JSON Converter
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-jsonconverter-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-base64-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Base64 Encoder
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-base64-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-regex-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Regex Tester
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-regex-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-hashgen-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Hash Generator
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-hashgen-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-cron-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Cron Expression
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-cron-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-diffchecker-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Diff Checker
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-diffchecker-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-minifier-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Minifier
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-minifier-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-url-encoder-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                URL Encoder
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-url-encoder-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-url-shortener-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                URL Shortener
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-url-shortener-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-deeplinks-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Deep Links
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-deeplinks-frontend.vercel.app →
              </p>
            </Link>
            
          </div>
        </section>
        
        
        <section className="mb-12">
          <h2 className="text-sm font-semibold tracking-wide text-ink-faint uppercase mb-6">
            {'content tools'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link
              href="https://bookchaowalit-markdown-editor-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Markdown Editor
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-markdown-editor-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-text-summarizer-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Text Summarizer
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-text-summarizer-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-quote-generator-front.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Quote Generator
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-quote-generator-front.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-meme-generator-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Meme Generator
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-meme-generator-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-number-converter-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Number Converter
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-number-converter-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-date-calculator-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Date Calculator
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-date-calculator-frontend.vercel.app →
              </p>
            </Link>
            
          </div>
        </section>
        
        
        <section className="mb-12">
          <h2 className="text-sm font-semibold tracking-wide text-ink-faint uppercase mb-6">
            {'webmaster'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link
              href="https://bookchaowalit-seo-analyzer-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                SEO Analyzer
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-seo-analyzer-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-analytics-dashboard-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Analytics Dashboard
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-analytics-dashboard-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-uptime-monitor-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Uptime Monitor
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-uptime-monitor-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-error-logs-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Error Logs
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-error-logs-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-redirect-manager-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Redirect Manager
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-redirect-manager-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-status-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Status Page
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-status-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-popular-pages-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Popular Pages
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-popular-pages-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-link-analytics-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Link Analytics
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-link-analytics-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-webhook-tester-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Webhook Tester
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-webhook-tester-frontend.vercel.app →
              </p>
            </Link>
            
          </div>
        </section>
        
        
        <section className="mb-12">
          <h2 className="text-sm font-semibold tracking-wide text-ink-faint uppercase mb-6">
            {'communication'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link
              href="https://bookchaowalit-contact-forms-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Contact Forms
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-contact-forms-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-newsletter-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Newsletter
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-newsletter-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-comments-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Comments
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-comments-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-guestbook-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Guestbook
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-guestbook-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-chat-playground-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Chat Playground
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-chat-playground-frontend.vercel.app →
              </p>
            </Link>
            
          </div>
        </section>
        
        
        <section className="mb-12">
          <h2 className="text-sm font-semibold tracking-wide text-ink-faint uppercase mb-6">
            {'Main Sites'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Link
              href="https://bookchaowalit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Portfolio
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit.com →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-techblog-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Blog
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-techblog-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-devhub-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                DevHub
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-devhub-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-wiki-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Wiki
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-wiki-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-techspace-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                TechSpace
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-techspace-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-tracking-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Tracking
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-tracking-frontend.vercel.app →
              </p>
            </Link>
            
            
            <Link
              href="https://bookchaowalit-linktree-frontend.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-paper-raised border border-border rounded-lg shadow-sm transition-transform motion-safe:hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            >
              <h3 className="text-lg font-semibold mb-2 text-ink">
                Linktree
              </h3>
              <p className="text-sm text-accent">
                https://bookchaowalit-linktree-frontend.vercel.app →
              </p>
            </Link>
            
          </div>
        </section>
        
      </div>
    </main>
  );
}
