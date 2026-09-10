import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ClaimListPage } from './ClaimListPage'

describe('ClaimListPage', () => {
  it('renders the seeded claims after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/claims']}>
        <ClaimListPage />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('CLM-2001')).toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { name: 'Claims' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/search by description/i)).toBeInTheDocument()
  })

  it('filters the list by typing in the description search box', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/claims']}>
        <ClaimListPage />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('CLM-2001')).toBeInTheDocument()
    })

    const searchBox = screen.getByPlaceholderText(/search by description/i)
    await user.type(searchBox, 'bumper')

    await waitFor(() => {
      expect(screen.getByText('CLM-2003')).toBeInTheDocument()
      expect(screen.queryByText('CLM-2001')).not.toBeInTheDocument()
    })
  })
})
