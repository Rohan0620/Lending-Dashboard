import React, { useEffect } from 'react';
import Logo from './curecoinHome.jpg';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }, [navigate]);

  return (
    <div className='w-full h-[100vh] bg-blue'>
      <div className="flex flex-col w-full h-full justify-center items-center">
        <img src={Logo} className='fade-in' alt="curecoin" />
      </div>
    </div>
  );
};

export default Home;
