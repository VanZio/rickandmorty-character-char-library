import { render, screen } from '@testing-library/react'
import EmptyState from '../EmptyState'

describe('EmptyState', () => {
  it('renders with default props', () => {
    render(
      <EmptyState
        title="No results"
        message="Try again later"
      />
    )

    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByText('Try again later')).toBeInTheDocument()
    expect(screen.getByText('🔍')).toBeInTheDocument()
  })

  it('renders with custom icon', () => {
    render(
      <EmptyState
        icon="📺"
        title="No episodes"
        message="No episodes found"
      />
    )

    expect(screen.getByText('📺')).toBeInTheDocument()
    expect(screen.getByText('No episodes')).toBeInTheDocument()
  })

  it('renders action button when provided', () => {
    const onAction = jest.fn()
    render(
      <EmptyState
        title="No results"
        message="Try again"
        actionLabel="Clear Filters"
        onAction={onAction}
      />
    )

    const button = screen.getByText('Clear Filters')
    expect(button).toBeInTheDocument()
  })

  it('does not render action button when not provided', () => {
    render(
      <EmptyState
        title="No results"
        message="Try again"
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})

