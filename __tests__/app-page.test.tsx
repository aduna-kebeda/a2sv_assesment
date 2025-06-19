import { render, screen } from '@testing-library/react';
import HomePage from '../app/page';

describe('HomePage', () => {
  it('renders the hero headline', () => {
    render(<HomePage />);
    expect(screen.getByText(/are you starving/i)).toBeInTheDocument();
  });

  it('renders the Add Food button', () => {
    render(<HomePage />);
    expect(screen.getByRole('button', { name: /add food/i })).toBeInTheDocument();
  });
}); 