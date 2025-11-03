"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadCart, saveCart, CartItem } from "../cartUtils";

const CLP = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);

// Persistencia del formulario
const CHECKOUT_KEY = "elitaliano_checkout";

// Dominios permitidos (mismo criterio que Registro)
const DOMINIOS_PERMITIDOS = ["@duoc.cl", "@gmail.com", "@profesor.duoc.cl"];

type CheckoutForm = {
  nombre: string;
  correo: string;
  telefono?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  metodoPago: "tarjeta" | "transferencia" | "efectivo";
  notas?: string;
};

const defaultForm: CheckoutForm = {
  nombre: "",
  correo: "",
  telefono: "",
  region: "",
  comuna: "",
  direccion: "",
  metodoPago: "tarjeta",
  notas: "",
};

type Errors = {
  nombre?: string;
  correo?: string;
  telefono?: string;
  region?: string;
  comuna?: string;
};

export default function PagoView() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CheckoutForm>(defaultForm);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(true);

  // cargar carrito + form guardado
  useEffect(() => {
    setCart(loadCart());
    try {
      const raw = localStorage.getItem(CHECKOUT_KEY);
      setForm(raw ? { ...defaultForm, ...(JSON.parse(raw) as CheckoutForm) } : defaultForm);
    } catch {
      setForm(defaultForm);
    } finally {
      setLoading(false);
    }
  }, []);

  // persistir form
  useEffect(() => {
    if (!loading) localStorage.setItem(CHECKOUT_KEY, JSON.stringify(form));
  }, [form, loading]);

  // totales
  const itemsCount = useMemo(() => cart.reduce((a, i) => a + i.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((a, i) => a + i.precio * i.qty, 0), [cart]);
  const envio = 0;
  const impuestos = 0;
  const total = subtotal + envio + impuestos;

  // compatibilidad con precioTotal (como en carrito)
  useEffect(() => {
    const totalDiv = document.getElementById("precioTotal");
    if (totalDiv) {
      const h5 = totalDiv.querySelector("h5");
      if (h5) h5.textContent = `Precio total: ${CLP(total)}`;
    }
  }, [total]);

  function onChange<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // --- Validaciones estilo "Registro" ---
  function validarField(f: CheckoutForm): Errors {
    const e: Errors = {};

    // Nombre: mínimo 3
    if (!f.nombre || f.nombre.trim().length < 3) {
      e.nombre = "Ingresa un nombre válido (mínimo 3 caracteres).";
    }

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

    // Teléfono: opcional, pero si existe debe tener 9 dígitos
    if (f.telefono && f.telefono.trim() !== "") {
      const digits = f.telefono.replace(/\D/g, "");
      if (!/^\d{9}$/.test(digits)) {
        e.telefono = "El teléfono debe tener 9 dígitos (solo números).";
      }
    }

    // Región / Comuna: requeridas (en Registro son selects con valor no nulo)
    if (!f.region || f.region.trim().length === 0) {
      e.region = "Selecciona/ingresa una región.";
    }
    if (!f.comuna || f.comuna.trim().length === 0) {
      e.comuna = "Selecciona/ingresa una comuna.";
    }

    return e;
  }

  // Revalidar en cada cambio
  useEffect(() => {
    setErrors(validarField(form));
  }, [form]);

  const isValid = useMemo(() => {
    const e = validarField(form);
    const noErrors = Object.keys(e).length === 0;
    return noErrors && cart.length > 0; // carrito no vacío
  }, [form, cart]);

  function confirmarPago() {
    // última barrera
    const e = validarField(form);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      alert("Por favor corrige los errores antes de continuar.");
      return;
    }
    if (!cart.length) {
      alert("Tu carrito está vacío.");
      return;
    }

    alert(
      `¡Gracias, ${form.nombre}!\nHemos recibido tu pedido por ${itemsCount} ítem(s) por un total de ${CLP(
        total
      )}.\nMétodo de pago: ${form.metodoPago.toUpperCase()}.\n(Flujo demo)`
    );

    // limpiar carrito y notificar
    saveCart([]);
    setCart([]);
    localStorage.removeItem(CHECKOUT_KEY);
    router.push("/");
  }

  return (
    <>
      {/* Formulario estilo Registro */}
      <section className="registration-section">
        <div className="container">
          <div className="registration-container">
            <h2 className="section-title">Pago</h2>
            <p className="section-subtitle">Ingresa tus datos para finalizar la compra</p>

            <div className="registration-form">
              <form id="Pago" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="pagoNombre" className="form-label">Nombre completo</label>
                      <input
                        id="pagoNombre"
                        type="text"
                        className={`form-control form-control-lg ${errors.nombre ? "is-invalid" : ""}`}
                        placeholder="Nombre completo"
                        maxLength={100}
                        minLength={3}
                        required
                        value={form.nombre}
                        onChange={(e) => onChange("nombre", e.target.value)}
                      />
                      <p id="mensajeNombre" className="invalid-feedback">{errors.nombre}</p>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="pagoCorreo" className="form-label">Correo</label>
                      <input
                        id="pagoCorreo"
                        type="email"
                        className={`form-control form-control-lg ${errors.correo ? "is-invalid" : ""}`}
                        placeholder="Correo"
                        maxLength={100}
                        required
                        value={form.correo}
                        onChange={(e) => onChange("correo", e.target.value)}
                      />
                      <p id="mensajeCorreo" className="invalid-feedback">{errors.correo}</p>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="pagoTelefono" className="form-label">Teléfono (opcional)</label>
                      <input
                        id="pagoTelefono"
                        type="tel"
                        className={`form-control form-control-lg ${errors.telefono ? "is-invalid" : ""}`}
                        placeholder="Teléfono (9 dígitos)"
                        maxLength={12}
                        value={form.telefono || ""}
                        onChange={(e) => onChange("telefono", e.target.value)}
                      />
                      <p id="mensajeTelefono" className="invalid-feedback">{errors.telefono}</p>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="pagoDireccion" className="form-label">Dirección (opcional)</label>
                      <input
                        id="pagoDireccion"
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Dirección"
                        maxLength={120}
                        value={form.direccion || ""}
                        onChange={(e) => onChange("direccion", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="pagoRegion" className="form-label">Región</label>
                      <input
                        id="pagoRegion"
                        type="text"
                        className={`form-control form-control-lg ${errors.region ? "is-invalid" : ""}`}
                        placeholder="Región"
                        required
                        value={form.region || ""}
                        onChange={(e) => onChange("region", e.target.value)}
                      />
                      <p id="mensajeRegion" className="invalid-feedback">{errors.region}</p>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="pagoComuna" className="form-label">Comuna</label>
                      <input
                        id="pagoComuna"
                        type="text"
                        className={`form-control form-control-lg ${errors.comuna ? "is-invalid" : ""}`}
                        placeholder="Comuna"
                        required
                        value={form.comuna || ""}
                        onChange={(e) => onChange("comuna", e.target.value)}
                      />
                      <p id="mensajeComuna" className="invalid-feedback">{errors.comuna}</p>
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label d-block">Método de pago</label>
                      <div className="btn-group" role="group" aria-label="metodo pago">
                        <input
                          type="radio"
                          className="btn-check"
                          name="metodoPago"
                          id="pagoTarjeta"
                          checked={form.metodoPago === "tarjeta"}
                          onChange={() => onChange("metodoPago", "tarjeta")}
                        />
                        <label className="btn btn-outline-dark" htmlFor="pagoTarjeta">Tarjeta</label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="metodoPago"
                          id="pagoTransferencia"
                          checked={form.metodoPago === "transferencia"}
                          onChange={() => onChange("metodoPago", "transferencia")}
                        />
                        <label className="btn btn-outline-dark" htmlFor="pagoTransferencia">Transferencia</label>

                        <input
                          type="radio"
                          className="btn-check"
                          name="metodoPago"
                          id="pagoEfectivo"
                          checked={form.metodoPago === "efectivo"}
                          onChange={() => onChange("metodoPago", "efectivo")}
                        />
                        <label className="btn btn-outline-dark" htmlFor="pagoEfectivo">Efectivo</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="pagoNotas" className="form-label">Notas (opcional)</label>
                      <textarea
                        id="pagoNotas"
                        className="form-control"
                        placeholder="Alguna indicación para tu pedido..."
                        rows={3}
                        maxLength={300}
                        value={form.notas || ""}
                        onChange={(e) => onChange("notas", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => router.push("/Carrito")}>
                    Editar carrito
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={confirmarPago}
                    disabled={!isValid}
                    aria-disabled={!isValid}
                    title={!isValid ? "Completa correctamente los datos para continuar" : "Confirmar pago"}
                  >
                    Confirmar pago
                  </button>
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
                                src={it.imagen.startsWith("/") ? it.imagen : `/${it.imagen}`}
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
                          <td className="text-end">{CLP(it.precio)}</td>
                          <td className="text-end">{CLP(it.precio * it.qty)}</td>
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
                  <h5 className="m-0">Precio total: {CLP(total)}</h5>
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
                    <strong>{CLP(subtotal)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Envío</span>
                    <strong>{CLP(envio)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Impuestos</span>
                    <strong>{CLP(impuestos)}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total</span>
                    <strong>{CLP(total)}</strong>
                  </li>
                </ul>

                <button
                  className="btn btn-dark w-100 mb-2"
                  onClick={confirmarPago}
                  disabled={!isValid}
                  aria-disabled={!isValid}
                >
                  Confirmar pago
                </button>
                <button className="btn btn-outline-secondary w-100" onClick={() => router.push("/Carrito")}>
                  Editar carrito
                </button>

                <div className="mt-3 small text-muted">
                  <p className="mb-1">• Los precios están expresados en CLP.</p>
                  <p className="mb-1">• Envío: retiro en tienda (sin costo) o calcular en checkout.</p>
                  <p className="mb-0">• Métodos de pago: tarjeta, transferencia, efectivo (demo).</p>
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