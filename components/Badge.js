import { getEstadoColor } from '../utils/format';

export default function Badge({ estado }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoColor(estado)}`}>
      {estado}
    </span>
  );
}
