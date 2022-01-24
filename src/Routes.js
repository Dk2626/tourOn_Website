import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import About from "./About components/About"
import Contact from "./Contact components/Contact"
import Destination from "./Destination components/Destination"
import Login from "./Login components/Login"
import Signup from "./Login components/Signup"
import Popular_tour from "./Tours page/Popular_tour"
import Popular_countries from "./Country Page/Popular_countries"
import axios from "axios"
import { API } from "./backend"
import { ApiContext } from "./Context/ApiContext"
import CountryInner from "./Country Page/CountryInner"
import TourInner from "./Tours page/TourInner"
import ScrollToTop from "./ScrollToTop"
import PlannedTour from "./Tour Categories/Planned Tour/PlannedTour"
import HoneymoonTour from "./Tour Categories/Honeymoon Tour/HoneymoonTour"
import LuxuryTour from "./Tour Categories/Luxury Tour/LuxuryTour"
import RoadtripTour from "./Tour Categories/Roadtrip Tour/RoadtripTour"
import SurpriseTour from "./Tour Categories/Surprise Tour/SurpriseTour"
import Visa from "./Visa Page/Visa"
import AdminLogin from "./Admin components/AdminLogin"
import Adminpage from "./Admin components/Adminpage"
import UserDetails from "./Account details components/UserDetails"
import MyRequest from "./Account details components/MyRequest"
import MyVisaRequests from "./Account details components/MyVisaRequests"
import MyPlans from "./Account details components/MyPlans"
import SavedTours from "./Account details components/SavedTours"
import Faq from "./Account details components/Faq"
import Support from "./Account details components/Support"
import { isAuthenticated } from "./Login components/auth"
import PrivateRoute from "./Login components/Privateroutes"
import { ToastProvider } from "react-toast-notifications"
import { firedb } from "./firebase"
import BlogInner from "./Blogs/BlogInner"
import Blog from "./Blogs/Blog"
import AdminRoute from "./Login components/AdminRoute"
import WildlifeTour from "./Tour Categories/Wildlife Tour/WildlifeTour"
import SelfPlanTour from "./Tour Categories/SelfPlan Tour/SelfPlanTour"
import TermsCondition from "./TermsCondition/TermsCondition"
import Privacypolicy from "./Privacypolicy/Privacypolicy"
import SelfPlan from "./Account details components/SelfPlan"
import SalesSidebar from "./SalesAdmin component/SalesSidebar"
import NotFound from "./Not Found/NotFound"
import Backup from "./Backup/Backup"
import BookingRecord from "./SalesAdmin component/BookingRecord"
import "./Routes.css"
import AwardForm from "./PriceForm components/AwardForm"
import SuperAdminRoute from "./Login components/SuperAdminRoute"
import AccessDenied from "./PriceForm components/AccessDenied"
import StoryPage from "./Story components/StoryPage.js"
import StorySection from "./Story components/StorySection.js"
import Resort from "./Resort/Resort"
import ViewResort from "./Resort/ViewResort"
import TotalSaleReport from "./SalesReport/TotalSaleReport"
import OnBoardList from "./OnBoard/OnBoardList"
import OnBoardForm from "./OnBoard/OnBoardForm"

