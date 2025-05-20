
export  const useFetch = async (question: string) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "user",
          content: question
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ошибка запроса: ${response.status} — ${errorText}`);
  }

  const data = await response.json();
  console.log(data);
  return data
}


