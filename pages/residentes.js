import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useAppContext } from '../context/AppContext';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

const emptyForm = { nombre: '', cedula: '', torre: '', apto: '', coeficiente: '', telefono: '', email: '', estado: 'Activo' };

export default function Residentes() {
  const { residentes, addResidente, updateResidente, deleteResidente, importResidentes } = useAppContext();
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');

  const filtered = residentes.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.cedula.includes(search) ||
    r.apto.includes(search) ||
    r.torre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, coeficiente: parseFloat(form.coeficiente) };
    if (editingId) {
      updateResidente(editingId, data);
    } else {
      addResidente(data);
    }
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleEdit = (residente) => {
    setForm({ ...residente, coeficiente: String(residente.coeficiente) });
    setEditingId(residente.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este copropietario?')) {
      deleteResidente(id);
    }
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const workbook = XLSX.read(evt.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const nuevos = rows.map(row => ({
        nombre: String(row.nombre || row.Nombre || row.NOMBRE || '').trim(),
        cedula: String(row.cedula || row.Cedula || row.CEDULA || row['Cédula'] || '').trim(),
        torre: String(row.torre || row.Torre || row.TORRE || '').trim(),
        apto: String(row.apto || row.Apto || row.APTO || row.apartamento || row.Apartamento || row.APARTAMENTO || '').trim(),
        coeficiente: parseFloat(row.coeficiente || row.Coeficiente || row.COEFICIENTE || 0),
        telefono: String(row.telefono || row.Telefono || row.TELEFONO || row['Teléfono'] || '').trim(),
        email: String(row.email || row.Email || row.EMAIL || row.correo || row.Correo || '').trim(),
        estado: 'Activo',
      })).filter(r => r.nombre);

      if (nuevos.length > 0) {
        importResidentes(nuevos);
        alert(`Se importaron ${nuevos.length} copropietarios exitosamente.`);
      } else {
        alert('No se encontraron registros válidos en el archivo. Asegúrese de que el Excel tenga columnas: nombre, cedula, torre, apto, coeficiente, telefono, email.');
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Copropietarios</h1>
          <p className="text-gray-500 text-sm mt-1">{residentes.length} registrados</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
          >
            Importar Excel
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleImportExcel}
            className="hidden"
          />
          <button
            onClick={() => { setForm(emptyForm); setEditingId(null); setShowModal(true); }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            + Nuevo Copropietario
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <input
          type="text"
          placeholder="Buscar por nombre, cédula, torre o apartamento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Nombre</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Cédula</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Inmueble</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Coeficiente</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Teléfono</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{r.nombre}</p>
                      <p className="text-xs text-gray-500">{r.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.cedula}</td>
                  <td className="px-4 py-3 text-gray-600">Torre {r.torre} - Apto {r.apto}</td>
                  <td className="px-4 py-3 text-gray-600">{r.coeficiente}%</td>
                  <td className="px-4 py-3 text-gray-600">{r.telefono}</td>
                  <td className="px-4 py-3"><Badge estado={r.estado} /></td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button onClick={() => handleEdit(r)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Editar</button>
                      <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? 'Editar Copropietario' : 'Nuevo Copropietario'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input type="text" required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
              <input type="text" required value={form.cedula} onChange={e => setForm({ ...form, cedula: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Torre</label>
              <input type="text" required value={form.torre} onChange={e => setForm({ ...form, torre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apartamento</label>
              <input type="text" required value={form.apto} onChange={e => setForm({ ...form, apto: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coeficiente (%)</label>
              <input type="number" step="0.01" required value={form.coeficiente} onChange={e => setForm({ ...form, coeficiente: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input type="text" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="Activo">Activo</option>
                <option value="Paz y Salvo">Paz y Salvo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