export default function Routes() {
  const [countries, setCountries] = useState([])

  const [userInfo, setUserInfo] = useState({})

  const [employees, setEmployees] = useState([])

  const getEmployee = () => {
    let ar = []
    firedb.ref("employeeDetail").on("value", (snapshot) => {
      if (snapshot.val() != null)
        snapshot.forEach((emp) => {
          ar.push(emp.val())
        })
    })

    setEmployees(ar)
  }

  useEffect(() => {
    getEmployee()
  }, [])

  const getCountries = async () => {
    try {
      const countryResponse = await axios.get(`${API}/country`)
      setCountries(countryResponse.data)
    } catch (err) {
      console.log(err, "err")
    }
  }

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    if (isAuthenticated()) {
      const { user } = isAuthenticated()
      firedb.ref(`userGeneralInfo/${user.uid}`).on("value", (data) => {
        if (data !== null) {
          let val = data.val()
          setUserInfo(val)
        }
      })
    }
  }, [])

  return (
    <ApiContext.Provider
      value={{
        countries,
        userInfo,
        setUserInfo,
        employees,
        setEmployees,
      }}
    >
      <Router>
        <ToastProvider
          autoDismissTimeout={2500}
          placement="top-center"
          autoDismiss={true}
        >
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/planned-tour" component={PlannedTour} />
              <Route path="/surprise-tour" component={SurpriseTour} />
              <Route path="/roadtrip-tour" component={RoadtripTour} />
              <Route path="/luxury-tour" component={LuxuryTour} />
              <Route path="/honeymoon-tour" component={HoneymoonTour} />
              <Route path="/wildlife-tour" component={WildlifeTour} />
              <Route path="/self-planned" component={SelfPlanTour} />
              <Route path="/termsCondition" component={TermsCondition} />
              <Route path="/privacypolicy" component={Privacypolicy} />
              <SuperAdminRoute path="/award" component={AwardForm} />
              <Route path="/access-denied" component={AccessDenied} />
              <Route path="/onboard" component={OnBoardList} />
              <Route
                path="/onboardform/:emails/:dest/:type/:onward/:returns/:bv"
                component={OnBoardForm}
              />
              <AdminRoute exact path="/resort" component={Resort} />
              <AdminRoute path="/resort/:resortid" component={Resort} />
              <AdminRoute path="/resortview" component={ViewResort} />
              {/* <Route path="/how-it-works" component={HowItWorks} /> */}
              <AdminRoute path="/backupdata" component={Backup} />
              <AdminRoute path="/totalsales" component={TotalSaleReport} />
              <AdminRoute
                exact
                path="/bookingrecord"
                component={BookingRecord}
              />
              <AdminRoute
                path="/bookingrecord/:surveyid/:name"
                component={BookingRecord}
              />
              <AdminRoute path="/salesadmin" component={SalesSidebar} />
              <AdminRoute
                path="/salesadmin/selfplan"
                component={SalesSidebar}
              />
              <Route path="/visa" component={Visa} />
              <Route path="/contact" component={Contact} />
              <Route path="/gaia" component={Destination} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/popular_tour" component={Popular_tour} />
              <Route path="/popular_countries" component={Popular_countries} />
              <PrivateRoute path="/profile" exact component={UserDetails} />
              <PrivateRoute path="/profile/my-requests" component={MyRequest} />
              <PrivateRoute
                path="/profile/myvisa-requests"
                component={MyVisaRequests}
              />
              <PrivateRoute path="/profile/my-plans" component={MyPlans} />
              <PrivateRoute
                path="/profile/saved-tours"
                component={SavedTours}
              />
              <PrivateRoute path="/profile/faq" component={Faq} />
              <PrivateRoute path="/profile/support" component={Support} />
              <PrivateRoute path="/profile/selfplan" component={SelfPlan} />
              <Route
                path="/countrydetails/:countryname"
                component={CountryInner}
              />
              <Route path="/blogs" exact component={Blog} />
              <Route path="/faq" exact component={Faq} />
              <Route
                path="/blogdetails/:blogname/:blogid/:countryName"
                component={BlogInner}
              />
              <Route
                path="/tourdetails/:countryname/:cityname/:tourname/:tourid"
                component={TourInner}
              />
              <Route path="/adminlogin" component={AdminLogin} />
              <AdminRoute path="/adminpage" component={Adminpage} />
              <AdminRoute
                employees={employees}
                exact
                path="/admin"
                component={Adminpage}
              />
              <AdminRoute path="/admin/Customers" component={Adminpage} />
              <AdminRoute path="/admin/requests" component={Adminpage} />
              <AdminRoute path="/admin/testimonials" component={Adminpage} />
              <AdminRoute path="/admin/blogpage" component={Adminpage} />
              <AdminRoute path="/admin/adminusers" component={Adminpage} />
              <AdminRoute path="/admin/city" component={Adminpage} />
              <AdminRoute path="/admin/domesticcity" component={Adminpage} />
              <AdminRoute path="/admin/countries" component={Adminpage} />
              <AdminRoute path="/admin/tours" component={Adminpage} />
              <AdminRoute path="/admin/promotion" component={Adminpage} />
              <AdminRoute path="/admin/state" component={Adminpage} />
              <AdminRoute path="/admin/story" component={Adminpage} />
              <AdminRoute
                path="/admin/gaia-suggestions"
                component={Adminpage}
              />
              <Route path="/storysection" component={StorySection} />
              <Route path="/story/:categoryTitle" component={StoryPage} />
              <Route component={NotFound} />
            </Switch>
          </ScrollToTop>
        </ToastProvider>
      </Router>
    </ApiContext.Provider>
  )
}
