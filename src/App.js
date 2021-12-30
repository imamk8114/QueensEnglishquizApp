import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const totalQuestions = 5;

  useEffect(() => {
		const runEffect = () => { fetch('https://jservice.io/api/random')
		.then(results => results.json())
		.then(data => {
			const titleRes = data[0].category.title;
			const questionRes =data[0].question ;
			const answerRes = data[0].answer;
			if(titleRes && questionRes && answerRes){
				setTitle(titleRes.toUpperCase().replace(/<[^>]+>/g, ''));
				setQuestion(questionRes.replace(/<[^>]+>/g, ''));
				setAnswer(answerRes.toLowerCase().replace(/<[^>]+>/g, ''));
			}
			else{
				runEffect();
			}

		});
	}
	
	runEffect();		
		
  }, [questionNumber])

  
  const handleSubmit = () =>{
		const userAnswer = document.querySelector('.answer-box');
		if(questionNumber<totalQuestions){
			setQuestionNumber(questionNumber => questionNumber+1);
		}
		else{
			document.querySelector('.show-score').style.display = 'grid';
		}
		if(userAnswer.value.trim().toLowerCase() === answer)
			setScore(score => score+1);
		userAnswer.value = ""
		}

	const handlePlayAgain =() => {
		document.querySelector('.show-score').style.display = 'none';
		setQuestionNumber(1);
	}

  return (
    <div className="App">
      <div className="quiz">
		  	<header className='title'>Online Quiz App</header>

        	<div className='question-count'>Question: {questionNumber}/{totalQuestions} </div>

        	<section className="question-section">
				{question} <br/><br/>
				hint : {title}
        	</section>  

			<section className="answer-section">
        	<textarea placeholder="type your answer here" type ="text" className="answer-box" />
        	<details className="show-answer">
			<summary>show answer</summary>
			<p>{answer}</p>
        	</details>
			</section>
	
	
      		<button 
				className="submit-btn" 
				onClick={handleSubmit}>
				Submit
        	</button>

			<div className='show-score'>
				<h3>You Scored {score}/{totalQuestions} </h3>
				<button onClick={handlePlayAgain}> Play Again </button>
			</div>
		</div>
		
      </div>
  );
}

export default App;
