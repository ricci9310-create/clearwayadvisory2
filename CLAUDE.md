# Clearway Realty - Proyecto Inmobiliario

## Descripcion del Proyecto
Landing page para **Clearway Realty**, una empresa de alquiler y venta de propiedad raiz (bienes raices). El sitio esta en **espanol** y esta dirigido al mercado latinoamericano/hispano.

## Stack Tecnologico
- **Framework:** Next.js 13 (Pages Router, NO App Router)
- **UI:** React 18
- **Estilos:** Tailwind CSS 3.3 + PostCSS + Autoprefixer
- **Deploy:** Vercel (conectado a GitHub, despliega desde `main`)
- **Repo GitHub:** `ricci9310-create/clearwayadvisory2`

## Estructura del Proyecto
```
clearwayadvisory2/
├── pages/
│   ├── _app.js          # App wrapper - importa globals.css
│   └── index.js         # Pagina principal (landing page completa)
├── styles/
│   └── globals.css      # Tailwind directives (@tailwind base/components/utilities)
├── index.js             # Copia legacy en raiz (la version activa esta en pages/)
├── globals.css          # Copia legacy en raiz
├── tailwind.config.js   # Config de Tailwind (content: ./, pages/, components/)
├── postcss.config.js    # PostCSS con tailwindcss + autoprefixer
└── package.json         # Dependencias y scripts
```

## Comandos
- `npm run dev` - Servidor de desarrollo (Next.js)
- `npm run build` - Build de produccion
- `npm run start` - Servidor de produccion

## Paleta de Colores (Tailwind)
- **Primario:** emerald-700 / emerald-800 (verde esmeralda)
- **Acentos:** emerald-300, emerald-50, teal-700
- **Badges:** emerald-600 (Venta), amber-500 (Alquiler)
- **Texto:** gray-900 (principal), gray-600 (secundario), gray-500 (terciario)
- **Fondos:** white, gray-50, gray-900 (footer)

## Secciones de la Landing Page (en orden)
1. **Navbar** - Logo "Clearway Realty", links de navegacion, boton "Contactanos" (fixed top)
2. **Hero** - Gradiente emerald con imagen de fondo, titulo "Alquiler y Venta de Propiedad Raiz", CTAs
3. **Stats Bar** - 4 estadisticas: 500+ vendidas, 1200+ clientes, 15+ anos, 50+ agentes
4. **Propiedades Destacadas** - Grid de 6 propiedades con imagen, tipo (Venta/Alquiler), precio, detalles
5. **Servicios** - 4 cards: Venta, Alquiler Residencial, Espacios Comerciales, Asesoria
6. **Nosotros / Por que elegirnos** - Texto + imagen + lista de beneficios + badge "15+ anos"
7. **CTA** - Gradiente emerald, botones "Llamar Ahora" y "WhatsApp"
8. **Formulario de Contacto** - Info de contacto + formulario (nombre, email, tel, interes, mensaje)
9. **Footer** - Logo, enlaces, servicios, horario, copyright

## Datos de Contacto (placeholders)
- Telefono: (+1) 404-123-4567
- Email: info@clearwayrealty.com
- Direccion: Calle Principal #123, Centro Empresarial
- WhatsApp: wa.me/14041234567
- Horario: Lun-Vie 8AM-6PM, Sab 9AM-2PM, Dom cerrado

## Propiedades de Ejemplo
Las propiedades usan imagenes de Unsplash. Hay 6 propiedades hardcodeadas:
1. Apartamento Moderno en El Poblado - Venta $320,000
2. Casa Campestre con Jardin - Venta $485,000
3. Loft Ejecutivo Centro Historico - Alquiler $1,200/mes
4. Penthouse con Vista al Mar - Venta $750,000
5. Oficina Comercial Premium - Alquiler $2,500/mes
6. Villa Familiar con Piscina - Venta $620,000

## Convenciones de Codigo
- Componente unico en `pages/index.js` (todo el landing en un solo archivo)
- Clases de Tailwind directamente en JSX (no CSS modules)
- Iconos con SVG inline (no libreria de iconos)
- Emojis para iconos de servicios
- Responsive: mobile-first con breakpoints `md:` y `lg:`
- Idioma del contenido: Espanol

## Notas Importantes
- El archivo `index.js` en la raiz es una copia legacy. El archivo activo es `pages/index.js`
- No hay carpeta `components/` aun - todo esta en un solo archivo
- No hay API routes, base de datos, ni autenticacion
- Las imagenes son externas (Unsplash) - no hay assets locales
- El formulario de contacto es solo UI (no tiene backend/handler)
- No hay `next.config.js` - usa configuracion por defecto de Next.js
