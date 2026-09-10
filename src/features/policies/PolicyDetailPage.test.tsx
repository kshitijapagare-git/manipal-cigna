import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PolicyDetailPage } from './PolicyDetailPage'

describe('PolicyDetailPage', () => {
  it('shows the details of a seeded policy', async () => {
    render(
      <MemoryRouter initialEntries={['/policies/1']}>
        <Routes>
          <Route path="/policies/:id" element={<PolicyDetailPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'POL-1001' })).toBeInTheDocument()
    })

    expect(screen.getByText('Asha Rao')).toBeInTheDocument()
  })

  it('shows an empty state for an unknown policy id', async () => {
    render(
      <MemoryRouter initialEntries={['/policies/999999']}>
        <Routes>
          <Route path="/policies/:id" element={<PolicyDetailPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/policy not found/i)).toBeInTheDocument()
    })
  })
})
