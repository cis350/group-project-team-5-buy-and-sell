from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
import time

# Correct path to the chromedriver
driver_path = 'C:/Users/qaree/Downloads/chromedriver-win64 (1)/chromedriver-win64/chromedriver.exe'
service = Service(executable_path=driver_path)
browser = webdriver.Chrome(service=service)

try:
    # Go to the login page
    browser.get('https://mypenn.upenn.edu/s/login/')
    print("Navigated to login page.")

    # Find the login button and click it
    login_button = browser.find_element(By.CSS_SELECTOR, "button.slds-button.slds-button_neutral")
    login_button.click()
    print("Clicked login button.")

    # Wait for the username and password input fields
    username_input = WebDriverWait(browser, 20).until(EC.presence_of_element_located((By.ID, 'username')))
    password_input = WebDriverWait(browser, 20).until(EC.presence_of_element_located((By.ID, 'password')))
    print("Username and password fields are present.")

    # Input credentials
    username_input.send_keys('areeba')
    password_input.send_keys('ShaykhNourKabbani99!')
    password_input.send_keys(Keys.ENTER)
    print("Credentials entered and submitted.")

    # Navigate directly to the search results page for "Muslim student association"
    search_url = 'https://mypenn.upenn.edu/s/directory#q=muslim%20student%20association&sort=relevancy&numberOfResults=40'
    # Wait for Duo authentication to complete before navigating to the search page
    WebDriverWait(browser, 60).until(EC.presence_of_element_located((By.ID, 'trust-browser-button')))
    time.sleep(2)  # Small delay to make sure the post-authentication process has settled
    browser.get(search_url)
    print("Navigated to the search results page.")

    # Here you can add code to interact with the search results

    # Keep the browser open for a while to observe what's happening
    time.sleep(30)
except Exception as e:
    print("An error occurred: ", str(e))
finally:
    # Close the browser
    browser.quit()
    print("Browser closed.")
