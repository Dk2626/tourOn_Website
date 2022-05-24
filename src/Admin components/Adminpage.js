import React, { useContext, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { AdminSidebarData } from './AdminSidebarData';
import '../Account details components/Profilepage.css';
import { ApiContext } from '../Context/ApiContext';
import Admin from './Admin';
import Customers from './Customers';
import Countries from './Countries';
import Tours from './Tours';
import { GiCompactDisc } from 'react-icons/gi';
import './Adminpage.css';
import Requests from './Requests';
import Testimonialspage from './Testimonialspage';
import Blogpage from './Blogpage';
import Adminusers from './Adminusers';
import City from './City';
import Promotion from './Promotion';
import DomesticCity from './DomesticCity';
import State from './State';
import GaiaSuggestions from './GaiaSuggestions';
import AddStories from './AddStories';
import Particulars from './Particulars';
import PaymentType from './PaymentType';
import Vendor from './Vendor';

const routes = [
  {
    path: '/admin',
    exact: true,
    main: () => <Admin />,
  },
  {
    path: '/admin/requests',
    // sidebar: () => <Sidebar />,
    main: () => <Requests />,
  },
  {
    path: '/admin/customers',
    // sidebar: () => <Sidebar />,
    main: () => <Customers />,
  },
  {
    path: '/admin/city',
    // sidebar: () => <Sidebar />,
    main: () => <City />,
  },
  {
    path: '/admin/domesticcity',
    // sidebar: () => <Sidebar />,
    main: () => <DomesticCity />,
  },
  {
    path: '/admin/countries',
    // sidebar: () => <Sidebar />,
    main: () => <Countries />,
  },
  {
    path: '/admin/tours',
    // sidebar: () => <Sidebar />,
    main: () => <Tours />,
  },
  {
    path: '/admin/testimonials',
    // sidebar: () => <Sidebar />,
    main: () => <Testimonialspage />,
  },
  {
    path: '/admin/blogpage',
    // sidebar: () => <Sidebar />,
    main: () => <Blogpage />,
  },
  {
    path: '/admin/adminusers',
    // sidebar: () => <Sidebar />,
    main: () => <Adminusers />,
  },
  {
    path: '/admin/promotion',
    // sidebar: () => <Sidebar />,
    main: () => <Promotion />,
  },
  {
    path: '/admin/gaia-suggestions',
    // sidebar: () => <Sidebar />,
    main: () => <GaiaSuggestions />,
  },
  {
    path: '/admin/state',
    // sidebar: () => <Sidebar />,
    main: () => <State />,
  },
  {
    path: '/admin/story',
    // sidebar: () => <Sidebar />,
    main: () => <AddStories />,
  },
  {
    path: '/admin/particulars',
    // sidebar: () => <Sidebar />,
    main: () => <Particulars />,
  },
  {
    path: '/admin/paymentstype',
    // sidebar: () => <Sidebar />,
    main: () => <PaymentType />,
  },
  {
    path: '/admin/vendors',
    // sidebar: () => <Sidebar />,
    main: () => <Vendor />,
  },
];

const Adminpage = () => {
  const { userInfo } = useContext(ApiContext);
  const lo = useLocation();

  const [clicked, setClicked] = useState('');
  useEffect(() => {
    const { pathname } = lo;
    setClicked(pathname);
  }, [lo]);

  return (
    <Router>
      <div className='maincontainer'>
        <div
          className={'sidebar-menu'}
          style={{
            width: '20%',
            color: '#fff',
            overflow: 'scroll',
            height: '100vh',
            maxHeight: '100vh',
          }}>
          <div className='comname'>
            <div className='admindetails'>
              <img src={userInfo.photoURL} alt='profile pic' />
              <div>
                <h5 style={{ color: '#000' }}>{userInfo.name} , Admin</h5>
              </div>
            </div>
          </div>

          <ul
            className='sidebar-menu-items'
            style={{
              borderBottom: '1px solid #9e9e9e',
              margin: ' 0 10px 10px',
            }}>
            <li
              onClick={() => setClicked('/')}
              className={
                '/' === clicked ? ` sidebar-text clickeds ` : `sidebar-tex`
              }>
              <Link to='/' target='_blank'>
                <GiCompactDisc color='#9e9e9e' />
                <span className='sidebar-tex' style={{ color: '#000' }}>
                  Access to website
                </span>
              </Link>
            </li>
          </ul>

          <ul className='sidebar-menu-items'>
            {AdminSidebarData.map((item, index) => {
              return (
                <li
                  key={index}
                  onClick={() => setClicked(item.path)}
                  className={
                    item.path === clicked
                      ? `sidebar-tex clickedss`
                      : `sidebar-tex`
                  }>
                  <Link to={item.path}>
                    {item.icon}
                    <span className='sidebar-title' style={{ color: '#000' }}>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div style={{ width: '100%', maxHeight: '80vh' }}>
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

export default Adminpage;
