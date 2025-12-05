import React from "react";
import {useState, useEffect, useRef} from "react";
import './GameCounter.css';

const GameCounter = () => {
    const [count, setCount] = useState (0);
    const [seconds, setSeconds] = useState (0);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState ('нажми "+", начни игру. У тебя 20 секунд');

    const countRef = useRef(0);


    // запуск таймера
const countPlus = () => {
  if (!isRunning && seconds === 0) {
    setIsRunning(true);
    setMessage('Таймер запущен! Жми быстрее...');
  }
  if (isRunning) {
    countRef.current += 1;
    setCount(countRef.current);
  }
};


    // Настройки таймера 
    useEffect (() => {
        if (!isRunning) return;

        const interval = setInterval (() => {
            setSeconds (prev => {
                if ( prev >= 20) {
                    clearInterval(interval);
                    setIsRunning(false);
                    setMessage(`Время вышло! ты нажал "+": ${countRef.current} раз `);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isRunning]);

    //Начинаем игру снала по клавише "R"
    useEffect (()=> {
        const handleKey = (event) => {
            if (event.key === "r" || event.key === "к") {
                countRef.current = 0;
                setSeconds(0);
                setIsRunning(false);
                setMessage('нажми "+", начни игру. У тебя 20 секунд');
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);


return (
    <>
        <div className="counterBox"> 
            <h1 className="title-h1">Игра на реакцию на 20 секунд</h1>
            <div className="counter-controls">
                <button className="btn-counter" onClick={countPlus} disabled={!isRunning && seconds > 0}>+</button>
                <div className="resultBox">{count}</div>
            </div>
            <div className="message-box">{message}</div>
            <div className="timer-box">{seconds} сек</div>
            <div className="hint-box">Нажмите "R" чтобы начать сначала</div>
        </div>
    </>
)

};

export default GameCounter;