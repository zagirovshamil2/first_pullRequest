import { useState } from 'react'
import { HomePage } from '../pages/HomePage'
import { Header, Footer } from '../widgets'
import './styles/index.scss'
import { useFetch } from '../hooks/useFetch'


export const App = () => {

const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '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'; // замени на свой API-ключ

  const askDeepSeek = async (userQuestion) => {
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [{ role: "user", content: userQuestion }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка запроса: ${response.status} — ${errorText}`);
      }

      const data = await response.json();
      setAnswer(data.choices[0]?.message?.content || 'Ответ не получен');
    } catch (error) {
      setAnswer(`Произошла ошибка: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      askDeepSeek(question);
    }
  };
  return (
    <>
      <Header />
      <HomePage />
      <Footer />

<div >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Задай вопрос..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Отправка...' : 'Спросить'}
        </button>
      </form>

      {answer && (
        <div>
          <strong>Ответ:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
      
    </>
  )
}