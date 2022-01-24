import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { firedb } from "../firebase";
const Backup = () => {
  useEffect(() => {
    Send();
  }, []);

  const [back, setBack] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filterData = () => {
    if (searchText === "") return back;
    else {
      const filterData = back.filter((details) => {
        return (
          details.name
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          details.phoneNumber
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          details.destination
            .trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        );
      });
      return filterData;
    }
  };

  // const render = () => {
  //   let m = [];

  //   cities.forEach((c, i) => {
  //     if (c.cityName === "Warangal") {
  //       console.log("c", c);
  //     }
  //     m.push({
  //       id: c._id,
  //       city: c.cityName,
  //       country: c.countryName,
  //       latitude: parseInt(c.coordinates.latitude),
  //       longitude: parseInt(c.coordinates.longitude),
  //       about: c.aboutCity,

  //       places: c.famousPlacesToVisit,
  //     });
  //   });
  //   setMarkers(m);
  // };
  const Send = () => {
    const m = [];
    firedb.ref("/backupdata").on("value", (data) => {
      data.forEach((c) => {
        m.push(c.val());
      });
    });
    setBack(m);
  };

  // const getCities = async () => {
  //   try {
  //     const cityResponse = await axios.get(`${API}/statecity`);
  //     setCities(cityResponse.data);
  //     console.log("cityResponse.data", cityResponse.data);
  //   } catch (err) {
  //     console.log(err, "err");
  //   }
  // };
  // const SendMarker = () => {
  //   markers.forEach((c) => {
  //     firedb
  //       .ref("/gaiadata")
  //       .push(c)
  //       .then(() => console.log("success"))
  //       .catch((err) => console.log("err", err));
  //   });
  // };

  // const Map = () => {
  //   let mapped = [];

  //   request.forEach((r) => {
  //     users.forEach((u) => {
  //       if (r.guser_id === u.id)
  //         mapped.push({
  //           name: u.name,
  //           phoneNumber: u.phone_number,
  //           destination: r.destination,
  //           requestId: r.request_id,
  //           fromDate: r.from_date,
  //           toDate: r.to_date,
  //         });
  //     });
  //   });
  //   setBack(mapped);
  // };
  return (
    <div>
      {/* <button
        onClick={() => {
          sendProcessEmail("dineshkumardssd@gmail.com");
        }}
      >
        sfs
      </button> */}
      {/* <Speech
        text="Welcome to react speech"
        pitch="1"
        rate="1"
        volume="1"
        lang="en-GB"
        voice="Google UK English Male"
      /> */}

      {/* <button onClick={render}>Map </button>
      <button onClick={SendMarker}>Send </button> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>Count:</h1>
        <h1>{back.length}</h1>
      </div>
      <div style={{ marginLeft: 40 }}>
        <label style={{ marginRight: 5 }}>Search</label>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>
      <div style={{ padding: 30 }}>
        <Table striped>
          <thead>
            <tr>
              <th scope="col">Sl.No</th>
              <th scope="col">Request Id</th>
              <th scope="col">Name</th>
              <th scope="col">Phone number</th>
              <th scope="col">Destination</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filterData()
              .reverse()
              .map((b, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b.requestId}</td>
                    <td>{b.name}</td>
                    <td>{b.phoneNumber}</td>
                    <td>{b.destination}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Backup;
