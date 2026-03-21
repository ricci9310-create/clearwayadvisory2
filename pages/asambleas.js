import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { formatDate, calcularQuorum } from '../utils/format';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

const emptyForm = {
  titulo: '', tipo: 'Ordinaria', fecha: '', hora: '', lugar: 'Salón Comunal - Conjunto Residencial Los Samanes',
  descripcion: '', quorumRequerido: 51, agenda: '',
};

export default function Asambleas() {
  const { asambleas, addAsamblea, updateAsamblea, registrarAsistencia, removerAsistencia, residentes } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [searchCedula, setSearchCedula] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addAsamblea({
      ...form,
      quorumRequerido: parseInt(form.quorumRequerido),
      agenda: form.agenda.split('\n').filter(Boolean),
      estado: 'Programada',
    });
    setShowModal(false);
    setForm(emptyForm);
  };

  const handleRegistro = (asambleaId) => {
    const residente = residentes.find(r => r.cedula === searchCedula);
    if (residente) {
      registrarAsistencia(asambleaId, residente.id);
      setSearchCedula('');
    } else {
      alert('Copropietario no encontrado con esa cédula');
    }
  };

  const handleIniciarAsamblea = (id) => {
    updateAsamblea(id, { estado: 'En Curso' });
  };

  const handleFinalizarAsamblea = (id) => {
    if (window.confirm('¿Desea finalizar esta asamblea?')) {
      updateAsamblea(id, { estado: 'Finalizada' });
    }
  };

  const asamblea = showDetail ? asambleas.find(a => a.id === showDetail) : null;
  const quorumActual = asamblea ? calcularQuorum(asamblea.asistentes, residentes) : 0;
  const quorumAlcanzado = asamblea ? parseFloat(quorumActual) >= asamblea.quorumRequerido : false;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asambleas</h1>
          <p className="text-gray-500 text-sm mt-1">Gestión de asambleas de copropietarios</p>
        </div>
        <button
          onClick={() => { setForm(emptyForm); setShowModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Nueva Asamblea
        </button>
      </div>

      {/* Lista de asambleas */}
      <div className="grid gap-4">
        {asambleas.map((a) => {
          const quorum = calcularQuorum(a.asistentes, residentes);
          return (
            <div key={a.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setShowDetail(a.id)}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{a.titulo}</h3>
                    <Badge estado={a.estado} />
                  </div>
                  <p className="text-sm text-gray-500">{a.descripcion}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(a.fecha)} - {a.hora}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {a.asistentes.length} asistentes
                    </span>
                    <span className={`flex items-center font-medium ${parseFloat(quorum) >= a.quorumRequerido ? 'text-green-600' : 'text-orange-500'}`}>
                      Quórum: {quorum}% / {a.quorumRequerido}%
                    </span>
                  </div>
                </div>
                <span className="text-sm px-3 py-1 bg-gray-100 rounded-full text-gray-600">{a.tipo}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Nueva Asamblea */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nueva Asamblea" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input type="text" required value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
              <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
                <option value="Ordinaria">Ordinaria</option>
                <option value="Extraordinaria">Extraordinaria</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input type="date" required value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <input type="time" required value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar</label>
            <input type="text" required value={form.lugar} onChange={e => setForm({ ...form, lugar: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea rows={2} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quórum Requerido (%)</label>
            <input type="number" min="1" max="100" value={form.quorumRequerido} onChange={e => setForm({ ...form, quorumRequerido: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Agenda (un punto por línea)</label>
            <textarea rows={4} value={form.agenda} onChange={e => setForm({ ...form, agenda: e.target.value })}
              placeholder="Verificación de quórum&#10;Lectura del acta anterior&#10;Informe de gestión..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Crear Asamblea</button>
          </div>
        </form>
      </Modal>

      {/* Modal Detalle Asamblea */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title={asamblea?.titulo || ''} size="xl">
        {asamblea && (
          <div className="space-y-6">
            {/* Info y Quórum */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Tipo</p>
                <p className="font-medium">{asamblea.tipo}</p>
                <p className="text-sm text-gray-500 mt-2">Fecha y Hora</p>
                <p className="font-medium">{formatDate(asamblea.fecha)} - {asamblea.hora}</p>
                <p className="text-sm text-gray-500 mt-2">Lugar</p>
                <p className="font-medium">{asamblea.lugar}</p>
                <p className="text-sm text-gray-500 mt-2">Estado</p>
                <Badge estado={asamblea.estado} />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-2">Quórum</p>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <span className={`text-2xl font-bold ${quorumAlcanzado ? 'text-green-600' : 'text-orange-500'}`}>
                      {quorumActual}%
                    </span>
                    <span className="text-sm text-gray-500">Requerido: {asamblea.quorumRequerido}%</span>
                  </div>
                  <div className="overflow-hidden h-3 text-xs flex rounded-full bg-gray-200">
                    <div
                      style={{ width: `${Math.min(parseFloat(quorumActual), 100)}%` }}
                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-full transition-all ${quorumAlcanzado ? 'bg-green-500' : 'bg-orange-400'}`}
                    />
                  </div>
                  <p className="text-sm mt-2 text-gray-600">
                    {asamblea.asistentes.length} de {residentes.length} copropietarios presentes
                  </p>
                  {quorumAlcanzado && (
                    <p className="text-sm mt-1 text-green-600 font-medium">Quórum alcanzado</p>
                  )}
                </div>
              </div>
            </div>

            {/* Registro de asistencia */}
            {(asamblea.estado === 'Programada' || asamblea.estado === 'En Curso') && (
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-3">Registrar Asistencia</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ingrese cédula del copropietario"
                    value={searchCedula}
                    onChange={(e) => setSearchCedula(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleRegistro(asamblea.id)}
                  />
                  <button
                    onClick={() => handleRegistro(asamblea.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Registrar
                  </button>
                </div>
              </div>
            )}

            {/* Agenda */}
            {asamblea.agenda.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Agenda</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  {asamblea.agenda.map((item, i) => (
                    <li key={i} className="py-1">{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Lista de asistentes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Asistentes ({asamblea.asistentes.length})</h4>
              {asamblea.asistentes.length === 0 ? (
                <p className="text-sm text-gray-500">No hay asistentes registrados aún</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-gray-500">#</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500">Nombre</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500">Inmueble</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500">Coeficiente</th>
                        {asamblea.estado !== 'Finalizada' && (
                          <th className="px-3 py-2 text-left font-medium text-gray-500">Acción</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {asamblea.asistentes.map((resId, idx) => {
                        const res = residentes.find(r => r.id === resId);
                        if (!res) return null;
                        return (
                          <tr key={resId}>
                            <td className="px-3 py-2 text-gray-600">{idx + 1}</td>
                            <td className="px-3 py-2 font-medium text-gray-900">{res.nombre}</td>
                            <td className="px-3 py-2 text-gray-600">Torre {res.torre} - Apto {res.apto}</td>
                            <td className="px-3 py-2 text-gray-600">{res.coeficiente}%</td>
                            {asamblea.estado !== 'Finalizada' && (
                              <td className="px-3 py-2">
                                <button onClick={() => removerAsistencia(asamblea.id, resId)}
                                  className="text-red-600 hover:text-red-800 text-xs">Remover</button>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Acciones */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              {asamblea.estado === 'Programada' && (
                <button onClick={() => handleIniciarAsamblea(asamblea.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 font-medium">
                  Iniciar Asamblea
                </button>
              )}
              {asamblea.estado === 'En Curso' && (
                <button onClick={() => handleFinalizarAsamblea(asamblea.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 font-medium">
                  Finalizar Asamblea
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
