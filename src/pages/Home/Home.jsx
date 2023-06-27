import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Curecoin from "./curecoinHome.jpg";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  });

  return (
    <div className="w-full h-[100vh] bg-blue">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <img src={Curecoin} alt="curecoin" />
      </div>
    </div>
  );
};

export default Home;
