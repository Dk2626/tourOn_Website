import React, { useEffect, useState } from 'react';
import { firedb } from '../firebase';
import './SalesSelfPlanning.css';
import LoaderAni from '../LoaderAnimation/LoaderAni';

const SalesSelfPlanning = () => {
  const [selfPlan, setSelfPlan] = useState('');
  const [assignedTasks, setAssignedTasks] = useState('');
  const [querystatus, setQueryStatus] = useState('');
  const [currentPage, setCurrentpage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const getTaskAssigne = (requestID) => {
    let name = '';
    assignedTasks.forEach((a) => {
      if (a.requestID === requestID) {
        name = a.name;
      }
    });
    return name;
  };

  const getSelfPlans = () => {
    let selfplandata = [];
    firedb.ref('self-planned-tours').on('value', (data) => {
      data.forEach((d) => {
        selfplandata.push(d.val());
      });
      setSelfPlan(selfplandata.reverse());
    });
  };

  const getAssignTask = () => {
    let task = [];
    firedb.ref(`assignedTasks`).on('value', (data) => {
      data.forEach((d) => {
        task.push(d.val());
      });
      setAssignedTasks(task);
    });
  };

  useEffect(() => {
    getAssignTask();
  }, []);

  useEffect(() => {
    getSelfPlans();
  }, []);

  const colors = [
    {
      name: 'All',
      color: '#f39c12',
    },
    {
      name: 'Query Received',
      color: '#f39c12',
    },
    {
      name: 'On Progress',
      color: '#8e44ad',
    },
    {
      name: 'Plan Shared',
      color: '#7f8c8d',
    },
    {
      name: 'Cancelled',
      color: 'red',
    },
    {
      name: 'On Hold',
      color: '#3498db',
    },
    {
      name: 'Duplicate Query',
      color: '#FFF',
    },
    {
      name: 'Tour Booked',
      color: '#2d3436',
    },
    {
      name: 'Awaiting Payment',
      color: '#00cec9',
    },
    {
      name: 'Cancellation Requested',
      color: '#d63031',
    },
    {
      name: 'Estimated',
      color: 'red',
    },
    {
      name: 'Completed',
      color: '#55efc4',
    },
  ];

  const getColor = (status) => {
    let color = '';
    colors.filter((c) => {
      if (c.name === status) color = c.color;
    });
    return color;
  };

  const filterSelfPlan = () => {
    if (querystatus == '') return selfPlan;
    else {
      let req = [];
      selfPlan.forEach((s) => {
        if (s.status === querystatus) {
          req.push(s);
        }
      });
      return req;
    }
  };

  let pagesCount = Math.ceil(filterSelfPlan().length / pageSize);

  if (selfPlan.length == 0) {
    return <LoaderAni />;
  } else
    return (
      <div className='selfPlannningMains'>
        <div className='selfPlannningHeads'>
          <h2>Self Plans Management</h2>
        </div>
        <div className='selfPlannningSubmits'>
          <div>
            <h3>Submitted Request</h3>
            <div>
              <h6>{selfPlan.length}</h6>
            </div>
          </div>
          <div>
            <label>Show Item : </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}>
              <option value='20'>20</option>
              <option value='40'>40</option>
              <option value='60'>60</option>
            </select>
          </div>
          <div>
            <label>Query Status : </label>
            <select
              onChange={(e) => {
                setQueryStatus(e.target.value);
              }}
              value={querystatus}>
              {colors.map((c, index) => {
                return (
                  <option key={index} value={c.name === 'All' ? '' : c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <table className='selfPlanMainTable'>
          <thead>
            <tr>
              <th>REQUEST STATUS</th>
              <th>REQUEST ID</th>
              <th>NAME</th>
              <th>TRAVEL MODE</th>
              <th>DEPATURE DATE</th>
              <th>TOTAL NO OF DAYS</th>
              <th>HANDLE BY</th>
            </tr>
          </thead>
          {filterSelfPlan().length !== 0 && (
            <tbody>
              {filterSelfPlan()
                .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                .map((s, i) => {
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          color: `${getColor(s.status)}`,
                        }}>
                        {s.status}
                      </td>
                      <td>{s.requestID}</td>
                      <td>{s.name}</td>
                      <td>{s.travelmode}</td>
                      <td>{s.fromData}</td>
                      <td>{s.totalDays}</td>
                      <td>{getTaskAssigne(s.requestID)}</td>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
        {filterSelfPlan().length > 20 && (
          <div className='selfPlannningArrows'>
            {currentPage == 0 ? null : (
              <div
                className='selfPlannningArrowsPrev'
                onClick={() => {
                  setCurrentpage(currentPage - 1);
                }}>
                <h5>{'<'}</h5>
              </div>
            )}
            <div className='selfPlannningArrowsCenMain'>
              {new Array(pagesCount).fill('1').map((p, i) => {
                if (i + 1 < currentPage + 5 && i > currentPage - 2) {
                  return (
                    <div
                      key={i}
                      className={
                        currentPage == i
                          ? 'selfPlannningArrowsCen'
                          : 'selfPlannningArrowsCenDis'
                      }
                      onClick={() => {
                        setCurrentpage(i);
                      }}>
                      <h5>{i + 1}</h5>
                    </div>
                  );
                }
              })}
            </div>
            {currentPage == pagesCount - 1 ? null : (
              <div
                className='selfPlannningArrowsNext'
                onClick={() => {
                  setCurrentpage(currentPage + 1);
                }}>
                <h5>{'>'}</h5>
              </div>
            )}
          </div>
        )}
      </div>
    );
};

export default SalesSelfPlanning;
