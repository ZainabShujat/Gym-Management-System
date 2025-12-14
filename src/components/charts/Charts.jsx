'use client';

import { memo } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Revenue Trend Chart
export const RevenueTrendChart = memo(() => {
  const data = [
    { month: 'Jan', revenue: 845000 },
    { month: 'Feb', revenue: 923000 },
    { month: 'Mar', revenue: 887000 },
    { month: 'Apr', revenue: 956000 },
    { month: 'May', revenue: 1020000 },
    { month: 'Jun', revenue: 987200 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
        <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  );
});

// Member Growth Chart
export const MemberGrowthChart = memo(() => {
  const data = [
    { month: 'Jan', members: 120 },
    { month: 'Feb', members: 132 },
    { month: 'Mar', members: 138 },
    { month: 'Apr', members: 145 },
    { month: 'May', members: 151 },
    { month: 'Jun', members: 156 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="members" fill="#10b981" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
});

// Class Attendance Chart
export const ClassAttendanceChart = memo(() => {
  const data = [
    { name: 'Yoga', value: 35 },
    { name: 'HIIT', value: 28 },
    { name: 'Strength', value: 22 },
    { name: 'Pilates', value: 15 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
});

// Weekly Activity Chart
export const WeeklyActivityChart = memo(() => {
  const data = [
    { day: 'Mon', classes: 12, members: 145 },
    { day: 'Tue', classes: 14, members: 132 },
    { day: 'Wed', classes: 11, members: 128 },
    { day: 'Thu', classes: 13, members: 156 },
    { day: 'Fri', classes: 15, members: 142 },
    { day: 'Sat', classes: 10, members: 98 },
    { day: 'Sun', classes: 8, members: 76 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="classes" stroke="#6366f1" strokeWidth={2} />
        <Line type="monotone" dataKey="members" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
});
