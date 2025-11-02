import React from "react";
import Link from "next/link";

const Principal: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section
        className="hero-section d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "70vh",
          backgroundImage: "url('/IMG/cannoli-fondo-contacto.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-5 rounded-4">
          <h1 className="display-3 fw-bold">Bienvenido a El Italiano</h1>
          <p className="lead">Auténtica comida italiana al alcance de un clic 🍝🍕</p>

          {/* Botón ahora va a /Producto */}
          <Link href="/Producto" className="btn btn-dark btn-lg rounded-pill mt-3">
            Explorar productos
          </Link>
        </div>
      </section>

      {/* Sección destacada */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 text-brand">Nuestros Destacados</h2>
          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-lg border-0">
                <img src="/IMG/pizza.jpg" className="card-img-top" alt="Pizza Margarita" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Pizza Margarita</h5>
                  <p className="card-text">La clásica pizza italiana con tomate, mozzarella y albahaca fresca.</p>
                  <Link href="/Producto" className="btn btn-dark rounded-pill">¡Pídela ahora!</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-lg border-0">
                <img src="/IMG/lasagna.jpg" className="card-img-top" alt="Lasagna" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Lasagna</h5>
                  <p className="card-text">Capas de pasta fresca, carne y queso gratinado al horno.</p>
                  <Link href="/Producto" className="btn btn-dark rounded-pill">¡Pídela ahora!</Link>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-lg border-0">
                <img
                  src="https://www.paulinacocina.net/wp-content/uploads/2020/01/receta-de-tiramisu-facil-y-economico-1740483918.jpg"
                  className="card-img-top"
                  alt="Tiramisú"
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Tiramisú</h5>
                  <p className="card-text">El postre más famoso de Italia, suave y cremoso.</p>
                  <Link href="/Producto" className="btn btn-dark rounded-pill">¡Pídela ahora!</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-white" style={{ backgroundColor: "rgba(44,62,80,0.95)" }}>
        <p className="mb-0">&copy; 2025 El Italiano - Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default Principal;
