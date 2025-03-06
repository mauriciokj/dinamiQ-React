import { Outlet } from 'react-router-dom'
import NavigationMenu from './NavigationMenu'
import { UndoNotification } from './UndoNotification'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <div className="pt-16"> {/* Espaço para o menu fixo */}
          <NavigationMenu />
        </div>
      </div>


      <UndoNotification />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}