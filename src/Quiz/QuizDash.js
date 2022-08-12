import React, { useState, useEffect } from 'react';
import { firedb } from '../firebase';
import './QuizDash.css';

const QuizDash = () => {
  const [finalQuizData, setFinalQuizData] = useState([]);

  console.log('finalQuizData', finalQuizData);

  const getData = () => {
    const datas = [];
    firedb.ref('quizcomp').on('value', (data) => {
      data.forEach((d) => {
        datas.push(d.val());
      });
    });
    setFinalQuizData(datas);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='quizDashMain'>
      <ul className='quizDashMainull'>
        <li className='nameQuizC'>Name</li>
        <li className='emailQuizC'>Email</li>
        <li className='mobileQuizC'>Mobile</li>
        <li className='genderQuizC'>Gender</li>
        <li className='optingQuizC'>Opting</li>
        <li>Score</li>
        <li className='timeQuizC'>Time</li>
      </ul>
      {finalQuizData && (
        <div className='quizDashMainSub'>
          {finalQuizData
            .sort((a, b) => b.correct - a.correct)
            .map((final, i) => {
              return (
                <ul className='quizDashMainulll'>
                  <li className='nameQuizC'>{final.name}</li>
                  <li className='emailQuizC'>{final.email}</li>
                  <li className='mobileQuizC'>{final.phone}</li>
                  <li className='genderQuizC'>{final.gender}</li>
                  <li className='optingQuizC'>{final.opting}</li>
                  <li>{final.correct}</li>
                  <li className='timeQuizC'>{final.seconds}</li>
                </ul>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default QuizDash;
