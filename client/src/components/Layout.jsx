import React, { useEffect, useState } from 'react';
import '../styles/layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserQuery } from '../store/api';
import { clearUser, setUser } from '../store/userSlice';
import { stopLoading } from '../store/loadingSlice';
import { showToast } from '../utils/toatService';
const Layout = ({children}) => {
  const { data, isSuccess } = useGetUserQuery();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const user = useSelector((state)=>state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminMenu = [
    {
      name:'Home',
      path:'/',
      icon:'ri-home-line'
    },
    {
      name:'users',
      path:'/users',
      icon: 'ri-user-fill'
    },
    {
      name:'Doctors',
      path:'/doctors',
      icon:'ri-hospital-line'
    },
    {
      name:'Profile',
      path:'/profile',
      icon:'ri-nurse-fill'
    },
  ];

  const userMenu = [
    {
      name:'Home',
      path:'/',
      icon:'ri-home-line'
    },
    {
      name:'Appointment',
      path:'/appointments',
      icon:'ri-file-list-line'
    },
    {
      name:'Apply Doctor',
      path:'/apply-doctor',
      icon:'ri-shield-user-line'
    },
    {
      name:'Profile',
      path:'/profile',
      icon:'ri-nurse-fill'
    },
    {
      name:'Logout',
      path:'/logout',
      icon:'ri-logout-box-r-line'
    }
  ];

  useEffect(() => {
    try {
      if (data && isSuccess) {
        showToast({ type: 'success', message: data.message });
    
        dispatch(setUser({...data.user}));
        stopLoading();
      }
    } catch (error) {
     
      console.log(error);
      showToast({ type: 'error', message: data.message });
      localStorage.removeItem('token');
      navigate('/login');
      stopLoading();
    }
    
    
  }, [isSuccess, data]); // Runs when `data` changes
  
  const menuToBeRendered = user?.isAdmin? adminMenu:userMenu;
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collapsed?'collapsed-sidebar':'sidebar'}`}>
          <div className="sidebar-header">
            <h1 className='logo'>SH</h1>
          </div>
          <div className="menu">
            {
              menuToBeRendered.map((menu)=>{
                const isActive = location.pathname === menu.path;
                return <div key={menu.name} className={`d-flex menu-item  ${isActive?'active-menu-item':''}`}>
                  <i className={menu.icon}></i>
                  { !collapsed? <Link to={menu.path}>
                    {menu.name}
                  </Link>:''}
                </div>;
              })
             
            }
            <div key='logout' className='menu-item'>
              <i className='ri-logout-box-r-line '></i>
              { !collapsed? <span className='logout-text'
                onClick={()=>{
                  localStorage.removeItem('token');
                  clearUser();
                  navigate('/login');
                }}
              >
                    Logout
              </span>:''}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            <i className={`${collapsed?'ri-menu-line': 'ri-close-fill'} remix-icons`}
              onClick={()=>setCollapsed(!collapsed)}
            ></i>
            <div className="d-flex notification-container">
              <i className="ri-notification-line remix-icons"></i>
              <div className="username">{user?.name}</div>
            </div>
          </div>
          <div className="body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;