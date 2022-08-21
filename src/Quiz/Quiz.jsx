import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';
import '../Fonts/Fonts.css';
import { FiSend } from 'react-icons/fi';
import { FaStoreAlt, FaMobileAlt } from 'react-icons/fa';
import {
  BsBook,
  BsStarFill,
  BsTrophy,
  BsPerson,
  BsArrowRight,
  BsLockFill,
} from 'react-icons/bs';
import { MdExitToApp, MdEmail } from 'react-icons/md';
import { ImBook } from 'react-icons/im';
import cert from '../assests/Quiz/cert.png';
import countriess from '../assests/Quiz/18count.png';
import islandIcon from '../assests/Quiz/islandIcon.png';
import logo from '../assests/Quiz/logo.png';
import logotitle from '../assests/Quiz/logot.png';
import celeb1 from '../assests/Quiz/celeb1.JPG';
import celeb2 from '../assests/Quiz/celeb2.JPG';
import celeb3 from '../assests/Quiz/celeb3.JPG';
import celeb4 from '../assests/Quiz/celeb4.JPG';
import insta from '../assests/Quiz/int.png';
import instaf from '../assests/Quiz/intf.png';
import yesl from '../assests/Quiz/yyes.png';
import nol from '../assests/Quiz/nno.png';
import njoy from '../assests/Quiz/njoyy.png';
import male from '../assests/Quiz/male.png';
import female from '../assests/Quiz/female.png';
// import Sort from './Question';
import { firedb } from '../firebase';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import quiz1 from '../assests/Quiz/quiz1.png';
// import quiz2 from '../assests/Quiz/quiz2.png';
// import quiz3 from '../assests/Quiz/quiz3.png';
// import quiz4 from '../assests/Quiz/quiz4.png';
// import quiz5 from '../assests/Quiz/quiz5.png';
// import quiz6 from '../assests/Quiz/quiz6.png';
// import quiz7 from '../assests/Quiz/quiz7.png';
// import quiz8 from '../assests/Quiz/quiz8.png';

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [store, setStore] = useState('');
  const [lucky, setLucky] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    opting: '',
  });
  const { name, email, phone, gender, opting } = user;
  const [nextQuiz, setNextQuiz] = useState('');
  const [questionBank, setQuestionBank] = useState([]);
  // const [questionBank, setQuestionBank] = useState(
  //   Sort.sort((a, b) => a.randomQuiz - b.randomQuiz)
  // );
  const [counter, setCounter] = useState('');
  const [correct, setCorrect] = useState(0);
  const [start, setStart] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [exist, setExist] = useState(false);
  const [openExistModal, setOpenExistModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const shareUrl = 'https://www.touron.in/quiz-win-prize';
  var nTime;
  var cTime;

  // console.log('questionBank', questionBank);

  const submitForm = () => {
    let end = new Date();
    firedb
      .ref('quiz')
      .push({
        name,
        email,
        phone,
        gender,
        opting,
        seconds: (end - start) / 1000,
        correct,
      })
      .then(() => {
        setStore('');
        setLucky('');
        setCorrect(0);
        setStep(1);
        setUser({
          name: '',
          email: '',
          phone: '',
          gender: '',
          opting: '',
        });
        setOpenModal(true);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    nTime = setTimeout(() => {
      if (nextQuiz < questionBank.length - 1) {
        setNextQuiz((prevQuiz) => prevQuiz + 1);
        setCounter(10);
      }
    }, 10000);
    return () => {
      clearTimeout(nTime);
    };
  }, [nextQuiz]);

  useEffect(() => {
    cTime = setTimeout(() => {
      if (counter >= 1) {
        setCounter(counter - 1);
        if (nextQuiz + 1 == questionBank.length && counter == 1) {
          submitForm();
        }
      }
    }, 1000);
    return () => {
      clearTimeout(cTime);
    };
  }, [counter]);

  const getQns = () => {
    let finalQns = [];
    firedb.ref('quizqns').on('value', (data) => {
      data.forEach((d) => {
        finalQns.push({
          qno: d.val().qno,
          questionText: d.val().questionText,
          answerOptions: d.val().answerOptions,
          answerCorrect: d.val().answerCorrect,
          randomQuiz: Math.random(),
        });
      });
      if (finalQns.length == 20) {
        setQuestionBank(finalQns.sort((a, b) => a.randomQuiz - b.randomQuiz));
      }
    });
  };

  useEffect(() => {
    getQns();
  }, []);

  const getData = () => {
    firedb.ref('quizcomp').on('value', (data) => {
      data.forEach((d) => {
        if (d.val().email == email || d.val().phone == phone) {
          setExist(true);
        } else {
          setExist(false);
        }
      });
    });
  };

  useEffect(() => {
    getData();
  }, [email, phone]);

  const renderPage = () => {
    switch (step) {
      case 1:
        return (
          <div className='quizPg0'>
            <div className='aniLogo'>
              <img src={logo} alt='logo' />
            </div>
            <div className='aniLogoTitle'>
              <img src={logotitle} alt='logotitle' />
            </div>
            <div className='quizArrowMain0' onClick={() => setStep(step + 1)}>
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
            <div className='quizArrowMain1' onClick={() => setStep(step + 1)}>
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
                  <div
                    className={store == 'Store' ? 'Storequizz' : 'Storequiz'}
                    onClick={() => setStore('Store')}>
                    <FaStoreAlt
                      className={store == 'Store' ? 'storeIconn' : 'storeIcon'}
                    />
                    <div
                      className={store == 'Store' ? 'storeNamee' : 'storeName'}>
                      Store
                    </div>
                  </div>
                  <div className='knowaboutp'>
                    <p className='knowaboutq'>Know about us in 6 Pages</p>
                    <BsBook className='knowabouti' />
                  </div>
                </div>
                <div className='quizVertLine2' />
                <div className='quizPg2SubLB'>
                  <div
                    className={
                      store == 'Contest' ? 'Contestquizz' : 'Contestquiz'
                    }
                    onClick={() => setStore('Contest')}>
                    <BsTrophy
                      className={
                        store == 'Contest' ? 'contestIconn' : 'contestIcon'
                      }
                    />
                    <div
                      className={
                        store == 'Contest' ? 'contestNamee' : 'contestName'
                      }>
                      Contest
                    </div>
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
              <div
                className='quizArrowMain2'
                onClick={() => {
                  if (store == 'Store') {
                    setStep(step + 1);
                  }
                  if (store == 'Contest') {
                    setStep(10);
                  }
                }}>
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
            <div className='quizArrowMain3' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow3' />
            </div>
          </div>
        );
      case 5:
        return (
          <div className='quizPg11'>
            <div className='certtImg'>
              <img src={cert} alt='cert' />
            </div>
            <div className='quizPg4Main'>
              <img src={countriess} alt='18countries' className='countImg' />
              <div className='quizVertLine3' />
              <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
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
            <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
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
            <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
              <BsArrowRight className='quizArrow2' />
            </div>
          </div>
        );
      case 8:
        return (
          <div className='quizPg8'>
            <div className='instasll'>
              <img src={insta} alt='insta' className='intImgs' />
            </div>
            <div>
              <a
                href='https://www.instagram.com/touronholidays/'
                target='_blank'
                rel='noopener noreferrer'>
                <img src={instaf} alt='instf' className='instafImg' />
              </a>
            </div>
            <div className='quizArrowMain2' onClick={() => setStep(step + 1)}>
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
            <div className='yesnoQM'>
              <div className='yesnoQ'>
                <div
                  className={lucky == 'yes' ? 'yesnoQRR' : 'yesnoQR'}
                  onClick={() => setLucky('yes')}>
                  <img src={yesl} alt='yesl' />
                </div>
                <div className='quizVertLine4' />
                <div
                  className={lucky == 'no' ? 'yesnoQRNN' : 'yesnoQRN'}
                  onClick={() => setLucky('no')}>
                  <img src={nol} alt='nol' />
                </div>
              </div>
              <div
                className='quizArrowMain2'
                onClick={() => {
                  if (lucky == 'yes') {
                    setStep(step + 1);
                  }
                  if (lucky == 'no') {
                    setStep(step + 2);
                  }
                }}>
                <BsArrowRight className='quizArrow2' />
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className='quizPg9Main'>
            <div className='quizPg9'>
              <div>
                <p className='luckyHello'>Hello Traveller!</p>
                <p className='luckyHelloIn'>
                  This information will help us to connect with you if you're
                  winning the lucky draw
                </p>
              </div>
              <div>
                <div className='luckyyInputMa'>
                  <input
                    type='text'
                    className='luckyyInput'
                    placeholder='Full Name'
                    onChange={(e) =>
                      setUser({
                        ...user,
                        name: e.target.value,
                      })
                    }
                    value={name}
                  />
                  <BsPerson className='luckydrawIcon' />
                </div>
                <div className='luckyyInputMa'>
                  <input
                    type='email'
                    className='luckyyInput'
                    placeholder='Email ID'
                    onChange={(e) =>
                      setUser({
                        ...user,
                        email: e.target.value,
                      })
                    }
                    value={email}
                  />
                  <MdEmail className='luckydrawIcon' />
                </div>
                <div className='luckyyInputMa'>
                  <input
                    type='number'
                    className='luckyyInput'
                    placeholder='Phone number'
                    onChange={(e) =>
                      setUser({
                        ...user,
                        phone: e.target.value,
                      })
                    }
                    value={phone}
                  />
                  <FaMobileAlt className='luckydrawIcon' />
                </div>
              </div>
              <div className='genderLucky'>
                <div className='genderLuckySub1'>
                  <p>Female</p>
                  <div
                    className={gender == 'female' ? 'feeimgg' : 'feeimg'}
                    onClick={() =>
                      setUser({
                        ...user,
                        gender: 'female',
                      })
                    }>
                    <img src={female} alt='female' />
                  </div>
                </div>
                <div className='genderLuckySub1'>
                  <p>Male</p>
                  <div
                    className={gender == 'male' ? 'meeimgg' : 'meeimg'}
                    onClick={() =>
                      setUser({
                        ...user,
                        gender: 'male',
                      })
                    }>
                    <img src={male} alt='male' />
                  </div>
                </div>
                <div className='genderLuckySub111'>
                  <p>I'm Opting for</p>
                  <div className='genderLuckySub11M'>
                    <div
                      className='genderLuckySub11'
                      onClick={() =>
                        setUser({
                          ...user,
                          opting: 'Offer Updates',
                        })
                      }>
                      <div
                        className={
                          opting == 'Offer Updates'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>Offer Updates</p>
                    </div>
                    <div
                      className='genderLuckySub11'
                      onClick={() =>
                        setUser({
                          ...user,
                          opting: 'Product Knowledge',
                        })
                      }>
                      <div
                        className={
                          opting == 'Product Knowledge'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>Product Knowledge</p>
                    </div>
                    <div
                      className='genderLuckySub11'
                      onClick={() =>
                        setUser({
                          ...user,
                          opting: 'WhatApp Only',
                        })
                      }>
                      <div
                        className={
                          opting == 'WhatApp Only'
                            ? 'LuckyCirclee'
                            : 'LuckyCircle'
                        }
                      />
                      <p>WhatApp Only</p>
                    </div>
                  </div>
                </div>
              </div>
              {exist == true ? (
                <button
                  className='luckySubmitBtn'
                  onClick={() => setOpenExistModal(true)}>
                  Submit
                </button>
              ) : (
                <button
                  className='luckySubmitBtn'
                  onClick={() => {
                    if (name && email && phone && gender && opting) {
                      setStep(step + 2);
                      setStart(new Date());
                      setNextQuiz(0);
                      setCounter(10);
                    }
                  }}>
                  Submit
                </button>
              )}
            </div>
            <div className='luckyProtect'>
              <p>Privacy protected</p>
              <BsLockFill className='prtectIcon' />
            </div>
          </div>
        );
      case 11:
        return (
          <div className='quizPg8'>
            <div>
              <img src={njoy} alt='njoy' className='njoyyImg' />
            </div>
            <Link to='/' className='njoyBtnLink'>
              <button className='njoyBtn'>
                Click here to Visit our Website
              </button>
            </Link>
          </div>
        );
      case 12:
        return (
          <div className='quizPg1'>
            <div className='quizImggg'>
              <img src={quiz1} alt='imgQuiz' />
            </div>
            <div className='quizQuestionOut'>
              <p>
                Question {nextQuiz + 1} out of {questionBank.length}
              </p>
            </div>
            <div className='quizQuestion'>
              <p>{questionBank[nextQuiz].questionText}</p>
            </div>
            {questionBank[nextQuiz].answerOptions.map((q, i) => {
              return (
                <button
                  key={i}
                  className='quizAnswers'
                  onClick={() => {
                    if (nextQuiz < questionBank.length - 1) {
                      setNextQuiz(nextQuiz + 1);
                    }
                    setCounter(10);
                    q == questionBank[nextQuiz].answerCorrect &&
                      setCorrect(correct + 1);
                    if (nextQuiz + 1 == questionBank.length) {
                      setCounter(0);
                      submitForm();
                    }
                  }}>
                  {q}
                </button>
              );
            })}
          </div>
        );
      default:
        setStep(1);
    }
  };

  return (
    <div className='AllMainss'>
      {step !== 1 && step !== 2 && step !== 12 ? (
        <div className='quizSendMainD'>
          <MdExitToApp
            className='prevquiz'
            onClick={() => {
              if (step == 11) {
                setStep(step - 2);
              } else if (step == 10 && store == 'Contest') {
                setStep(3);
              } else {
                setStep(step - 1);
              }
            }}
          />
          <FiSend
            className='quizSend'
            onClick={() => setOpenShareModal(true)}
          />
        </div>
      ) : null}
      {step == 12 && (
        <div className='quizSendMainDD'>
          <div className='countQuizz'>
            <p>{counter}</p>
          </div>
        </div>
      )}
      {openModal && (
        <div className='quizPopup'>
          <div className='quizPopup_content'>
            <div
              className='quizPopup__content-close'
              onClick={() => setOpenModal(false)}>
              &times;
            </div>
            <p className='quizPopup_para'>Thanks for participating the Quiz</p>
            <Link to='/' className='njoyBtnLink'>
              <button className='quizPopup_btn'>Visit our Website</button>
            </Link>
          </div>
        </div>
      )}
      {openExistModal && (
        <div className='quizPopup'>
          <div className='quizPopup_content'>
            <div
              className='quizPopup__content-close'
              onClick={() => setOpenExistModal(false)}>
              &times;
            </div>
            <p className='quizPopup_para'>Email / Mobile already Exist!</p>
          </div>
        </div>
      )}
      {openShareModal && (
        <div className='quizPopup'>
          <div className='quizPopup_contentShare'>
            <div
              className='quizPopup__content-closeShare'
              onClick={() => setOpenShareModal(false)}>
              &times;
            </div>
            <div className='quizPopup__content-BtnShare'>
              <WhatsappShareButton
                url={shareUrl}
                title='tourOn Quiz, Win prize'>
                <WhatsappIcon size={40} round={true} />
              </WhatsappShareButton>
              <FacebookShareButton
                url={shareUrl}
                title='tourOn Quiz, Win prize'>
                <FacebookIcon size={40} round={true} />
              </FacebookShareButton>
              <EmailShareButton url={shareUrl} title='tourOn Quiz, Win prize'>
                <EmailIcon size={40} round={true} />
              </EmailShareButton>
              <LinkedinShareButton
                url={shareUrl}
                title='tourOn Quiz, Win prize'>
                <LinkedinIcon size={40} round={true} />
              </LinkedinShareButton>
              <TwitterShareButton url={shareUrl} title='tourOn Quiz, Win prize'>
                <TwitterIcon size={40} round={true} />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      )}
      <div className='mainQuiz'>{renderPage()}</div>
    </div>
  );
};

export default Quiz;
