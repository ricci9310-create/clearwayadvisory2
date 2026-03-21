import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatCurrency, formatDateShort } from '../utils/format';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function Cartera() {
  const { residentes, facturas, pagarFactura } = useAppContext();
  const [selectedResident, setSelectedResident] = useState(null);
  const [search, setSearch] = useState('');

  // Calcular cartera por residente
  const carteraPorResidente = residentes.map(r => {
    const facturasRes = facturas.filter(f => f.residenteId === r.id);
    const pendiente = facturasRes.filter(f => f.estado === 'Pendiente').reduce((s, f) => s + f.monto, 0);
    const vencido = facturasRes.filter(f => f.estado === 'Vencida').reduce((s, f) => s + f.monto, 0);
    const pagado = facturasRes.filter(f => f.estado === 'Pagada').reduce((s, f) => s + f.monto, 0);
    const totalDeuda = pendiente + vencido;
    return { ...r, facturasRes, pendiente, vencido, pagado, totalDeuda, totalFacturas: facturasRes.length };
  }).sort((a, b) => b.totalDeuda - a.totalDeuda);

  const filtered = carteraPorResidente.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.apto.includes(search) || r.torre.toLowerCase().includes(search.toLowerCase())
  );

  const totalCartera = carteraPorResidente.reduce((s, r) => s + r.totalDeuda, 0);
  const totalVencido = carteraPorResidente.reduce((s, r) => s + r.vencido, 0);
  const residentesEnMora = carteraPorResidente.filter(r => r.vencido > 0).length;
  const residentesPazYSalvo = carteraPorResidente.filter(r => r.totalDeuda === 0).length;

  const selectedData = selectedResident ? carteraPorResidente.find(r => r.id === selectedResident) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cartera por Copropietario</h1>
        <p className="text-gray-500 text-sm mt-1">Vista consolidada de facturación y cartera por persona</p>
      </div>

      {/* Resumen general */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Cartera Total</p>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(totalCartera)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Total Vencido</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(totalVencido)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">En Mora</p>
          <p className="text-xl font-bold text-orange-600">{residentesEnMora} copropietarios</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-500">Paz y Salvo</p>
          <p className="text-xl font-bold text-green-600">{residentesPazYSalvo} copropietarios</p>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <input type="text" placeholder="Buscar por nombre, torre o apartamento..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Tabla de cartera */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Copropietario</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Inmueble</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Pendiente</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Vencido</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Total Pagado</th>
                <th className="px-4 py-3 text-right font-medium text-gray-500">Deuda Total</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 text-center font-medium text-gray-500">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{r.nombre}</p>
                    <p className="text-xs text-gray-500">{r.cedula}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">Torre {r.torre} - Apto {r.apto}</td>
                  <td className="px-4 py-3 text-right text-yellow-600 font-medium">{formatCurrency(r.pendiente)}</td>
                  <td className="px-4 py-3 text-right text-red-600 font-medium">{formatCurrency(r.vencido)}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">{formatCurrency(r.pagado)}</td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">{formatCurrency(r.totalDeuda)}</td>
                  <td className="px-4 py-3 text-center">
                    {r.totalDeuda === 0 ? (
                      <Badge estado="Paz y Salvo" />
                    ) : r.vencido > 0 ? (
                      <Badge estado="Vencida" />
                    ) : (
                      <Badge estado="Pendiente" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => setSelectedResident(r.id)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal detalle de cartera */}
      <Modal isOpen={!!selectedResident} onClose={() => setSelectedResident(null)}
        title={`Cartera - ${selectedData?.nombre || ''}`} size="xl">
        {selectedData && (
          <div className="space-y-6">
            {/* Info del copropietario */}
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Nombre</p>
                <p className="font-medium text-sm">{selectedData.nombre}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Inmueble</p>
                <p className="font-medium text-sm">Torre {selectedData.torre} - Apto {selectedData.apto}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Cédula</p>
                <p className="font-medium text-sm">{selectedData.cedula}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Coeficiente</p>
                <p className="font-medium text-sm">{selectedData.coeficiente}%</p>
              </div>
            </div>

            {/* Resumen financiero */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <p className="text-xs text-yellow-700">Pendiente</p>
                <p className="text-lg font-bold text-yellow-800">{formatCurrency(selectedData.pendiente)}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <p className="text-xs text-red-700">Vencido</p>
                <p className="text-lg font-bold text-red-800">{formatCurrency(selectedData.vencido)}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-xs text-green-700">Pagado</p>
                <p className="text-lg font-bold text-green-800">{formatCurrency(selectedData.pagado)}</p>
              </div>
            </div>

            {/* Historial de facturas */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Historial de Facturas ({selectedData.totalFacturas})</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium text-gray-500">Concepto</th>
                      <th className="px-3 py-2 text-right font-medium text-gray-500">Monto</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-500">Emisión</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-500">Vencimiento</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-500">Estado</th>
                      <th className="px-3 py-2 text-center font-medium text-gray-500">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedData.facturasRes.map(f => (
                      <tr key={f.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-800">{f.concepto}</td>
                        <td className="px-3 py-2 text-right font-medium">{formatCurrency(f.monto)}</td>
                        <td className="px-3 py-2 text-center text-gray-600">{formatDateShort(f.fechaEmision)}</td>
                        <td className="px-3 py-2 text-center text-gray-600">{formatDateShort(f.fechaVencimiento)}</td>
                        <td className="px-3 py-2 text-center"><Badge estado={f.estado} /></td>
                        <td className="px-3 py-2 text-center">
                          {f.estado !== 'Pagada' ? (
                            <button onClick={() => pagarFactura(f.id)}
                              className="text-green-600 hover:text-green-800 text-xs font-medium">
                              Pagar
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">{formatDateShort(f.fechaPago)}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
