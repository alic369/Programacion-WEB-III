import './Header.css'

function Header({ searchTerm, setSearchTerm, stockFilter, setStockFilter }) {
  return (
    <header className="header">
      
      <div className='titulo'>
        <img src="src\shared\logo.png"></img>
        <h1>Inventario de Productos</h1>
      </div>

      <input
        type="text"
        placeholder="Buscar por nombre o categoría"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="stock-filters">
        <label>
          <input
            type="radio"
            name="stock"
            value="todos"
            checked={stockFilter === 'todos'}
            onChange={(e) => setStockFilter(e.target.value)}
          />
          Todos
        </label>

        <label>
          <input
            type="radio"
            name="stock"
            value="en-stock"
            checked={stockFilter === 'en-stock'}
            onChange={(e) => setStockFilter(e.target.value)}
          />
          En Stock
        </label>

        <label>
          <input
            type="radio"
            name="stock"
            value="bajo"
            checked={stockFilter === 'bajo'}
            onChange={(e) => setStockFilter(e.target.value)}
          />
          Stock Bajo
        </label>

        <label>
          <input
            type="radio"
            name="stock"
            value="agotado"
            checked={stockFilter === 'agotado'}
            onChange={(e) => setStockFilter(e.target.value)}
          />
          Agotado
        </label>
      </div>
    </header>
  )
}

export default Header