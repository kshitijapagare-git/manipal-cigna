import { Navigate, type RouteObject } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { PolicyListPage } from './features/policies/PolicyListPage'
import { PolicyDetailPage } from './features/policies/PolicyDetailPage'
import { PolicyFormPage } from './features/policies/PolicyFormPage'
import { ClaimListPage } from './features/claims/ClaimListPage'
import { ClaimDetailPage } from './features/claims/ClaimDetailPage'
import { ClaimFormPage } from './features/claims/ClaimFormPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/policies" replace /> },
      { path: 'policies', element: <PolicyListPage /> },
      { path: 'policies/new', element: <PolicyFormPage /> },
      { path: 'policies/:id', element: <PolicyDetailPage /> },
      { path: 'policies/:id/edit', element: <PolicyFormPage /> },
      { path: 'claims', element: <ClaimListPage /> },
      { path: 'claims/new', element: <ClaimFormPage /> },
      { path: 'claims/:id', element: <ClaimDetailPage /> },
      { path: 'claims/:id/edit', element: <ClaimFormPage /> },
      { path: '*', element: <Navigate to="/policies" replace /> },
    ],
  },
]
