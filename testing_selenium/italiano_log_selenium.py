import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

def testNoUser(driver):
    correoLog = driver.find_element(By.ID, "logCorreo")
    correoLog.click()
    correoLog.send_keys("johndoe@duoc.cl")

    passLog = driver.find_element(By.ID, "logPass")
    passLog.click()
    passLog.send_keys("password12#")

    time.sleep(1)
    botonLog = driver.find_element(By.ID, "logBoton")
    botonLog.click()

    assertMsj = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.ID, "mensajeLog"))
    )

    assert assertMsj.text == "Error, mail o password incorrectos"

    print("Test de usuario no existente completado.")

def testEmailDomain(driver):
    driver.refresh()
    time.sleep(2)
    print("Refrescando la página para el siguiente caso de prueba...")

    correoLog = driver.find_element(By.ID, "logCorreo")
    correoLog.click()
    correoLog.send_keys("johndoe@duo.cl")

    passLog = driver.find_element(By.ID, "logPass")
    passLog.click()
    passLog.send_keys("password12#")

    time.sleep(1)
    botonLog = driver.find_element(By.ID, "logBoton")
    botonLog.click()

    assertMsj = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.ID, "mensajeLog"))
    )

    assert assertMsj.text == "Error, mail o password incorrectos"

def testSucessLog(driver):
    driver.refresh()
    time.sleep(2)
    print("Refrescando la página para el siguiente caso de prueba...")
    
    print(f"Current URL: {driver.current_url}")
    link_element = driver.find_element(By.LINK_TEXT, "Registro")
    print(link_element.text)
    link_element.click()

    print(f"Current URL: {driver.current_url}")
    WebDriverWait(driver, 10).until(EC.url_contains("https://bichincolina.github.io/ev2/elitaliano/Registro"))
    assert "https://bichincolina.github.io/ev2/elitaliano/Registro" in driver.current_url
    
    nombreReg = driver.find_element(By.ID, "nombreReg")
    nombreReg.click()
    nombreReg.send_keys("jhon doe")

    correoReg = driver.find_element(By.ID, "correoReg")
    correoReg.click()
    correoReg.send_keys("johndoe@duoc.cl")

    passReg1 = driver.find_element(By.ID, "pass1")
    passReg1.click()
    passReg1.send_keys("password12#")
    passReg2 = driver.find_element(By.ID, "pass2")
    passReg2.click()
    passReg2.send_keys("password12#")

    botonReg = driver.find_element(By.CLASS_NAME, "botonReg")
    botonReg.click()

    print("Waiting for registration alert...")
    WebDriverWait(driver, 5).until(EC.alert_is_present())
    alert = driver.switch_to.alert
    print(f"Alert text: {alert.text}")
    alert.accept()
    
    WebDriverWait(driver, 10).until(EC.url_contains("https://bichincolina.github.io/ev2/elitaliano/Login"))
    assert "https://bichincolina.github.io/ev2/elitaliano/Login" in driver.current_url

    correoLog = driver.find_element(By.ID, "logCorreo")
    correoLog.click()
    correoLog.send_keys("johndoe@duoc.cl")

    passLog = driver.find_element(By.ID, "logPass")
    passLog.click()
    passLog.send_keys("password12#")

    time.sleep(1)
    botonLog = driver.find_element(By.ID, "logBoton")
    botonLog.click()

    assertMsj = driver.find_element(By.ID, "logMsg")
    assert assertMsj.text == "Login exitoso"

    print("Test de registro y login exitoso completado.")

if __name__ == "__main__":
    driver = webdriver.Chrome()
    driver.get("https://bichincolina.github.io/ev2/elitaliano/Login")
    testNoUser(driver)
    testEmailDomain(driver)
    testSucessLog(driver)
    driver.quit()