import { useState } from 'react'
import './AddItemForm.css'

function AddItemForm({ addItem }) {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    cantidad: '',
    precio: ''
  })

  const categorias = [
    'Souvenirs artesanales',
    'Textiles tradicionales',
    'Cerámica',
    'Joyería artesanal',
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.categoria || !formData.cantidad || !formData.precio) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    addItem({
      ...formData,
      cantidad: parseInt(formData.cantidad),
      precio: parseFloat(formData.precio),
      unidad: 'unidades'
    })

    setFormData({
      nombre: '',
      categoria: '',
      cantidad: '',
      precio: ''
    })
  }

  return (
    <div className="add-item-form">
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del producto *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Poncho"
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría *</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Cantidad *</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Precio *</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
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

export default AddItemForm