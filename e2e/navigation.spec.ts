import { test, expect } from '@playwright/test'

test('serves the dashboard at the root route', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})

test('can navigate to the policies section via the sidebar', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Policies' }).click()
  await expect(page).toHaveURL(/\/policies$/)
  await expect(page.getByRole('heading', { name: 'Policies' })).toBeVisible()
})

test('can navigate to the claims section via the sidebar', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Claims' }).click()
  await expect(page).toHaveURL(/\/claims$/)
  await expect(page.getByRole('heading', { name: 'Claims' })).toBeVisible()
})
