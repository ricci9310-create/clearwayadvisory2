import Link from 'next/link';
import { useAppContext } from '../context/AppContext';
import { formatCurrency } from '../utils/format';
import Badge from '../components/Badge';

export default function Dashboard() {
  const { residentes, asambleas, votaciones, facturas } = useAppContext();

  const totalResidentes = residentes.length;
  const asambleasProgramadas = asambleas.filter(a => a.estado === 'Programada').length;
  const votacionesAbiertas = votaciones.filter(v => v.estado === 'Abierta').length;
  const facturasPendientes = facturas.filter(f => f.estado === 'Pendiente' || f.estado === 'Vencida');
  const totalCartera = facturasPendientes.reduce((sum, f) => sum + f.monto, 0);
  const facturasVencidas = facturas.filter(f => f.estado === 'Vencida');
  const totalVencido = facturasVencidas.reduce((sum, f) => sum + f.monto, 0);
  const totalRecaudado = facturas.filter(f => f.estado === 'Pagada').reduce((sum, f) => sum + f.monto, 0);

  const stats = [
    { label: 'Copropietarios', value: totalResidentes, color: 'bg-blue-500', href: '/residentes' },
    { label: 'Asambleas Programadas', value: asambleasProgramadas, color: 'bg-purple-500', href: '/asambleas' },
    { label: 'Cartera Pendiente', value: formatCurrency(totalCartera), color: 'bg-yellow-500', href: '/cartera' },
    { label: 'Total Recaudado', value: formatCurrency(totalRecaudado), color: 'bg-green-500', href: '/facturacion' },
  ];

  const proximaAsamblea = asambleas.find(a => a.estado === 'Programada');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-gray-500 text-sm mt-1">Conjunto Residencial Los Samanes - Jamundí, Valle del Cauca</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center bg-opacity-10`}>
                <div className={`w-3 h-3 ${stat.color} rounded-full`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próxima asamblea */}
        {proximaAsamblea && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Próxima Asamblea</h2>
              <Badge estado={proximaAsamblea.estado} />
            </div>
            <h3 className="font-medium text-gray-800">{proximaAsamblea.titulo}</h3>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {proximaAsamblea.fecha} - {proximaAsamblea.hora}
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {proximaAsamblea.lugar}
              </p>
            </div>
            <Link href="/asambleas" className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 font-medium">
              Ver detalles →
            </Link>
          </div>
        )}

        {/* Cartera Vencida */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Cartera Vencida</h2>
            <span className="text-red-600 font-bold text-lg">{formatCurrency(totalVencido)}</span>
          </div>
          {facturasVencidas.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay facturas vencidas</p>
          ) : (
            <div className="space-y-3">
              {facturasVencidas.map(f => {
                const residente = residentes.find(r => r.id === f.residenteId);
                return (
                  <div key={f.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{residente?.nombre}</p>
                      <p className="text-xs text-gray-500">Apto {residente?.torre}-{residente?.apto}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-red-600">{formatCurrency(f.monto)}</p>
                      <Badge estado={f.estado} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <Link href="/cartera" className="mt-4 inline-block text-sm text-blue-600 hover:text-blue-800 font-medium">
            Ver cartera completa →
          </Link>
        </div>
      </div>

      {/* Últimas facturas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Últimas Facturas</h2>
          <Link href="/facturacion" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Ver todas →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-2 font-medium">Copropietario</th>
                <th className="pb-2 font-medium">Concepto</th>
                <th className="pb-2 font-medium">Monto</th>
                <th className="pb-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {facturas.slice(0, 5).map(f => {
                const residente = residentes.find(r => r.id === f.residenteId);
                return (
                  <tr key={f.id} className="border-b border-gray-50">
                    <td className="py-2.5 font-medium text-gray-800">{residente?.nombre}</td>
                    <td className="py-2.5 text-gray-600">{f.concepto}</td>
                    <td className="py-2.5 font-medium">{formatCurrency(f.monto)}</td>
                    <td className="py-2.5"><Badge estado={f.estado} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
