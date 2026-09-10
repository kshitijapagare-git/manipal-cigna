import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ClaimDetailPage } from './ClaimDetailPage'

describe('ClaimDetailPage', () => {
  it('shows claim details including a link to its parent policy', async () => {
    render(
      <MemoryRouter initialEntries={['/claims/1']}>
        <Routes>
          <Route path="/claims/:id" element={<ClaimDetailPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'CLM-2001' })).toBeInTheDocument()
    })

    const policyLink = screen.getByRole('link', { name: '#1' })
    expect(policyLink).toHaveAttribute('href', '/policies/1')
  })

  it('shows an empty state for an unknown claim id', async () => {
    render(
      <MemoryRouter initialEntries={['/claims/999999']}>
        <Routes>
          <Route path="/claims/:id" element={<ClaimDetailPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/claim not found/i)).toBeInTheDocument()
    })
  })
})
