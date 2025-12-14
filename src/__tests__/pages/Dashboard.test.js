import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';

// Mock dependencies
jest.mock('@/components/layout/Header', () => {
  return function MockHeader({ title }) {
    return <div data-testid="header">{title}</div>;
  };
});

jest.mock('@/components/charts/Charts', () => ({
  RevenueTrendChart: () => <div data-testid="revenue-chart">Revenue Chart</div>,
  MemberGrowthChart: () => <div data-testid="member-chart">Member Chart</div>,
  ClassAttendanceChart: () => <div data-testid="class-chart">Class Chart</div>,
  WeeklyActivityChart: () => <div data-testid="activity-chart">Activity Chart</div>,
}));

describe('Dashboard Page', () => {
  it('renders dashboard with header', () => {
    render(<Dashboard />);
    expect(screen.getByTestId('header')).toHaveTextContent('Dashboard');
  });

  it('displays stat cards with correct data', () => {
    render(<Dashboard />);
    
    expect(screen.getByText(/total revenue/i)).toBeInTheDocument();
    expect(screen.getByText(/active members/i)).toBeInTheDocument();
    expect(screen.getByText(/active trainers/i)).toBeInTheDocument();
    expect(screen.getByText(/total classes/i)).toBeInTheDocument();
  });

  it('renders all chart components', () => {
    render(<Dashboard />);
    
    expect(screen.getByTestId('revenue-chart')).toBeInTheDocument();
    expect(screen.getByTestId('member-chart')).toBeInTheDocument();
    expect(screen.getByTestId('class-chart')).toBeInTheDocument();
    expect(screen.getByTestId('activity-chart')).toBeInTheDocument();
  });

  it('displays recent activities section', () => {
    render(<Dashboard />);
    expect(screen.getByText(/recent activities/i)).toBeInTheDocument();
  });

  it('displays upcoming classes section', () => {
    render(<Dashboard />);
    expect(screen.getByText(/upcoming classes/i)).toBeInTheDocument();
  });
});
