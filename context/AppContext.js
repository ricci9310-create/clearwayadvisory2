import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

// Datos iniciales de ejemplo para Jamundí, Valle
const initialResidents = [
  { id: 1, nombre: 'Carlos Martínez', cedula: '1144567890', torre: 'A', apto: '101', coeficiente: 2.5, telefono: '3001234567', email: 'carlos@email.com', estado: 'Activo' },
  { id: 2, nombre: 'María López', cedula: '1144567891', torre: 'A', apto: '202', coeficiente: 2.5, telefono: '3009876543', email: 'maria@email.com', estado: 'Activo' },
  { id: 3, nombre: 'Juan Pérez', cedula: '1144567892', torre: 'B', apto: '301', coeficiente: 3.0, telefono: '3005551234', email: 'juan@email.com', estado: 'Activo' },
  { id: 4, nombre: 'Ana García', cedula: '1144567893', torre: 'B', apto: '402', coeficiente: 2.0, telefono: '3007778899', email: 'ana@email.com', estado: 'Activo' },
  { id: 5, nombre: 'Pedro Ramírez', cedula: '1144567894', torre: 'C', apto: '103', coeficiente: 3.5, telefono: '3002223344', email: 'pedro@email.com', estado: 'Activo' },
  { id: 6, nombre: 'Laura Sánchez', cedula: '1144567895', torre: 'C', apto: '504', coeficiente: 2.5, telefono: '3006667788', email: 'laura@email.com', estado: 'Paz y Salvo' },
];

const initialAssemblies = [
  {
    id: 1,
    titulo: 'Asamblea General Ordinaria 2026',
    tipo: 'Ordinaria',
    fecha: '2026-03-28',
    hora: '14:00',
    lugar: 'Salón Comunal - Conjunto Residencial Los Samanes',
    descripcion: 'Asamblea general ordinaria para aprobación de presupuesto 2026 y elección de consejo.',
    estado: 'Programada',
    quorumRequerido: 51,
    asistentes: [],
    agenda: [
      'Verificación de quórum',
      'Lectura y aprobación del acta anterior',
      'Informe de gestión del administrador',
      'Presentación de estados financieros 2025',
      'Aprobación del presupuesto 2026',
      'Elección del consejo de administración',
      'Proposiciones y varios',
    ],
  },
  {
    id: 2,
    titulo: 'Asamblea Extraordinaria - Seguridad',
    tipo: 'Extraordinaria',
    fecha: '2026-02-15',
    hora: '10:00',
    lugar: 'Salón Comunal - Conjunto Residencial Los Samanes',
    descripcion: 'Asamblea para discutir mejoras en el sistema de seguridad.',
    estado: 'Finalizada',
    quorumRequerido: 51,
    asistentes: [1, 2, 3, 5],
    agenda: [
      'Verificación de quórum',
      'Presentación de propuesta de seguridad',
      'Votación sobre instalación de cámaras',
      'Cierre',
    ],
  },
];

const initialVotaciones = [
  {
    id: 1,
    asambleaId: 2,
    pregunta: '¿Aprueba la instalación de 8 cámaras de seguridad adicionales por valor de $12.000.000?',
    opciones: [
      { id: 1, texto: 'Sí, apruebo', votos: [] },
      { id: 2, texto: 'No apruebo', votos: [] },
      { id: 3, texto: 'Abstención', votos: [] },
    ],
    estado: 'Finalizada',
    tipo: 'Simple',
    resultados: {
      1: [1, 3, 5],
      2: [2],
      3: [],
    },
  },
];

