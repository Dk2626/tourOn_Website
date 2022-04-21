import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './OnBoardForm.css';
import Box from '@mui/material/Box';
import { v4 as uuidv4 } from 'uuid';
import { firedb, fireStorage } from '../firebase';
import LinearProgress from '@mui/material/LinearProgress';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import 'swiper/swiper.min.css';
import { Autoplay } from 'swiper';
import onBimg1 from '../assests/onBImg/onBimg1.jpg';
import onBimg2 from '../assests/onBImg/onBimg2.jpg';
import onBimg3 from '../assests/onBImg/onBimg3.jpg';

const OnBoardForm = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { names, emails, dest, type, onward, returns, bv, adult, child } =
    useParams();
  const [onBoardForm, setOnBoardForm] = useState({
    namee: names,
    email: emails,
    destination: dest,
    destinationType: type,
    address: '',
    pincode: '',
    travellers: [],
    childrens: [],
    onwardDate: onward,
    returnDate: returns,
    bookingValue: bv,
    adults: adult,
    childs: child,
  });
  const [traveller, setTraveller] = useState({
    id: uuidv4(),
    name: '',
    dob: '',
    gender: '',
    documents: [],
  });
  const [children, setChildren] = useState({
    idc: uuidv4(),
    namec: '',
    dobc: '',
    genderc: '',
    documentsc: [],
  });
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
  } = onBoardForm;
  const { gender, name, dob, documents } = traveller;
  const { genderc, namec, dobc, documentsc } = children;
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [termModal, setTermModal] = useState(false);
  const [terms, setTerms] = useState(false);
  const [travelKey, setTravelKey] = useState('');
  const [step, setStep] = useState(1);
  const [innerStep, setInnerStep] = useState(1);
  let history = useHistory();

  console.log(`onBoardForm`, onBoardForm);
  console.log(`traveller`, traveller);
  console.log('children', children);

  const uploadFile = async (e, fileId) => {
    setUploading(true);
    const file = e.target.files[0];
    const ref = fireStorage.ref(`onBoard/${file.name}`);
    const task = ref.put(file);
    task.on('state_changed', (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setProgress(Math.round(per));
    });
    task.then(() => {
      ref.getDownloadURL().then((url) => {
        setProgress(0);
        setUploading(false);
        if (fileId !== '') {
          const filter = documents.map((doc) => {
            if (doc.fileId === fileId) {
              doc.fileId = fileId;
              doc.fileUrl = url;
              doc.fileName = file.name;
              return doc;
            }
            return doc;
          });
          setTraveller({
            ...traveller,
            documents: filter,
          });
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
          });
        }
      });
    });
  };

  const uploadFilec = async (e, fileId) => {
    setUploading(true);
    const file = e.target.files[0];
    const ref = fireStorage.ref(`onBoard/${file.name}`);
    const task = ref.put(file);
    task.on('state_changed', (taskSnapshot) => {
      const per =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setProgress(Math.round(per));
    });
    task.then(() => {
      ref.getDownloadURL().then((url) => {
        setProgress(0);
        setUploading(false);
        if (fileId !== '') {
          const filter = documentsc.map((doc) => {
            if (doc.fileId === fileId) {
              doc.fileId = fileId;
              doc.fileUrl = url;
              doc.fileName = file.name;
              return doc;
            }
            return doc;
          });
          setChildren({
            ...children,
            documentsc: filter,
          });
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
          });
        }
      });
    });
  };

  const editTraveller = (ids) => {
    setEdit(true);
    const travellersFilter = travellers.filter(
      (traveller) => traveller.id == ids
    );
    const { id, name, dob, gender, documents } = travellersFilter[0];
    setTraveller({
      ...traveller,
      id,
      name,
      dob,
      gender,
      documents,
    });
    setInnerStep(2);
  };

  const editChildren = (ids) => {
    setEdit(true);
    const childrensFilter = childrens.filter((children) => children.idc == ids);
    const { idc, namec, dobc, genderc, documentsc } = childrensFilter[0];
    setChildren({
      ...children,
      idc,
      namec,
      dobc,
      genderc,
      documentsc,
    });
    setInnerStep(3);
  };

  const updateTraveller = (ids) => {
    travellers.map((travel) => {
      if (travel.id == ids) {
        travel.id = traveller.id;
        travel.name = traveller.name;
        travel.dob = traveller.dob;
        travel.gender = traveller.gender;
        travel.documents = traveller.documents;

        return travel;
      }
      return travel;
    });
    setEdit(false);
    setTraveller({
      id: uuidv4(),
      name: '',
      dob: '',
      gender: '',
      documents: [],
    });
    setInnerStep(1);
  };

  const updateChildren = (ids) => {
    childrens.map((child) => {
      if (child.idc == ids) {
        child.idc = children.idc;
        child.namec = children.namec;
        child.dobc = children.dobc;
        child.genderc = children.genderc;
        child.documentsc = children.documentsc;

        return child;
      }
      return child;
    });
    setEdit(false);
    setChildren({
      idc: uuidv4(),
      namec: '',
      dobc: '',
      genderc: '',
      documentsc: [],
    });
    setInnerStep(1);
  };

  const deleteTraveller = (id) => {
    const travellersFilter = travellers.filter(
      (traveller) => traveller.id !== id
    );
    setOnBoardForm({
      ...onBoardForm,
      travellers: travellersFilter,
    });
  };

  const deleteChildren = (id) => {
    const childrensFilter = childrens.filter((children) => children.idc !== id);
    setOnBoardForm({
      ...onBoardForm,
      childrens: childrensFilter,
    });
  };

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
          namee: '',
          email: '',
          destination: '',
          destinationType: '',
          address: '',
          pincode: '',
          travellers: [],
          childrens: [],
          onwardDate: '',
          returnDate: '',
          bookingValue: '',
          adults: '',
          childs: '',
        });
        // history.goBack()
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

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
          namee: '',
          email: '',
          destination: '',
          destinationType: '',
          address: '',
          pincode: '',
          travellers: [],
          childrens: [],
          onwardDate: '',
          returnDate: '',
          bookingValue: '',
          adults: '',
          childs: '',
        });
        // history.goBack()
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

  const onboardReport = () => {
    firedb
      .ref(`onBoardReport`)
      .push({
        name: names,
        email: emails,
        destination: dest,
        destinationType: type,
        onwardDate: onward,
        returnDate: returns,
        bookingValue: bv,
        adults: adult,
        childs: child,
      })
      .then(() => {
        setReportModal(true);
      })
      .catch((error) => console.log(error));
  };

  const getTravellers = () => {
    firedb.ref(`/onBoard`).on('value', (data) => {
      if (data) {
        data.forEach((d) => {
          if (
            d.val().email === emails &&
            d.val().destination === dest &&
            d.val().onwardDate === onward
          ) {
            setTravelKey(d.key);
            setOnBoardForm({
              ...onBoardForm,
              address: d.val().address,
              pincode: d.val().pincode,
              travellers: d.val().travellers,
              childrens: d.val().childrens,
            });
          }
        });
      }
    });
  };
  useEffect(() => {
    getTravellers();
  }, []);

  const renderInnerForm = () => {
    switch (innerStep) {
      case 1:
        return (
          <div className='caseMainss'>
            <div>
              <div className='docOnBoardA'>
                <div>
                  <h5>Add Documents for {adults} adults </h5>
                </div>
                <button
                  onClick={() => setInnerStep(innerStep + 1)}
                  disabled={adults == travellers.length}
                  className={
                    adults == travellers.length
                      ? 'docOnBoardABtnDis'
                      : 'docOnBoardABtn'
                  }>
                  +
                </button>
              </div>
              <div>
                {travellers.length !== 0 && (
                  <div className='travelListForm'>
                    {travellers.map((traveller, i) => {
                      const { id, name, dob, gender, documents } = traveller;
                      return (
                        <div key={i} className='travelListFormInner'>
                          <div className='travelIndexM'>
                            <div className='travelIndex'>
                              <h6>{name.slice(0, 1).toUpperCase()}</h6>
                            </div>
                            <div className='travelIndexName'>
                              <h6>{name}</h6>
                            </div>
                          </div>
                          <div className='travelListEditDel'>
                            <MdEdit
                              className='travelListEdit'
                              size={20}
                              color='blue'
                              cursor='pointer'
                              onClick={() => {
                                editTraveller(id);
                              }}
                            />
                            <MdDelete
                              className='travelListDel'
                              size={20}
                              color='red'
                              cursor='pointer'
                              onClick={() => {
                                deleteTraveller(id);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            {childs > 0 && (
              <div>
                <div className='docOnBoardA'>
                  <div>
                    <h5>Add Documents for {childs} childs </h5>
                  </div>
                  <button
                    onClick={() => setInnerStep(innerStep + 2)}
                    disabled={childs == childrens.length}
                    className={
                      childs == childrens.length
                        ? 'docOnBoardABtnDis'
                        : 'docOnBoardABtn'
                    }>
                    +
                  </button>
                </div>
                <div>
                  {childrens.length !== 0 && (
                    <div className='travelListForm'>
                      {childrens.map((children, i) => {
                        const { idc, namec, dobc, genderc, documents } =
                          children;
                        return (
                          <div key={i} className='travelListFormInner'>
                            <div className='travelIndexM'>
                              <div className='travelIndex'>
                                <h6>{namec.slice(0, 1).toUpperCase()}</h6>
                              </div>
                              <div className='travelIndexName'>
                                <h6>{namec}</h6>
                              </div>
                            </div>
                            <div className='travelListEditDel'>
                              <MdEdit
                                className='travelListEdit'
                                size={20}
                                color='blue'
                                cursor='pointer'
                                onClick={() => {
                                  editChildren(idc);
                                }}
                              />
                              <MdDelete
                                className='travelListDel'
                                size={20}
                                color='red'
                                cursor='pointer'
                                onClick={() => {
                                  deleteChildren(idc);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className='travelIndexButtonM'>
              {childs > 0 ? (
                <button
                  onClick={() => setInnerStep(innerStep + 3)}
                  disabled={
                    !(adults == travellers.length && childs == childrens.length)
                  }
                  className={
                    !(adults == travellers.length && childs == childrens.length)
                      ? 'travelIndexButtonmdis'
                      : 'travelIndexButtonm'
                  }>
                  Next
                </button>
              ) : (
                <button
                  onClick={() => setInnerStep(innerStep + 3)}
                  disabled={!(adults == travellers.length)}
                  className={
                    !(adults == travellers.length)
                      ? 'travelIndexButtonmdis'
                      : 'travelIndexButtonm'
                  }>
                  Next
                </button>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className='caseMainss'>
            <div className='onBDoc'>
              <div className='onBDocInput'>
                <label>Name</label>
                <input
                  type='text'
                  placeholder='Ex: John'
                  value={name}
                  onChange={(e) =>
                    setTraveller({
                      ...traveller,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className='onBDocInput'>
                <label>Date of Birth</label>
                <input
                  type='text'
                  placeholder='Ex: 24-10-1992'
                  value={dob}
                  onChange={(e) =>
                    setTraveller({
                      ...traveller,
                      dob: e.target.value,
                    })
                  }
                />
              </div>
              <div className='onBDocInput'>
                <label>Gender</label>
                <div className='onBDocInputRadio'>
                  <div>
                    <input
                      type='radio'
                      className='onBGI'
                      id='onBGMale'
                      name='onBGen'
                      value='Male'
                      checked={gender == 'Male'}
                      onChange={(e) =>
                        setTraveller({
                          ...traveller,
                          gender: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='onBGMale' className='onBGL'>
                      <span className='onBGL-radio'></span>
                      <div className='onBGL-label'>Male</div>
                    </label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      className='onBGI'
                      id='onBGFemale'
                      name='onBGen'
                      value='Female'
                      checked={gender == 'Female'}
                      onChange={(e) =>
                        setTraveller({
                          ...traveller,
                          gender: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='onBGFemale' className='onBGL'>
                      <span className='onBGL-radio'></span>
                      <div className='onBGL-label'>Female</div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {uploading && (
                    <div>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress
                          variant='determinate'
                          value={progress}
                        />
                      </Box>
                      <h6>
                        {progress > 0
                          ? `Uploading ${progress} %`
                          : 'Uploading please wait...'}
                      </h6>
                    </div>
                  )}
                </div>
                <div>
                  {destinationType == 'Domestic' ? (
                    <div className='FileChange'>
                      <div className='FileChangeStyle'>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>
                            Passport Size Photo +
                          </label>
                          {documents[0]?.fileName ? (
                            <div className='fileflexLabm'>
                              {documents[0]?.fileName}
                            </div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documents[0]?.fileName) {
                                    uploadFile(e, documents[0]?.fileId);
                                  } else {
                                    uploadFile(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                        <div claclassName='fileFlex'>
                          <label className='fileflexLab'>
                            Id Proof(aadhar/pan) +
                          </label>
                          {documents[1]?.fileName ? (
                            <div className='fileflexLabm'>
                              {documents[1]?.fileName}
                            </div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documents[1]?.fileName) {
                                    uploadFile(e, documents[1]?.fileId);
                                  } else {
                                    uploadFile(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        {documents.length >= 2 && (
                          <button
                            className='ChangeFileBtn'
                            onClick={() =>
                              setTraveller({
                                ...traveller,
                                documents: [],
                              })
                            }>
                            Change files
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='FileChange'>
                      <div className='FileChangeStyle'>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>Passport +</label>
                          {documents[0]?.fileName ? (
                            <div className='fileflexLabm'>
                              {documents[0]?.fileName}
                            </div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documents[0]?.fileName) {
                                    uploadFile(e, documents[0]?.fileId);
                                  } else {
                                    uploadFile(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>
                            Passport Size Photo +
                          </label>
                          {documents[1]?.fileName ? (
                            <div className='fileflexLabm'>
                              {documents[1]?.fileName}
                            </div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documents[1]?.fileName) {
                                    uploadFile(e, documents[1]?.fileId);
                                  } else {
                                    uploadFile(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>
                            Id Proof(aadhar/pan) +
                          </label>
                          {documents[2]?.fileName ? (
                            <div className='fileflexLabm'>
                              {documents[2]?.fileName}
                            </div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documents[2]?.fileName) {
                                    uploadFile(e, documents[2]?.fileId);
                                  } else {
                                    uploadFile(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='chngBtnFile'>
                        {documents.length >= 3 && (
                          <button
                            className='ChangeFileBtn'
                            onClick={() =>
                              setTraveller({
                                ...traveller,
                                documents: [],
                              })
                            }>
                            Change files
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className='OnBoardSubmitDoc'>
                  <button
                    onClick={() => {
                      if (edit) {
                        updateTraveller(traveller.id);
                      } else {
                        setOnBoardForm({
                          ...onBoardForm,
                          travellers: [...travellers, traveller],
                        });
                        setTraveller({
                          id: uuidv4(),
                          name: '',
                          dob: '',
                          gender: '',
                          documents: [],
                        });
                        setInnerStep(1);
                      }
                    }}
                    className={
                      !name ||
                      !dob ||
                      !gender ||
                      (destinationType == 'Domestic'
                        ? documents.length < 2
                        : documents.length < 3)
                        ? 'OnBoardSubmitDisable'
                        : 'OnBoardSubmit'
                    }
                    disabled={
                      !name ||
                      !dob ||
                      !gender ||
                      (destinationType == 'Domestic'
                        ? documents.length < 2
                        : documents.length < 3)
                    }>
                    {edit ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='caseMainss'>
            <div className='onBDoc'>
              <div className='onBDocInput'>
                <label>Name</label>
                <input
                  type='text'
                  placeholder='Ex: John'
                  value={namec}
                  onChange={(e) =>
                    setChildren({
                      ...children,
                      namec: e.target.value,
                    })
                  }
                />
              </div>
              <div className='onBDocInput'>
                <label>Date of Birth</label>
                <input
                  type='text'
                  placeholder='Ex: 20-11-2010'
                  value={dobc}
                  onChange={(e) =>
                    setChildren({
                      ...children,
                      dobc: e.target.value,
                    })
                  }
                />
              </div>
              <div className='onBDocInput'>
                <label>Gender</label>
                <div className='onBDocInputRadio'>
                  <div>
                    <input
                      type='radio'
                      className='onBGI'
                      id='onBGMale'
                      name='onBGen'
                      value='Male'
                      checked={genderc == 'Male'}
                      onChange={(e) =>
                        setChildren({
                          ...children,
                          genderc: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='onBGMale' className='onBGL'>
                      <span className='onBGL-radio'></span>
                      <div className='onBGL-label'>Male</div>
                    </label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      className='onBGI'
                      id='onBGFemale'
                      name='onBGen'
                      value='Female'
                      checked={genderc == 'Female'}
                      onChange={(e) =>
                        setChildren({
                          ...children,
                          genderc: e.target.value,
                        })
                      }
                    />
                    <label htmlFor='onBGFemale' className='onBGL'>
                      <span className='onBGL-radio'></span>
                      <div className='onBGL-label'>Female</div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  {uploading && (
                    <div>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress
                          variant='determinate'
                          value={progress}
                        />
                      </Box>
                      <h6>
                        {progress > 0
                          ? `Uploading ${progress} %`
                          : 'Uploading please wait...'}
                      </h6>
                    </div>
                  )}
                </div>
                <div>
                  {destinationType == 'Domestic' ? (
                    <div className='FileChange'>
                      <div>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>
                            Passport Size Photo +
                          </label>
                          {documentsc[0]?.fileName ? (
                            <div>{documentsc[0]?.fileName}</div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documentsc[0]?.fileName) {
                                    uploadFilec(e, documentsc[0]?.fileId);
                                  } else {
                                    uploadFilec(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                        <div claclassName='fileFlex'>
                          <label className='fileflexLab'>
                            Id Proof(aadhar/pan) +
                          </label>
                          {documentsc[1]?.fileName ? (
                            <div>{documentsc[1]?.fileName}</div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documentsc[1]?.fileName) {
                                    uploadFilec(e, documentsc[1]?.fileId);
                                  } else {
                                    uploadFilec(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        {documentsc.length >= 2 && (
                          <button
                            className='ChangeFileBtn'
                            onClick={() =>
                              setChildren({
                                ...children,
                                documentsc: [],
                              })
                            }>
                            Change files
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='FileChange'>
                      <div>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>Passport +</label>
                          {documentsc[0]?.fileName ? (
                            <div>{documentsc[0]?.fileName}</div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documentsc[0]?.fileName) {
                                    uploadFilec(e, documentsc[0]?.fileId);
                                  } else {
                                    uploadFilec(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>
                            Passport Size Photo +
                          </label>
                          {documentsc[1]?.fileName ? (
                            <div>{documentsc[1]?.fileName}</div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documentsc[1]?.fileName) {
                                    uploadFilec(e, documentsc[1]?.fileId);
                                  } else {
                                    uploadFilec(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                        <div className='fileFlex'>
                          <label className='fileflexLab'>
                            Id Proof(aadhar/pan) +
                          </label>
                          {documentsc[2]?.fileName ? (
                            <div>{documentsc[2]?.fileName}</div>
                          ) : (
                            <>
                              <input
                                type='file'
                                id='actual-btn'
                                hidden
                                onChange={(e) => {
                                  if (documentsc[2]?.fileName) {
                                    uploadFilec(e, documentsc[2]?.fileId);
                                  } else {
                                    uploadFilec(e, '');
                                  }
                                }}
                              />
                              <label for='actual-btn' className='choLabel'>
                                Choose File
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='chngBtnFile'>
                        {documentsc.length >= 3 && (
                          <button
                            className='ChangeFileBtn'
                            onClick={() =>
                              setChildren({
                                ...children,
                                documentsc: [],
                              })
                            }>
                            Change files
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className='OnBoardSubmitDoc'>
                  <button
                    onClick={() => {
                      if (edit) {
                        updateChildren(children.idc);
                      } else {
                        setOnBoardForm({
                          ...onBoardForm,
                          childrens: [...childrens, children],
                        });
                        setChildren({
                          idc: uuidv4(),
                          namec: '',
                          dobc: '',
                          genderc: '',
                          documentsc: [],
                        });
                        setInnerStep(1);
                      }
                    }}
                    className={
                      !namec ||
                      !dobc ||
                      !genderc ||
                      (destinationType == 'Domestic'
                        ? documentsc.length < 2
                        : documentsc.length < 3)
                        ? 'OnBoardSubmitDisable'
                        : 'OnBoardSubmit'
                    }
                    disabled={
                      !namec ||
                      !dobc ||
                      !genderc ||
                      (destinationType == 'Domestic'
                        ? documentsc.length < 2
                        : documentsc.length < 3)
                    }>
                    {edit ? 'Update' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className='caseMainss'>
            <div className='onBAdress'>
              <div className='onBAdressInput'>
                <label>Address</label>
                <input
                  type='text'
                  placeholder='Ex: Door no, Area, Street, City'
                  value={address}
                  onChange={(e) =>
                    setOnBoardForm({
                      ...onBoardForm,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className='onBAdressInput'>
                <label>Pincode</label>
                <input
                  type='number'
                  placeholder='Ex: 600028'
                  value={pincode}
                  onChange={(e) =>
                    setOnBoardForm({
                      ...onBoardForm,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>
              <div className='onBAdressTerms'>
                <h5 onClick={() => setTermModal(true)}>
                  Read the Terms & Conditions
                </h5>
              </div>
              <div className='onBoardFormButton'>
                {travelKey ? (
                  <button
                    disabled={!address || !pincode || terms == false}
                    className={
                      !address || !pincode || terms == false
                        ? 'disableOnBoard'
                        : 'saveOnBoard'
                    }
                    onClick={() => updateOnBoardForm()}>
                    Update
                  </button>
                ) : (
                  <button
                    disabled={!address || !pincode || terms == false}
                    className={
                      !address || !pincode || terms == false
                        ? 'disableOnBoard'
                        : 'saveOnBoard'
                    }
                    onClick={() => addOnBoardForm()}>
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      default:
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div className='onBFMF'>
            <div className='onBFMm'>
              <div className='onBFMmm'>
                <div className='onBFullval'>
                  <label>Name</label>
                  <div className='OnBFval'>{namee}</div>
                </div>
                <div className='onBFullval'>
                  <label>Email</label>
                  <div className='OnBFval'>{email}</div>
                </div>
                <div className='onBFullval'>
                  <label>Destination</label>
                  <div className='OnBFval'>{destination}</div>
                </div>
                <div className='onBFullval'>
                  <label>Destination Type</label>
                  <div className='OnBFval'>{destinationType}</div>
                </div>
                <div className='onBFullval'>
                  <label>Adult</label>
                  <div className='OnBFval'>{adults}</div>
                </div>
                <div className='onBFullval'>
                  <label>Child</label>
                  <div className='OnBFval'>{childs}</div>
                </div>
                <div className='onBFullval'>
                  <label>Onward Date</label>
                  <div className='OnBFval'>{onwardDate}</div>
                </div>
                <div className='onBFullval'>
                  <label>Return Date</label>
                  <div className='OnBFval'>{returnDate}</div>
                </div>
                <div className='onBFullval'>
                  <label>Booking Value</label>
                  <div className='OnBFval'>{bookingValue}</div>
                </div>
              </div>
              <div className='onBFMmmb'>
                <button
                  className='vrfyOnBoard'
                  onClick={() => setStep(step + 1)}>
                  Verify
                </button>
                <button className='rptOnBoard' onClick={() => onboardReport()}>
                  Report
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='onBFM'>
            <div className='onBFMm1'>
              <div className='onBFM1'>
                <Swiper
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className='mySwiper'>
                  <SwiperSlide>
                    <img src={onBimg1} className='mySwiperImg' />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={onBimg2} className='mySwiperImg' />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={onBimg3} className='mySwiperImg' />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className='onBFM2'>
                <div>{renderInnerForm()}</div>
              </div>
            </div>
          </div>
        );

      default:
    }
  };

  return (
    <div className='onBoardFormHeadMain'>
      <div className='onBoardFormR'>
        <div className={step !== 1 ? 'onBoardFormHead' : 'onBoardFormHead1'}>
          <h1 className='onBoardFormH1'>On Board Form</h1>
        </div>
        {step == 2 && (
          <div className='caseMainss1'>
            <button
              className='prevBtns'
              onClick={() => {
                if (innerStep == 1) {
                  setStep(1);
                } else if (innerStep == 2) {
                  setInnerStep(1);
                } else if (innerStep == 3) {
                  setInnerStep(1);
                } else if (innerStep == 4) {
                  setInnerStep(1);
                }
              }}>
              Previous
            </button>
            <button className='canBtns' onClick={() => history.push('/')}>
              Cancel
            </button>
          </div>
        )}
        <div>{renderForm()}</div>
        {reportModal && (
          <div className='onboardReportModal'>
            <div className='onboardReportModalContent'>
              {/* <div
              className="onboardReportModalClose"
              onClick={() => setReportModal(false)}
            >
              &times;
            </div> */}
              <div className='onboardReportModalContentInner'>
                <h5>
                  Your report have sent successfully, we'll get back to you!
                </h5>
                <h5>Thank you</h5>
                <button onClick={() => history.push('/')}>Go to Home</button>
              </div>
            </div>
          </div>
        )}
        {termModal && (
          <div className='termModal'>
            <div className='termModalContent'>
              <div
                className='termModalClose'
                onClick={() => setTermModal(false)}>
                &times;
              </div>
              <div className='termModalContentInner'>
                <h5>
                  <li>hffffff</li>
                  <li>fffhhj</li>
                </h5>
                <button
                  onClick={() => {
                    setTerms(true);
                    setTermModal(false);
                  }}>
                  I Agree
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnBoardForm;
