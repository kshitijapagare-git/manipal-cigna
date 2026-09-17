import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('renders neutral tone and "Unknown" label for null status with no overrides', () => {
    const { rerender } = render(<StatusBadge status={null} />)
    expect(screen.getByText('Unknown')).toBeInTheDocument()

    rerender(<StatusBadge status={undefined} />)
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('renders caller-supplied tone and label when provided, ignoring hash-based defaults', () => {
    render(
      <StatusBadge
        status={'SOME_STATUS'}
        tone="danger"
        label="Override label"
      />,
    )

    expect(screen.getByText('Override label')).toBeInTheDocument()
  })
})
