import React from "react";
import { useNavigate, Link } from "react-router-dom";


const Auth = () => {
  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
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
      navigate("/addhospinfo");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="flex flex-col w-[100vw] justify-center items-center">
        <div className="flex flex-col mt-[160px] w-[677px] h-[704px] px-6 py-4 overflow-hidden shadow-md sm:max-w-md sm:rounded-lg border-5 border-solid rounded-3xl border-blue relative">
          <div className="flex mt-[10px] flex-row justify-start items-start">
            <svg
              className="h-8 w-8 text-black cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={()=>{navigate("/")}}
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="18" y1="6" x2="6" y2="18" />{" "}
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="flex mt-[40px] flex-row justify-start items-start font-bold">
            <span className="text-4xl/[35px]">Sign In</span>
          </div>
          <div className="flex mt-[18px] flex-row justify-start items-start">
            <span className="text-2xl/[26px] ml-2">
              Use the assigned username and password to sign in.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] flex-row items-start">
              <input
                type="text"
                name="username"
                id="username"
                className="block w-full mt-1 font-normal text-3xl border-solid border-1 border-blue border-t-0 border-x-0 border-black-300 text-left placeholder-blue outline-transparent color-"
                placeholder="User Name"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full mt-1 font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 border-black-300 text-left placeholder-blue outline-transparent"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button
                type="submit"
                className="text-white bg-blue cursor-pointer border-none text-2+xl rounded-lg mr-2 mb-2 w-[594px] h-[51px]"
              >
                <span className="align-center mb-4 font-['Poppins'] font-bold">SIGN IN</span>
              </button>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-lg font-normal text-black">Don't have an account? <Link to="/register">Sign Up</Link> </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
