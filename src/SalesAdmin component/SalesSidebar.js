import React, { useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "../Account details components/Profilepage.css";
import { ApiContext } from "../Context/ApiContext";
import { GiCompactDisc } from "react-icons/gi";
import SalesRequest from "./SalesRequest";
import SalesSelfPlan from "./SalesSelfPlan";
import YearStatistics from "./YearStatistics";
import BookingTable from "./BookingTable";
import { firedb } from "../firebase";
import HotelMail from "../MailSend/HotelMail";
import FlightMail from "../MailSend/FlightMail";

const SalesSidebar = () => {
  const [clicked, setClicked] = useState("");
  const { userInfo } = useContext(ApiContext);
  const lo = useLocation();
  // const [userRequest, setUserRequest] = useState([]);

  // const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [bookingDetails, setBookingDetails] = useState([]);
  // const [selfPlans, setSelfPlans] = useState([]);
  // const [loading3, setLoading3] = useState(false);
  useEffect(() => {
    const location = lo.pathname;
    setClicked(location);
  }, []);
  const routes = [
    {
      path: "/salesadmin",
      exact: true,
      main: () => <SalesRequest />,
      // main: () => <SalesRequest userRequest={userRequest} loading={loading} />,
    },
    {
      path: "/salesadmin/selfplan",
      main: () => <SalesSelfPlan />,
      // main: () => <SalesSelfPlan selfPlans={selfPlans} loading={loading3} />,
    },
    {
      path: "/salesadmin/yearstatistics",
      main: () => <YearStatistics />,
    },
    {
      path: "/salesadmin/bookingtable",
      main: () => (
        <BookingTable bookingDetails={bookingDetails} loading={loading1} />
      ),
    },
    {
      path: "/salesadmin/sendhotelmail",
      main: () => <HotelMail />,
    },
    {
      path: "/salesadmin/sendflightmail",
      main: () => <FlightMail />,
    },
  ];

  // useEffect(() => {
  //   setLoading(true);
  //   firedb.ref("requests").on("value", (data) => {
  //     if (data.val() === null || data.val() === undefined) {
  //       setLoading(false);
  //       return;
  //     }
  //     if (data.val() !== null || data.val() !== undefined) {
  //       let newReq = {};
  //       let revReq = Object.keys(data.val()).reverse();
  //       revReq.forEach((i) => {
  //         newReq[i] = data.val()[i];
  //       });
  //       setUserRequest({
  //         ...newReq,
  //       });
  //     }
  //     setLoading(false);
  //   });
  //   // return () => {
  //   //   console.log("un mounted");
  //   //   firedb.ref("requests").off("value");
  //   // };
  // }, []);

  useEffect(() => {
    setLoading1(true);
    firedb.ref("bookingdetails1").on("value", (data) => {
      if (data.val() === null || data.val() === undefined) {
        setLoading1(false);
        return;
      }
      if (data.val() !== null || data.val() !== undefined) {
        let newReq = {};
        let revReq = Object.keys(data.val()).reverse();
        revReq.forEach((i) => {
          newReq[i] = data.val()[i];
        });
        setBookingDetails({
          ...newReq,
        });
      }
    });
    setLoading1(false);

    // let booking = [];
    // setLoading1(true);
    // firedb.ref("bookingdetails1").on("value", (data) => {
    //   if (data.val() === null || data.val() === undefined) {
    //     setLoading(false);
    //     return;
    //   }
    //   data.forEach((i) => {
    //     booking.push({
    //       key: i.key,
    //       value: i.val(),
    //     });
    //   });
    //   setBookingDetails(booking.reverse());
    // });
    // setLoading1(false);

    return () => {
      console.log("un mounted");
      firedb.ref("bookingdetails1").off("value");
    };
  }, []);

  // useEffect(() => {
  //   let plans = [];
  //   setLoading3(true);
  //   firedb.ref("self-planned-tours").on("value", (data) => {
  //     if (data.val() === null || data.val() === undefined) {
  //       setLoading(false);
  //       return;
  //     }
  //     if (data.val() !== null || data.val() !== undefined) {
  //       data.forEach((i) => {
  //         plans.push({
  //           key: i.key,
  //           value: i.val(),
  //         });
  //       });
  //       setSelfPlans(plans.reverse());
  //     }
  //     setLoading3(false);
  //   });
  //   return () => {
  //     console.log("un mounted");
  //     firedb.ref("self-planned-tours").off("value");
  //   };
  // }, []);

  return (
    <Router>
      <div className="maincontainer">
        <div
          className="sidebar-menu"
          // style={{
          //   width: "20%",
          //   backgroundColor: "#fff",
          //   height: "100vh",
          //   borderRight: "1px solid black",
          // }}
        >
          <div className="comname">
            <div className="admindetails">
              <img src={userInfo.photoURL} alt="profile pic" />
              <div>
                <h5 style={{ color: "#000", fontFamily: "Andika" }}>
                  {userInfo.name} , Admin
                </h5>
              </div>
            </div>
          </div>

          <ul
            className="sidebar-menu-items"
            style={{
              borderBottom: "1px solid #9e9e9e",
              margin: " 0 10px 10px",
            }}
          >
            <li
              onClick={() => setClicked("/")}
              className={
                "/" === clicked ? ` sidebar-text clickeds ` : `sidebar-text`
              }
            >
              <Link to="/" target="_blank">
                <GiCompactDisc color="#9e9e9e" />
                <span
                  className="sidebar-tex"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Access to website
                </span>
              </Link>
            </li>
          </ul>

          <ul className="sidebar-menu-items">
            <li
              onClick={() => setClicked("/salesadmin")}
              className={
                clicked === "/salesadmin"
                  ? `sidebar-tex clickedss`
                  : `sidebar-tex`
              }
            >
              <Link to="/salesadmin">
                <span
                  className="sidebar-title"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Request
                </span>
              </Link>
            </li>
            <li
              onClick={() => setClicked("/salesadmin/selfplan")}
              className={
                clicked === "/salesadmin/selfplan"
                  ? `sidebar-tex clickedss`
                  : `sidebar-tex`
              }
            >
              <Link to="/salesadmin/selfplan">
                {/* {item.icon} */}
                <span
                  className="sidebar-title"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Self Plan
                </span>
              </Link>
            </li>
            <li
              className={
                "/salesadmin/yearstatistics" === clicked
                  ? `sidebar-tex clickedss`
                  : `sidebar-tex`
              }
            >
              <Link
                to="/salesadmin/yearstatistics"
                onClick={() => setClicked("/salesadmin/yearstatistics")}
              >
                {/* {item.icon} */}
                <span
                  className="sidebar-title"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Year Statistics
                </span>
              </Link>
            </li>
            <li
              onClick={() => setClicked("/salesadmin/bookingtable")}
              className={
                "/salesadmin/bookingtable" === clicked
                  ? `sidebar-tex clickedss`
                  : `sidebar-tex`
              }
            >
              <Link to="/salesadmin/bookingtable">
                {/* {item.icon} */}
                <span
                  className="sidebar-title"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Booking
                </span>
              </Link>
            </li>
            <li
              onClick={() => setClicked("/salesadmin/sendhotelmail")}
              className={
                "/salesadmin/sendhotelmail" === clicked
                  ? `sidebar-tex clickedss`
                  : `sidebar-tex`
              }
            >
              <Link to="/salesadmin/sendhotelmail">
                <span
                  className="sidebar-title"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Send Hotel Mail
                </span>
              </Link>
            </li>
            <li
              onClick={() => setClicked("/salesadmin/sendflightmail")}
              className={
                "/salesadmin/sendflightmail" === clicked
                  ? `sidebar-tex clickedss`
                  : `sidebar-tex`
              }
            >
              <Link to="/salesadmin/sendflightmail">
                <span
                  className="sidebar-title"
                  style={{ color: "#000", fontFamily: "Andika" }}
                >
                  Send Flight Mail
                </span>
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ width: "100%", maxHeight: "80vh" }}>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default SalesSidebar;
