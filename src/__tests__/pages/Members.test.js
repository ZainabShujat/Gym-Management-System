import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Members from '@/app/members/page';
import { dataManager } from '@/utils/localStorage';
import toast from 'react-hot-toast';

// Mock dependencies
jest.mock('@/utils/localStorage');
jest.mock('react-hot-toast');
jest.mock('@/components/layout/Header', () => {
  return function MockHeader({ title }) {
    return <div data-testid="header">{title}</div>;
  };
});

const mockMembers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    membershipType: 'Premium',
    status: 'Active',
    joinDate: '2024-01-15',
    expiryDate: '2024-07-15'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya@example.com',
    phone: '+91 98765 43211',
    membershipType: 'Basic',
    status: 'Inactive',
    joinDate: '2024-02-01',
    expiryDate: '2024-08-01'
  }
];

describe('Members Page', () => {
  beforeEach(() => {
    dataManager.getMembers.mockReturnValue(mockMembers);
    dataManager.setMembers.mockImplementation(() => {});
    dataManager.addMember.mockImplementation(() => {});
    dataManager.updateMember.mockImplementation(() => {});
    dataManager.deleteMember.mockImplementation(() => {});
    toast.success.mockImplementation(() => {});
    toast.error.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders members page with header', () => {
    render(<Members />);
    expect(screen.getByTestId('header')).toHaveTextContent('Members');
  });

  it('displays all members from localStorage', () => {
    render(<Members />);
    expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
  });

  it('filters members by search term', async () => {
    const user = userEvent.setup();
    render(<Members />);
    
    const searchInput = screen.getByPlaceholderText(/search members/i);
    await user.type(searchInput, 'Rahul');
    
    await waitFor(() => {
      expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
      expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
    });
  });

  it('filters members by status', async () => {
    const user = userEvent.setup();
    render(<Members />);
    
    const activeButton = screen.getByRole('button', { name: /active/i });
    await user.click(activeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Rahul Sharma')).toBeInTheDocument();
      expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
    });
  });

  it('opens add member modal when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<Members />);
    
    const addButton = screen.getByRole('button', { name: /add member/i });
    await user.click(addButton);
    
    await waitFor(() => {
      expect(screen.getByText(/add new member/i)).toBeInTheDocument();
    });
  });

  it('validates required fields when adding member', async () => {
    const user = userEvent.setup();
    render(<Members />);
    
    // Open add modal
    const addButton = screen.getByRole('button', { name: /add member/i });
    await user.click(addButton);
    
    // Try to submit without filling fields
    const submitButton = screen.getByRole('button', { name: /add member$/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
