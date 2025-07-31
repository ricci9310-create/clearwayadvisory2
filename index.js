export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="text-center py-20 px-6 bg-gradient-to-br from-blue-600 to-sky-400 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Clearway Advisory</h1>
        <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto">
          Discover what your business really needs — get strategic guidance based on your actual stage.
        </p>
        <a href="#" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-lg">Download Free Guide</a>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How Clearway Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">Step 1</h3>
              <p>Download our free business stage guide.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Step 2</h3>
              <p>Identify your business stage using the guide.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Step 3</h3>
              <p>Send us a text with your situation — and we’ll prepare tailored advice.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 text-lg max-w-xl mx-auto">
          Download the guide now and take the first step toward strategic clarity.
        </p>
        <a href="#" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl">Download the Free Guide</a>
        <p className="mt-4 text-sm text-gray-600 max-w-md mx-auto">
          Once you've read it, text us at <strong>(+1) 404-123-4567</strong> with your business stage and goals.
        </p>
      </section>

      <footer className="py-10 px-6 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Clearway Advisory. All rights reserved.
      </footer>
    </main>
  );
}