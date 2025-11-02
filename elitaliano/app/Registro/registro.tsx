// app/Registro/registro.tsx
"use client"
import React from "react";
import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";


const Registro: React.FC = () => {
  const dominioCorreo = ["@duoc.cl", "@gmail.com", "@profesor.duoc.cl"];
  const [formData, setFormData] = useState<{ nombreReg: string; correoReg: string; pass1: string; pass2: string }>({
    nombreReg: "",
    correoReg: "",
    pass1: "",
    pass2: ""
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
  /* funcion para validar el formulario */
  const validarForm = () => {
    const newErrors: Record<string, string> = {};
    /* validar nombre */
    const caracteres = /^[\p{L}\s]+$/u;
    if (!caracteres.test(formData.nombreReg)) {
      newErrors['nombreReg'] = "El nombre solo debe contener letras y espacios.";
    }
    /* validar correo */
    const correoLow = formData.correoReg.toLowerCase();
    if (!dominioCorreo.some(dominioCorreo => correoLow.endsWith(dominioCorreo))) {
      newErrors['correoReg'] = "El correo debe pertenecer a los dominios permitidos";
    }
    /* validar pass 1  */
    const specialChar = /[-_!#$&.,*+|¡¿?'()]/;
    if (!specialChar.test(formData.pass1)) {
      newErrors['pass1'] = "La contraseña debe contener al menos un caracter especial.";
    }
    /* validar pass iguales */
    if (formData.pass1 !== formData.pass2) {
      newErrors['pass2'] = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExitoMsg("");
    setErrors({});

    if (validarForm()) {
      setExitoMsg("Registro existoso!");
      const users = JSON.parse(window.localStorage.getItem("users") || "[]");
      users.push(formData);
      window.localStorage.setItem("users", JSON.stringify(users));

      setFormData({
        nombreReg: "",
        correoReg: "",
        pass1: "",
        pass2: ""
      });
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        general: "Registro fallido. Revise los campos"
      }))
    }
  }
  return (
    <>
      <section className="registration-section py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8}>
              <Card className="shadow-lg border-0">
                <Card.Body className="p-4 p-md-5">
                  <div className="text-center mb-4">
                    <h2 className="display-5 section-title">Registrate aqui</h2>
                    <p className="lead text-muted section-subtitle">
                      Crea tu cuenta para recibir unicos descuentos
                    </p>
                  </div>

                  {/* Form */}
                  <Form id="Registro" onSubmit={handleSubmit} noValidate>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="nombreReg">
                          <Form.Label>Nombre completo</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Nombre completo"
                            maxLength={50}
                            minLength={3}
                            required
                            value={formData.nombreReg}
                            onChange={handleChange}
                            isInvalid={!!errors.nombreReg}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nombreReg}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="correoReg">
                          <Form.Label>Correo</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Correo"
                            minLength={10}
                            maxLength={40}
                            required
                            value={formData.correoReg}
                            onChange={handleChange}
                            isInvalid={!!errors.correoReg}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.correoReg}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="pass1">
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            size="lg"
                            placeholder="Contraseña"
                            minLength={4}
                            maxLength={10}
                            required
                            value={formData.pass1}
                            onChange={handleChange}
                            isInvalid={!!errors.pass1}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.pass1}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="pass2">
                          <Form.Label>Confirmar contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            size="lg"
                            placeholder="Confirmar contraseña"
                            minLength={4}
                            maxLength={10}
                            required
                            value={formData.pass2}
                            onChange={handleChange}
                            isInvalid={!!errors.pass2}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.pass2}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="telefonoReg">
                          <Form.Label>Teléfono (opcional)</Form.Label>
                          <Form.Control
                            type="number"
                            minLength={9}
                            maxLength={9}
                            size="lg"
                            placeholder="Teléfono (opcional)"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="sel_region">
                          <Form.Label>Región</Form.Label>
                          <Form.Select
                            name="sel_region"
                            size="lg"
                            defaultValue="null"
                          >
                            <option value="null">-- Seleccione la Región --</option>
                            <option value="Santiago">Región Metropolitana de Santiago</option>
                            <option value="Araucania">Región de la Araucanía</option>
                            <option value="Ñuble">Región de Ñuble</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="sel_comuna">
                          <Form.Label>Comuna</Form.Label>
                          <Form.Select
                            name="sel_comuna"
                            size="lg"
                            defaultValue="null"
                          >
                            <option value="null">-- Seleccione la Comuna --</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}></Col>
                    </Row>
                    {ExitoMsg && (
                      <Alert variant="success" className="mt-3">
                        {ExitoMsg}
                      </Alert>
                    )}
                    {errors.general && (
                      <Alert variant="danger" className="mt-3">
                        {errors.general}
                      </Alert>
                    )}
                    <div className="d-grid mt-4">
                      <Button type="submit" variant="secondary" size="lg">
                        Registrarse
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer (no change needed) */}
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

export default Registro;
