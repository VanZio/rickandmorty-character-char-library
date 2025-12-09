import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorState from '../ErrorState'

describe('ErrorState', () => {
  it('renders error message', () => {
    render(
      <ErrorState
        error="Something went wrong"
      />
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
  })

  it('renders error code when provided (non-404)', () => {
    render(
      <ErrorState
        error="Server error"
        errorCode={500}
      />
    )

    expect(screen.getByText('Error Code: 500')).toBeInTheDocument()
  })

  it('does not render error code for 404', () => {
    render(
      <ErrorState
        error="Not found"
        errorCode={404}
      />
    )

    // Error code should not be shown for 404
    expect(screen.queryByText('Error Code: 404')).not.toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const onRetry = jest.fn()
    const user = userEvent.setup()

    render(
      <ErrorState
        error="Something went wrong"
        onRetry={onRetry}
      />
    )

    const retryButton = screen.getByText('Retry')
    await user.click(retryButton)

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('calls onClearFilters when clear filters button is clicked', async () => {
    const onClearFilters = jest.fn()
    const user = userEvent.setup()

    render(
      <ErrorState
        error="Something went wrong"
        onClearFilters={onClearFilters}
        showClearFilters={true}
      />
    )

    const clearButton = screen.getByText('Clear Filters')
    await user.click(clearButton)

    expect(onClearFilters).toHaveBeenCalledTimes(1)
  })

  it('does not render clear filters button when showClearFilters is false', () => {
    render(
      <ErrorState
        error="Something went wrong"
        onClearFilters={jest.fn()}
        showClearFilters={false}
      />
    )

    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument()
  })
})

