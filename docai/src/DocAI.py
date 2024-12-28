# Quick Rundown of virtual environment for future backend members
    # You must make your own virtual environment if you have already not
    # Please look here: https://www.geeksforgeeks.org/create-virtual-environment-using-venv-python/
    # before starting on this file for the backend

# Overview of API


# import flask module
from flask import Flask, render_template

#import OpenAI module
from openai import OpenAI

base_url = "https://api.aimlapi.com"
api_key = "903022bf2dc24041b00d0afd1c3d337b"

# Prompt to set up the ai assistant
system_prompt = "You are an ai assistant for doctors. Help in diagnoses and suggest possible ways to help a person get better with their health problems"

# Prompt to set up the user's input
user_prompt = "A patient of mine told me they have had severe depressive episodes in the past couple of months. What treatments should I give them to help with these episodes?"

# api
api = OpenAI(api_key=api_key, base_url=base_url)

completion = api.chat.completions.create(
        model="mistralai/Mistral-7B-Instruct-v0.2",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
        max_tokens=256,
    )

response = completion.choices[0].message.content

# instance of flask application
app = Flask(__name__)

def GPT_Response():
    return response

# test route to check if flask integration worked
@app.route("/Test")
def test():
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
    return response

# settings route for accessing the settings of DocAI and changing settings of DocAI
@app.route("/settings")
def settings():
    return "Settings page of DocAI"

if __name__ == '__main__':  
   app.run(debug = True)  