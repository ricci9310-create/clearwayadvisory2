export function formatCurrency(amount) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr) {
  if (!dateStr) return '-';
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function calcularQuorum(asistentes, residentes) {
  if (!residentes.length) return 0;
  const coeficienteTotal = residentes.reduce((sum, r) => sum + r.coeficiente, 0);
  const coeficienteAsistentes = residentes
    .filter(r => asistentes.includes(r.id))
    .reduce((sum, r) => sum + r.coeficiente, 0);
  return ((coeficienteAsistentes / coeficienteTotal) * 100).toFixed(1);
}

export function getEstadoColor(estado) {
  const colores = {
    'Pagada': 'bg-green-100 text-green-800',
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Vencida': 'bg-red-100 text-red-800',
    'Programada': 'bg-blue-100 text-blue-800',
    'En Curso': 'bg-green-100 text-green-800',
    'Finalizada': 'bg-gray-100 text-gray-800',
    'Abierta': 'bg-green-100 text-green-800',
    'Activo': 'bg-green-100 text-green-800',
    'Paz y Salvo': 'bg-blue-100 text-blue-800',
  };
  return colores[estado] || 'bg-gray-100 text-gray-800';
}
