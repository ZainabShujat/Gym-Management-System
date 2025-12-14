'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 fixed w-full z-50">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center font-black text-xl">
                G
              </div>
              <div>
                <h1 className="text-xl font-black text-white">GymMS</h1>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm"
              >
                Open Dashboard →
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-medium mb-6 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                Frontend-Only • Zero Backend Setup
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1]">
                Gym Operations.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400">
                  Simplified.
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Production-ready gym management system. Handle ₹9.87 Lakh monthly revenue, 
                manage 156 members, schedule 24 classes — all with localStorage persistence.
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mb-10">
                {['React 18', 'Next.js 14', 'Recharts', 'Tailwind CSS', 'LocalStorage API'].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md text-xs font-mono text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="group px-8 py-4 bg-primary hover:bg-primary/90 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-white"
                >
                  Launch Dashboard
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button
                  onClick={() => document.getElementById('metrics').scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border-2 border-gray-700 hover:border-gray-600 rounded-lg font-bold transition-colors text-white"
                >
                  See Features
                </button>
              </div>

              {/* Live Indicators */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500">Live Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500">Persistent Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-500">Dark Mode</span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-20 blur-3xl"></div>
              <div className="relative bg-gray-800 border-2 border-gray-700 rounded-2xl p-8 shadow-2xl">
                {/* Browser Chrome */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-700 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-gray-600 font-mono">localhost:3001/dashboard</span>
                </div>
                
                {/* Mini Dashboard */}
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Revenue', value: '₹9.87L', change: '+15%', color: 'text-green-400' },
                      { label: 'Members', value: '156', change: '+12%', color: 'text-blue-400' },
                      { label: 'Classes', value: '24', change: '+8%', color: 'text-purple-400' },
                      { label: 'Trainers', value: '8', change: 'Active', color: 'text-pink-400' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-gray-900/80 p-4 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="text-xs text-gray-500 mb-2 font-medium">{stat.label}</div>
                        <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                        <div className={`text-xs font-semibold ${stat.color}`}>{stat.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart Preview */}
                  <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-400 font-semibold">Revenue Trend</div>
                      <div className="text-xs text-green-400">↑ 15.3%</div>
                    </div>
                    <div className="h-28 flex items-end gap-2">
                      {[45, 58, 52, 68, 72, 85].map((height, i) => (
                        <div key={i} className="flex-1 group cursor-pointer">
                          <div 
                            className="bg-gradient-to-t from-primary to-purple-500 rounded-t-lg group-hover:from-primary/80 group-hover:to-purple-500/80 transition-all" 
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-600">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="space-y-2">
                    {[
                      { icon: '👤', text: 'New member: Arjun Reddy', time: '2h' },
                      { icon: '💰', text: 'Payment: ₹15,999', time: '3h' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
                        <span className="text-lg">{activity.icon}</span>
                        <span className="text-xs text-gray-400 flex-1">{activity.text}</span>
                        <span className="text-xs text-gray-600">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="py-16 px-4 border-y border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: '156+', label: 'Active Members', sublabel: 'Tracked' },
              { metric: '₹98.7L', label: 'Monthly Revenue', sublabel: 'Managed' },
              { metric: '24', label: 'Weekly Classes', sublabel: 'Scheduled' },
              { metric: '100%', label: 'Local Storage', sublabel: 'Persistent' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{item.metric}</div>
                <div className="text-sm font-semibold text-gray-400 mb-1">{item.label}</div>
                <div className="text-xs text-gray-600">{item.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-white mb-4">Built For Production</h3>
            <p className="text-xl text-gray-500">Enterprise features. Frontend simplicity.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Member Management',
                description: 'CRUD operations with form validation. Add, edit, delete members. Persistent localStorage.',
                tag: 'Core'
              },
              {
                title: 'Analytics Dashboard',
                description: '4 interactive charts: Revenue trends, member growth, class distribution, weekly activity.',
                tag: 'Charts'
              },
              {
                title: 'Payment Tracking',
                description: 'Monitor ₹ revenue, pending payments, transaction history. INR formatting.',
                tag: 'Finance'
              },
              {
                title: 'Class Scheduling',
                description: '24 weekly classes, capacity tracking, enrollment stats, trainer assignments.',
                tag: 'Schedule'
              },
              {
                title: 'Dark Mode',
                description: 'Full dark theme with localStorage persistence. Toggle anywhere.',
                tag: 'UX'
              },
              {
                title: 'Toast Notifications',
                description: 'Real-time feedback for all actions. Success, error, info states.',
                tag: 'Feedback'
              },
            ].map((feature, i) => (
              <div key={i} className="group bg-gray-800 border-2 border-gray-700 hover:border-primary/50 rounded-xl p-6 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold text-white">{feature.title}</h4>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">{feature.tag}</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-black text-white mb-6">Ready to explore?</h3>
          <p className="text-xl text-gray-400 mb-10">
            Full-featured gym management system. No backend required.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="group px-12 py-5 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 rounded-xl font-black text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 mx-auto text-white"
          >
            Launch Dashboard
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center font-black text-xl">
                G
              </div>
              <div>
                <h3 className="text-lg font-black text-white">GymMS</h3>
                <p className="text-xs text-gray-600">Frontend Management System</p>
              </div>
            </div>
            
            <div className="flex gap-8 text-sm">
              <button onClick={() => router.push('/dashboard')} className="text-gray-500 hover:text-white transition-colors">
                Dashboard
              </button>
              <button onClick={() => router.push('/members')} className="text-gray-500 hover:text-white transition-colors">
                Members
              </button>
              <button onClick={() => router.push('/schedule')} className="text-gray-500 hover:text-white transition-colors">
                Schedule
              </button>
              <button onClick={() => router.push('/payments')} className="text-gray-500 hover:text-white transition-colors">
                Payments
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Built with React & Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
