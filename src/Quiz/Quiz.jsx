import React, { useState, useEffect } from 'react';
import './Quiz.css';
import '../Fonts/Fonts.css';
import { BsArrowRight } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import { FaStoreAlt } from 'react-icons/fa';
import { GrTrophy } from 'react-icons/gr';
import { BsBook, BsStarFill } from 'react-icons/bs';
import { MdExitToApp } from 'react-icons/md';
import { ImBook } from 'react-icons/im';
import cert from '../assests/Quiz/certi.png';
import countriess from '../assests/Quiz/18countries.png';
import islandIcon from '../assests/Quiz/islandIcon.png';
import logo from '../assests/Quiz/logo.png';
import logotitle from '../assests/Quiz/logotitle.png';
import celeb1 from '../assests/Quiz/celeb1.JPG';
import celeb2 from '../assests/Quiz/celeb2.JPG';
import celeb3 from '../assests/Quiz/celeb3.JPG';
import celeb4 from '../assests/Quiz/celeb4.JPG';
import insta from '../assests/Quiz/insta.png';
import instaf from '../assests/Quiz/instaf.png';
import yesl from '../assests/Quiz/yesl.png';
import nol from '../assests/Quiz/nol.png';
import njoy from '../assests/Quiz/njoy.png';

const Quiz = () => {
  const [step, setstep] = useState(1);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setstep(step + 1);
  //   }, 3000);
  // }, [step == 1]);

  const renderPage = () => {
    switch (step) {
      case 1:
        return (
          <div className='quizPg0'>
            <img src={logo} alt='logo' className='aniLogo' />
            <img src={logotitle} alt='logotitle' />
            <div className='quizArrowMain0' onClick={() => setstep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 2:
        return (
          <div className='quizPg1'>
            <div className='quizTitle1'>Hello</div>
            <div className='quizTitle2'>traveller</div>
            <div className='quizVertLine1' />
            <div className='quizArrowMain1' onClick={() => setstep(step + 1)}>
              <BsArrowRight className='quizArrow1' />
            </div>
          </div>
        );
      case 3:
        return (
          <div className='quizPg8'>
            <div className='letsBeginName'>
              <div className='letsName'>Let's travel..</div>
              <div className='beginName'>The new beginning</div>
            </div>
            <div className='quizPg2SubM'>
              <div className='quizPg2Sub'>
                <div className='quizPg2SubL'>
                  <div className='Storequiz'>
                    <FaStoreAlt className='storeIcon' />
                    <div className='storeName'>Store</div>
                  </div>
                  <div className='knowaboutp'>
                    <p className='knowaboutq'>Know about us in 6 Pages</p>
                    <BsBook className='knowabouti' />
                  </div>
                </div>
                <div className='quizVertLine2' />
                <div className='quizPg2SubLB'>
                  <div className='Contestquiz'>
                    <GrTrophy className='contestIcon' />
                    <div className='contestName'>Contest</div>
                  </div>
                  <div className='win2nights'>
                    <p className='win2nightsq'>
                      Win 2 Nights Stay for Maldives
                    </p>
                    <img
                      src={islandIcon}
                      alt='islandIcon'
                      className='win2nightsi'
                    />
                  </div>
                </div>
              </div>
              <div className='quizArrowMain2' onClick={() => setstep(step + 1)}>
                <BsArrowRight className='quizArrow2' />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className='quizPg2'>
            <div className='kuttyPara'>
              <p className='kuttyPara1'>Kutty brief about us..</p>
              <p className='kuttyPara2'>
                We are India's 1st tour planning company. Here we make you
                understand the destination before you plan and make sure you're
                spending your money at right spot.
              </p>
              <p className='kuttyPara2'>
                No more necessity to travel in the packages which is not
                suitable for your preferences
              </p>
              <p className='kuttyPara2'>Have a new beginning with us!</p>
            </div>
            <div className='quizVertLine3' />
            <div className='quizArrowMain3' onClick={() => setstep(step + 1)}>
              <BsArrowRight className='quizArrow3' />
            </div>
          </div>
        );
      case 5:
        return (
          <div className='quizPg8'>
            <div className='certtImg'>
              <img src={cert} alt='cert' />
            </div>
            <div className='quizPg4Main'>
              <img src={countriess} alt='18countries' />
              <div className='quizVertLine3' />
              <div className='quizArrowMain2' onClick={() => setstep(step + 1)}>
                <BsArrowRight className='quizArrow2' />
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className='quizPg2'>
            <div className='catQuizz'>
              <div>
                <p>Categories</p>
                <p>Covered</p>
              </div>
              <ImBook className='catQuizzIcon' />
            </div>
            <div className='catQuizz1'>
              <div className='catQuizz1Sub'>
                <div className='catQuizz1SubI'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>International</p>
                </div>
                <div className='catQuizz1SubC'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Cruise Ships</p>
                </div>
                <div className='catQuizz1SubF'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Family</p>
                </div>
              </div>
              <div className='quizVertLine4' />
              <div className='catQuizz1Sub'>
                <div className='catQuizz1SubIn'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>India</p>
                </div>
                <div className='catQuizz1SubW'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Wildlife</p>
                </div>
                <div className='catQuizz1SubH'>
                  <div>
                    <BsStarFill className='catQuizStar' />
                    <BsStarFill className='catQuizStar' />
                  </div>
                  <p>Honeymoon</p>
                </div>
              </div>
            </div>
            <div className='quizArrowMain2' onClick={() => setstep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 7:
        return (
          <div className='quizPg2'>
            <div className='celebs'>
              <p>Celeb's who used our Service</p>
              <div className='quizHoriLine' />
            </div>
            <div className='celebsImg__Main'>
              <div>
                <div className='celebsImg'>
                  <img src={celeb1} alt='' />
                </div>
                <div className='celebsImg'>
                  <img src={celeb2} alt='' />
                </div>
              </div>
              <div>
                <div className='celebsImg'>
                  <img src={celeb3} alt='' />
                </div>
                <div className='celebsImg'>
                  <img src={celeb4} alt='' />
                </div>
              </div>
            </div>
            <div className='quizArrowMain2' onClick={() => setstep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 8:
        return (
          <div className='quizPg8'>
            <div className='instasll'>
              <img src={insta} alt='insta' />
              <div className='quizHoriLine' />
            </div>
            <div>
              <img src={instaf} alt='instf' className='instafImg' />
            </div>
            <div className='quizArrowMain2' onClick={() => setstep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 9:
        return (
          <div className='quizPg8'>
            <div className='celebss'>
              <p>Willing to opt for the Lucky Draw ?</p>
              <div className='quizHoriLine' />
            </div>
            <div className='yesnoQ'>
              <div className='yesnoQR' onClick={() => setstep(step + 1)}>
                <img src={yesl} alt='yesl' />
              </div>
              <div className='quizVertLine4' />
              <div className='yesnoQR' onClick={() => setstep(step + 2)}>
                <img src={nol} alt='nol' />
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div>
            <div>User detail form</div>
          </div>
        );
      case 11:
        return (
          <div className='quizPg8'>
            <div>
              <img src={njoy} alt='njoy' />
            </div>
            <div className='njoyBtn'>
              <p>Click here to Visit our Website</p>
            </div>
          </div>
        );
      default:
        setstep(1);
    }
  };

  return (
    <div className='AllMainss'>
      {step !== 1 && step !== 2 ? (
        <div className='quizSendMainD'>
          <MdExitToApp
            className='prevquiz'
            onClick={() => {
              if (step == 11) {
                setstep(step - 2);
              } else {
                setstep(step - 1);
              }
            }}
          />
          <FiSend className='quizSend' />
        </div>
      ) : null}
      <div className='mainQuiz'>{renderPage()}</div>
    </div>
  );
};

export default Quiz;