const initialFacturas = [
  { id: 1, residenteId: 1, concepto: 'Cuota Administración Marzo 2026', monto: 350000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-10', estado: 'Pendiente' },
  { id: 2, residenteId: 1, concepto: 'Cuota Administración Febrero 2026', monto: 350000, fechaEmision: '2026-02-01', fechaVencimiento: '2026-02-10', estado: 'Pagada', fechaPago: '2026-02-08' },
  { id: 3, residenteId: 1, concepto: 'Cuota Administración Enero 2026', monto: 350000, fechaEmision: '2026-01-01', fechaVencimiento: '2026-01-10', estado: 'Pagada', fechaPago: '2026-01-09' },
  { id: 4, residenteId: 2, concepto: 'Cuota Administración Marzo 2026', monto: 350000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-10', estado: 'Pagada', fechaPago: '2026-03-05' },
  { id: 5, residenteId: 2, concepto: 'Cuota Administración Febrero 2026', monto: 350000, fechaEmision: '2026-02-01', fechaVencimiento: '2026-02-10', estado: 'Pagada', fechaPago: '2026-02-07' },
  { id: 6, residenteId: 3, concepto: 'Cuota Administración Marzo 2026', monto: 420000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-10', estado: 'Vencida' },
  { id: 7, residenteId: 3, concepto: 'Cuota Administración Febrero 2026', monto: 420000, fechaEmision: '2026-02-01', fechaVencimiento: '2026-02-10', estado: 'Vencida' },
  { id: 8, residenteId: 4, concepto: 'Cuota Administración Marzo 2026', monto: 280000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-10', estado: 'Pendiente' },
  { id: 9, residenteId: 5, concepto: 'Cuota Administración Marzo 2026', monto: 490000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-10', estado: 'Pagada', fechaPago: '2026-03-02' },
  { id: 10, residenteId: 5, concepto: 'Cuota Extraordinaria - Seguridad', monto: 150000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-15', estado: 'Pendiente' },
  { id: 11, residenteId: 6, concepto: 'Cuota Administración Marzo 2026', monto: 350000, fechaEmision: '2026-03-01', fechaVencimiento: '2026-03-10', estado: 'Pagada', fechaPago: '2026-03-01' },
];

export function AppProvider({ children }) {
  const [residentes, setResidentes] = useState(initialResidents);
  const [asambleas, setAsambleas] = useState(initialAssemblies);
  const [votaciones, setVotaciones] = useState(initialVotaciones);
  const [facturas, setFacturas] = useState(initialFacturas);

  // --- Residentes ---
  const addResidente = useCallback((residente) => {
    setResidentes(prev => [...prev, { ...residente, id: Math.max(...prev.map(r => r.id), 0) + 1 }]);
  }, []);

  const updateResidente = useCallback((id, data) => {
    setResidentes(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  }, []);

  const deleteResidente = useCallback((id) => {
    setResidentes(prev => prev.filter(r => r.id !== id));
  }, []);

  // --- Asambleas ---
  const addAsamblea = useCallback((asamblea) => {
    setAsambleas(prev => [...prev, { ...asamblea, id: Math.max(...prev.map(a => a.id), 0) + 1, asistentes: [] }]);
  }, []);

  const updateAsamblea = useCallback((id, data) => {
    setAsambleas(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
  }, []);

  const registrarAsistencia = useCallback((asambleaId, residenteId) => {
    setAsambleas(prev => prev.map(a => {
      if (a.id === asambleaId && !a.asistentes.includes(residenteId)) {
        return { ...a, asistentes: [...a.asistentes, residenteId] };
      }
      return a;
    }));
  }, []);

  const removerAsistencia = useCallback((asambleaId, residenteId) => {
    setAsambleas(prev => prev.map(a => {
      if (a.id === asambleaId) {
        return { ...a, asistentes: a.asistentes.filter(id => id !== residenteId) };
      }
      return a;
    }));
  }, []);

  // --- Votaciones ---
  const addVotacion = useCallback((votacion) => {
    setVotaciones(prev => [...prev, {
      ...votacion,
      id: Math.max(...prev.map(v => v.id), 0) + 1,
      estado: 'Abierta',
      resultados: {},
    }]);
  }, []);

  const emitirVoto = useCallback((votacionId, opcionId, residenteId) => {
    setVotaciones(prev => prev.map(v => {
      if (v.id === votacionId && v.estado === 'Abierta') {
        const newResultados = { ...v.resultados };
        // Remove previous vote if any
        Object.keys(newResultados).forEach(key => {
          newResultados[key] = (newResultados[key] || []).filter(id => id !== residenteId);
        });
        newResultados[opcionId] = [...(newResultados[opcionId] || []), residenteId];
        return { ...v, resultados: newResultados };
      }
      return v;
    }));
  }, []);

  const cerrarVotacion = useCallback((votacionId) => {
    setVotaciones(prev => prev.map(v =>
      v.id === votacionId ? { ...v, estado: 'Finalizada' } : v
    ));
  }, []);

  // --- Facturas ---
  const addFactura = useCallback((factura) => {
    setFacturas(prev => [...prev, { ...factura, id: Math.max(...prev.map(f => f.id), 0) + 1 }]);
  }, []);

  const pagarFactura = useCallback((facturaId) => {
    setFacturas(prev => prev.map(f =>
      f.id === facturaId ? { ...f, estado: 'Pagada', fechaPago: new Date().toISOString().split('T')[0] } : f
    ));
  }, []);

  const getCarteraResidente = useCallback((residenteId) => {
    return facturas.filter(f => f.residenteId === residenteId);
  }, [facturas]);

  const value = {
    residentes, addResidente, updateResidente, deleteResidente,
    asambleas, addAsamblea, updateAsamblea, registrarAsistencia, removerAsistencia,
    votaciones, addVotacion, emitirVoto, cerrarVotacion,
    facturas, addFactura, pagarFactura, getCarteraResidente,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
