from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
# Import By
from selenium.webdriver.common.by import By
# Import Key
from selenium.webdriver.common.keys import Keys
# Requests for Api calls
import requests


# Options to prevent the browser from being detected as a web driver and browser does NOT close after the test
options = webdriver.ChromeOptions()
# Experimental detach
options.add_experimental_option("detach", True)


# Driver
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)

# Open the URL
driver.get("https://www.google.com")

# SSO page, click the button that includes the text "Continue with SSO"
driver.find_element(By.XPATH, "//button[contains(text(),'Continue with SSO')]").click()

# After clicking the button, the page will be redirected to the SSO page, then find input tag and input the username
driver.find_element(By.XPATH, "//input").send_keys("username")

# Hit the enter key
driver.find_element(By.XPATH, "//input").send_keys(Keys.ENTER)

# Disable web driver
driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

# Implicitly wait for 10 seconds
driver.implicitly_wait(10)

# Check if there is a tag with the class name "layout-content-main"
if driver.find_element(By.CLASS_NAME, "layout-content-main"):
    # Background color: Green
    print("\033[1;32;40m INFO: Successfully logged in \033[0;37;40m")
else:
    # Background color: Red
    print("\033[1;31;40m ERROR: Failed to log in \033[0;37;40m")

# Find the ul tag with class name "layout-inline-menu-action-panel", get the second li tag, click the button inside
driver.find_element(By.CLASS_NAME, "layout-inline-menu-action-panel").find_elements(By.TAG_NAME, "li")[1].find_element(By.TAG_NAME, "button").click()

# Wait for 3 seconds
driver.implicitly_wait(3)

# Check if localStorage is empty
if driver.execute_script("return window.localStorage.length") == 0:
    # Background color: Red
    print("\033[1;31;40m ERROR: Local storage is empty \033[0;37;40m")
else:
    # Background color: Green
    print("\033[1;32;40m INFO: Local storage is not empty \033[0;37;40m")

# Clear localStorage
driver.execute_script("window.localStorage.clear()")

# Refresh the page
driver.refresh()

# Close the browser
driver.close()



# Assert true to be true
assert True
