import { useState, useEffect } from 'react'
import Header from './modules/components/Header'
import InventoryList from './modules/components/InventoryList'
import AddItemForm from './modules/components/AddItemForm'
import Summary from './modules/components/Summary'
import { initialInventory } from './modules/data/initialData'
import './App.css'

function App() {
  const [inventory, setInventory] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [stockFilter, setStockFilter] = useState('todos')

  useEffect(() => {
    setInventory(initialInventory)
  }, [])

  const addItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now(),
      fechaIngreso: new Date().toISOString().split('T')[0]
    }
    setInventory([...inventory, item])
  }

  const deleteItem = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este item?')) {
      setInventory(inventory.filter(item => item.id !== id))
    }
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity >= 0) {
      setInventory(inventory.map(item => 
        item.id === id ? { ...item, cantidad: newQuantity } : item
      ))
    }
  }

  let filteredInventory = inventory.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  )

  filteredInventory = filteredInventory.filter(item => {
    if (stockFilter === 'en-stock') return item.cantidad > 5
    if (stockFilter === 'bajo') return item.cantidad > 0 && item.cantidad <= 5
    if (stockFilter === 'agotado') return item.cantidad === 0
    return true
  })

  return (
    <div className="app">
      <Header 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        stockFilter={stockFilter} 
        setStockFilter={setStockFilter} 
      />

      <div className="top-section">
        <div className="inventory-container">
          <InventoryList 
            inventory={filteredInventory}
            deleteItem={deleteItem}
            updateQuantity={updateQuantity}
          />
        </div>

        <div className="summary-container">
          <Summary inventory={inventory} />
        </div>
      </div>

      <div className="bottom-section">
        <AddItemForm addItem={addItem} />
      </div>
    </div>
  )
}

export default App