from openai import OpenAI
import os
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

base_url = "https://api.aimlapi.com"
api_key = os.environ.get('GPT_API_KEY')
system_prompt = "You are an ai assistant for doctors. Help in diagnoses and suggest possible ways to help a person get better with their health problems"
user_prompt = "I have the flu, what treatments should i do to help with my sickness?"

api = OpenAI(api_key=api_key, base_url=base_url)


def main():
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

    print("User:", user_prompt)
    print("AI:", response)


if __name__ == "__main__":
    main()