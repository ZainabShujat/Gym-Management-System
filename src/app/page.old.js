'use client';

import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm fixed w-full z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏋️</span>
              <h1 className="text-2xl font-bold text-primary">GymMS</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isDark ? (
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Launch App
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6">
              Modern Gym
              <span className="block text-primary">Management System</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your gym operations with our all-in-one management solution. 
              Track members, manage classes, and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                Get Started →
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg hover:bg-primary/5 transition-colors font-semibold text-lg"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '👥', value: '156+', label: 'Active Members' },
              { icon: '💪', value: '8', label: 'Expert Trainers' },
              { icon: '📅', value: '24', label: 'Weekly Classes' },
              { icon: '⭐', value: '4.9', label: 'Avg Rating' },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h3>
            <p className="text-xl text-gray-600">Everything you need to manage your gym efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '👥',
                title: 'Member Management',
                description: 'Track members, memberships, and attendance with ease. Add, edit, and manage member profiles.',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                icon: '💪',
                title: 'Trainer Management',
                description: 'Manage your training staff, track their schedules, and assign clients efficiently.',
                color: 'bg-purple-100 text-purple-600'
              },
              {
                icon: '📅',
                title: 'Class Scheduling',
                description: 'Schedule classes, track capacity, and manage bookings with an intuitive interface.',
                color: 'bg-pink-100 text-pink-600'
              },
              {
                icon: '💳',
                title: 'Payment Tracking',
                description: 'Monitor payments, track revenue, and manage member subscriptions seamlessly.',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: '📊',
                title: 'Analytics Dashboard',
                description: 'Get insights with beautiful charts showing revenue trends, member growth, and more.',
                color: 'bg-yellow-100 text-yellow-600'
              },
              {
                icon: '🌙',
                title: 'Dark Mode',
                description: 'Work comfortably day or night with our beautiful dark mode interface.',
                color: 'bg-indigo-100 text-indigo-600'
              },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center text-3xl mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Gym?</h3>
          <p className="text-xl mb-8 opacity-90">
            Start managing your gym more efficiently today with our modern management system.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-10 py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-lg shadow-xl"
          >
            Launch Dashboard →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🏋️</span>
                <h3 className="text-2xl font-bold">GymMS</h3>
              </div>
              <p className="text-gray-400">
                Modern gym management system built with React and Next.js
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Member Management</li>
                <li>Trainer Management</li>
                <li>Class Scheduling</li>
                <li>Payment Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors">
                    Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/members')} className="hover:text-white transition-colors">
                    Members
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/trainers')} className="hover:text-white transition-colors">
                    Trainers
                  </button>
                </li>
                <li>
                  <button onClick={() => router.push('/schedule')} className="hover:text-white transition-colors">
                    Schedule
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 GymMS. Built with ❤️ using React & Next.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
