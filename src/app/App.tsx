import { useState } from 'react'
import { HomePage } from '../pages/HomePage'
import { Header, Footer } from '../widgets'
import './styles/index.scss'


export const App = () => {

const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // const apiKey = ''; // замени на свой API-ключ

  const askDeepSeek = async (userQuestion:string) => {
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-8b-instruct:free",
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

      { <div>  
  <strong>Ответ:</strong> 


  {
    loading ? (
      <div>Загрузка...</div>  
    )
  : answer ? (
        <div>
          <p>{answer}</p>
        </div>
      ) : null
}  
</div> }
    </div>
      
    </>
  )
}