import React, { useState, useEffect } from "react";
import { firedb } from "./../firebase";
import { Link } from "react-router-dom";
import {
  Table,
  Pagination,
  Input,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
import "./Request.css";

const Requests = () => {
  const [userRequest, setUserRequest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  let pagesCount = Math.ceil(Object.keys(userRequest).length / pageSize);
  const [currentPage, setCurrentpage] = useState(0);
  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentpage(index);
  };
  const getAllRequest = () => {
    setLoading(true);
    firedb.ref("requests").on("value", (data) => {
      if (data.val() === null || data.val() === undefined) {
        setLoading(false);
        return;
      }
      if (data.val() !== null) {
        let newReq = {};
        let revReq = Object.keys(data.val()).reverse();
        revReq.forEach((i) => {
          newReq[i] = data.val()[i];
        });
        setUserRequest({
          ...newReq,
        });
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllRequest();
  }, []);
  return (
    <div className="request-container">
      <div className="page-title">
        <h3>Requests</h3>
      </div>

      <div className="reqtable">
        <div className="entries">
          <div style={{ display: "flex" }}>
            <h3>Show Entries</h3>
            <Input
              type="select"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
              <option value="10">10</option>
            </Input>
          </div>
          {Object.keys(userRequest).length <= 7 ? null : (
            <Pagination
              className="pagination justify-content-end"
              style={{ marginTop: 100 }}
            >
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage - 1)}
                  previous
                  href="#"
                >
                  <i className="fa fa-angle-left" />
                </PaginationLink>
              </PaginationItem>
              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink
                    onClick={(e) => handleClick(e, i)}
                    href="#pablo"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink
                  onClick={(e) => handleClick(e, currentPage + 1)}
                  next
                  href="#"
                >
                  <i className="fa fa-angle-right" />
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          )}
        </div>
        <Table striped>
          <thead>
            <tr>
              <th scope="col">Request Status</th>
              <th scope="col">Request Id</th>
              <th scope="col">Name</th>
              <th scope="col">Tour Category</th>
              <th scope="col">Destination</th>
              <th scope="col">Departure Date</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {loading ? (
              <div className="req-loading">Fetching Data</div>
            ) : (
              <>
                {userRequest.length !== 0 ? (
                  <>
                    {Object.keys(userRequest)
                      .slice(
                        currentPage * pageSize,
                        (currentPage + 1) * pageSize
                      )
                      .map((c, i) => (
                        <tr key={i}>
                          <td>{userRequest[c].status}</td>
                          <td>{userRequest[c].requestID}</td>
                          <td>{userRequest[c].name}</td>
                          <td>{userRequest[c].tourCategory}</td>
                          <td>
                            {userRequest[c].tourCategory === "Surprise Tour"
                              ? "--"
                              : userRequest[c].destination}
                          </td>
                          <td>{userRequest[c].fromDate}</td>
                        </tr>
                      ))}
                  </>
                ) : (
                  <div className="noFind">
                    No Request found
                    <Link className="plink" to="/planned-tour">
                      <button>Start Planning</button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Requests;
