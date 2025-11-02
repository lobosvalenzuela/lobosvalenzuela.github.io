"use client";

import React, { useMemo } from "react";
import type { Producto } from "./products";
import { addToCart } from "../cartUtils"; // usa tu ruta actual

interface Props {
  products: Producto[];
}

const CLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

const Producto: React.FC<Props> = ({ products }) => {
  // MISMA selección que en /Ofertas: tomamos la "mitad" por índice par
  const offerIds = useMemo(
    () => new Set(products.filter((_, i) => i % 2 === 0).map((p) => p.id)),
    [products]
  );

  return (
    <>
      <div className="container mt-4">
        <div
          id="listaProductos"
          className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
        >
          {products.map((p, idx) => {
            const onOffer = offerIds.has(p.id);
            const precioDescuento = onOffer ? Math.round(p.precio * 0.5) : p.precio;

            return (
              <div className="col" key={p.id}>
                <div id="producto" className="card h-100 shadow-sm position-relative">
                  {onOffer && (
                    <span
                      className="badge bg-danger position-absolute"
                      style={{ top: 12, left: 12 }}
                    >
                      -50%
                    </span>
                  )}

                  <img
                    src={p.imagen.startsWith("/") ? p.imagen : `/${p.imagen}`}
                    className="card-img-top"
                    alt={p.nombre}
                    style={{ objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{p.nombre}</h5>
                    <p className="card-text mb-2 small text-muted">{p.descripcion}</p>

                    {/* Precios */}
                    {onOffer ? (
                      <div className="mb-3">
                        <div className="text-muted small">
                          <s>{CLP(p.precio)}</s>
                        </div>
                        <div className="fw-bold">{CLP(precioDescuento)}</div>
                      </div>
                    ) : (
                      <p className="card-text fw-bold mb-3">{CLP(p.precio)}</p>
                    )}

                    <button
                      id="agregarCarro"
                      className="btn btn-dark w-100 mt-auto"
                      onClick={() =>
                        addToCart({
                          id: p.id,
                          nombre: p.nombre,
                          // 👇 al carrito entra el precio correcto (descuento si aplica)
                          precio: precioDescuento,
                          imagen: p.imagen.startsWith("/") ? p.imagen : `/${p.imagen}`,
                          descripcion: p.descripcion,
                          qty: 1,
                        })
                      }
                      data-id={p.id}
                      data-name={p.nombre}
                      data-price={precioDescuento}
                      data-image={p.imagen}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Footer */}
      <footer
        className="py-4 text-center text-white mt-5"
        style={{ backgroundColor: "rgba(44,62,80,0.95)" }}
      >
        <p className="mb-0">&copy; 2025 El Italiano - Todos los derechos reservados</p>
      </footer>
    </>
  );
};

export default Producto;
