import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

// Datos iniciales vacíos - importar desde Excel
const initialResidents = [];

const initialAssemblies = [];

const initialVotaciones = [];

const initialFacturas = [];

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

  const importResidentes = useCallback((nuevosResidentes) => {
    setResidentes(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(r => r.id)) : 0;
      const withIds = nuevosResidentes.map((r, i) => ({ ...r, id: maxId + i + 1 }));
      return [...prev, ...withIds];
    });
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
    residentes, addResidente, updateResidente, deleteResidente, importResidentes,
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
