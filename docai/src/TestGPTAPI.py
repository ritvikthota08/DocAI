from openai import OpenAI

base_url = "https://api.aimlapi.com"
api_key = "903022bf2dc24041b00d0afd1c3d337b"
system_prompt = "You are an ai assistant for doctors. Help in diagnoses and suggest possible ways to help a person get better with their health problems"
user_prompt = "A patient of mine told me they have had severe depressive episodes in the past couple of months. What treatments should I give them to help with these episodes?"

api = OpenAI(api_key=api_key, base_url=base_url)


def main():
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

    print("User:", user_prompt)
    print("AI:", response)


if __name__ == "__main__":
    main()