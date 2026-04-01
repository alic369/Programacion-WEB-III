import { use, useState } from 'react'
import './App.css'
//import InventoryPage from './modules/pages/InventoryPage'
import ProductForm from './modules/components/ProductForm'
import ProductList from './modules/components/ProductList'


function App() {
  const [refresh, setRefresh] = useState(false)

  function handleRefresh() {
    setRefresh(!refresh)
  }

  return (
    <div>
      <h1>Sistema base</h1>

      <ProductForm onAdd={handleRefresh} />
      <ProductList key={refresh} />
      
    </div>

  )
}

export default App
