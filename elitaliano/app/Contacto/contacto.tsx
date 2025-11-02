"use client";
import React, { useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

const Contacto: React.FC = () => {
  const dominioCorreo = ["@duoc.cl", "@gmail.com", "@profesor.duoc.cl"];
  const [formData, setFormData] = useState<{ contactoNombre: string; contactoEmail: string; contactoMensaje: string; }>({
    contactoNombre: "",
    contactoEmail: "",
    contactoMensaje: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [ExitoMsg, setExitoMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  }
  const validarContacto = () => {
    const newErrors: Record<string, string> = {};
    /* validar nombre */
    const caracteres = /^[\p{L}\s]+$/u;
    if (!caracteres.test(formData.contactoNombre)) {
      newErrors['contactoNombre'] = "El nombre solo debe contener letras y espacios.";
    }
    /* validar correo */
    const correoLow = formData.contactoEmail.toLowerCase();
    if (!dominioCorreo.some(dominioCorreo => correoLow.endsWith(dominioCorreo))) {
      newErrors['contactoEmail'] = "El correo debe pertenecer a los dominios permitidos";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setExitoMsg("");
    if (validarContacto()) {
      console.log("Formulario valido:", formData);
      setExitoMsg("Formulario enviado con éxito");
      setFormData({
        contactoNombre: "",
        contactoEmail: "",
        contactoMensaje: ""
      });
    } else {
      console.log("Formulario invalido");
    }
  };
  return (
    <>
      <section
        className="hero-section text-white text-center d-flex align-items-center justify-content-center"
        style={{
          height: "60vh",
          backgroundImage: "url('/IMG/cannoli-fondo-contacto.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-5 rounded-4">
          <h1 className="display-4 fw-bold">Contáctanos</h1>
          <p className="lead">¿Tienes alguna pregunta? Estamos para ayudarte</p>
        </div>
      </section>
      <section className="contact-section py-5">
        <Container>
          <div className="contact-container">
            <h2 className="text-center mb-4">Envíanos un mensaje</h2>
            <p className="text-center text-muted mb-5">
              ¡Nos encantaría conocer tu opinión!
            </p>
            <Form id="contactoForm" className="contact-form" onSubmit={handleSubmit} noValidate>
              <Row className="g-4">
                <Col md={6}>
                  <FloatingLabel
                    controlId="contactoNombre"
                    label="Nombre"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu nombre"
                      minLength={3}
                      maxLength={100}
                      required
                      value={formData.contactoNombre}
                      onChange={handleChange}
                      isInvalid={!!errors.contactoNombre} 
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactoNombre}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col md={6}>
                  <FloatingLabel
                    controlId="contactoEmail"
                    label="Email"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Ingresa tu email"
                      minLength={3}
                      maxLength={100}
                      required
                      value={formData.contactoEmail}
                      onChange={handleChange}
                      isInvalid={!!errors.contactoEmail}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactoEmail}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
              <FloatingLabel
                controlId="contactoMensaje"
                label="Mensaje"
                className="mt-4"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Ingresa tu mensaje..."
                  style={{ height: "150px" }}
                  minLength={3}
                  maxLength={500}
                  required
                  value={formData.contactoMensaje}
                  onChange={handleChange}
                />
              </FloatingLabel>
              <div className="text-center mt-4">
                <Button type="submit" variant="secondary" size="lg" className="rounded-pill">
                  Enviar
                </Button>
              </div>
              {ExitoMsg && (
                <Alert variant="success" className="text-center mt-3">
                  {ExitoMsg}
                </Alert>
              )}
            </Form>
          </div>
        </Container>
      </section>
      <footer
        className="py-4 text-center text-white"
        style={{ backgroundColor: "rgba(44,62,80,0.95)" }}
      >
        <p className="mb-0">
          &copy; 2025 El Italiano - Todos los derechos reservados
        </p>
      </footer>
    </>
  );
};

export default Contacto;
