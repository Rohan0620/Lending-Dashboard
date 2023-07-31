import React from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Auth = () => {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  let navigate = useNavigate();
  const showError = () => {
    toast.error("Please try again later. Server is busy.", {
      position: "top-center",
    });
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/Lenders/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.status === "Success") {
        localStorage.setItem("token", json.token);
        // if (json.navigate) {
          navigate("/dashboard");
        // } else {
        //   navigate("/addhospinfo");
        // }
      } 
    } catch (json) {
      toast.error(json.reply,{
        position:"top-right"
      })
      showError();
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  React.useEffect(()=>{
    sessionStorage.removeItem('selectedTab');
  })

  return (
    <>
      <div className="flex w-full h-screen font-Poppins">
        {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )}
        <div className="w-[70vw]">
          <img
            src={require("../../image/bg_login.png")}
            alt="bgimage"
            className="w-[70vw] h-screen"
          />
        </div>
        <div className="bg-blue w-[30vw]">
          <div className="mt-[150px]">
            <img
              src={require("../../image/curecoinHome.jpg")}
              alt="curecoin"
              className="w-[300px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="text-[35px] text-white font-bold">Sign In</span>
            <span className="text-2xl text-white mt-2">
            Used the assigned username<br/> and password to sign in.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 p-12"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="username"
                id="username"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="User Name"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-12">
              <button
                type="submit"
                className="text-white bg-darkBlue cursor-pointer border-none text-2xl rounded-lg mr-2 mb-2 w-[594px] h-[65px]"
                disabled={submitting}
              >
                <span className="align-center mb-4 font-['Poppins'] font-bold">
                  SIGN IN
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      {submitting && (
        <div className="fixed inset-0 bg-gray-500 opacity-75 z-50"></div>
      )}
      <ToastContainer />
    </>
  );
};

export default Auth;
