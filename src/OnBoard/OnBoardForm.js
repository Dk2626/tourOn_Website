import React, { useState, useEffect, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import "./OnBoardForm.css"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { v4 as uuidv4 } from "uuid"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { firedb, fireStorage } from "../firebase"
import LinearProgress from "@mui/material/LinearProgress"
import { MdEdit, MdDelete } from "react-icons/md"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
// import { styled } from "@mui/material/styles"
// import { Swiper, SwiperSlide } from "swiper/react"
import { Swiper, SwiperSlide } from "swiper/react/swiper-react"
// Import Swiper styles
import "swiper/swiper.min.css"
// import required modules
import { Autoplay } from "swiper"
import onBimg1 from "../assests/onBImg/onBimg1.jpg"
import onBimg2 from "../assests/onBImg/onBimg2.jpg"
import onBimg3 from "../assests/onBImg/onBimg3.jpg"

const OnBoardForm = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const { names, emails, dest, type, onward, returns, bv, adult, child } =
    useParams()
  const messagesEndRef = useRef(null)
  const [onBoardForm, setOnBoardForm] = useState({
    namee: names,
    email: emails,
    destination: dest,
    destinationType: type,
    address: "",
    pincode: "",
    // travellers: [
    //   {
    //     id: "123",
    //     name: "Dinesh",
    //     age: "23",
    //     gender: "Male",
    //     documents: [
    //       {
    //         fileId: "234",
    //         fileName: "dk.jpg",
    //         fileUrl: "https",
    //       },
    //     ],
    //   },
    //   {
    //     id: "123",
    //     name: "Dinesh",
    //     age: "23",
    //     gender: "Male",
    //     documents: [
    //       {
    //         fileId: "234",
    //         fileName: "dk.jpg",
    //         fileUrl: "https",
    //       },
    //     ],
    //   },
    // ],
    travellers: [],
    childrens: [],
    onwardDate: onward,
    returnDate: returns,
    bookingValue: bv,
    adults: adult,
    childs: child,
  })
  const [traveller, setTraveller] = useState({
    id: uuidv4(),
    name: "",
    age: "",
    gender: "",
    documents: [],
  })
  const [children, setChildren] = useState({
    idc: uuidv4(),
    namec: "",
    agec: "",
    genderc: "",
    documentsc: [],
  })
  const {
    namee,
    email,
    destination,
    destinationType,
    address,
    pincode,
    travellers,
    childrens,
    onwardDate,
    returnDate,
    bookingValue,
    adults,
    childs,
  } = onBoardForm
  const { gender, name, age, documents } = traveller
  const { genderc, namec, agec, documentsc } = children
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [travelKey, setTravelKey] = useState("")
  const [openTravellerForm, setOpenTravellerForm] = useState(false)
  const [person, setPerson] = useState("")
  const [update, setUpdate] = useState(false)
  const [step, setStep] = useState(1)
  const [innerStep, setInnerStep] = useState(1)
  let history = useHistory()

  console.log(`onBoardForm`, onBoardForm)
  console.log(`traveller`, traveller)
  console.log("children", children)

  const uploadFile = async (e, fileId) => {
    setUploading(true)
    const file = e.target.files[0]
    const ref = fireStorage.ref(`onBoard/${file.name}`)
    const task = ref.put(file)
    task.on("state_changed", (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      setProgress(Math.round(per))
    })
    task.then(() => {
      ref.getDownloadURL().then((url) => {
        setProgress(0)
        setUploading(false)
        if (fileId !== "") {
          const filter = documents.map((doc) => {
            if (doc.fileId === fileId) {
              doc.fileId = fileId
              doc.fileUrl = url
              doc.fileName = file.name
              return doc
            }
            return doc
          })
          setTraveller({
            ...traveller,
            documents: filter,
          })
        } else {
          setTraveller({
            ...traveller,
            documents: [
              ...documents,
              {
                fileId: uuidv4(),
                fileUrl: url,
                fileName: file.name,
              },
            ],
          })
        }
      })
    })
  }

  const uploadFilec = async (e, fileId) => {
    setUploading(true)
    const file = e.target.files[0]
    const ref = fireStorage.ref(`onBoard/${file.name}`)
    const task = ref.put(file)
    task.on("state_changed", (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
      setProgress(Math.round(per))
    })
    task.then(() => {
      ref.getDownloadURL().then((url) => {
        setProgress(0)
        setUploading(false)
        if (fileId !== "") {
          const filter = documentsc.map((doc) => {
            if (doc.fileId === fileId) {
              doc.fileId = fileId
              doc.fileUrl = url
              doc.fileName = file.name
              return doc
            }
            return doc
          })
          setChildren({
            ...children,
            documentsc: filter,
          })
        } else {
          setChildren({
            ...children,
            documentsc: [
              ...documentsc,
              {
                fileId: uuidv4(),
                fileUrl: url,
                fileName: file.name,
              },
            ],
          })
        }
      })
    })
  }

  const editTraveller = (ids) => {
    setEdit(true)
    const travellersFilter = travellers.filter(
      (traveller) => traveller.id == ids
    )
    const { id, name, age, gender, documents } = travellersFilter[0]
    setTraveller({
      ...traveller,
      id,
      name,
      age,
      gender,
      documents,
    })
    setInnerStep(2)
  }
  const editChildren = (ids) => {
    setEdit(true)
    const childrensFilter = childrens.filter((children) => children.idc == ids)
    const { idc, namec, agec, genderc, documentsc } = childrensFilter[0]
    setChildren({
      ...children,
      idc,
      namec,
      agec,
      genderc,
      documentsc,
    })
    setInnerStep(3)
  }

  const updateTraveller = (ids) => {
    travellers.map((travel) => {
      if (travel.id == ids) {
        travel.id = traveller.id
        travel.name = traveller.name
        travel.age = traveller.age
        travel.gender = traveller.gender
        travel.documents = traveller.documents

        return travel
      }
      return travel
    })
    setEdit(false)
    // setOpenTravellerForm(false)
    setTraveller({
      id: uuidv4(),
      name: "",
      age: "",
      gender: "",
      documents: [],
    })
    setInnerStep(1)
  }

  const updateChildren = (ids) => {
    childrens.map((child) => {
      if (child.idc == ids) {
        child.idc = children.idc
        child.namec = children.namec
        child.agec = children.agec
        child.genderc = children.genderc
        child.documentsc = children.documentsc

        return child
      }
      return child
    })
    setEdit(false)
    // setOpenTravellerForm(false)
    setChildren({
      idc: uuidv4(),
      namec: "",
      agec: "",
      genderc: "",
      documentsc: [],
    })
    setInnerStep(1)
  }

  const deleteTraveller = (id) => {
    const travellersFilter = travellers.filter(
      (traveller) => traveller.id !== id
    )
    setOnBoardForm({
      ...onBoardForm,
      travellers: travellersFilter,
    })
  }

  const deleteChildren = (id) => {
    const childrensFilter = childrens.filter((children) => children.idc !== id)
    setOnBoardForm({
      ...onBoardForm,
      childrens: childrensFilter,
    })
  }

  // const filterfile = (fileId) => {
  //   const fileFilter = documents.filter(
  //     (document) => document.fileId !== fileId
  //   )
  //   setTraveller({
  //     ...traveller,
  //     documents: fileFilter,
  //   })
  // }

  const addOnBoardForm = () => {
    firedb
      .ref(`onBoard`)
      .push({
        name: namee,
        email: email,
        destination: destination,
        destinationType: destinationType,
        address: address,
        pincode: pincode,
        travellers: travellers,
        childrens: childrens,
        onwardDate: onwardDate,
        returnDate: returnDate,
        bookingValue: bookingValue,
        adult: adults,
        child: childs,
      })
      .then(() => {
        setOnBoardForm({
          namee: "",
          email: "",
          destination: "",
          destinationType: "",
          address: "",
          pincode: "",
          travellers: [],
          childrens: [],
          onwardDate: "",
          returnDate: "",
          bookingValue: "",
          adults: "",
          childs: "",
        })
        history.goBack()
      })
      .catch((error) => console.log(error))
  }

  const updateOnBoardForm = () => {
    firedb
      .ref(`onBoard/${travelKey}`)
      .set({
        name: namee,
        email: email,
        destination: destination,
        destinationType: destinationType,
        address: address,
        pincode: pincode,
        travellers: travellers,
        childrens: childrens,
        onwardDate: onwardDate,
        returnDate: returnDate,
        bookingValue: bookingValue,
        adult: adults,
        child: childs,
      })
      .then(() => {
        setOnBoardForm({
          namee: "",
          email: "",
          destination: "",
          destinationType: "",
          address: "",
          pincode: "",
          travellers: [],
          childrens: [],
          onwardDate: "",
          returnDate: "",
          bookingValue: "",
          adults: "",
          childs: "",
        })
        history.goBack()
      })
      .catch((error) => console.log(error))
  }

  const getTravellers = () => {
    firedb.ref(`/onBoard`).on("value", (data) => {
      if (data) {
        data.forEach((d) => {
          if (
            d.val().email === emails &&
            d.val().destination === dest &&
            d.val().onwardDate === onward
          ) {
            setTravelKey(d.key)
            setOnBoardForm({
              ...onBoardForm,
              address: d.val().address,
              pincode: d.val().pincode,
              travellers: d.val().travellers,
              childrens: d.val().childrens,
            })
          }
        })
      }
    })
  }
  useEffect(() => {
    getTravellers()
  }, [])

  // const scroll = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  // }

  // useEffect(scroll, [openTravellerForm])

  // const CssTextField = styled(TextField)({
  //   "& label.Mui-focused": {
  //     color: "#472ecd",
  //   },
  //   "& .MuiInput-underline:after": {
  //     borderBottomColor: "#472ecd",
  //   },
  //   // "& .MuiOutlinedInput-root": {
  //   //   "& fieldset": {
  //   //     borderColor: "red",
  //   //   },
  //   //   "&:hover fieldset": {
  //   //     borderColor: "yellow",
  //   //   },
  //   //   "&.Mui-focused fieldset": {
  //   //     borderColor: "green",
  //   //   },
  //   // },
  // })

  const renderInnerForm = () => {
    switch (innerStep) {
      case 1:
        return (
          <div>
            <div>
              <div className="docOnBoardA">
                <div>
                  <h5>Add Documents for {adults} adults </h5>
                </div>
                <button
                  onClick={() => setInnerStep(innerStep + 1)}
                  disabled={adults == travellers.length}
                  className={
                    adults == travellers.length
                      ? "docOnBoardABtnDis"
                      : "docOnBoardABtn"
                  }
                >
                  +
                </button>
              </div>
              <div>
                {travellers.length !== 0 && (
                  <div className="travelListForm">
                    {travellers.map((traveller, i) => {
                      const { id, name, age, gender, documents } = traveller
                      return (
                        <div key={i} className="travelListFormInner">
                          <div className="travelIndexM">
                            <div className="travelIndex">
                              <h6>{name.slice(0, 1).toUpperCase()}</h6>
                            </div>
                            <div className="travelIndexName">
                              <h6>{name}</h6>
                            </div>
                          </div>
                          <div className="travelListEditDel">
                            <MdEdit
                              className="travelListEdit"
                              size={20}
                              color="blue"
                              cursor="pointer"
                              onClick={() => {
                                editTraveller(id)
                                // setOpenTravellerForm(true)
                                // setUpdate(true)
                              }}
                            />
                            <MdDelete
                              className="travelListDel"
                              size={20}
                              color="red"
                              cursor="pointer"
                              onClick={() => {
                                deleteTraveller(id)
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
            {childs > 0 && (
              <div>
                <div className="docOnBoardA">
                  <div>
                    <h5>Add Documents for {childs} childs </h5>
                  </div>
                  <button
                    onClick={() => setInnerStep(innerStep + 2)}
                    disabled={childs == childrens.length}
                    className={
                      childs == childrens.length
                        ? "docOnBoardABtnDis"
                        : "docOnBoardABtn"
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  {childrens.length !== 0 && (
                    <div className="travelListForm">
                      {childrens.map((children, i) => {
                        const { idc, namec, agec, genderc, documents } =
                          children
                        return (
                          <div key={i} className="travelListFormInner">
                            <div className="travelIndexM">
                              <div className="travelIndex">
                                <h6>{namec.slice(0, 1).toUpperCase()}</h6>
                              </div>
                              <div className="travelIndexName">
                                <h6>{namec}</h6>
                              </div>
                            </div>
                            <div className="travelListEditDel">
                              <MdEdit
                                className="travelListEdit"
                                size={20}
                                color="blue"
                                cursor="pointer"
                                onClick={() => {
                                  editChildren(idc)
                                  // setOpenTravellerForm(true)
                                  // setUpdate(true)
                                }}
                              />
                              <MdDelete
                                className="travelListDel"
                                size={20}
                                color="red"
                                cursor="pointer"
                                onClick={() => {
                                  deleteChildren(idc)
                                }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="travelIndexButtonM">
              {childs > 0 ? (
                <button
                  onClick={() => setInnerStep(innerStep + 3)}
                  disabled={
                    !(adults == travellers.length && childs == childrens.length)
                  }
                  className={
                    !(adults == travellers.length && childs == childrens.length)
                      ? "travelIndexButtonmdis"
                      : "travelIndexButtonm"
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => setInnerStep(innerStep + 3)}
                  disabled={!(adults == travellers.length)}
                  className={
                    !(adults == travellers.length)
                      ? "travelIndexButtonmdis"
                      : "travelIndexButtonm"
                  }
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="onBDoc">
            <div className="onBDocInput">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setTraveller({
                    ...traveller,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="onBDocInput">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) =>
                  setTraveller({
                    ...traveller,
                    age: e.target.value,
                  })
                }
              />
            </div>
            <FormControl
              component="fieldset"
              // className="fileFormControll"
              className="onBDocInput"
            >
              {/* <FormLabel component="legend">Gender</FormLabel> */}
              <label>Gender</label>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={gender}
                onChange={(e) =>
                  setTraveller({
                    ...traveller,
                    gender: e.target.value,
                  })
                }
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <div>
              <div>
                {uploading && (
                  <div>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress variant="determinate" value={progress} />
                    </Box>
                    <h6>
                      {progress > 0
                        ? `Uploading ${progress} %`
                        : "Uploading please wait..."}
                    </h6>
                  </div>
                )}
              </div>
              <div>
                {destinationType == "Domestic" ? (
                  <div className="FileChange">
                    <div>
                      <div className="fileFlex">
                        <label className="fileflexLab">
                          Passport Size Photo +
                        </label>
                        {documents[0]?.fileName ? (
                          <div className="fileflexLabm">
                            {documents[0]?.fileName}
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documents[0]?.fileName) {
                                  uploadFile(e, documents[0]?.fileId)
                                } else {
                                  uploadFile(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                      <div claclassName="fileFlex">
                        <label className="fileflexLab">
                          Id Proof(aadhar/pan) +
                        </label>
                        {documents[1]?.fileName ? (
                          <div className="fileflexLabm">
                            {documents[1]?.fileName}
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documents[1]?.fileName) {
                                  uploadFile(e, documents[1]?.fileId)
                                } else {
                                  uploadFile(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      {documents.length >= 2 && (
                        <button
                          className="ChangeFileBtn"
                          onClick={() =>
                            setTraveller({
                              ...traveller,
                              documents: [],
                            })
                          }
                        >
                          Change files
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="FileChange">
                    <div>
                      <div className="fileFlex">
                        <label className="fileflexLab">Passport +</label>
                        {documents[0]?.fileName ? (
                          <div className="fileflexLabm">
                            {documents[0]?.fileName}
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documents[0]?.fileName) {
                                  uploadFile(e, documents[0]?.fileId)
                                } else {
                                  uploadFile(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                      <div className="fileFlex">
                        <label className="fileflexLab">
                          Passport Size Photo +
                        </label>
                        {documents[1]?.fileName ? (
                          <div className="fileflexLabm">
                            {documents[1]?.fileName}
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documents[1]?.fileName) {
                                  uploadFile(e, documents[1]?.fileId)
                                } else {
                                  uploadFile(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                      <div className="fileFlex">
                        <label className="fileflexLab">
                          Id Proof(aadhar/pan) +
                        </label>
                        {documents[2]?.fileName ? (
                          <div className="fileflexLabm">
                            {documents[2]?.fileName}
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documents[2]?.fileName) {
                                  uploadFile(e, documents[2]?.fileId)
                                } else {
                                  uploadFile(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="chngBtnFile">
                      {documents.length >= 3 && (
                        <button
                          className="ChangeFileBtn"
                          onClick={() =>
                            setTraveller({
                              ...traveller,
                              documents: [],
                            })
                          }
                        >
                          Change files
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="OnBoardSubmitDoc">
                <button
                  onClick={() => {
                    if (edit) {
                      updateTraveller(traveller.id)
                    } else {
                      setOnBoardForm({
                        ...onBoardForm,
                        travellers: [...travellers, traveller],
                      })
                      setTraveller({
                        id: uuidv4(),
                        name: "",
                        age: "",
                        gender: "",
                        documents: [],
                      })
                      setInnerStep(1)
                      // setOpenTravellerForm(false)
                    }
                  }}
                  className={
                    !name ||
                    !age ||
                    !gender ||
                    (destinationType == "Domestic"
                      ? documents.length < 2
                      : documents.length < 3)
                      ? "OnBoardSubmitDisable"
                      : "OnBoardSubmit"
                  }
                  disabled={
                    !name ||
                    !age ||
                    !gender ||
                    (destinationType == "Domestic"
                      ? documents.length < 2
                      : documents.length < 3)
                  }
                >
                  {edit ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="onBDoc">
            <div className="onBDocInput">
              <label>Name</label>
              <input
                type="text"
                value={namec}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    namec: e.target.value,
                  })
                }
              />
            </div>
            <div className="onBDocInput">
              <label>Age</label>
              <input
                type="number"
                value={agec}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    agec: e.target.value,
                  })
                }
              />
            </div>
            <FormControl
              component="fieldset"
              // className="fileFormControll"
              className="onBDocInput"
            >
              {/* <FormLabel component="legend">Gender</FormLabel> */}
              <label>Gender</label>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={genderc}
                onChange={(e) =>
                  setChildren({
                    ...children,
                    genderc: e.target.value,
                  })
                }
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
            <div>
              <div>
                {uploading && (
                  <div>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress variant="determinate" value={progress} />
                    </Box>
                    <h6>
                      {progress > 0
                        ? `Uploading ${progress} %`
                        : "Uploading please wait..."}
                    </h6>
                  </div>
                )}
              </div>
              <div>
                {destinationType == "Domestic" ? (
                  <div className="FileChange">
                    <div>
                      <div className="fileFlex">
                        <label className="fileflexLab">
                          Passport Size Photo +
                        </label>
                        {documentsc[0]?.fileName ? (
                          <div>{documentsc[0]?.fileName}</div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documentsc[0]?.fileName) {
                                  uploadFilec(e, documentsc[0]?.fileId)
                                } else {
                                  uploadFilec(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                      <div claclassName="fileFlex">
                        <label className="fileflexLab">
                          Id Proof(aadhar/pan) +
                        </label>
                        {documentsc[1]?.fileName ? (
                          <div>{documentsc[1]?.fileName}</div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documentsc[1]?.fileName) {
                                  uploadFilec(e, documentsc[1]?.fileId)
                                } else {
                                  uploadFilec(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      {documentsc.length >= 2 && (
                        <button
                          className="ChangeFileBtn"
                          onClick={() =>
                            setChildren({
                              ...children,
                              documentsc: [],
                            })
                          }
                        >
                          Change files
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="FileChange">
                    <div>
                      <div className="fileFlex">
                        <label className="fileflexLab">Passport +</label>
                        {documentsc[0]?.fileName ? (
                          <div>{documentsc[0]?.fileName}</div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documentsc[0]?.fileName) {
                                  uploadFilec(e, documentsc[0]?.fileId)
                                } else {
                                  uploadFilec(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                      <div className="fileFlex">
                        <label className="fileflexLab">
                          Passport Size Photo +
                        </label>
                        {documentsc[1]?.fileName ? (
                          <div>{documentsc[1]?.fileName}</div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documentsc[1]?.fileName) {
                                  uploadFilec(e, documentsc[1]?.fileId)
                                } else {
                                  uploadFilec(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                      <div className="fileFlex">
                        <label className="fileflexLab">
                          Id Proof(aadhar/pan) +
                        </label>
                        {documentsc[2]?.fileName ? (
                          <div>{documentsc[2]?.fileName}</div>
                        ) : (
                          <>
                            <input
                              type="file"
                              id="actual-btn"
                              hidden
                              onChange={(e) => {
                                if (documentsc[2]?.fileName) {
                                  uploadFilec(e, documentsc[2]?.fileId)
                                } else {
                                  uploadFilec(e, "")
                                }
                              }}
                            />
                            <label for="actual-btn" className="choLabel">
                              Choose File
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="chngBtnFile">
                      {documentsc.length >= 3 && (
                        <button
                          className="ChangeFileBtn"
                          onClick={() =>
                            setChildren({
                              ...children,
                              documentsc: [],
                            })
                          }
                        >
                          Change files
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="OnBoardSubmitDoc">
                <button
                  onClick={() => {
                    if (edit) {
                      updateChildren(children.idc)
                    } else {
                      setOnBoardForm({
                        ...onBoardForm,
                        childrens: [...childrens, children],
                      })
                      setChildren({
                        idc: uuidv4(),
                        namec: "",
                        agec: "",
                        genderc: "",
                        documentsc: [],
                      })
                      setInnerStep(1)
                      // setOpenTravellerForm(false)
                    }
                  }}
                  className={
                    !namec ||
                    !agec ||
                    !genderc ||
                    (destinationType == "Domestic"
                      ? documentsc.length < 2
                      : documentsc.length < 3)
                      ? "OnBoardSubmitDisable"
                      : "OnBoardSubmit"
                  }
                  disabled={
                    !namec ||
                    !agec ||
                    !genderc ||
                    (destinationType == "Domestic"
                      ? documentsc.length < 2
                      : documentsc.length < 3)
                  }
                >
                  {edit ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="onBAdress">
            <div className="onBAdressInput">
              <label>Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) =>
                  setOnBoardForm({
                    ...onBoardForm,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="onBAdressInput">
              <label>Pincode</label>
              <input
                type="number"
                value={pincode}
                onChange={(e) =>
                  setOnBoardForm({
                    ...onBoardForm,
                    pincode: e.target.value,
                  })
                }
              />
            </div>
            <div className="onBoardFormButton">
              {travelKey ? (
                <button
                  disabled={!address || !pincode}
                  className={
                    !address || !pincode ? "disableOnBoard" : "saveOnBoard"
                  }
                  onClick={() => updateOnBoardForm()}
                >
                  Update
                </button>
              ) : (
                <button
                  disabled={!address || !pincode}
                  className={
                    !address || !pincode ? "disableOnBoard" : "saveOnBoard"
                  }
                  onClick={() => addOnBoardForm()}
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        )

      default:
    }
  }

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className="onBFMF">
            <div className="onBFMm">
              <div className="onBFMmm">
                <div className="onBFullval">
                  <label>Name</label>
                  <div className="OnBFval">{namee}</div>
                </div>
                <div className="onBFullval">
                  <label>Email</label>
                  <div className="OnBFval">{email}</div>
                </div>
                <div className="onBFullval">
                  <label>Destination</label>
                  <div className="OnBFval">{destination}</div>
                </div>
                <div className="onBFullval">
                  <label>Destination Type</label>
                  <div className="OnBFval">{destinationType}</div>
                </div>
                <div className="onBFullval">
                  <label>Adult</label>
                  <div className="OnBFval">{adults}</div>
                </div>
                <div className="onBFullval">
                  <label>Child</label>
                  <div className="OnBFval">{childs}</div>
                </div>
                <div className="onBFullval">
                  <label>Onward Date</label>
                  <div className="OnBFval">{onwardDate}</div>
                </div>
                <div className="onBFullval">
                  <label>Return Date</label>
                  <div className="OnBFval">{returnDate}</div>
                </div>
                <div className="onBFullval">
                  <label>Booking Value</label>
                  <div className="OnBFval">{bookingValue}</div>
                </div>
              </div>
              <div className="onBFMmmb">
                <button
                  className="vrfyOnBoard"
                  onClick={() => setStep(step + 1)}
                >
                  Verify
                </button>
                <button className="rptOnBoard">Report</button>
              </div>
            </div>
          </div>
          //   <div>
          //     <div className="onBoardMainForm">
          //       <Box
          //         component="form"
          //         sx={{
          //           "& > :not(style)":
          //             width > 280
          //               ? { m: 3, width: "45ch" }
          //               : { m: 3, width: "35ch" },
          //         }}
          //         noValidate
          //         autoComplete="off"
          //       >
          //         <TextField
          //           label="Name"
          //           variant="outlined"
          //           disabled={true}
          //           value={namee}
          //         />
          //         <TextField
          //           label="Email"
          //           variant="outlined"
          //           disabled={true}
          //           value={email}
          //         />
          //         <TextField
          //           label="Destination"
          //           variant="outlined"
          //           disabled={true}
          //           value={destination}
          //         />
          //         <TextField
          //           label="Destination Type"
          //           variant="outlined"
          //           disabled={true}
          //           value={destinationType}
          //         />
          //         <TextField
          //           label="Adult"
          //           variant="outlined"
          //           disabled={true}
          //           value={adults}
          //         />
          //         <TextField
          //           label="Child"
          //           variant="outlined"
          //           disabled={true}
          //           value={childs}
          //         />
          //         <TextField
          //           label="Onward Date"
          //           variant="outlined"
          //           disabled={true}
          //           value={onwardDate}
          //         />
          //         <TextField
          //           label="Return Date"
          //           variant="outlined"
          //           disabled={true}
          //           value={returnDate}
          //         />
          //         <TextField
          //           label="Booking Value"
          //           variant="outlined"
          //           disabled={true}
          //           value={bookingValue}
          //         />
          //         {/* <TextField
          //           label="Address"
          //           variant="outlined"
          //           value={address}
          //           onChange={(e) =>
          //             setOnBoardForm({
          //               ...onBoardForm,
          //               address: e.target.value,
          //             })
          //           }
          //         />
          //         <TextField
          //           label="Pincode"
          //           variant="outlined"
          //           value={pincode}
          //           type="number"
          //           onChange={(e) =>
          //             setOnBoardForm({
          //               ...onBoardForm,
          //               pincode: e.target.value,
          //             })
          //           }
          //         /> */}
          //       </Box>
          //       <button className="vrfyOnBoard" onClick={() => setStep(step + 1)}>
          //         Verify
          //       </button>
          //       <button className="rptOnBoard">Report</button>
          //     </div>
          //   </div>
        )

      case 2:
        return (
          <div className="onBFM">
            <div className="onBFMm1">
              <div className="onBFM1">
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <img src={onBimg1} className="mySwiperImg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={onBimg2} className="mySwiperImg" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={onBimg3} className="mySwiperImg" />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="onBFM2">
                <div>{renderInnerForm()}</div>
              </div>
            </div>
          </div>
          // <div>
          //   <div>
          //     <button onClick={() => setStep(step - 1)} className="prevOnBoard">
          //       Previous
          //     </button>
          //   </div>
          //   <div>Add Adults {adults} document</div>
          //   <button
          //     style={{ cursor: "pointer" }}
          //     disabled={adults == travellers.length}
          //     onClick={() => setStep(step + 1)}
          //   >
          //     +
          //   </button>
          //  </div>
        )

      // case 3:
      //   return (
      //     <div>
      //       <div className="onBoardFormHead">
      //         <h1 className="onBoardFormH1">Add Traveller</h1>
      //       </div>
      //       <div>
      //         <button onClick={() => setStep(step - 1)} className="prevOnBoard">
      //           Previous
      //         </button>
      //       </div>
      //       <div>
      //         {travellers.length !== 0 && (
      //           <div className="travelListForm">
      //             {travellers.map((traveller, i) => {
      //               const { id, name, age, gender, documents } = traveller
      //               // if (name == person) {
      //               return (
      //                 <div key={i} className="travelListFormInner">
      //                   <div>
      //                     <div className="travelListCN">
      //                       <h6 className="travelListCNTitle">Name: </h6>
      //                       <h6 className="travelListCNBody">{name}</h6>
      //                     </div>
      //                     <div className="travelListCN">
      //                       <h6 className="travelListCNTitle">Age: </h6>
      //                       <h6 className="travelListCNBody">{age}</h6>
      //                     </div>
      //                     <div className="travelListCN">
      //                       <h6 className="travelListCNTitle">Gender: </h6>
      //                       <h6 className="travelListCNBody">{gender}</h6>
      //                     </div>
      //                     <div>
      //                       {documents.map((document, i) => {
      //                         return (
      //                           <div key={i}>
      //                             <div className="travelListCN">
      //                               <h6 className="travelListCNTitle">
      //                                 {`Document ${i + 1}` == "Document 1"
      //                                   ? "Passport: "
      //                                   : `Document ${i + 1}` == "Document 2"
      //                                   ? "Photo: "
      //                                   : "Id Proof: "}
      //                               </h6>
      //                               <h6 className="travelListCNBody">
      //                                 {document.fileName}
      //                               </h6>
      //                             </div>
      //                           </div>
      //                         )
      //                       })}
      //                     </div>
      //                   </div>
      //                   <div className="travelListEditDel">
      //                     <MdEdit
      //                       className="travelListEdit"
      //                       size={20}
      //                       color="blue"
      //                       cursor="pointer"
      //                       onClick={() => {
      //                         editTraveller(id)
      //                         // setOpenTravellerForm(true)
      //                         setUpdate(true)
      //                       }}
      //                     />
      //                     <MdDelete
      //                       className="travelListDel"
      //                       size={20}
      //                       color="red"
      //                       cursor="pointer"
      //                       onClick={() => {
      //                         deleteTraveller(id)
      //                       }}
      //                     />
      //                   </div>
      //                 </div>
      //               )
      //               // }
      //             })}
      //           </div>
      //         )}
      //       </div>
      //       <div>
      //         <div className="fileForm">
      //           <div className="fileFormTextInput">
      //             <Box
      //               component="form"
      //               sx={{
      //                 "& > :not(style)": { m: 1, width: "35ch" },
      //               }}
      //               noValidate
      //               autoComplete="off"
      //               className="fileFormTextBox"
      //             >
      //               <TextField
      //                 label="Name"
      //                 variant="outlined"
      //                 value={name}
      //                 onChange={(e) =>
      //                   setTraveller({
      //                     ...traveller,
      //                     name: e.target.value,
      //                   })
      //                 }
      //               />
      //               <TextField
      //                 label="Age"
      //                 variant="outlined"
      //                 value={age}
      //                 type="number"
      //                 onChange={(e) =>
      //                   setTraveller({
      //                     ...traveller,
      //                     age: e.target.value,
      //                   })
      //                 }
      //               />
      //             </Box>
      //             <FormControl
      //               component="fieldset"
      //               className="fileFormControll"
      //             >
      //               <FormLabel component="legend">Gender</FormLabel>
      //               <RadioGroup
      //                 row
      //                 aria-label="gender"
      //                 name="row-radio-buttons-group"
      //                 value={gender}
      //                 onChange={(e) =>
      //                   setTraveller({
      //                     ...traveller,
      //                     gender: e.target.value,
      //                   })
      //                 }
      //               >
      //                 <FormControlLabel
      //                   value="Male"
      //                   control={<Radio />}
      //                   label="Male"
      //                 />
      //                 <FormControlLabel
      //                   value="Female"
      //                   control={<Radio />}
      //                   label="Female"
      //                 />
      //               </RadioGroup>
      //             </FormControl>
      //           </div>

      //           <div>
      //             {uploading && (
      //               <div>
      //                 <Box sx={{ width: "100%" }}>
      //                   <LinearProgress
      //                     variant="determinate"
      //                     value={progress}
      //                   />
      //                 </Box>
      //                 <h6>
      //                   {progress > 0
      //                     ? `Uploading ${progress} %`
      //                     : "Uploading please wait..."}
      //                 </h6>
      //               </div>
      //             )}
      //           </div>

      //           <div>
      //             {destinationType == "Domestic" ? (
      //               <div className="FileChange">
      //                 <div>
      //                   <div className="fileFlex">
      //                     <label>Passport Size Photo +</label>
      //                     {documents[0]?.fileName ? (
      //                       <div>{documents[0]?.fileName}</div>
      //                     ) : (
      //                       <input
      //                         type="file"
      //                         onChange={(e) => {
      //                           if (documents[0]?.fileName) {
      //                             uploadFile(e, documents[0]?.fileId)
      //                           } else {
      //                             uploadFile(e, "")
      //                           }
      //                         }}
      //                       />
      //                     )}
      //                   </div>
      //                   <div claclassName="fileFlex">
      //                     <label>Id Proof(aadhar/pan) +</label>
      //                     {documents[1]?.fileName ? (
      //                       <div>{documents[1]?.fileName}</div>
      //                     ) : (
      //                       <input
      //                         type="file"
      //                         onChange={(e) => {
      //                           if (documents[1]?.fileName) {
      //                             uploadFile(e, documents[1]?.fileId)
      //                           } else {
      //                             uploadFile(e, "")
      //                           }
      //                         }}
      //                       />
      //                     )}
      //                   </div>
      //                 </div>
      //                 <div>
      //                   {documents.length >= 2 && (
      //                     <button
      //                       className="ChangeFileBtn"
      //                       onClick={() =>
      //                         setTraveller({
      //                           ...traveller,
      //                           documents: [],
      //                         })
      //                       }
      //                     >
      //                       Change files
      //                     </button>
      //                   )}
      //                 </div>
      //               </div>
      //             ) : (
      //               <div className="FileChange">
      //                 <div>
      //                   <div className="fileFlex">
      //                     <label>Passport +</label>
      //                     {documents[0]?.fileName ? (
      //                       <div>{documents[0]?.fileName}</div>
      //                     ) : (
      //                       <input
      //                         type="file"
      //                         onChange={(e) => {
      //                           if (documents[0]?.fileName) {
      //                             uploadFile(e, documents[0]?.fileId)
      //                           } else {
      //                             uploadFile(e, "")
      //                           }
      //                         }}
      //                       />
      //                     )}
      //                   </div>
      //                   <div className="fileFlex">
      //                     <label>Passport Size Photo +</label>
      //                     {documents[1]?.fileName ? (
      //                       <div>{documents[1]?.fileName}</div>
      //                     ) : (
      //                       <input
      //                         type="file"
      //                         onChange={(e) => {
      //                           if (documents[1]?.fileName) {
      //                             uploadFile(e, documents[1]?.fileId)
      //                           } else {
      //                             uploadFile(e, "")
      //                           }
      //                         }}
      //                       />
      //                     )}
      //                   </div>
      //                   <div className="fileFlex">
      //                     <label>Id Proof(aadhar/pan) +</label>
      //                     {documents[2]?.fileName ? (
      //                       <div>{documents[2]?.fileName}</div>
      //                     ) : (
      //                       <input
      //                         type="file"
      //                         onChange={(e) => {
      //                           if (documents[2]?.fileName) {
      //                             uploadFile(e, documents[2]?.fileId)
      //                           } else {
      //                             uploadFile(e, "")
      //                           }
      //                         }}
      //                       />
      //                     )}
      //                   </div>
      //                 </div>
      //                 <div className="chngBtnFile">
      //                   {documents.length >= 3 && (
      //                     <button
      //                       className="ChangeFileBtn"
      //                       onClick={() =>
      //                         setTraveller({
      //                           ...traveller,
      //                           documents: [],
      //                         })
      //                       }
      //                     >
      //                       Change files
      //                     </button>
      //                   )}
      //                 </div>
      //               </div>
      //             )}
      //           </div>
      //           <div style={{ display: "flex", alignItems: "center" }}>
      //             <button
      //               onClick={() => {
      //                 if (edit) {
      //                   updateTraveller(traveller.id)
      //                 } else {
      //                   setOnBoardForm({
      //                     ...onBoardForm,
      //                     travellers: [...travellers, traveller],
      //                   })
      //                   setTraveller({
      //                     id: uuidv4(),
      //                     name: "",
      //                     age: "",
      //                     gender: "",
      //                     documents: [],
      //                   })
      //                   // setOpenTravellerForm(false)
      //                 }
      //               }}
      //               className={
      //                 !name ||
      //                 !age ||
      //                 !gender ||
      //                 (destinationType == "Domestic"
      //                   ? documents.length < 2
      //                   : documents.length < 3)
      //                   ? "OnBoardSubmitDisable"
      //                   : "OnBoardSubmit"
      //               }
      //               disabled={
      //                 !name ||
      //                 !age ||
      //                 !gender ||
      //                 (destinationType == "Domestic"
      //                   ? documents.length < 2
      //                   : documents.length < 3)
      //               }
      //             >
      //               Save
      //             </button>

      //             <div className="onBoardFormButton">
      //               {travelKey ? (
      //                 <>
      //                   {travellers.length !== 0 && (
      //                     <button
      //                       // disabled={update == false}
      //                       // className={
      //                       //   update == false ? "disableOnBoard" : "saveOnBoard"
      //                       // }
      //                       className="saveOnBoard"
      //                       onClick={() => updateOnBoardForm()}
      //                     >
      //                       Update
      //                     </button>
      //                   )}
      //                 </>
      //               ) : (
      //                 <>
      //                   {travellers.length !== 0 && (
      //                     <button
      //                       // disabled={travellers.length == 0}
      //                       // className={
      //                       //   travellers.length == 0 ? "disableOnBoard" : "saveOnBoard"
      //                       // }
      //                       className="saveOnBoard"
      //                       onClick={() => addOnBoardForm()}
      //                     >
      //                       Complete
      //                     </button>
      //                   )}
      //                 </>
      //               )}
      //             </div>
      //           </div>
      //         </div>
      //         {/* <div ref={messagesEndRef} /> */}
      //       </div>
      //     </div>
      //   )

      default:
    }
  }

  return (
    <div>
      <div className="onBoardFormHead">
        <h1 className="onBoardFormH1">On Board Form</h1>
      </div>
      {/* <div className="onBoardFormButton">
        {travelKey ? (
          <button
            disabled={update == false}
            className={update == false ? "disableOnBoard" : "saveOnBoard"}
            onClick={() => updateOnBoardForm()}
          >
            Update
          </button>
        ) : (
          <button
            disabled={travellers.length == 0}
            className={
              travellers.length == 0 ? "disableOnBoard" : "saveOnBoard"
            }
            onClick={() => addOnBoardForm()}
          >
            Save
          </button>
        )}
      </div> */}

      <div>{renderForm()}</div>

      {/* {travellers.length !== 0 && (
        <div className="travelListField">
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="demo-simple-select-label">
              Traveller List
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={person}
              label="Traveller List"
              onChange={(e) => setPerson(e.target.value)}
            >
              {travellers.map((persons) => {
                return <MenuItem value={persons.name}>{persons.name}</MenuItem>
              })}
            </Select>
          </FormControl>
        </div>
      )} */}

      {/* <div className="addtravellerMB">
        <button
          onClick={() => {
            setOpenTravellerForm(true)
            setUpdate(true)
            setEdit(false)
            setTraveller({
              id: uuidv4(),
              name: "",
              age: "",
              gender: "",
              documents: [],
            })
          }}
          disabled={!address || !pincode}
          className={!address || !pincode ? "disabletravelB" : "activetravelB"}
        >
          Add traveller
        </button>
      </div> */}
    </div>
  )
}

export default OnBoardForm
