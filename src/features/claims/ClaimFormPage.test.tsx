import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ClaimFormPage } from './ClaimFormPage'

describe('ClaimFormPage', () => {
  it('creates a new claim linked to a policy and navigates to its detail page', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/claims/new']}>
        <Routes>
          <Route path="/claims/new" element={<ClaimFormPage />} />
          <Route path="/claims/:id" element={<div>Claim detail page</div>} />
        </Routes>
      </MemoryRouter>,
    )

    await user.type(await screen.findByLabelText(/claim number/i), 'CLM-9999')
    await user.selectOptions(screen.getByLabelText(/^policy/i), '1')
    await user.type(screen.getByLabelText(/description/i), 'Windshield replacement')
    await user.clear(screen.getByLabelText(/amount/i))
    await user.type(screen.getByLabelText(/amount/i), '250')

    await user.click(screen.getByRole('button', { name: /save claim/i }))

    await waitFor(() => {
      expect(screen.getByText('Claim detail page')).toBeInTheDocument()
    })
  })

  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/claims/new']}>
        <Routes>
          <Route path="/claims/new" element={<ClaimFormPage />} />
        </Routes>
      </MemoryRouter>,
    )

    await screen.findByLabelText(/claim number/i)
    await user.click(screen.getByRole('button', { name: /save claim/i }))

    expect(await screen.findByText(/claim number is required/i)).toBeInTheDocument()
  })
})
