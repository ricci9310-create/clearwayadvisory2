export default function HomePage() {
  const properties = [
    {
      id: 1,
      title: "Apartamento Moderno en El Poblado",
      type: "Venta",
      price: "$320,000 USD",
      beds: 3,
      baths: 2,
      area: "120 m²",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Casa Campestre con Jardín",
      type: "Venta",
      price: "$485,000 USD",
      beds: 4,
      baths: 3,
      area: "250 m²",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Loft Ejecutivo Centro Histórico",
      type: "Alquiler",
      price: "$1,200 USD/mes",
      beds: 1,
      baths: 1,
      area: "65 m²",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Penthouse con Vista al Mar",
      type: "Venta",
      price: "$750,000 USD",
      beds: 3,
      baths: 3,
      area: "180 m²",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    },
    {
      id: 5,
      title: "Oficina Comercial Premium",
      type: "Alquiler",
      price: "$2,500 USD/mes",
      beds: 0,
      baths: 2,
      area: "150 m²",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    },
    {
      id: 6,
      title: "Villa Familiar con Piscina",
      type: "Venta",
      price: "$620,000 USD",
      beds: 5,
      baths: 4,
      area: "350 m²",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
    },
  ];

  const services = [
    {
      icon: "🏠",
      title: "Venta de Propiedades",
      description:
        "Te ayudamos a encontrar la propiedad ideal para ti y tu familia. Casas, apartamentos, terrenos y más.",
    },
    {
      icon: "🔑",
      title: "Alquiler Residencial",
      description:
        "Encuentra el lugar perfecto para vivir con nuestras opciones de alquiler en las mejores zonas.",
    },
    {
      icon: "🏢",
      title: "Espacios Comerciales",
      description:
        "Locales, oficinas y bodegas disponibles para impulsar tu negocio al siguiente nivel.",
    },
    {
      icon: "📋",
      title: "Asesoría Inmobiliaria",
      description:
        "Orientación profesional en cada paso del proceso de compra, venta o alquiler de tu propiedad.",
    },
  ];

  const stats = [
    { value: "500+", label: "Propiedades Vendidas" },
    { value: "1,200+", label: "Clientes Satisfechos" },
    { value: "15+", label: "Años de Experiencia" },
    { value: "50+", label: "Agentes Profesionales" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-700">Clearway</span>
            <span className="text-2xl font-light text-gray-500">Realty</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#propiedades" className="hover:text-emerald-700 transition-colors">Propiedades</a>
            <a href="#servicios" className="hover:text-emerald-700 transition-colors">Servicios</a>
            <a href="#nosotros" className="hover:text-emerald-700 transition-colors">Nosotros</a>
            <a href="#contacto" className="hover:text-emerald-700 transition-colors">Contacto</a>
          </div>
          <a
            href="#contacto"
            className="hidden md:inline-block bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-700" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40 text-center text-white">
          <p className="text-emerald-300 font-semibold text-sm uppercase tracking-widest mb-4">
            Tu hogar ideal te espera
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Alquiler y Venta de<br />
            <span className="text-emerald-300">Propiedad Raíz</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Más de 15 años conectando personas con el lugar perfecto para vivir, trabajar e invertir. Encuentra tu próxima propiedad con nosotros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#propiedades"
              className="bg-white text-emerald-800 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-50 transition-colors text-lg"
            >
              Ver Propiedades
            </a>
            <a
              href="#contacto"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              Hablar con un Asesor
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
              <p className="text-emerald-200 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section id="propiedades" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-2">
              Propiedades Destacadas
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Encuentra tu próximo hogar o inversión
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                      prop.type === "Venta"
                        ? "bg-emerald-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {prop.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{prop.title}</h3>
                  <p className="text-emerald-700 text-xl font-bold mb-4">{prop.price}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {prop.beds > 0 && (
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                        </svg>
                        {prop.beds} Hab.
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4" />
                      </svg>
                      {prop.baths} Baños
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {prop.area}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-block border-2 border-emerald-700 text-emerald-700 font-semibold px-8 py-3 rounded-xl hover:bg-emerald-700 hover:text-white transition-colors"
            >
              Ver Todas las Propiedades
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-2">
              Nuestros Servicios
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Soluciones inmobiliarias a tu medida
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-emerald-50 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-5">{service.icon}</div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section id="nosotros" className="py-20 px-6 bg-emerald-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-2">
              ¿Por qué elegirnos?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tu aliado de confianza en bienes raíces
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              En Clearway Realty, entendemos que comprar, vender o alquilar una propiedad es una de
              las decisiones más importantes de tu vida. Nuestro equipo de profesionales te
              acompaña en cada paso del proceso, ofreciéndote transparencia, conocimiento del
              mercado y un servicio personalizado.
            </p>
            <ul className="space-y-4">
              {[
                "Amplio portafolio de propiedades verificadas",
                "Asesoría legal y financiera incluida",
                "Acompañamiento personalizado de inicio a fin",
                "Valuaciones de mercado sin costo",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=700&fit=crop"
              alt="Equipo inmobiliario"
              className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-emerald-700 text-white p-6 rounded-2xl shadow-lg">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-emerald-200 text-sm">Años de experiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-800 to-teal-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para encontrar tu propiedad ideal?
          </h2>
          <p className="text-emerald-200 text-lg mb-8">
            Agenda una cita con uno de nuestros asesores y recibe orientación gratuita sobre las
            mejores opciones del mercado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+14041234567"
              className="bg-white text-emerald-800 font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-emerald-50 transition-colors text-lg"
            >
              Llamar Ahora
            </a>
            <a
              href="https://wa.me/14041234567"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contacto" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-emerald-700 font-semibold text-sm uppercase tracking-widest mb-2">
              Contáctanos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Estamos aquí para ayudarte
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Déjanos tus datos y un asesor inmobiliario se pondrá en contacto contigo en las
              próximas 24 horas.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Dirección</p>
                  <p className="text-gray-500 text-sm">Calle Principal #123, Centro Empresarial</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Teléfono</p>
                  <p className="text-gray-500 text-sm">(+1) 404-123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-500 text-sm">info@clearwayrealty.com</p>
                </div>
              </div>
            </div>
          </div>
          <form className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  type="text"
                  placeholder="Tu apellido"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                placeholder="+1 (___) ___-____"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">¿Qué te interesa?</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="">Selecciona una opción</option>
                <option value="comprar">Comprar propiedad</option>
                <option value="vender">Vender propiedad</option>
                <option value="alquilar">Alquilar propiedad</option>
                <option value="asesoria">Asesoría inmobiliaria</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea
                rows={4}
                placeholder="Cuéntanos más sobre lo que buscas..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-700 text-white font-semibold py-3 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">Clearway</span>
              <span className="text-xl font-light text-gray-500">Realty</span>
            </div>
            <p className="text-sm leading-relaxed">
              Tu socio de confianza en bienes raíces. Compra, vende o alquila con la tranquilidad
              de estar en buenas manos.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#propiedades" className="hover:text-emerald-400 transition-colors">Propiedades</a></li>
              <li><a href="#servicios" className="hover:text-emerald-400 transition-colors">Servicios</a></li>
              <li><a href="#nosotros" className="hover:text-emerald-400 transition-colors">Nosotros</a></li>
              <li><a href="#contacto" className="hover:text-emerald-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Venta de Propiedades</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Alquiler Residencial</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Espacios Comerciales</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Asesoría Inmobiliaria</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Horario</h4>
            <ul className="space-y-2 text-sm">
              <li>Lunes - Viernes: 8:00 AM - 6:00 PM</li>
              <li>Sábado: 9:00 AM - 2:00 PM</li>
              <li>Domingo: Cerrado</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Clearway Realty. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
