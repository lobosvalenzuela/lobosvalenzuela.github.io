// app/Login/login.tsx
"use client";
import React, { useState } from "react";
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

interface loginUser {
  nombreReg: string;
  correoReg: string;
  pass1: string;
  pass2: string;
}
const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    correoLog: "",
    passLog: ""
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

  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    setMensajeLog("");
    setMensajeError(false);

    const users: loginUser[] = JSON.parse(window.localStorage.getItem("users")||"[]");
    const userEncontrado = users.find(user => user.correoReg === formData.correoLog && user.pass1 === formData.passLog);

    if(userEncontrado){
      setMensajeLog("Login exitoso, bienvenido "+ userEncontrado.nombreReg);
      setMensajeError(false);
      setFormData({
        correoLog: "",
        passLog: ""
      });
    }else{
      setMensajeLog("Error, mail o password incorrectos");
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
                    controlId="correoLog"
                    label="Correo:"
                    className="mb-3"
                  >
                    <Form.Control
                      id = "logCorreo"
                      type="text"
                      name="correoLog"
                      minLength={10}
                      maxLength={40}
                      placeholder="Email"
                      required
                      value={formData.correoLog}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="passLog"
                    label="Contraseña:"
                    className="mb-4"
                  >
                    <Form.Control
                      id="logPass"
                      type="password"
                      name="passLog"
                      minLength={4}
                      maxLength={10}
                      placeholder="Password"
                      required
                      value={formData.passLog}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  {/* Replaced <p id="mensajeLog"> with <Alert> */}
                  {mensajeLog && (
                    <Alert variant={mensajeError ? 'danger' : 'success'} id="logMsg" className="text-center">
                      {mensajeLog}
                    </Alert>
                  )}

                  {/* Replaced <button> with <Button> */}
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

    {/* Footer (This part was already using Bootstrap classes) */}
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
