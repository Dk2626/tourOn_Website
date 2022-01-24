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

const OnBoardForm = () => {
  const { emails, dest, type, onward, returns, bv } = useParams()
  const messagesEndRef = useRef(null)
  const [onBoardForm, setOnBoardForm] = useState({
    email: emails,
    destination: dest,
    destinationType: type,
    address: "",
    pincode: "",
    travellers: [],
    onwardDate: onward,
    returnDate: returns,
    bookingValue: bv,
  })
  const [traveller, setTraveller] = useState({
    id: uuidv4(),
    name: "",
    age: "",
    gender: "",
    documents: [],
  })
  const {
    email,
    destination,
    destinationType,
    address,
    pincode,
    travellers,
    onwardDate,
    returnDate,
    bookingValue,
  } = onBoardForm
  const { gender, name, age, documents } = traveller
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [travelKey, setTravelKey] = useState("")
  const [openTravellerForm, setOpenTravellerForm] = useState(false)
  const [person, setPerson] = useState("")
  const [update, setUpdate] = useState(false)
  let history = useHistory()

  console.log(`onBoardForm`, onBoardForm)
  console.log(`traveller`, traveller)

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
    setOpenTravellerForm(false)
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
        email: email,
        destination: destination,
        destinationType: destinationType,
        address: address,
        pincode: pincode,
        travellers: travellers,
        onwardDate: onwardDate,
        returnDate: returnDate,
        bookingValue: bookingValue,
      })
      .then(() => {
        setOnBoardForm({
          email: "",
          destination: "",
          destinationType: "",
          address: "",
          pincode: "",
          travellers: [],
          onwardDate: "",
          returnDate: "",
          bookingValue: "",
        })
        history.goBack()
      })
      .catch((error) => console.log(error))
  }

  const updateOnBoardForm = () => {
    firedb
      .ref(`onBoard/${travelKey}`)
      .set({
        email: email,
        destination: destination,
        destinationType: destinationType,
        address: address,
        pincode: pincode,
        travellers: travellers,
        onwardDate: onwardDate,
        returnDate: returnDate,
        bookingValue: bookingValue,
      })
      .then(() => {
        setOnBoardForm({
          email: "",
          destination: "",
          destinationType: "",
          address: "",
          pincode: "",
          travellers: [],
          onwardDate: "",
          returnDate: "",
          bookingValue: "",
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
              email: d.val().email,
              destination: d.val().destination,
              destinationType: d.val().destinationType,
              address: d.val().address,
              pincode: d.val().pincode,
              travellers: d.val().travellers,
            })
          }
        })
      }
    })
  }
  useEffect(() => {
    getTravellers()
  }, [])

  const scroll = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scroll, [openTravellerForm])

  return (
    <div>
      <div className="onBoardFormHead">
        <h1 className="onBoardFormH1">On Board Form</h1>
      </div>
      <div className="onBoardFormButton">
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
      </div>
      <div className="onBoardMainForm">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Name"
            variant="outlined"
            disabled={true}
            value={email}
          />
          <TextField
            label="Destination"
            variant="outlined"
            disabled={true}
            value={destination}
          />
          <TextField
            label="Destination Type"
            variant="outlined"
            disabled={true}
            value={destinationType}
          />
          <TextField
            label="Onward Date"
            variant="outlined"
            disabled={true}
            value={onwardDate}
          />
          <TextField
            label="Return Date"
            variant="outlined"
            disabled={true}
            value={returnDate}
          />
          <TextField
            label="Booking Value"
            variant="outlined"
            disabled={true}
            value={bookingValue}
          />
          <TextField
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) =>
              setOnBoardForm({
                ...onBoardForm,
                address: e.target.value,
              })
            }
          />
          <TextField
            label="Pincode"
            variant="outlined"
            value={pincode}
            type="number"
            onChange={(e) =>
              setOnBoardForm({
                ...onBoardForm,
                pincode: e.target.value,
              })
            }
          />
        </Box>
      </div>

      {travellers.length !== 0 && (
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
      )}

      {travellers.length !== 0 && (
        <div className="travelListForm">
          {travellers.map((traveller, i) => {
            const { id, name, age, gender, documents } = traveller
            if (name == person) {
              return (
                <div key={i} className="travelListFormInner">
                  <div>
                    <div className="travelListCN">
                      <h6 className="travelListCNTitle">Name: </h6>
                      <h6 className="travelListCNBody">{name}</h6>
                    </div>
                    <div className="travelListCN">
                      <h6 className="travelListCNTitle">Age: </h6>
                      <h6 className="travelListCNBody">{age}</h6>
                    </div>
                    <div className="travelListCN">
                      <h6 className="travelListCNTitle">Gender: </h6>
                      <h6 className="travelListCNBody">{gender}</h6>
                    </div>
                    <div>
                      {documents.map((document, i) => {
                        return (
                          <div key={i}>
                            <div className="travelListCN">
                              <h6 className="travelListCNTitle">
                                {`Document ${i + 1}` == "Document 1"
                                  ? "Passport: "
                                  : `Document ${i + 1}` == "Document 2"
                                  ? "Photo: "
                                  : "Id Proof: "}
                              </h6>
                              <h6 className="travelListCNBody">
                                {document.fileName}
                              </h6>
                            </div>
                          </div>
                        )
                      })}
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
                        setOpenTravellerForm(true)
                        setUpdate(true)
                        // scroll()
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
            }
          })}
        </div>
      )}

      <div className="addtravellerMB">
        <button
          onClick={() => {
            setOpenTravellerForm(true)
            setUpdate(true)
            // scroll()
          }}
          disabled={!address || !pincode}
          className={!address || !pincode ? "disabletravelB" : "activetravelB"}
        >
          Add traveller
        </button>
      </div>

      <div>
        {openTravellerForm && (
          <div className="fileForm">
            <div style={{ display: "flex" }}>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "35ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) =>
                    setTraveller({
                      ...traveller,
                      name: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Age"
                  variant="outlined"
                  value={age}
                  type="number"
                  onChange={(e) =>
                    setTraveller({
                      ...traveller,
                      age: e.target.value,
                    })
                  }
                />
              </Box>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
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
            </div>

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
                    <div>
                      <label>Passport Size Photo +</label>
                      {documents[0]?.fileName ? (
                        <div>
                          <div>{documents[0]?.fileName}</div>
                        </div>
                      ) : (
                        <input
                          type="file"
                          onChange={(e) => {
                            if (documents[0]?.fileName) {
                              uploadFile(e, documents[0]?.fileId)
                            } else {
                              uploadFile(e, "")
                            }
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <label>Id Proof(aadhar/pan) +</label>
                      {documents[1]?.fileName ? (
                        <div>
                          <div>{documents[1]?.fileName}</div>
                        </div>
                      ) : (
                        <input
                          type="file"
                          onChange={(e) => {
                            if (documents[1]?.fileName) {
                              uploadFile(e, documents[1]?.fileId)
                            } else {
                              uploadFile(e, "")
                            }
                          }}
                        />
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
                    <div>
                      <label>Passport +</label>
                      {documents[0]?.fileName ? (
                        <div>
                          <div>{documents[0]?.fileName}</div>
                        </div>
                      ) : (
                        <input
                          type="file"
                          onChange={(e) => {
                            if (documents[0]?.fileName) {
                              uploadFile(e, documents[0]?.fileId)
                            } else {
                              uploadFile(e, "")
                            }
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <label>Passport Size Photo +</label>
                      {documents[1]?.fileName ? (
                        <div>
                          <div>{documents[1]?.fileName}</div>
                        </div>
                      ) : (
                        <input
                          type="file"
                          onChange={(e) => {
                            if (documents[1]?.fileName) {
                              uploadFile(e, documents[1]?.fileId)
                            } else {
                              uploadFile(e, "")
                            }
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <label>Id Proof(aadhar/pan) +</label>
                      {documents[2]?.fileName ? (
                        <div>
                          <div>{documents[2]?.fileName}</div>
                        </div>
                      ) : (
                        <input
                          type="file"
                          onChange={(e) => {
                            if (documents[2]?.fileName) {
                              uploadFile(e, documents[2]?.fileId)
                            } else {
                              uploadFile(e, "")
                            }
                          }}
                        />
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
            <div>
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
                    setOpenTravellerForm(false)
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
                Save
              </button>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}

export default OnBoardForm
