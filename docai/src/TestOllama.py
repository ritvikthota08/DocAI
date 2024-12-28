from openai import OpenAI

base_url = "http://localhost:11434/v1"
api_key = "ollama"
system_prompt = "You are an assistant for doctors. Help in diagnoses and suggest possible ways to help a person get better with their health problems"
user_prompt = "A patient of mine told me they have had severe depressive episodes in the past couple of months. What treatments should I give them to help with these episodes?"

api = OpenAI(api_key=api_key, base_url=base_url)


def main():
    completion = api.chat.completions.create(
        model="mistral",
        messages=[
            {"role": "assistant", "content": system_prompt},
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