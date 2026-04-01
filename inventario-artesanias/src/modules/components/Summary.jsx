import './Summary.css'

function Summary({ inventory }) {
  const totalItems = inventory.length
  const lowStock = inventory.filter(item => item.cantidad > 0 && item.cantidad <= 5)
  const outOfStock = inventory.filter(item => item.cantidad === 0)

  const categories = [...new Set(inventory.map(item => item.categoria))]
  const categorySummary = categories.map(cat => {
    const itemsInCat = inventory.filter(item => item.categoria === cat)
    const lowInCat = itemsInCat.filter(i => i.cantidad > 0 && i.cantidad <= 5)
    const outInCat = itemsInCat.filter(i => i.cantidad === 0)
    return {
      categoria: cat,
      total: itemsInCat.length,
      low: lowInCat.length,
      agotados: outInCat.length
    }
  })

  return (
    <div className="summary">
      <div className="summary-card normal">
        <div className="summary-info">
          <h3>Total Productos</h3>
          <p>{totalItems}</p>
        </div>
      </div>

      <div className="summary-card low">
        <div className="summary-info">
          <h3>Stock Bajo</h3>
          <p>{lowStock.length}</p>
        </div>
      </div>

      <div className="summary-card out">
        <div className="summary-info">
          <h3>Agotados</h3>
          <p>{outOfStock.length}</p>
        </div>
      </div>

      {categorySummary.map(cat => (
        <div key={cat.categoria} className="summary-card category-card">
          <div className="summary-info">
            <h3>{cat.categoria}</h3>
            <p>Total: {cat.total} | Bajo: {cat.low} | Agotados: {cat.agotados}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Summary