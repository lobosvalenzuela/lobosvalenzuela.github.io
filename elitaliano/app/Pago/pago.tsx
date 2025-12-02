"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadCart, saveCart, CartItem } from "../cartUtils";

// Persistencia del formulario
const CHECKOUT_KEY = "elitaliano_checkout";

// Dominios permitidos (mismo criterio que Registro)
const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@gmail.com", "@profesor.duoc.cl"];

export default function PagoView() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    direccion: ""
  })

  useEffect(() => {
    const userLogeado = localStorage.getItem("loginUsuario");
    if(!userLogeado){
      alert("Inicia sesion para continuar con el pago");
      router.push("/Login");
      return;
    }
    const carro = loadCart();
    if(carro){
      setCart(carro);
    }
  }, []);

  // totales
  const itemsCount = useMemo(() => cart.reduce((a, i) => a + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((a, i) => a + i.precio * i.qty, 0), [cart]);
  const envio = 1500;
  const total = subtotal + envio;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  }

  /*
  function validarField(f: CheckoutForm): Errors {
    const e: Errors = {};

    // Correo: formato + dominio permitido
    if (!f.correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.correo)) {
      e.correo = "Ingresa un correo válido.";
    } else {
      const correoLower = f.correo.toLowerCase();
      const matchDominio = DOMINIOS_PERMITIDOS.some((d) => correoLower.endsWith(d));
      if (!matchDominio) {
        e.correo = `El correo debe terminar en: ${DOMINIOS_PERMITIDOS.join(", ")}`;
      }
    }
    return e;
  }
  */
  const pagar = async (e: React.FormEvent) =>{
    e.preventDefault();

    if(cart.length === 0){
      alert("Tu carrito está vacío.");
      return;
    }

    try{
      const user = JSON.parse(localStorage.getItem("loginUsuario")||"{}");
      const numTransaccion = Date.now();
      const pagoPromises = cart.map(it => {
        const pagoData = {
          usuario: {idUsuario: user.idUsuario},
          producto: {idProducto: it.id},
          cant: it.qty,
          fecha: new Date().toISOString(),
          numTransaccion: numTransaccion
        };
        return fetch("https://ratatinprogramin-production.up.railway.app/api/v1/pagos/crear", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pagoData),
        });
      });
      await Promise.all(pagoPromises);
      alert("Pago realizado con exito. Transaccion Nro "+ numTransaccion);
      setCart([]);
    }catch(error){
      console.log("Error en el pago:", error);
      alert("Error al procesar el pago. Intenta nuevamente.");
    }
  };
  return (
    <>
      {/* Formulario estilo Registro */}
      <section className="registration-section">
        <div className="container">
          <div className="registration-container">
            <h2 className="section-title">Pago</h2>
            <p className="section-subtitle">Ingresa tus datos para finalizar la compra</p>

            <div className="registration-form">
              <form id="Pago" onSubmit={pagar}>
                <div className="form-row">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre completo</label>
                      <input
                        id="nombre"
                        type="text"
                        className={`form-control form-control-lg`}
                        placeholder="Nombre completo"
                        maxLength={100}
                        minLength={3}
                        required
                        value={form.nombre}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Correo</label>
                      <input
                        id="correo"
                        type="email"
                        className={`form-control form-control-lg`}
                        placeholder="Correo"
                        maxLength={50}
                        required
                        value={form.correo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Teléfono (opcional)</label>
                      <input
                        id="telefono"
                        type="tel"
                        className={`form-control form-control-lg`}
                        placeholder="Teléfono (9 dígitos)"
                        minLength={9}
                        maxLength={9}
                        value={form.telefono || ""}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Dirección (opcional)</label>
                      <input
                        id="direccion"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Dirección"
                        maxLength={120}
                        value={form.direccion || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Resumen del pedido (estructura igual al Carrito) */}
      <section className="container mt-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="mb-3">Resumen del pedido</h2>
                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-end">Precio</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody id="listaCarro">
                      {cart.length === 0 && (
                        <tr>
                          <td colSpan={4} className="text-center text-muted">
                            Tu carrito está vacío
                          </td>
                        </tr>
                      )}

                      {cart.map((it) => (
                        <tr className="producto" key={it.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={it.imagen.startsWith("https") ? it.imagen : `/${it.imagen}`}
                                alt={it.nombre}
                                width={64}
                                height={64}
                                style={{ objectFit: "cover", borderRadius: 8 }}
                              />
                              <div>
                                <div className="fw-semibold">{it.nombre}</div>
                                <div className="small text-muted">{it.descripcion}</div>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">{it.qty}</td>
                          <td className="text-end">{it.precio}</td>
                          <td className="text-end">{it.precio * it.qty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  id="precioTotal"
                  className="totalPrice p-3 mt-3 rounded d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                >
                  <h5 className="m-0">Precio total: {total}</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Especificaciones */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Especificaciones</h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Ítems</span>
                    <strong>{itemsCount}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Subtotal</span>
                    <strong>{subtotal}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Envío</span>
                    <strong>{envio}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total</span>
                    <strong>{total}</strong>
                  </li>
                </ul>

                <button
                  className="btn btn-dark w-100 mb-2"
                  type="submit"
                  form="Pago"
                >
                  Confirmar pago
                </button>
                <button className="btn btn-outline-secondary w-100" onClick={() => router.push("/Carrito")}>
                  Editar carrito
                </button>

                <div className="mt-3 small text-muted">
                  <p className="mb-1">• Los precios están expresados en CLP.</p>
                  <p className="mb-1">• Envío: retiro en tienda (sin costo) o calcular en checkout.</p>
                  <p className="mb-0">• Métodos de pago: tarjeta y efectivo.</p>
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