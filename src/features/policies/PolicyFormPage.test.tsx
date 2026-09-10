import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PolicyFormPage } from './PolicyFormPage'

describe('PolicyFormPage', () => {
  it('creates a new policy and navigates to its detail page', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/policies/new']}>
        <Routes>
          <Route path="/policies/new" element={<PolicyFormPage />} />
          <Route path="/policies/:id" element={<div>Policy detail page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.type(screen.getByLabelText(/policy number/i), 'POL-9999')
    await user.type(screen.getByLabelText(/holder name/i), 'New Holder')
    await user.type(screen.getByLabelText(/^type/i), 'Health')

    await user.click(screen.getByRole('button', { name: /save policy/i }))

    await waitFor(() => {
      expect(screen.getByText('Policy detail page')).toBeInTheDocument()
    })
  })

  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/policies/new']}>
        <Routes>
          <Route path="/policies/new" element={<PolicyFormPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: /save policy/i }))

    expect(await screen.findByText(/policy number is required/i)).toBeInTheDocument()
  })
})
