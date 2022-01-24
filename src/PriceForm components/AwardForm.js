import React, { useState, useEffect } from "react";
import "./AwardForm.css";
import { useToasts } from "react-toast-notifications";
import { firedb } from "../firebase";
import moment from "moment";

const AwardForm = () => {
  const { addToast } = useToasts();
  const [showKicker1, setShowKicker1] = useState(false);
  const [showKicker2, setShowKicker2] = useState(false);
  const [showKicker3, setShowKicker3] = useState(false);
  const [showAstronaut1, setShowAstronaut1] = useState(false);
  const [showAstronaut2, setShowAstronaut2] = useState(false);
  const [showAstronaut3, setShowAstronaut3] = useState(false);
  const [showSoftware1, setShowSoftware1] = useState(false);
  const [showSoftware2, setShowSoftware2] = useState(false);
  const [showSoftware3, setShowSoftware3] = useState(false);
  const [showWinston1, setShowWinston1] = useState(false);
  const [showWinston2, setShowWinston2] = useState(false);
  const [showWinston3, setShowWinston3] = useState(false);
  const [showTitanium1, setShowTitanium1] = useState(false);
  const [showTitanium2, setShowTitanium2] = useState(false);
  const [showTitanium3, setShowTitanium3] = useState(false);
  const [showDonDraper1, setShowDonDraper1] = useState(false);
  const [showDonDraper2, setShowDonDraper2] = useState(false);
  const [showDonDraper3, setShowDonDraper3] = useState(false);
  const [showIdeaDigger1, setShowIdeaDigger1] = useState(false);
  const [showIdeaDigger2, setShowIdeaDigger2] = useState(false);
  const [showIdeaDigger3, setShowIdeaDigger3] = useState(false);
  const [showDarer1, setShowDarer1] = useState(false);
  const [showDarer2, setShowDarer2] = useState(false);
  const [showDarer3, setShowDarer3] = useState(false);
  const [showSmarty1, setShowSmarty1] = useState(false);
  const [showSmarty2, setShowSmarty2] = useState(false);
  const [showSmarty3, setShowSmarty3] = useState(false);
  const [showGumDrop1, setShowGumDrop1] = useState(false);
  const [showGumDrop2, setShowGumDrop2] = useState(false);
  const [showGumDrop3, setShowGumDrop3] = useState(false);
  const [showPerfectFind1, setShowPerfectFind1] = useState(false);
  const [showPerfectFind2, setShowPerfectFind2] = useState(false);
  const [showPerfectFind3, setShowPerfectFind3] = useState(false);

  const [awardForm, setAwardForm] = useState({
    kicker: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    astronaut: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    software: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    winston: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    titanium: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    donDraper: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    ideaDigger: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    darer: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    smarty: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    gumDrop: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    perfectFind: {
      name1: "",
      category1: "Monthly",
      name2: "",
      category2: "Quaterly",
      name3: "",
      category3: "Yearly",
    },
    date: moment().format("MMMM Do YYYY"),
  });

  const {
    kicker,
    astronaut,
    software,
    winston,
    titanium,
    donDraper,
    ideaDigger,
    darer,
    smarty,
    gumDrop,
    perfectFind,
  } = awardForm;

  const submitAwardData = (e) => {
    e.preventDefault();
    firedb
      .ref(`awardData/${moment().format("MMMM YYYY")}`)
      .set(awardForm)
      .then(() => {
        addToast("Submitted Successfully", {
          appearance: "success",
        });
        setAwardForm({
          kicker: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          astronaut: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          software: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          winston: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          titanium: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          donDraper: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          ideaDigger: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          darer: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          smarty: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          gumDrop: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
          perfectFind: {
            name1: "",
            category1: "Monthly",
            name2: "",
            category2: "Quaterly",
            name3: "",
            category3: "Yearly",
          },
        });
      })
      .catch((err) => console.log("err :>> ", err));
  };

  const getAwardData = () => {
    firedb
      .ref(`awardData/${moment().format("MMMM YYYY")}`)
      .on("value", (data) => {
        if (data.val() === null || data.val() === undefined) {
          return;
        }
        const {
          kicker,
          astronaut,
          software,
          winston,
          titanium,
          donDraper,
          ideaDigger,
          darer,
          smarty,
          gumDrop,
          perfectFind,
        } = data.val();
        setAwardForm({
          kicker: {
            name1: kicker.name1,
            category1: kicker.category1,
            name2: kicker.name2,
            category2: kicker.category2,
            name3: kicker.name3,
            category3: kicker.category3,
          },
          astronaut: {
            name1: astronaut.name1,
            category1: astronaut.category1,
            name2: astronaut.name2,
            category2: astronaut.category2,
            name3: astronaut.name3,
            category3: astronaut.category3,
          },
          software: {
            name1: software.name1,
            category1: software.category1,
            name2: software.name2,
            category2: software.category2,
            name3: software.name3,
            category3: software.category3,
          },
          winston: {
            name1: winston.name1,
            category1: winston.category1,
            name2: winston.name2,
            category2: winston.category2,
            name3: winston.name3,
            category3: winston.category3,
          },
          titanium: {
            name1: titanium.name1,
            category1: titanium.category1,
            name2: titanium.name2,
            category2: titanium.category2,
            name3: titanium.name3,
            category3: titanium.category3,
          },
          donDraper: {
            name1: donDraper.name1,
            category1: donDraper.category1,
            name2: donDraper.name2,
            category2: donDraper.category2,
            name3: donDraper.name3,
            category3: donDraper.category3,
          },
          ideaDigger: {
            name1: ideaDigger.name1,
            category1: ideaDigger.category1,
            name2: ideaDigger.name2,
            category2: ideaDigger.category2,
            name3: ideaDigger.name3,
            category3: ideaDigger.category3,
          },
          darer: {
            name1: darer.name1,
            category1: darer.category1,
            name2: darer.name2,
            category2: darer.category2,
            name3: darer.name3,
            category3: darer.category3,
          },
          smarty: {
            name1: smarty.name1,
            category1: smarty.category1,
            name2: smarty.name2,
            category2: smarty.category2,
            name3: smarty.name3,
            category3: smarty.category3,
          },
          gumDrop: {
            name1: gumDrop.name1,
            category1: gumDrop.category1,
            name2: gumDrop.name2,
            category2: gumDrop.category2,
            name3: gumDrop.name3,
            category3: gumDrop.category3,
          },
          perfectFind: {
            name1: perfectFind.name1,
            category1: perfectFind.category1,
            name2: perfectFind.name2,
            category2: perfectFind.category2,
            name3: perfectFind.name3,
            category3: perfectFind.category3,
          },
        });
      });
  };

  useEffect(() => {
    getAwardData();
  }, []);

  const Names = [
    "Ms. Kirthika",
    "Ms. Samyuktha",
    "Mr. Ganesh",
    "Mr. Vicky",
    "Mr. Dinesh",
  ];

  return (
    <div className="awardMain">
      <div className="awardMain__background">
        <div className="awardMain__head">
          <h2 className="awardMain__head__title">Award Section</h2>
        </div>
      </div>
      <div className="awardMain__form">
        <div className="awardMain__form__sub">
          <h4>Kicker</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowKicker1(!showKicker1);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {kicker.name1 ? <>{kicker.name1}</> : <>Select</>}
                {showKicker1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      console.log(`n`, n);
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              kicker: {
                                ...kicker,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowKicker2(!showKicker2);
                  setShowKicker1(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {kicker.name2 ? <>{kicker.name2}</> : <>Select</>}
                {showKicker2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              kicker: {
                                ...kicker,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowKicker3(!showKicker3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {kicker.name3 ? <>{kicker.name3}</> : <>Select</>}
                {showKicker3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              kicker: {
                                ...kicker,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={kicker.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Astronaut</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowAstronaut1(!showAstronaut1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {astronaut.name1 ? <>{astronaut.name1}</> : <>Select</>}
                {showAstronaut1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              astronaut: {
                                ...astronaut,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowAstronaut2(!showAstronaut2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {astronaut.name2 ? <>{astronaut.name2}</> : <>Select</>}
                {showAstronaut2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              astronaut: {
                                ...astronaut,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowAstronaut3(!showAstronaut3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {astronaut.name3 ? <>{astronaut.name3}</> : <>Select</>}
                {showAstronaut3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              astronaut: {
                                ...astronaut,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={astronaut.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Software Master</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowSoftware1(!showSoftware1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {software.name1 ? <>{software.name1}</> : <>Select</>}
                {showSoftware1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              software: {
                                ...software,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category1 === "Quaterly" ? true : false}
                />
                <label htmlFor="Quaterly-software" className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowSoftware2(!showSoftware2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {software.name2 ? <>{software.name2}</> : <>Select</>}
                {showSoftware2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              software: {
                                ...software,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowSoftware3(!showSoftware3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {software.name3 ? <>{software.name3}</> : <>Select</>}
                {showSoftware3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              software: {
                                ...software,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={software.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Winston</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowWinston1(!showWinston1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {winston.name1 ? <>{winston.name1}</> : <>Select</>}
                {showWinston1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              winston: {
                                ...winston,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowWinston2(!showWinston2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {winston.name2 ? <>{winston.name2}</> : <>Select</>}
                {showWinston2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              winston: {
                                ...winston,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  id="Quaterly-winston"
                  checked={winston.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowWinston3(!showWinston3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {winston.name3 ? <>{winston.name3}</> : <>Select</>}
                {showWinston3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              winston: {
                                ...winston,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category3 === "Quaterly" ? true : false}
                />
                <label htmlFor="Quaterly-winston" className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={winston.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Titanium</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowTitanium1(!showTitanium1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {titanium.name1 ? <>{titanium.name1}</> : <>Select</>}
                {showTitanium1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              titanium: {
                                ...titanium,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowTitanium2(!showTitanium2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {titanium.name2 ? <>{titanium.name2}</> : <>Select</>}
                {showTitanium2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              titanium: {
                                ...titanium,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowTitanium3(!showTitanium3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {titanium.name3 ? <>{titanium.name3}</> : <>Select</>}
                {showTitanium3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              titanium: {
                                ...titanium,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={titanium.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Don Draper</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowDonDraper1(!showDonDraper1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {donDraper.name1 ? <>{donDraper.name1}</> : <>Select</>}
                {showDonDraper1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              donDraper: {
                                ...donDraper,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowDonDraper2(!showDonDraper2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {donDraper.name2 ? <>{donDraper.name2}</> : <>Select</>}
                {showDonDraper2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              donDraper: {
                                ...donDraper,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowDonDraper3(!showDonDraper3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {donDraper.name3 ? <>{donDraper.name3}</> : <>Select</>}
                {showDonDraper3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              donDraper: {
                                ...donDraper,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category3 === "Monthly" ? true : false}
                  value="Monthly"
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={donDraper.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Idea Digger</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowIdeaDigger1(!showIdeaDigger1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {ideaDigger.name1 ? <>{ideaDigger.name1}</> : <>Select</>}
                {showIdeaDigger1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              ideaDigger: {
                                ...ideaDigger,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowIdeaDigger2(!showIdeaDigger2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {ideaDigger.name2 ? <>{ideaDigger.name2}</> : <>Select</>}
                {showIdeaDigger2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              ideaDigger: {
                                ...ideaDigger,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowIdeaDigger3(!showIdeaDigger3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {ideaDigger.name3 ? <>{ideaDigger.name3}</> : <>Select</>}
                {showIdeaDigger3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              ideaDigger: {
                                ...ideaDigger,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={ideaDigger.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Darer</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowDarer1(!showDarer1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {darer.name1 ? <>{darer.name1}</> : <>Select</>}
                {showDarer1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              darer: {
                                ...darer,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowDarer2(!showDarer2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {darer.name2 ? <>{darer.name2}</> : <>Select</>}
                {showDarer2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              darer: {
                                ...darer,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowDarer3(!showDarer3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {darer.name3 ? <>{darer.name3}</> : <>Select</>}
                {showDarer3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              darer: {
                                ...darer,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={darer.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Smarty</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowSmarty1(!showSmarty1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {smarty.name1 ? <>{smarty.name1}</> : <>Select</>}
                {showSmarty1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              smarty: {
                                ...smarty,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowSmarty2(!showSmarty2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {smarty.name2 ? <>{smarty.name2}</> : <>Select</>}
                {showSmarty2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              smarty: {
                                ...smarty,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowSmarty3(!showSmarty3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {smarty.name3 ? <>{smarty.name3}</> : <>Select</>}
                {showSmarty3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              smarty: {
                                ...smarty,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={smarty.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Gumdrop</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowGumDrop1(!showGumDrop1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {gumDrop.name1 ? <>{gumDrop.name1}</> : <>Select</>}
                {showGumDrop1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              gumDrop: {
                                ...gumDrop,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category1 === "Monthly" ? true : false}
                  value="Monthly"
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowGumDrop2(!showGumDrop2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {gumDrop.name2 ? <>{gumDrop.name2}</> : <>Select</>}
                {showGumDrop2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              gumDrop: {
                                ...gumDrop,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowGumDrop3(!showGumDrop3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {gumDrop.name3 ? <>{gumDrop.name3}</> : <>Select</>}
                {showGumDrop3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              gumDrop: {
                                ...gumDrop,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={gumDrop.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="awardMain__form__sub">
          <h4>Perfect Find</h4>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowPerfectFind1(!showPerfectFind1);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind2(false);
                  setShowPerfectFind3(false);
                }}
              >
                {perfectFind.name1 ? <>{perfectFind.name1}</> : <>Select</>}
                {showPerfectFind1 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              perfectFind: {
                                ...perfectFind,
                                name1: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category1 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category1 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category1 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowPerfectFind2(!showPerfectFind2);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind3(false);
                }}
              >
                {perfectFind.name2 ? <>{perfectFind.name2}</> : <>Select</>}
                {showPerfectFind2 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              perfectFind: {
                                ...perfectFind,
                                name2: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category2 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category2 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category2 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
          <div className="award__Combine">
            <div className="award__Name">
              <h6>Name</h6>
              <div
                className="award__name"
                onClick={() => {
                  setShowPerfectFind3(!showPerfectFind3);
                  setShowKicker1(false);
                  setShowKicker2(false);
                  setShowKicker3(false);
                  setShowAstronaut1(false);
                  setShowAstronaut2(false);
                  setShowAstronaut3(false);
                  setShowSoftware1(false);
                  setShowSoftware2(false);
                  setShowSoftware3(false);
                  setShowWinston1(false);
                  setShowWinston2(false);
                  setShowWinston3(false);
                  setShowTitanium1(false);
                  setShowTitanium2(false);
                  setShowTitanium3(false);
                  setShowDonDraper1(false);
                  setShowDonDraper2(false);
                  setShowDonDraper3(false);
                  setShowIdeaDigger1(false);
                  setShowIdeaDigger2(false);
                  setShowIdeaDigger3(false);
                  setShowDarer1(false);
                  setShowDarer2(false);
                  setShowDarer3(false);
                  setShowSmarty1(false);
                  setShowSmarty2(false);
                  setShowSmarty3(false);
                  setShowGumDrop1(false);
                  setShowGumDrop2(false);
                  setShowGumDrop3(false);
                  setShowPerfectFind1(false);
                  setShowPerfectFind2(false);
                }}
              >
                {perfectFind.name3 ? <>{perfectFind.name3}</> : <>Select</>}
                {showPerfectFind3 && (
                  <div className="award__Name-List">
                    {Names.map((n, i) => {
                      return (
                        <li
                          onClick={() =>
                            setAwardForm({
                              ...awardForm,
                              perfectFind: {
                                ...perfectFind,
                                name3: n,
                              },
                            })
                          }
                        >
                          {n}
                        </li>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="award__category">
              <h6>Category</h6>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category3 === "Monthly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Monthly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category3 === "Quaterly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Quaterly
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  className="radioo-input"
                  checked={perfectFind.category3 === "Yearly" ? true : false}
                />
                <label className="radioo-label">
                  <span className="cutsom-radioo"></span>
                  Yearly
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="awardMain-button">
        <button onClick={submitAwardData}>Submit</button>
      </div>
    </div>
  );
};

export default AwardForm;
