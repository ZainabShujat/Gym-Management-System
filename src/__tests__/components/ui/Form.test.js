import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input, Select, Form } from '@/components/ui/Form';

describe('Form Components', () => {
  describe('Input Component', () => {
    it('renders input with label', () => {
      render(<Input label="Email" name="email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('displays error message', () => {
      render(<Input label="Email" name="email" error="Invalid email" />);
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('shows required indicator', () => {
      render(<Input label="Email" name="email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('handles onChange event', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Input label="Name" name="name" onChange={handleChange} />);
      const input = screen.getByLabelText('Name');
      
      await user.type(input, 'John');
      expect(handleChange).toHaveBeenCalled();
    });

    it('applies error styling when error is present', () => {
      render(<Input label="Email" name="email" error="Error" />);
      const input = screen.getByLabelText('Email');
      expect(input).toHaveClass('border-red-500');
    });
  });

  describe('Select Component', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];

    it('renders select with label', () => {
      render(<Select label="Choose" name="choice" options={options} />);
      expect(screen.getByLabelText('Choose')).toBeInTheDocument();
    });

    it('renders all options', () => {
      render(<Select label="Choose" name="choice" options={options} />);
      expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    });

    it('handles onChange event', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Select 
          label="Choose" 
          name="choice" 
          options={options} 
          onChange={handleChange} 
        />
      );
      
      const select = screen.getByLabelText('Choose');
      await user.selectOptions(select, 'option2');
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Form Component', () => {
    it('renders form with children', () => {
      render(
        <Form onSubmit={() => {}}>
          <Input label="Name" name="name" />
        </Form>
      );
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('handles form submission', async () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      const user = userEvent.setup();
      
      render(
        <Form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </Form>
      );
      
      await user.click(screen.getByRole('button', { name: /submit/i }));
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
