"use client";

import React, { useMemo, useEffect } from "react";
import { addToCart } from "../cartUtils";

interface Producto {
  idProducto: number,
  nombre: string,
  descripcion: string,
  precio: number,
  categoria: string,
  imagen: string;
}

export default function Ofertas() {
  const [products, setProductos] = React.useState<Producto[]>([]);
  useEffect(() => {
      const fetchProductos = async () =>{
        const response = await fetch("https://ratatinprogramin-production.up.railway.app/api/v1/productos", {cache: 'no-store'});
        const data = await response.json();
        setProductos(data);
      }
      fetchProductos();
    }, []);
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
            <div className="col" key={p.idProducto}>
              <div id="producto" className="card h-100 shadow-sm position-relative">
                <span
                  className="badge bg-danger position-absolute"
                  style={{ top: 12, left: 12 }}
                >
                  -50%
                </span>

                <img
                  src={p.imagen.startsWith("https") ? p.imagen : `/${p.imagen}`}
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
                        id: p.idProducto,
                        nombre: p.nombre,
                        precio: p.precioDescuento,
                        imagen: p.imagen.startsWith("https") ? p.imagen : `/${p.imagen}`,
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
