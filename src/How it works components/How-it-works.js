import React from "react";
import "./How-it-works.css";
import { Link } from "react-router-dom";
import Navbar from "../Home components/Navbar/Navbar";
import Footer from "../Home components/Footer/Footer";

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <div className="work">
        <div className="work_top"></div>
        <div className="work_img">
          <div className="work_title">
            <p className="breadcrumbs">
              <span className="mr-2">
                <Link className="linkin" to="/">
                  Home <i className="fa fa-chevron-right"></i>
                </Link>
              </span>
              <span className="abt">
                How it Works <i className="fa fa-chevron-right"></i>
              </span>
            </p>
            <h1 className="bread">How it works</h1>
          </div>
        </div>
        <div className="work_overview">
          <h4>Overview</h4>
          <p>
            TourOn provides different types of tour packages which include
            Luxury, Honeymoon Tour, Planned Tour, Surprise Tour or a specially
            organised Road Trip. Destinations will have public transportation
            and plenty of resources and activities to keep you busy.
          </p>
        </div>
        <div>{/* <Tourplan /> */}</div>
      </div>
      <Footer />
    </>
  );
}
