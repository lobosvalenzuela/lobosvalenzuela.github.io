"use client";
import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [mensajeLog, setMensajeLog] = useState("");
  const [mensajeError, setMensajeError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    setMensajeLog("");
    setMensajeError(false);

    try {
      const login = {
        email: formData.email,
        password: formData.password
      }
      const response = await fetch('http://localhost:8080/api/v1/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
    });
    if(response.ok){
      const loginFound = await response.json();
      setMensajeLog("Login exitoso");
      setMensajeError(false);
      setFormData({
        email: "",
        password: ""
      });
    }else{
      setMensajeLog("Error, mail o password incorrectos");
      setMensajeError(true);
    }
  }catch (error){
      setMensajeLog("Error en el login");
      setMensajeError(true);
    }
  }
  return (
    <>
    <section className="login-section py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <h2 className="section-title text-center mb-3">Login Cliente</h2>
                <p className="section-subtitle text-center text-muted mb-4">
                  Por favor ingrese sus credenciales para acceder a su cuenta
                </p>
                <Form id="loginForm" onSubmit={handleSubmit} noValidate>
                  <FloatingLabel
                    controlId="email"
                    label="Correo:"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      name="correoLog"
                      minLength={10}
                      maxLength={40}
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="password"
                    label="Contraseña:"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      name="passLog"
                      minLength={4}
                      maxLength={10}
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  {/* Replaced <p id="mensajeLog"> with <Alert> */}
                  {mensajeLog && (
                    <Alert variant={mensajeError ? 'danger' : 'success'} id="logMsg" className="text-center">
                      {mensajeLog}
                    </Alert>
                  )}
                  <Button id="logBoton" type="submit" variant="secondary" size="lg" className="w-100">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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

export default Login;
