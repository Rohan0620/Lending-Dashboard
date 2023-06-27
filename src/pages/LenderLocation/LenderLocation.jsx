import React from "react";
import State from "../../data/States";
import { useNavigate } from "react-router-dom";
const LenderLocation = () => {
  const [address, setAddress] = React.useState({line1:"",line2:"",state:"",city:"",pincode:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/addhosploc",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        line1: address.line1,
        line2: address.line2,
        state:address.state,
        city:address.city,
        pincode:address.pincode
      }),
    })
    const json = await response.json();
    console.log(json)
    if(json.status === "Success"){
      navigate("/addaccount")
    }
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="flex flex-col w-[100vw] justify-center items-center">
        <div className="flex flex-col mt-[160px] w-[677px] h-[704px] px-6 py-4 overflow-hidden shadow-md sm:max-w-md sm:rounded-lg border-5 border-solid rounded-3xl border-blue relative">
          <div className="flex mt-[10px] flex-row justify-start items-start">
            <svg
              className="h-8 w-8 text-black cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={()=>{navigate("/addlenderinfo")}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </div>
          <div className="flex mt-[40px] flex-row justify-start items-start font-bold">
            <span className="text-4xl/[35px]">Branch Location</span>
          </div>
          <div className="flex mt-[18px] flex-row justify-start items-start">
            <span className="text-2xl/[26px] ml-2">
            Tells us where you are located.
            </span>
          </div>
          <form className="flex flex-col flex-grow ml-2 " onSubmit={handleSubmit}>
            <div className="flex mt-[20px] flex-row items-start">
              <input
                type="text"
                name="line1"
                id="line1"
                className="block w-full mt-1 font-normal text-3xl border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Address Line 1"
                onChange={handleChange}
                value={address.line1}
                required
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="text"
                name="line2"
                id="line2"
                className="block w-full mt-1 font-normal text-3xl border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Address Line 2"
                onChange={handleChange}
                value={address.line2}
                required
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <select
                id="state"
                name="state"
                className=" block w-full font-normal text-3xl border-blue border-1 bg-transparent border-t-0 border-x-0 text-left text-blue outline-transparent"
                onChange={handleChange}
                value={address.state}
                required
              >
                <option selected>Choose State</option>
                {State?.states.map((e, key) => {
                  return (
                    <option value={e.state} key={key}>
                      {e.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex mt-4 flex-row items-start">
              <select
                id="city"
                name="city"
                className=" block w-full font-normal text-3xl border-blue border-1 bg-transparent border-t-0 border-x-0 text-left text-blue outline-transparent"
                onChange={handleChange}
                value={address.city}
                required
              >
                <option selected>Choose City</option>
                {State?.states.map((e, key) => {
                  return (
                    <option value={e.state} key={key}>
                      {e.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="number"
                name="pincode"
                id="pincode"
                className="block w-full mt-1 font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Pincode"
                onChange={handleChange}
                value={address.pincode}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button
                type="submit"
                className="text-white bg-blue cursor-pointer border-none text-2xl rounded-lg px-5 py-2.5 mr-2 mb-2 w-[594px] h-[51px]"
              >
                <span className=" font-['Poppins'] font-bold">NEXT</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LenderLocation;
;
