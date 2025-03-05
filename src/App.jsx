import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import PollCreator from './components/PollCreator'
import PollViewer from './components/PollViewer'
import PollList from './components/PollList'
import NavigationMenu from './components/NavigationMenu'

const Layout = () => (
  <div>
    <NavigationMenu />
    <div className="pt-16"> {/* Espaço para o menu fixo */}
      <Outlet />
    </div>
  </div>
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <PollCreator /> },
      { path: '/polls/:token', element: <PollViewer /> },
      { path: '/polls-list', element: <PollList /> }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App