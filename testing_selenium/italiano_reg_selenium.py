import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
 
def testFalloCompleto(driver):
    nomReg = driver.find_element(By.ID, "nombreReg")
    print(nomReg.text)
    nomReg.click()
    nomReg.send_keys("152552/#")

    correoReg = driver.find_element(By.ID, "correoReg")
    print(correoReg.text)
    correoReg.click()
    correoReg.send_keys("jeje@jeje.com")
 
 
    passReg = driver.find_element(By.ID, "pass1")
    print(passReg.text)
    passReg.click()
    passReg.send_keys("asd12345")
    
    passReg2 = driver.find_element(By.ID, "pass2")
    print(passReg2.text)
    passReg2.click()
    passReg2.send_keys("jeje12")
    
 
    time.sleep(1)  # Pause to see the result
 
 
    # element3 = driver.find_element(By.CLASS_NAME, "btn btn-success w-100")
    element3 = driver.find_element(By.CLASS_NAME, "botonReg")
    print(element3.text)
    time.sleep(1)
    element3.click()
 
    assertNom = driver.find_element(By.ID, "mensajeNombre")
    assertCorreo = driver.find_element(By.ID, "mensajeCorreo")
    assertPass1 = driver.find_element(By.ID, "mensajePass1")
    assertPass2 = driver.find_element(By.ID, "mensajePass2")
    print(f"{assertNom.text}, {assertCorreo.text}, {assertPass1.text}, {assertPass2.text}")
    assert assertNom.text == "El nombre solo puede contener letras y espacios"
    assert assertCorreo.text == "Dominio de correo invalido"
    assert assertPass1.text == "La password debe tener un caracter especial"
    assert assertPass2.text == "Las contraseñas no coinciden"
    print("Primer caso probado exitosamente. El sistema NO dejó iniciar sesión.")
 
    time.sleep(1)  # Pause to see the result
    """
    print("Current URL:")
    print(driver.current_url)
    link_element = driver.find_element(By.LINK_TEXT, "Bati-Duoc")
    print(link_element.text)
    link_element.click()
 
 
    print("Current URL:")
    print(driver.current_url)
    WebDriverWait(driver, 10).until(EC.url_contains("https://elpeor.github.io/Evaluaci%C3%B3n1/principal.html"))
    assert "https://elpeor.github.io/Evaluaci%C3%B3n1/principal.html" in driver.current_url
    print("Segundo caso probado exitosamente. El sistema pasó a la página de inicio.")
 
 
    time.sleep(3)  # Pause to see the result
    """
 
def testPasswordMismatch(driver):
    driver.refresh()
    time.sleep(2)
    print("Refrescando la página para el siguiente caso de prueba...")
    nomReg = driver.find_element(By.ID, "nombreReg")
    print(nomReg.text)
    nomReg.click()
    nomReg.send_keys("jhon doe")

    correoReg = driver.find_element(By.ID, "correoReg")
    print(correoReg.text)
    correoReg.click()
    correoReg.send_keys("j.doe@gmail.com")
 
 
    passReg = driver.find_element(By.ID, "pass1")
    print(passReg.text)
    passReg.click()
    passReg.send_keys("asd12345*")
    
    passReg2 = driver.find_element(By.ID, "pass2")
    print(passReg2.text)
    passReg2.click()
    passReg2.send_keys("asd12345!")

    time.sleep(1)

    element3 = driver.find_element(By.CLASS_NAME, "botonReg")
    time.sleep(1)
    element3.click()

    assertPass1 = driver.find_element(By.ID, "mensajePass1")
    assertPass2 = driver.find_element(By.ID, "mensajePass2")
    print(f"{assertPass1.text}, {assertPass2.text}")
    assert assertPass2.text == "Las contraseñas no coinciden"
    print("Segundo caso probado exitosamente. El sistema NO dejó iniciar sesión por contraseñas no coincidentes")

def testMailDomain(driver):
    driver.refresh()
    time.sleep(2)
    print("Refrescando la página para el siguiente caso de prueba...")

    nomReg = driver.find_element(By.ID, "nombreReg")
    print(nomReg.text)
    nomReg.click()
    nomReg.send_keys("jhon doe")

    correoReg = driver.find_element(By.ID, "correoReg")
    print(correoReg.text)
    correoReg.click()
    correoReg.send_keys("j.doe@gmain.com")
 
 
    passReg = driver.find_element(By.ID, "pass1")
    print(passReg.text)
    passReg.click()
    passReg.send_keys("password123!")
    
    passReg2 = driver.find_element(By.ID, "pass2")
    print(passReg2.text)
    passReg2.click()
    passReg2.send_keys("password123!")

    time.sleep(1)

    element3 = driver.find_element(By.CLASS_NAME, "botonReg")
    time.sleep(1)
    element3.click()

    assertCorreo = driver.find_element(By.ID, "mensajeCorreo")
    print(f"{assertCorreo.text}")
    assert assertCorreo.text == "Dominio de correo invalido"
 
def testNoSpecialCharInPassword(driver):
    driver.refresh()
    time.sleep(2)
    print("Refrescando la página para el siguiente caso de prueba...")

    nomReg = driver.find_element(By.ID, "nombreReg")
    nomReg.click()
    nomReg.send_keys("jhon doe")

    correoReg = driver.find_element(By.ID, "correoReg")
    correoReg.click()
    correoReg.send_keys("j.doe@gmail.com")

    passReg1 = driver.find_element(By.ID, "pass1")
    passReg1.click()
    passReg1.send_keys("password1234")

    passReg2 = driver.find_element(By.ID, "pass2")
    passReg2.click()
    passReg2.send_keys("password1234")

    time.sleep(1)

    element3 = driver.find_element(By.CLASS_NAME, "botonReg")
    time.sleep(1)
    element3.click()
    assertPass1 = driver.find_element(By.ID, "mensajePass1")
    print(f"{assertPass1.text}")
    assert assertPass1.text == "La password debe tener un caracter especial"
    print("Tercer caso probado exitosamente. El sistema NO dejó iniciar sesión por falta de caracter especial en la contraseña")

def testSuccesful(driver):
    driver.refresh()
    time.sleep(2)
    print("Refrescando la página para el siguiente caso de prueba...")

    nomReg = driver.find_element(By.ID, "nombreReg")
    nomReg.click()
    nomReg.send_keys("jhon doe")
    correoReg = driver.find_element(By.ID, "correoReg")
    correoReg.click()
    correoReg.send_keys("j.doe@gmail.com")

    passReg1 = driver.find_element(By.ID, "pass1")
    passReg1.click()
    passReg1.send_keys("password123!")

    passReg2 = driver.find_element(By.ID, "pass2")
    passReg2.click()
    passReg2.send_keys("password123!")

    time.sleep(1)

    element3 = driver.find_element(By.CLASS_NAME, "botonReg")
    time.sleep(1)
    element3.click()

    assertExito = driver.find_element(By.ID, "mensajeExito")
    print(f"{assertExito.text}")
    assert assertExito.text == "Registro exitoso"
    print("Quinto caso probado exitosamente. El sistema dejó iniciar sesión.")

if __name__ == "__main__":
    driver = webdriver.Chrome()  # Or Firefox(), Edge(), etc.
    driver.get("https://bichincolina.github.io/ev2/elitaliano/")
    testFalloCompleto(driver)
    testPasswordMismatch(driver)
    testMailDomain(driver)
    testNoSpecialCharInPassword(driver)
    testSuccesful(driver)
    driver.quit()