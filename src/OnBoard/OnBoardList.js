import React, { useEffect, useState, useContext, useRef } from 'react';
import { ApiContext } from '../Context/ApiContext';
import moment from 'moment';
import './OnBoardList.css';
import { firedb } from '../firebase';
import LoaderAni from '../LoaderAnimation/LoaderAni';
import { ImLocation2 } from 'react-icons/im';
import { Link } from 'react-router-dom';
import onboard from '../assests/onboard.jpg';
import ScrollContainer from 'react-indiana-drag-scroll';

const OnBoardList = () => {
  const { userInfo } = useContext(ApiContext);
  const [custDocuments, setCustDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format().slice(0, 10));
  //   console.log(`custDocuments`, custDocuments)
  const container = useRef(null);

  const upcoming = custDocuments.filter((cust) => date < cust.returnDate);

  const completed = custDocuments
    .filter((cust) => date >= cust.returnDate)
    .reverse();

  // const completed = [
  //   {
  //     customerName: 'Dinesh',
  //     email: 'dineshKumardssd',
  //     destination: 'Dubai',
  //   },
  //   {
  //     customerName: 'Dinesh',
  //     email: 'dineshKumardssd',
  //     destination: 'Goa',
  //   },
  //   {
  //     customerName: 'Dinesh',
  //     email: 'dineshKumardssd',
  //     destination: 'Munnar',
  //   },
  //   {
  //     customerName: 'Dinesh',
  //     email: 'dineshKumardssd',
  //     destination: 'Munnar',
  //   },
  //   {
  //     customerName: 'Dinesh',
  //     email: 'dineshKumardssd',
  //     destination: 'Munnar',
  //   },
  // ];

  const getDocuments = () => {
    setLoading(true);
    let doc = [];
    firedb.ref('bookingdetails1').on('value', (data) => {
      data.forEach((d) => {
        if (d.val()?.general?.email === userInfo?.email) {
          doc.push(d.val().general);
        }
      });
      setCustDocuments(doc);
      setLoading(false);
    });
  };

  useEffect(() => {
    getDocuments();
  }, [userInfo]);

  if (loading) {
    return <LoaderAni />;
  } else
    return (
      <div>
        {custDocuments.length == 0 ? (
          <div>
            <div className='onBoardListHead'>
              <h1 className='onBoardListH1'>On Board List</h1>
            </div>
            <div className='onBoardImg'>
              <img src={onboard} />
              <h6>No On Board List Yet</h6>
            </div>
          </div>
        ) : (
          <div className='onBoardListMainn'>
            <div className='onBoardListMainns'>
              <div className='onBoardListHead'>
                <h1 className='onBoardListH1'>On Board List</h1>
              </div>
              <div className='OnBoardUC'>
                {upcoming.length !== 0 && (
                  <div>
                    <h3 className='upcomingText'>Upcoming</h3>
                    <div className='upcomingContent'>
                      {upcoming.map((item, key) => {
                        const {
                          customerName,
                          email,
                          destination,
                          tourType,
                          onwardDate,
                          returnDate,
                          bookingValue,
                          adults,
                          children,
                        } = item;
                        return (
                          <Link
                            to={{
                              pathname: `/onboardform/${customerName}/${email}/${destination}/${tourType}/${onwardDate}/${returnDate}/${bookingValue}/${adults}/${children}`,
                            }}
                            className='plink'
                            key={key}>
                            <div className='upcoimgInnerContentMain'>
                              <div className='upcoimgInnerContent'>
                                <div className='upcoimgInnerContent1'>
                                  <h5 className='upcoimgInnerContentname'>
                                    {item.customerName}
                                  </h5>
                                  <h5 className='upcoimgInnerContentemail'>
                                    {item.email}
                                  </h5>
                                </div>
                                <div className='upcoimgInnerContent2'>
                                  <ImLocation2 size={20} color='#ff7f00' />
                                  <h5 className='upcoimgInnerContentdest'>
                                    {item.destination}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {completed.length !== 0 && (
                  <div>
                    <h3 className='completedText'>Completed</h3>
                    <ScrollContainer
                      className='scroll-containerr'
                      vertical={true}
                      hideScrollbars={false}
                      innerRef={container}>
                      <div className='completedContent'>
                        {completed.map((item, key) => {
                          return (
                            <div
                              key={key}
                              className='completedInnerContentMain'>
                              <div className='completedInnerContent'>
                                <div className='completedInnerContent1'>
                                  <h5 className='completedInnerContentname'>
                                    {item.customerName}
                                  </h5>
                                  <h5 className='completedInnerContentemail'>
                                    {item.email}
                                  </h5>
                                </div>
                                <div className='completedInnerContent2'>
                                  <ImLocation2 size={20} color='#E07C24' />
                                  <h5 className='completedInnerContentdest'>
                                    {item.destination}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
};

export default OnBoardList;
