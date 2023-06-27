import React from "react";
import { useNavigate } from "react-router-dom";
const AddAccount = () => {
  const [bankDetails, setBankDetails] = React.useState({accno:"",confaccno:"",ifsc:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/addbankacc",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        accnumber:bankDetails.accno,
        confaccnumber:bankDetails.confaccno,
        ifsccode:bankDetails.ifsc
      }),
    })
    const json = await response.json();
    console.log(json)
    if(json.status === "Success"){
      navigate("/addphnnum")
    }
  }

  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
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
              onClick={()=>{navigate("/addhosploc")}}
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
            <span className="text-4xl/[35px]">
              Add Bank Account
            </span>
          </div>
          <div className="flex mt-[18px] flex-row justify-start items-start flex-wrap">
            <span className="text-xl/[26px] text-400 ml-2 ">
              In order to proceed with payouts. Please add your bank account.
            </span>
          </div>
          <form className="flex flex-col flex-grow ml-2" onSubmit={handleSubmit}>
            <div className="flex mt-[20px] flex-row items-start">
              <input
                type="number"
                name="accno"
                id="accno"
                className="block w-full mt-1 font-normal text-3xl border-blue border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Account Number"
                value={bankDetails.accno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex mt-[20px] flex-row items-start">
              <input
                type="number"
                name="confaccno"
                id="accno"
                className="block w-full mt-1 font-normal text-3xl border-blue border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Confirm Account Number"
                value={bankDetails.confaccno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="text"
                name="ifsc"
                id="ifsc"
                className="block w-full mt-1 font-normal text-3xl border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="IFSC Code"
                value={bankDetails.ifsc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button
                type="submit"
                className="text-white bg-blue cursor-pointer border-none text-2xl rounded-lg px-5 py-2.5 mr-2 mb-2 w-[594px] h-[51px]"
              >
                <span className=" font-['Poppins'] font-bold">Done</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAccount;
