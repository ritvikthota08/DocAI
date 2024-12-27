# Quick Rundown of virtual environment for future backend members
    # You must make your own virtual environment if you have already not
    # Please look here: https://www.geeksforgeeks.org/create-virtual-environment-using-venv-python/
    # before starting on this file for the backend

# import flask module
from flask import Flask, render_template

# instance of flask application
app = Flask(__name__)

# test route to check if flask integration worked
@app.route("/Test")
def hello_world():
    return "<p>Test test test!</p>"

# route to log in or register for DocAI
# may need to seperate and create different routes and pages of log in and registration
# for better organization of different web pages
@app.route("/log in")
def logInAndRegistration():
    return "Log in and registration page of DocAI"

# home route for accessing DocAI and navigating the DocAI space
@app.route("/")
def docAIMain():
    return ("Main page")

# settings route for accessing the settings of DocAI and changing settings of DocAI
@app.route("/settings")
def settings():
    return "Settings page of DocAI"

if __name__ == '__main__':  
   app.run(debug = True)  