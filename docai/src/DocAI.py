# Quick Rundown for first time in backend

    # VIRTUAL ENVIRONMENT SETUP
        # You must make your own virtual environment if you have already not
        # Please look here: https://www.geeksforgeeks.org/create-virtual-environment-using-venv-python/
        # before starting on this file for the backend
    
    # DOWNLOAD MODULES FOR BACKEND
        # Make sure to download the dotenv module for getting the environment(env) file
        # and the OpenAI module to get API instance for app use
        # OPTIONAL: You can download Ollama to use and experiment with the AI responses as well
        # Look here for that -> https://www.youtube.com/watch?v=EBUMxu2hl34

    # GPT TESTING
        # BE MINDFUL OF TOKEN USE (keep max tokens(words generated) to about 600)
        # API access has a limited amount of tokens that can be used per month

#import of os, JSON, dotenv, Flask, and OpenAI modules
import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask, render_template, request, jsonify
from openai import OpenAI

#Finds and loads api key
_ = load_dotenv(find_dotenv())
base_url = "https://api.aimlapi.com"
api_key = os.environ.get('GPT_API_KEY')

# Prompt to set up the ai assistant
system_prompt = "You are an assistant for doctors. Help in diagnoses and suggest possible ways to help a person get better with their health problems"

# API instance to call API functions
api = OpenAI(api_key=api_key, base_url=base_url)



# instance of flask application
app = Flask(__name__)

# Gets the response of the user and returns ai generated response based on user response
def GPT_Response(user_prompt):

    completion = api.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "assistant", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.7,
        max_tokens=600,
    )

    response = completion.choices[0].message.content
    return response



# test route to check if flask integration worked
@app.route("/Test")
def test():
    return "<p>Test test test!</p>"

# route to log in or register for DocAI
# may need to seperate and create different routes and pages of log in and registration
# for better organization of different web pages
@app.route("/login")
def logInAndRegistration():
    return "Log in and registration page of DocAI"

# home route for accessing DocAI and navigating the DocAI space
@app.route("/")
def docAIMain():
    return render_template("index.html")

# settings route for accessing the settings of DocAI and changing settings of DocAI
@app.route("/settings")
def settings():
    return "Settings page of DocAI"

if __name__ == '__main__':  
   app.run(debug = True)  