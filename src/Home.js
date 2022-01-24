import React, { useEffect, useState } from "react";
import Categories from "./Home components/Categories/Categories";
import PopularCountries from "./Home components/PopularCountries/PopularCountries";
import PopularTours from "./Home components/PopularTours/PopularTours";
import SliderImage from "./Home components/Slider/SliderImage";
import TopDestination from "./Home components/Top Destination/Top_destination";
import Testimonials from "./Home components/Testimonials/Testimonials";
import "./Home.css";
import Modal from "react-modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "./backend";
import SelfPlanTour from "./Tour Categories/SelfPlan Tour/SelfPlanTour";
import CelebritySection from "./Home components/CelebritySection/CelebritySection";
import Preference from "./Home components/Preference/Preference";
import Navbar from "./Home components/Navbar/Navbar";
import Footer from "./Home components/Footer/Footer";
import Play from "./Home components/Play/Play";
import parse from "html-react-parser";
import Popup from "./Popup/Popup";
import moment from "moment";

export default function Home() {
  const [modal, setModal] = useState(false);
  const [selfPlanModal, setSelfPlanModal] = useState(false);
  const [show, setShow] = useState(false);
  const [popup, setPopup] = useState(false);

  const closeSelfModal = () => setModal(false);
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const blogResponse = await axios.get(
      `${API}/blog/search?page=1&pageSize=3`
    );
    setBlogs(blogResponse.data);
  };

  const innerWidth = window.innerWidth;
  useEffect(() => {
    if (innerWidth > 768) {
      setShow(true);
    }
  }, [innerWidth]);

  useEffect(() => {
    getBlogs();
  }, []);

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  Modal.setAppElement("#root");

  useEffect(() => {
    if (!popup) {
      setTimeout(() => {
        setPopup(true);
      }, 7000);
    }
  }, []);

  return (
    <>
      {popup && <Popup setPopup={setPopup} popup={popup} />}
      <Navbar />

      <Modal
        isOpen={selfPlanModal}
        onRequestClose={closeSelfModal}
        style={customStyles}
        contenClassName="selfPlanModals"
        shouldCloseOnOverlayClick={false}
      >
        <div className="close">
          <button
            style={{ fontFamily: "andika" }}
            onClick={() => setSelfPlanModal(false)}
          >
            Close
          </button>
        </div>
        <SelfPlanTour closeModal={() => setSelfPlanModal(false)} />
      </Modal>

      <div className="home">
        <div className="home_top">
          <div className="slider">
            <SliderImage />
          </div>
          <div className="categories">
            <Categories />
          </div>
        </div>
        <div className="populartours">
          <PopularTours />
        </div>
        <Play />
        <Preference />

        <div>
          <div className="selfplan-container ">
            <div className="section_heading selfplan">
              <div className="section_titles">
                <h2>
                  Tired of fixed itineraries? Plan your dream tour, all by
                  yourself!
                </h2>
                <p style={{ width: "100%" }}>
                  Do you constantly find yourself getting frustrated with all
                  the rigidly planned itineraries, when your soul yearns to
                  wander on its own? Well, no more settling! Not if tourOn has a
                  say about it. Even though the option reads "Plan it yourself",
                  all you need to do is answer a few questions and leave the
                  rest to us experts. We will help you curate your tour plan,
                  just the way you picture it! So, what're you waiting for?
                </p>
              </div>
            </div>
            <div className="selfimage">
              <img
                src="https://image.freepik.com/free-vector/visual-data-concept-illustration_114360-1713.jpg"
                alt="self plan"
              />
            </div>
          </div>
          <div className="selfplan-button">
            <button onClick={() => setSelfPlanModal(true)}>
              Plan it Yourself
            </button>
          </div>
        </div>

        <div className="popularcountries">
          <PopularCountries />
        </div>
        <div className="topdestination">
          <TopDestination />
        </div>
      </div>

      <div className="country">
        <div className="country-header">
          <div className="country-title">
            <h2>Latest Blogs</h2>
            <p>
              Read about your favourite destinations, and get to know about the
              latest trends in tourism from our Blog.. New articles everyday!
            </p>
          </div>
          <div>
            <Link to="/blogs" className="plink">
              {show ? (
                <div className="pcountry-">
                  <h4>View all Blogs</h4>
                </div>
              ) : (
                <div className="pcountry">
                  <h4>View all Blogs</h4>
                </div>
              )}
            </Link>
          </div>
        </div>
        <div className="country_content">
          <div className="blogs">
            {blogs.map((b, index) => (
              <div className="blog-content" key={index}>
                <img src={b.imageSrc} alt="bllog" />
                <div className="blog-details">
                  {b.updated ? (
                    <>
                      {b.updatedAt === "" ? null : (
                        <h6>{moment(b.updatedAt, "YYYYMMDD").fromNow()}</h6>
                      )}
                    </>
                  ) : (
                    <>
                      {b.createdAt === "" ? null : (
                        <h6>{moment(b.createdAt, "YYYYMMDD").fromNow()}</h6>
                      )}
                    </>
                  )}
                  <h1>{b.blogTitle}</h1>
                  <p>{parse(b.content.slice(0, 140))}...</p>
                  <Link
                    key={index}
                    className="plink"
                    to={{
                      pathname: `/blogdetails/${b.blogTitle}/${b._id}/${b.countryName}`,
                    }}
                  >
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="testi">
        <Testimonials />
        <CelebritySection />
      </div>
      <Footer />
    </>
  );
}
