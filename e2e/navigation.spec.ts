import { test, expect } from '@playwright/test'

test('redirects the root route to the policies list', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/policies$/)
  await expect(page.getByRole('heading', { name: 'Policies' })).toBeVisible()
})

test('can navigate to the claims section via the sidebar', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Claims' }).click()
  await expect(page).toHaveURL(/\/claims$/)
  await expect(page.getByRole('heading', { name: 'Claims' })).toBeVisible()
})
