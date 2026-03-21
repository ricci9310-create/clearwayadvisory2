import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Modal from '../components/Modal';
import Badge from '../components/Badge';

export default function Votaciones() {
  const { votaciones, addVotacion, emitirVoto, cerrarVotacion, asambleas, residentes } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(null);
  const [votoResidenteId, setVotoResidenteId] = useState('');
  const [form, setForm] = useState({ asambleaId: '', pregunta: '', tipo: 'Simple', opciones: ['', '', ''] });

  const handleSubmit = (e) => {
    e.preventDefault();
    addVotacion({
      asambleaId: parseInt(form.asambleaId),
      pregunta: form.pregunta,
      tipo: form.tipo,
      opciones: form.opciones.filter(Boolean).map((texto, i) => ({ id: i + 1, texto, votos: [] })),
    });
    setShowModal(false);
    setForm({ asambleaId: '', pregunta: '', tipo: 'Simple', opciones: ['', '', ''] });
  };

  const handleVotar = (votacionId, opcionId) => {
    const resId = parseInt(votoResidenteId);
    if (!resId) { alert('Seleccione un copropietario'); return; }
    emitirVoto(votacionId, opcionId, resId);
    setVotoResidenteId('');
  };

  const votacion = showDetail ? votaciones.find(v => v.id === showDetail) : null;

  const getTotalVotos = (v) => {
    if (!v?.resultados) return 0;
    return Object.values(v.resultados).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  };

  const getVotosOpcion = (v, opcionId) => {
    return v?.resultados?.[opcionId]?.length || 0;
  };

  const getPorcentaje = (v, opcionId) => {
    const total = getTotalVotos(v);
    if (total === 0) return 0;
    return ((getVotosOpcion(v, opcionId) / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Votaciones</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de votaciones para asambleas</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Nueva Votación
        </button>
      </div>

      {/* Lista de votaciones */}
      <div className="grid gap-4">
        {votaciones.map((v) => {
          const asamblea = asambleas.find(a => a.id === v.asambleaId);
          const totalVotos = getTotalVotos(v);
          return (
            <div key={v.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setShowDetail(v.id)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge estado={v.estado} />
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{v.tipo}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mt-2">{v.pregunta}</h3>
                  <p className="text-sm text-gray-500 mt-1">{asamblea?.titulo || 'Sin asamblea'}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{totalVotos}</p>
                  <p className="text-xs text-gray-500">votos</p>
                </div>
              </div>

              {/* Mini resultados */}
              <div className="mt-4 space-y-2">
                {v.opciones.map((op) => {
                  const pct = getPorcentaje(v, op.id);
                  return (
                    <div key={op.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{op.texto}</span>
                        <span className="text-gray-500">{pct}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {votaciones.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
            <p className="text-gray-500">No hay votaciones creadas</p>
          </div>
        )}
      </div>

      {/* Modal Nueva Votación */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nueva Votación" size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asamblea</label>
            <select required value={form.asambleaId} onChange={e => setForm({ ...form, asambleaId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccione una asamblea</option>
              {asambleas.filter(a => a.estado === 'En Curso' || a.estado === 'Programada').map(a => (
                <option key={a.id} value={a.id}>{a.titulo}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pregunta</label>
            <textarea rows={2} required value={form.pregunta} onChange={e => setForm({ ...form, pregunta: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: ¿Aprueba la instalación de cámaras de seguridad?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Votación</label>
            <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
              <option value="Simple">Mayoría Simple</option>
              <option value="Calificada">Mayoría Calificada (70%)</option>
              <option value="Absoluta">Mayoría Absoluta</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opciones de respuesta</label>
            {form.opciones.map((op, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  required={idx < 2}
                  value={op}
                  onChange={(e) => {
                    const newOpciones = [...form.opciones];
                    newOpciones[idx] = e.target.value;
                    setForm({ ...form, opciones: newOpciones });
                  }}
                  placeholder={`Opción ${idx + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                {idx >= 2 && (
                  <button type="button" onClick={() => {
                    const newOpciones = form.opciones.filter((_, i) => i !== idx);
                    setForm({ ...form, opciones: newOpciones });
                  }} className="text-red-500 hover:text-red-700 px-2">×</button>
                )}
              </div>
            ))}
            {form.opciones.length < 6 && (
              <button type="button"
                onClick={() => setForm({ ...form, opciones: [...form.opciones, ''] })}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                + Agregar opción
              </button>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Crear Votación</button>
          </div>
        </form>
      </Modal>

      {/* Modal Detalle Votación */}
      <Modal isOpen={!!showDetail} onClose={() => setShowDetail(null)} title="Detalle de Votación" size="lg">
        {votacion && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge estado={votacion.estado} />
                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">{votacion.tipo}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{votacion.pregunta}</h3>
              <p className="text-sm text-gray-500 mt-1">Total votos: {getTotalVotos(votacion)}</p>
            </div>

            {/* Votar */}
            {votacion.estado === 'Abierta' && (
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-3">Emitir Voto</h4>
                <div className="mb-3">
                  <select value={votoResidenteId} onChange={e => setVotoResidenteId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500">
                    <option value="">Seleccione copropietario</option>
                    {residentes.map(r => (
                      <option key={r.id} value={r.id}>{r.nombre} - Torre {r.torre} Apto {r.apto}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  {votacion.opciones.map(op => (
                    <button key={op.id}
                      onClick={() => handleVotar(votacion.id, op.id)}
                      className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-sm font-medium">
                      {op.texto}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Resultados */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Resultados</h4>
              <div className="space-y-3">
                {votacion.opciones.map(op => {
                  const votos = getVotosOpcion(votacion, op.id);
                  const pct = getPorcentaje(votacion, op.id);
                  const votantes = votacion.resultados?.[op.id] || [];
                  return (
                    <div key={op.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-800">{op.texto}</span>
                        <span className="text-sm font-bold text-gray-900">{votos} votos ({pct}%)</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      {votantes.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {votantes.map(rid => {
                            const res = residentes.find(r => r.id === rid);
                            return res ? (
                              <span key={rid} className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">
                                {res.nombre}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {votacion.estado === 'Abierta' && (
              <div className="flex justify-end pt-4 border-t">
                <button onClick={() => { cerrarVotacion(votacion.id); setShowDetail(null); }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 font-medium">
                  Cerrar Votación
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
