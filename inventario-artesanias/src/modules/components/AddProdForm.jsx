import { useState } from 'react'
import './AddProdForm.css'

function AddProdForm({ addProd }) {
  const [prodData, setProdData] = useState({
    nombre: '',
    categoria: '',
    cantidad: '',
    unidad: 'unidades',
    precio: ''
  })

  const categorias = ['Artesanias y recuerdos', 'Gastronomia', 'Bebidas', 'Textiles tradicionales', 'Experiencias turisticas']

  const handleChange = (e) => {
    setProdData({
      ...prodData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!prodData.nombre || !prodData.categoria || !prodData.cantidad) {
      alert('Por favor completa los campos requeridos')
      return
    }

    addProd({
      ...prodData,
      cantidad: parseInt(prodData.cantidad),
      precio: parseFloat(prodData.precio) || 0
    })

    setProdData({
      nombre: '',
      categoria: '',
      cantidad: '',
      unidad: 'unidades',
      precio: ''
    })
  }

  return (
    <div className="add-prod-form">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Nombre del producto *</label>
          <input
            type="text"
            name="nombre"
            value={prodData.nombre}
            onChange={handleChange}
            placeholder="Ej: Poncho"
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría *</label>
          <select
            name="categoria"
            value={prodData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cantidad *</label>
            <input
              type="number"
              name="cantidad"
              value={prodData.cantidad}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Unidad</label>
            <select
              name="unidad"
              value={prodData.unidad}
              onChange={handleChange}
            >
              <option value="unidades">Unidades</option>
              <option value="tazas">tazas</option>
              <option value="cupos">cupos</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Precio *</label>
          <input
            type="number"
            name="precio"
            value={prodData.precio}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Agregar Producto
        </button>

      </form>
    </div>
  )
}

export default AddProdForm