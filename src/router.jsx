import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/Layout/Layout'
import LoadingSpinner from './components/UI/LoadingSpinner'

// Lazy loading para melhor performance
const PollCreator = lazy(() => import('./components/Poll/PollCreator'))
const PollViewer = lazy(() => import('./components/Poll/PollViewer'))
const PollList = lazy(() => import('./components/Poll/PollList'))
const ErrorPage = lazy(() => import('./components/UI/ErrorPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PollCreator />
          </Suspense>
        )
      },
      {
        path: '/polls/:token',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PollViewer />
          </Suspense>
        )
      },
      {
        path: '/polls-list',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PollList />
          </Suspense>
        )
      },
      {
        path: '/stats',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <div>Estatísticas Gerais (Componente a ser criado)</div>
          </Suspense>
        )
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorPage errorCode={404} />
      </Suspense>
    )
  }
])

export default router