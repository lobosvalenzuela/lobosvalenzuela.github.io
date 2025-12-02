"use client";

import React, { useMemo } from "react";
import { products } from "../Producto/products";
import { addToCart } from "../cartUtils";

/**
 * Seleccionamos la mitad del catálogo (por índice par) y aplicamos 50% dto.
 * Si quieres otro criterio, cambia el filter/map.
 */
export default function Ofertas() {
  const ofertas = useMemo(() => {
    const mitad = products.filter((_, i) => i % 2 === 0); // mitad del listado
    return mitad.map((p) => ({
      ...p,
      precioOriginal: p.precio,
      precioDescuento: Math.round(p.precio * 0.5), // 50% OFF
    }));
  }, []);

  return (
    <>
      <section className="container mt-4">
        <h2 className="mb-3">Ofertas</h2>
        <p className="text-muted">
          Mitad de nuestro catálogo con <strong>50% de descuento</strong>.
        </p>

        <div
          id="listaProductos"
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
        >
          {ofertas.map((p) => (
            <div className="col" key={p.id}>
              <div id="producto" className="card h-100 shadow-sm position-relative">
                <span
                  className="badge bg-danger position-absolute"
                  style={{ top: 12, left: 12 }}
                >
                  -50%
                </span>

                <img
                  src={p.imagen.startsWith("/") ? p.imagen : `/${p.imagen}`}
                  className="card-img-top"
                  alt={p.nombre}
                  style={{ objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="card-text small text-muted mb-2">{p.descripcion}</p>

                  {/* Precios: original tachado + rebajado */}
                  <div className="mb-3">
                    <div className="text-muted small">
                      <s>{p.precioOriginal}</s>
                    </div>
                    <div className="fw-bold">{p.precioDescuento}</div>
                  </div>

                  <button
                    id="agregarCarro"
                    className="btn btn-dark w-100 mt-auto"
                    onClick={() =>
                      addToCart({
                        id: p.id,
                        nombre: p.nombre,
                        // ¡Al carrito entra el precio DESCONTADO!
                        precio: p.precioDescuento,
                        imagen: p.imagen.startsWith("/") ? p.imagen : `/${p.imagen}`,
                        descripcion: p.descripcion,
                        qty: 1,
                      })
                    }
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer coherente con el resto */}
      <footer
        className="py-4 text-center text-white mt-5"
        style={{ backgroundColor: "rgba(44,62,80,0.95)" }}
      >
        <p className="mb-0">&copy; 2025 El Italiano - Todos los derechos reservados</p>
      </footer>
    </>
  );
}
