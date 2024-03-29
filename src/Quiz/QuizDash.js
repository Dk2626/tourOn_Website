import React, { useState, useEffect } from 'react';
import { firedb } from '../firebase';
import './QuizDash.css';

const QuizDash = () => {
  const [finalQuizData, setFinalQuizData] = useState([]);

  const getData = () => {
    const datas = [];
    firedb.ref('quiz').on('value', (data) => {
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
    <div className='quizDashMainHome'>
      <div className='quizDashMainHomeHead'>
        <h3>Participants - {finalQuizData.length}</h3>
      </div>
      <table className='quizDashMain'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Opting</th>
            <th>Score</th>
            <th>Time</th>
          </tr>
        </thead>
        {finalQuizData && (
          <tbody>
            {finalQuizData
              .sort((a, b) => b.correct - a.correct || a.seconds - b.seconds)
              .map((final, i) => {
                return (
                  <tr key={i}>
                    <td>{final.name}</td>
                    <td>{final.email}</td>
                    <td>{final.phone}</td>
                    <td>{final.gender}</td>
                    <td>{final.opting}</td>
                    <td>{final.correct}</td>
                    <td>{final.seconds}</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default QuizDash;
