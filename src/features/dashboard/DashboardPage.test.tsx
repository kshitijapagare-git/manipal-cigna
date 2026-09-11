import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DashboardPage } from './DashboardPage'

describe('DashboardPage', () => {
  it('renders the most recent claims after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('CLM-2001')).toBeInTheDocument()
    })

    expect(screen.getByRole('columnheader', { name: 'Claim #' })).toBeInTheDocument()
  })
})
