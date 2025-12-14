'use client';

import { useState, lazy, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import Badge from '@/components/ui/Badge';
import { dashboardStats, recentActivities, classes } from '@/data/mockData';
import toast from 'react-hot-toast';

// Lazy load charts for code splitting
const RevenueTrendChart = lazy(() => import('@/components/charts/Charts').then(module => ({ default: module.RevenueTrendChart })));
const MemberGrowthChart = lazy(() => import('@/components/charts/Charts').then(module => ({ default: module.MemberGrowthChart })));
const ClassAttendanceChart = lazy(() => import('@/components/charts/Charts').then(module => ({ default: module.ClassAttendanceChart })));
const WeeklyActivityChart = lazy(() => import('@/components/charts/Charts').then(module => ({ default: module.WeeklyActivityChart })));

// Loading component for charts
const ChartSkeleton = () => (
  <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
    <span className="text-gray-400">Loading chart...</span>
  </div>
);

export default function Dashboard() {
  const router = useRouter();
  const upcomingClasses = classes.slice(0, 3);
  const [activeTab, setActiveTab] = useState('revenue');

  return (
    <div className="min-h-screen">
      <Header title="Dashboard" />
      
      <div className="p-4 lg:p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <StatCard
            title="Total Members"
            value={dashboardStats.totalMembers}
            icon="👥"
            color="primary"
            trend={{ positive: true, value: '+12%' }}
          />
          <StatCard
            title="Active Members"
            value={dashboardStats.activeMembers}
            icon="✅"
            color="success"
            trend={{ positive: true, value: '+8%' }}
          />
          <StatCard
            title="Monthly Revenue"
            value={`₹${dashboardStats.monthlyRevenue.toLocaleString('en-IN')}`}
            icon="💰"
            color="warning"
            trend={{ positive: true, value: '+15%' }}
          />
          <StatCard
            title="Active Classes"
            value={dashboardStats.activeClasses}
            icon="📅"
            color="secondary"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg">
                      {activity.type === 'member' && '👤'}
                      {activity.type === 'payment' && '💳'}
                      {activity.type === 'class' && '📅'}
                      {activity.type === 'trainer' && '💪'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.name} {activity.amount && `- ${activity.amount}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Classes */}
          <Card>
            <h2 className="text-xl font-bold mb-4">Upcoming Classes</h2>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                    <Badge variant={classItem.enrolled === classItem.capacity ? 'danger' : 'success'}>
                      {classItem.enrolled}/{classItem.capacity}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">👨‍🏫 {classItem.trainer}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📅 {classItem.day}</span>
                    <span>🕐 {classItem.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Analytics Charts */}
        <Card className="mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Analytics</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('revenue')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'revenue' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setActiveTab('members')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'members' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Members
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'attendance' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Classes
              </button>
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'weekly' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="mt-4">
            {activeTab === 'revenue' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Revenue Trend (Last 6 Months)</h3>
                <Suspense fallback={<ChartSkeleton />}>
                  <RevenueTrendChart />
                </Suspense>
              </div>
            )}
            {activeTab === 'members' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Member Growth</h3>
                <Suspense fallback={<ChartSkeleton />}>
                  <MemberGrowthChart />
                </Suspense>
              </div>
            )}
            {activeTab === 'attendance' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Class Attendance Distribution</h3>
                <Suspense fallback={<ChartSkeleton />}>
                  <ClassAttendanceChart />
                </Suspense>
              </div>
            )}
            {activeTab === 'weekly' && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Weekly Activity</h3>
                <Suspense fallback={<ChartSkeleton />}>
                  <WeeklyActivityChart />
                </Suspense>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button 
              onClick={() => router.push('/members')}
              className="p-4 bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="text-3xl block mb-2" aria-hidden="true">➕</span>
              <span className="text-sm font-medium dark:text-white">Add Member</span>
            </button>
            <button 
              onClick={() => router.push('/schedule')}
              className="p-4 bg-secondary/10 hover:bg-secondary/20 dark:bg-secondary/20 dark:hover:bg-secondary/30 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <span className="text-3xl block mb-2" aria-hidden="true">📅</span>
              <span className="text-sm font-medium dark:text-white">Schedule Class</span>
            </button>
            <button 
              onClick={() => router.push('/payments')}
              className="p-4 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <span className="text-3xl block mb-2" aria-hidden="true">💳</span>
              <span className="text-sm font-medium dark:text-white">Record Payment</span>
            </button>
            <button 
              onClick={() => toast.info('Reports feature coming soon!')}
              className="p-4 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <span className="text-3xl block mb-2" aria-hidden="true">📊</span>
              <span className="text-sm font-medium dark:text-white">View Reports</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
