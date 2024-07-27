
import { Home } from './Components/Home'
import { ShoppingCartProvider } from './context/ShoppingCartContext'

function App() {
  return (
    <ShoppingCartProvider>
      <Home/>
    </ShoppingCartProvider>
  )
}

export default App
