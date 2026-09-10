import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PolicyListPage } from './PolicyListPage'

describe('PolicyListPage', () => {
  it('renders the seeded policies after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/policies']}>
        <PolicyListPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('POL-1001')).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: /new policy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Policies' })).toBeInTheDocument()
  })
})
