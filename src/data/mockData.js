// Mock Members Data
export const members = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765-43210',
    membershipType: 'Premium',
    status: 'Active',
    joinDate: '2024-01-15',
    expiryDate: '2025-01-15',
    image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=6366f1&color=fff'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 98765-43211',
    membershipType: 'Basic',
    status: 'Active',
    joinDate: '2024-03-20',
    expiryDate: '2025-03-20',
    image: 'https://ui-avatars.com/api/?name=Priya+Patel&background=8b5cf6&color=fff'
  },
  {
    id: 3,
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 98765-43212',
    membershipType: 'Premium',
    status: 'Expired',
    joinDate: '2023-06-10',
    expiryDate: '2024-06-10',
    image: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=ec4899&color=fff'
  },
  {
    id: 4,
    name: 'Sneha Singh',
    email: 'sneha.singh@email.com',
    phone: '+91 98765-43213',
    membershipType: 'Standard',
    status: 'Active',
    joinDate: '2024-02-28',
    expiryDate: '2025-02-28',
    image: 'https://ui-avatars.com/api/?name=Sneha+Singh&background=10b981&color=fff'
  },
  {
    id: 5,
    name: 'Arjun Reddy',
    email: 'arjun.reddy@email.com',
    phone: '+91 98765-43214',
    membershipType: 'Basic',
    status: 'Active',
    joinDate: '2024-04-05',
    expiryDate: '2025-04-05',
    image: 'https://ui-avatars.com/api/?name=Arjun+Reddy&background=f59e0b&color=fff'
  }
];

// Mock Trainers Data
export const trainers = [
  {
    id: 1,
    name: 'Vikram Malhotra',
    email: 'vikram.m@gym.com',
    phone: '+91 98765-43220',
    specialization: 'Strength Training',
    experience: '5 years',
    rating: 4.8,
    clients: 23,
    status: 'Available',
    image: 'https://ui-avatars.com/api/?name=Vikram+Malhotra&background=6366f1&color=fff'
  },
  {
    id: 2,
    name: 'Kavita Iyer',
    email: 'kavita.i@gym.com',
    phone: '+91 98765-43221',
    specialization: 'Yoga & Flexibility',
    experience: '7 years',
    rating: 4.9,
    clients: 31,
    status: 'Available',
    image: 'https://ui-avatars.com/api/?name=Kavita+Iyer&background=8b5cf6&color=fff'
  },
  {
    id: 3,
    name: 'Rohan Desai',
    email: 'rohan.d@gym.com',
    phone: '+91 98765-43222',
    specialization: 'Cardio & HIIT',
    experience: '4 years',
    rating: 4.7,
    clients: 19,
    status: 'Busy',
    image: 'https://ui-avatars.com/api/?name=Rohan+Desai&background=ec4899&color=fff'
  },
  {
    id: 4,
    name: 'Anjali Mehta',
    email: 'anjali.m@gym.com',
    phone: '+91 98765-43223',
    specialization: 'Pilates',
    experience: '6 years',
    rating: 4.9,
    clients: 28,
    status: 'Available',
    image: 'https://ui-avatars.com/api/?name=Anjali+Mehta&background=10b981&color=fff'
  }
];

// Mock Classes Data
export const classes = [
  {
    id: 1,
    name: 'Morning Yoga',
    trainer: 'Kavita Iyer',
    day: 'Monday',
    time: '07:00 AM',
    duration: '60 min',
    capacity: 20,
    enrolled: 15,
    level: 'Beginner',
    room: 'Studio A'
  },
  {
    id: 2,
    name: 'HIIT Bootcamp',
    trainer: 'Rohan Desai',
    day: 'Monday',
    time: '06:00 PM',
    duration: '45 min',
    capacity: 15,
    enrolled: 15,
    level: 'Advanced',
    room: 'Main Gym'
  },
  {
    id: 3,
    name: 'Strength Training',
    trainer: 'Vikram Malhotra',
    day: 'Tuesday',
    time: '05:30 PM',
    duration: '90 min',
    capacity: 12,
    enrolled: 10,
    level: 'Intermediate',
    room: 'Weight Room'
  },
  {
    id: 4,
    name: 'Pilates Flow',
    trainer: 'Anjali Mehta',
    day: 'Wednesday',
    time: '09:00 AM',
    duration: '60 min',
    capacity: 18,
    enrolled: 12,
    level: 'All Levels',
    room: 'Studio B'
  },
  {
    id: 5,
    name: 'Evening Yoga',
    trainer: 'Kavita Iyer',
    day: 'Thursday',
    time: '07:00 PM',
    duration: '60 min',
    capacity: 20,
    enrolled: 18,
    level: 'Beginner',
    room: 'Studio A'
  },
  {
    id: 6,
    name: 'Cardio Blast',
    trainer: 'Rohan Desai',
    day: 'Friday',
    time: '06:00 AM',
    duration: '45 min',
    capacity: 15,
    enrolled: 11,
    level: 'Intermediate',
    room: 'Main Gym'
  },
  {
    id: 7,
    name: 'Weekend Warrior',
    trainer: 'Vikram Malhotra',
    day: 'Saturday',
    time: '10:00 AM',
    duration: '120 min',
    capacity: 10,
    enrolled: 8,
    level: 'Advanced',
    room: 'Main Gym'
  }
];

// Mock Payments Data
export const payments = [
  {
    id: 1,
    memberName: 'Rahul Sharma',
    amount: 15999,
    date: '2024-12-01',
    type: 'Membership',
    status: 'Completed',
    method: 'Credit Card'
  },
  {
    id: 2,
    memberName: 'Priya Patel',
    amount: 7999,
    date: '2024-12-03',
    type: 'Membership',
    status: 'Completed',
    method: 'Debit Card'
  },
  {
    id: 3,
    memberName: 'Sneha Singh',
    amount: 11999,
    date: '2024-12-05',
    type: 'Membership',
    status: 'Pending',
    method: 'UPI'
  },
  {
    id: 4,
    memberName: 'Amit Kumar',
    amount: 15999,
    date: '2024-12-07',
    type: 'Membership',
    status: 'Failed',
    method: 'Credit Card'
  },
  {
    id: 5,
    memberName: 'Arjun Reddy',
    amount: 2499,
    date: '2024-12-10',
    type: 'Personal Training',
    status: 'Completed',
    method: 'Cash'
  }
];

// Dashboard Statistics
export const dashboardStats = {
  totalMembers: 156,
  activeMembers: 142,
  totalRevenue: 3654320,
  monthlyRevenue: 987200,
  totalTrainers: 8,
  activeClasses: 24,
  upcomingClasses: 7,
  pendingPayments: 5
};

// Recent Activities
export const recentActivities = [
  {
    id: 1,
    type: 'member',
    action: 'New member joined',
    name: 'Arjun Reddy',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'payment',
    action: 'Payment received',
    name: 'Rahul Sharma',
    amount: '₹15,999',
    timestamp: '3 hours ago'
  },
  {
    id: 3,
    type: 'class',
    action: 'Class fully booked',
    name: 'HIIT Bootcamp',
    timestamp: '5 hours ago'
  },
  {
    id: 4,
    type: 'trainer',
    action: 'New trainer added',
    name: 'Anjali Mehta',
    timestamp: '1 day ago'
  },
  {
    id: 5,
    type: 'member',
    action: 'Membership renewed',
    name: 'Priya Patel',
    timestamp: '1 day ago'
  }
];
