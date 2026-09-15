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

  it('filters the list by selecting a status from the dropdown', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/claims']}>
        <ClaimListPage />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('CLM-2001')).toBeInTheDocument()
    })

    const statusFilter = screen.getByLabelText(/filter by status/i)
    await user.selectOptions(statusFilter, 'APPROVED')

    await waitFor(() => {
      expect(screen.getByText('CLM-2003')).toBeInTheDocument()
      expect(screen.queryByText('CLM-2001')).not.toBeInTheDocument()
      expect(screen.queryByText('CLM-2002')).not.toBeInTheDocument()
    })

    await user.selectOptions(statusFilter, '')

    await waitFor(() => {
      expect(screen.getByText('CLM-2001')).toBeInTheDocument()
      expect(screen.getByText('CLM-2003')).toBeInTheDocument()
    })
  })

  it('combines the search box and the status dropdown', async () => {
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
    const statusFilter = screen.getByLabelText(/filter by status/i)

    await user.type(searchBox, 'damage')
    await user.selectOptions(statusFilter, 'REJECTED')

    await waitFor(() => {
      expect(screen.getByText('CLM-2004')).toBeInTheDocument()
      expect(screen.queryByText('CLM-2003')).not.toBeInTheDocument()
    })
  })
})
