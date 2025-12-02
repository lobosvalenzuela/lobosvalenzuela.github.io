"use client"
import React from "react";
import { useState } from "react";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";


const Registro: React.FC = () => {
  const dominioCorreo = ["@duoc.cl", "@gmail.com", "@profesor.duoc.cl"];

  const [formData, setFormData] = useState<{ nombre: string; email: string; password: string; passwordConfirm: string; admin: boolean }>({
    nombre: "",
    email: "",
    password: "",
    passwordConfirm: "",
    admin : false
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
    if (!caracteres.test(formData.nombre)) {
      newErrors['nombre'] = "El nombre solo debe contener letras y espacios.";
    }
    /* validar correo */
    const correoLow = formData.email.toLowerCase();
    if (!dominioCorreo.some(dominioCorreo => correoLow.endsWith(dominioCorreo))) {
      newErrors['email'] = "El correo debe pertenecer a los dominios permitidos";
    }
    /* validar pass 1  */
    const specialChar = /[-_!#$&.,*+|¡¿?'()]/;
    if (!specialChar.test(formData.password)) {
      newErrors['password'] = "La contraseña debe contener al menos un caracter especial.";
    }
    /* validar pass iguales */
    if (formData.password !== formData.passwordConfirm) {
      newErrors['passwordConfirm'] = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setExitoMsg("");
    setErrors({});

    if (validarForm()) {
      try {
        const Usuario = {
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          admin: formData.admin
        };
        const response = await fetch('https://ratatinprogramin-production.up.railway.app/api/v1/usuarios/crear', 
          {method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(Usuario),
        });
        console.log(response);
        if (response.ok) {
          console.log("Entro");
          setExitoMsg("Registro exitoso");
          setFormData({
            nombre: "",
            email: "",
            password: "",
            passwordConfirm: "",
            admin : false
          });
        }else{
          console.log("Entro else");
          setErrors(prevErrors => ({
            ...prevErrors,
            general: "Error 1"
          }));
        }
      }catch (error) {
        setErrors(prevErrors => ({
          ...prevErrors,
          general: "Error 2"
        }));
      }
    }else{
      setErrors(prevErrors => ({
        ...prevErrors,
        general: "Por favor corrige los errores en el formulario."
      }));
    }
  };
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
                        <Form.Group controlId="nombre">
                          <Form.Label>Nombre completo</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Nombre completo"
                            maxLength={50}
                            minLength={3}
                            required
                            value={formData.nombre}
                            onChange={handleChange}
                            isInvalid={!!errors.nombre}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.nombre}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Correo</Form.Label>
                          <Form.Control
                            type="text"
                            size="lg"
                            placeholder="Correo"
                            minLength={10}
                            maxLength={40}
                            required
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="g-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="password">
                          <Form.Label>Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            size="lg"
                            placeholder="Contraseña"
                            minLength={4}
                            maxLength={10}
                            required
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="passwordConfirm">
                          <Form.Label>Confirmar contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            size="lg"
                            placeholder="Confirmar contraseña"
                            minLength={4}
                            maxLength={10}
                            required
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            isInvalid={!!errors.passwordConfirm}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.passwordConfirm}
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