import { render, screen } from '@testing-library/react';
import Card from '@/components/ui/Card';

describe('Card Component', () => {
  it('renders card with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('custom-card');
  });

  it('applies default styles', () => {
    render(<Card>Content</Card>);
    const card = screen.getByText('Content').parentElement;
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow-md', 'p-6');
  });

  it('renders with dark mode classes', () => {
    render(<Card className="dark:bg-gray-800">Dark Content</Card>);
    const card = screen.getByText('Dark Content').parentElement;
    expect(card).toHaveClass('dark:bg-gray-800');
  });
});
