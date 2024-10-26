import React, { useState, useEffect } from 'react';
import './App.css';

const shapeData = [
  { image: 'doughnut.jpeg', shape: 'Circle' },
  { image: 'pizza.jpeg', shape: 'Triangle' },
  { image: 'writingpad.png', shape: 'Rectangle' },
  { image: 'starfish.jpeg', shape: 'Star' },
  { image: 'plate.jpeg', shape: 'Oval' },
  { image: 'clock.jpeg', shape: 'Circle' },
  { image: 'tv.jpeg', shape: 'Rectangle' },
  { image: 'spinner.png', shape: 'Circle' },
  { image: 'window.jpeg', shape: 'Rectangle' },
  { image: 'balloon.png', shape: 'Oval' },
  { image: 'spidernet.jpeg', shape: 'Pentagon' },
  { image: 'swimmingring.png', shape: 'Circle' },
  { image: 'stopsign.jpeg', shape: 'Octagon' },
  { image: 'radio.png', shape: 'Rectangle' },
  { image: 'heart.jpeg', shape: 'Heart' },
  { image: 'coin.jpeg', shape: 'Circle' },
  { image: 'tree.png', shape: 'Triangle' },
  { image: 'egg.jpeg', shape: 'Oval' },
  { image: 'board.png', shape: 'Rectangle' },
  { image: 'ball.jpeg', shape: 'Circle' },
  { image: 'chess.jpeg', shape: 'Square' },
  { image: 'pendant.png', shape: 'Heart' },
  { image: 'earth.png', shape: 'Circle' },
  { image: 'bag.png', shape: 'Rectangle' },
  { image: 'cookies.png', shape: 'Star' },
  { image: 'cube.png', shape: 'Square' },
  { image: 'medal.png', shape: 'Circle' },
  { image: 'letter.png', shape: 'Rectangle' },
  { image: 'button.png', shape: 'Circle' },
  { image: 'mirror.png', shape: 'Oval' },
  { image: 'creditard.png', shape: 'Rectangle' },
  { image: 'watermelon.png', shape: 'Triangle' },
  { image: 'sun.png', shape: 'Circle' },
  { image: 'badge.png', shape: 'Star' },
  { image: 'box.png', shape: 'Rectangle' },
  { image: 'cap.png', shape: 'Triangle' },
  { image: 'giftbox.jpeg', shape: 'Square' },
  { image: 'cheese.png', shape: 'Triangle' },
  { image: 'disc.png', shape: 'Circle' },
  { image: 'hill.png', shape: 'Triangle' },
  { image: 'mobile.png', shape: 'Rectangle' },
  { image: 'key.png', shape: 'Heart' },
  { image: 'snake.png', shape: 'Square' },
  { image: 'poloroid.png', shape: 'Rectangle' },
  { image: 'note.png', shape: 'Square' },
  { image: 'lollipop.png', shape: 'Circle' },
  { image: 'rugby.png', shape: 'Oval' },
  { image: 'signal.png', shape: 'Rectangle' },
  { image: 'puzzle.png', shape: 'Square' },
  { image: 'smiley.png', shape: 'Circle' }
  
];

const Game = () => {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [currentShape, setCurrentShape] = useState(shapeData[0]);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [totalTurns, setTotalTurns] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState([]);

  useEffect(() => {
    if (gameStarted && !gameOver && currentShapeIndex < shapeData.length) {
      nextTurn();
    }
  }, [gameStarted, gameOver, currentShapeIndex]);

  const nextTurn = () => {
    const randomShape = shapeData[currentShapeIndex];
    setCurrentShape(randomShape);

    const shuffledOptions = [...new Set(shapeData.map(data => data.shape))];
    shuffledOptions.sort(() => Math.random() - 0.5);

    setOptions(shuffledOptions);
    setFeedback('');
  };

  const handleOptionClick = (option) => {
    if (option === currentShape.shape) {
      setScore(score + 2);
      setFeedback('Correct!');
    } else {
      setFeedback('Incorrect. Try again!');
      setWrongAttempts((prevAttempts) => [
        ...prevAttempts,
        { image: currentShape.image, correctShape: currentShape.shape }
      ]);
    }

    const newTotalTurns = totalTurns + 1;
    setTotalTurns(newTotalTurns);

    if (newTotalTurns >= shapeData.length) {
      setGameOver(true);
    } else {
      setTimeout(() => setCurrentShapeIndex(currentShapeIndex + 1), 1000);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setTotalTurns(0);
    setWrongAttempts([]);
    setCurrentShapeIndex(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="game">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Guess The Correct Shape!</h1>
          <button onClick={handleStartGame} className="start-button">Start Quiz</button>
        </div>
      ) : !gameOver ? (
        <>
          <div className="score-board">
          <div className="score" style={{ fontSize: '1.7rem' }}> Score: {score} | Total Turns: {totalTurns} </div>
            <button onClick={handleRestart} className="restart-button">Restart</button>
          </div>
          {currentShape && (
            <>
              <img
                src={process.env.PUBLIC_URL + `/images/${currentShape.image}`}
                alt="Object"
                className="shape-image"
              />
              <div className="options">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className="option-button"
                  >
                    {option}
                  </button>
                ))}
              </div>
              {feedback && <div className="feedback">{feedback}</div>}
            </>
          )}
        </>
      ) : (
        <div className="game-over">
          <h1>Game Over!</h1>
          <div className="final-score" style={{ fontSize: '1.8rem' }}>Final Score: {score}</div>
          <h1>Incorrect Attempts:</h1>
          {wrongAttempts.length > 0 ? (
            <ul>
              {wrongAttempts.map((attempt, index) => (
                <li key={index}>
                  The correct shape of the object {' '}
                  <img
                    src={process.env.PUBLIC_URL + `/images/${attempt.image}`}
                    alt="Missed Object"
                    className="missed-shape-image"
                  />{' '}
                  is {attempt.correctShape}.
                </li>
              ))}
            </ul>
          ) : (
            <p>You answered all correctly! Well done!</p>
          )}
          <button onClick={handleRestart} className="restart-button">Start Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
