import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDateShort } from '../utils/format';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function Facturacion() {
  const { facturas, addFactura, pagarFactura, residentes } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ residenteId: '', concepto: '', monto: '', fechaEmision: '', fechaVencimiento: '', estado: 'Pendiente' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addFactura({ ...form, residenteId: parseInt(form.residenteId), monto: parseInt(form.monto) });
    setShowModal(false);
    setForm({ residenteId: '', concepto: '', monto: '', fechaEmision: '', fechaVencimiento: '', estado: 'Pendiente' });
  };

  const handleGenerarMasivo = () => {
    const hoy = new Date().toISOString().split('T')[0];
    const vencimiento = new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0];
    const mes = new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });
    residentes.forEach(r => {
      const monto = Math.round(r.coeficiente * 140000);
      addFactura({
        residenteId: r.id,
        concepto: `Cuota Administración ${mes}`,
        monto,
        fechaEmision: hoy,
        fechaVencimiento: vencimiento,
        estado: 'Pendiente',
      });
    });
  };

  const filtered = facturas.filter(f => {
    const residente = residentes.find(r => r.id === f.residenteId);
    const matchEstado = filtroEstado === 'Todos' || f.estado === filtroEstado;
    const matchSearch = !search || residente?.nombre.toLowerCase().includes(search.toLowerCase()) ||
      f.concepto.toLowerCase().includes(search.toLowerCase());
    return matchEstado && matchSearch;
  });

  const totalPendiente = filtered.filter(f => f.estado === 'Pendiente').reduce((s, f) => s + f.monto, 0);
  const totalVencido = filtered.filter(f => f.estado === 'Vencida').reduce((s, f) => s + f.monto, 0);
  const totalPagado = filtered.filter(f => f.estado === 'Pagada').reduce((s, f) => s + f.monto, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facturación</h1>
          <p className="text-gray-500 text-sm mt-1">Gestión de cobros y pagos</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleGenerarMasivo}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
            Generar Cuotas Masivas
          </button>
          <button onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
            + Nueva Factura
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-700">Pendiente</p>
          <p className="text-xl font-bold text-yellow-800">{formatCurrency(totalPendiente)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">Vencido</p>
          <p className="text-xl font-bold text-red-800">{formatCurrency(totalVencido)}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700">Recaudado</p>
          <p className="text-xl font-bold text-green-800">{formatCurrency(totalPagado)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="Buscar por nombre o concepto..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          <div className="flex gap-2">
            {['Todos', 'Pendiente', 'Vencida', 'Pagada'].map(e => (
              <button key={e} onClick={() => setFiltroEstado(e)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filtroEstado === e ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Copropietario</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Concepto</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Monto</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Emisión</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Vencimiento</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(f => {
                const res = residentes.find(r => r.id === f.residenteId);
                return (
                  <tr key={f.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{res?.nombre}</p>
                      <p className="text-xs text-gray-500">Torre {res?.torre} - Apto {res?.apto}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{f.concepto}</td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(f.monto)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDateShort(f.fechaEmision)}</td>
                    <td className="px-4 py-3 text-gray-600">{formatDateShort(f.fechaVencimiento)}</td>
                    <td className="px-4 py-3"><Badge estado={f.estado} /></td>
                    <td className="px-4 py-3">
                      {f.estado !== 'Pagada' && (
                        <button onClick={() => pagarFactura(f.id)}
                          className="text-green-600 hover:text-green-800 text-xs font-medium">
                          Registrar Pago
                        </button>
                      )}
                      {f.estado === 'Pagada' && (
                        <span className="text-xs text-gray-400">Pagada {formatDateShort(f.fechaPago)}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nueva Factura */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nueva Factura">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Copropietario</label>
            <select required value={form.residenteId} onChange={e => setForm({ ...form, residenteId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione</option>
              {residentes.map(r => (
                <option key={r.id} value={r.id}>{r.nombre} - T{r.torre} Apto {r.apto}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
            <input type="text" required value={form.concepto} onChange={e => setForm({ ...form, concepto: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto (COP)</label>
            <input type="number" required value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Emisión</label>
              <input type="date" required value={form.fechaEmision} onChange={e => setForm({ ...form, fechaEmision: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
              <input type="date" required value={form.fechaVencimiento} onChange={e => setForm({ ...form, fechaVencimiento: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Crear Factura</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
