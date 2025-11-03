"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type CartItem = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  qty: number;
};

const STORAGE_KEY = "elitaliano_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  // Notifica a la navbar/CartBadge
  window.dispatchEvent(new Event("cart:update"));
}

const CLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

export default function CarritoView() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cargar carrito inicial
  useEffect(() => {
    setCart(loadCart());
  }, []);

  const itemsCount = useMemo(() => cart.reduce((a, i) => a + i.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((a, i) => a + i.precio * i.qty, 0),
    [cart]
  );
  const envio = 0;
  const impuestos = 0;
  const total = subtotal + envio + impuestos;

  // ---- FUNCIONES DE MODIFICACIÓN (guardan de inmediato) ----
  function increase(id: number) {
    setCart((prev) => {
      const updated = prev.map((x) =>
        x.id === id ? { ...x, qty: x.qty + 1 } : x
      );
      saveCart(updated);
      return updated;
    });
  }

  function decrease(id: number) {
    setCart((prev) => {
      const updated = prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0);
      saveCart(updated);
      return updated;
    });
  }

  function removeItem(id: number) {
    setCart((prev) => {
      const updated = prev.filter((x) => x.id !== id);
      saveCart(updated);
      return updated;
    });
  }

  function clearCart() {
    setCart([]);
    saveCart([]);
  }

  function pagar() {
    alert(`Pagar ${CLP(total)} por ${itemsCount} ítem(s). (Demo)`);
    clearCart();
  }

  // Mantener el ID precioTotal actualizado para compatibilidad
  useEffect(() => {
    const totalDiv = document.getElementById("precioTotal");
    if (totalDiv) {
      const h5 = totalDiv.querySelector("h5");
      if (h5) h5.textContent = `Precio total: ${CLP(total)}`;
    }
  }, [total]);

  // ✅ Arreglo: Set.add no devuelve boolean
  const seleccionUnica = useMemo(() => {
    const seen = new Set<number>();
    return cart.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
  }, [cart]);

  return (
    <>
      {/* Galería de productos seleccionados */}
      <section className="container mt-4">
        <h2 className="mb-3">Tus productos seleccionados</h2>
        {seleccionUnica.length === 0 ? (
          <div className="text-muted">Aún no has agregado productos.</div>
        ) : (
          <div className="row g-3">
            {seleccionUnica.map((p) => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={p.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={p.imagen.startsWith("/") ? p.imagen : `/${p.imagen}`}
                    alt={p.nombre}
                    className="card-img-top"
                    style={{ height: 120, objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <div className="small fw-semibold">{p.nombre}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Tabla del carrito */}
      <section className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="mb-3">Carrito</h2>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Precio</th>
                        <th className="text-end">Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody id="listaCarro">
                      {cart.length === 0 && (
                        <tr>
                          <td colSpan={5} className="text-center text-muted">
                            Tu carrito está vacío
                          </td>
                        </tr>
                      )}

                      {cart.map((it) => (
                        <tr className="producto" key={it.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={
                                  it.imagen.startsWith("/")
                                    ? it.imagen
                                    : `/${it.imagen}`
                                }
                                alt={it.nombre}
                                width={64}
                                height={64}
                                style={{ objectFit: "cover", borderRadius: 8 }}
                              />
                              <div>
                                <div className="fw-semibold">{it.nombre}</div>
                                <div className="small text-muted">
                                  {it.descripcion}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="text-center">
                            <div className="btn-group" role="group" aria-label="quantity">
                              <button className="btn btn-outline-secondary" onClick={() => decrease(it.id)}>−</button>
                              <span className="btn btn-light disabled">{it.qty}</span>
                              <button className="btn btn-outline-secondary" onClick={() => increase(it.id)}>+</button>
                            </div>
                          </td>

                          <td className="text-end">{CLP(it.precio)}</td>
                          <td className="text-end">{CLP(it.precio * it.qty)}</td>

                          <td className="text-end">
                            <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(it.id)}>
                              Quitar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total */}
                <div
                  id="precioTotal"
                  className="totalPrice p-3 mt-3 rounded d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                >
                  <h5 className="m-0">Precio total: {CLP(total)}</h5>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary" onClick={clearCart}>Vaciar</button>
                    <Link href="/Pago" className="btn btn-dark">Pago</Link> 
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Resumen de boleta</h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Ítems</span><strong>{itemsCount}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotal</span><strong>{CLP(subtotal)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Envío</span><strong>{CLP(envio)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Impuestos</span><strong>{CLP(impuestos)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total</span><strong>{CLP(total)}</strong>
                  </li>
                </ul>
                <Link href="/Pago" className="btn btn-dark w-100 mb-2">Pago</Link> 
                <button className="btn btn-outline-secondary w-100" onClick={clearCart}>Vaciar carrito</button>

                <div className="mt-3 small text-muted">
                  <p className="mb-1">• Los precios están expresados en CLP.</p>
                  <p className="mb-1">• Envío: retiro en tienda (sin costo) o calcular en checkout.</p>
                  <p className="mb-0">• Métodos de pago: efectivo, tarjeta, transferencia (demo).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 text-center text-white mt-5" style={{ backgroundColor: "rgba(44,62,80,0.95)" }}>
        <p className="mb-0">&copy; 2025 El Italiano - Todos los derechos reservados</p>
      </footer>
    </>
  );
}