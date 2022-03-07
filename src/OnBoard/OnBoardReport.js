import React, { useState, useEffect } from "react"
import { firedb } from "../firebase"
import LoaderAni from "../LoaderAnimation/LoaderAni"
import "./OnBoardReport.css"

const OnBoardReport = () => {
  const [rprtDocuments, setRprtDocuments] = useState([])
  const [loading, setLoading] = useState(false)

  console.log("rprtDocuments", rprtDocuments)

  const getReports = () => {
    setLoading(true)
    let doc = []
    firedb.ref("onBoardReport").on("value", (data) => {
      data.forEach((d) => {
        doc.push(d.val())
      })
      setRprtDocuments(doc)
      setLoading(false)
    })
  }

  useEffect(() => {
    getReports()
  }, [])

  if (loading) {
    return <LoaderAni />
  } else
    return (
      <div>
        <div className="onBreportTitle">
          <h1>On Board Report</h1>
        </div>
        <div className="onBreportForm">
          <div className="onBreportFormInnerTc">
            <h4 className="onBreportFormInnerTh4_1">Name</h4>
            <h4 className="onBreportFormInnerTh4_2">Email</h4>
            <h4 className="onBreportFormInnerTh4_3">Destination</h4>
            <h4 className="onBreportFormInnerTh4_4">Destination Type</h4>
            <h4 className="onBreportFormInnerTh4_5">Onward Date</h4>
            <h4 className="onBreportFormInnerTh4_6">Return Date</h4>
            <h4 className="onBreportFormInnerTh4_7">Adults</h4>
            <h4 className="onBreportFormInnerTh4_8">Childs</h4>
          </div>
          {rprtDocuments.map((r, i) => {
            const {
              name,
              adults,
              childs,
              email,
              destination,
              destinationType,
              onwardDate,
              returnDate,
            } = r
            return (
              <div className="onBreportFormInnerTc">
                <h6 className="onBreportFormInnerTh6_1">{name}</h6>
                <h6 className="onBreportFormInnerTh6_2">{email}</h6>
                <h6 className="onBreportFormInnerTh6_3">{destination}</h6>
                <h6 className="onBreportFormInnerTh6_4">{destinationType}</h6>
                <h6 className="onBreportFormInnerTh6_5">{onwardDate}</h6>
                <h6 className="onBreportFormInnerTh6_6">{returnDate}</h6>
                <h6 className="onBreportFormInnerTh6_7">{adults}</h6>
                <h6 className="onBreportFormInnerTh6_8">{childs}</h6>
              </div>
            )
          })}
        </div>
      </div>
    )
}

export default OnBoardReport
