import React from "react";
import { useNavigate } from "react-router-dom";

const LenderInfo = () => {
  const [data, setData] = React.useState({lenderName:"",inChargeName:"",category:""})
  let navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch("http://localhost:8000/addhospinfo",{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        lenderName: data.lenderName,
        inChargeName: data.inChargeName,
        category:data.category
      }),
    })
    const json = await response.json();
    console.log(json)
    if(json.status === "Success"){
      navigate("/addhosploc")
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
              onClick={()=>{navigate("/login")}}
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
            <span className="text-4xl/[35px]">Lender Info</span>
          </div>
          <div className="flex mt-[18px] flex-row justify-start items-start">
            <span className="text-2xl/[26px] ml-2">
            Tells us about your details and your category.
            </span>
          </div>
          <form className="flex flex-col flex-grow ml-2 " onSubmit={handleSubmit}>
            <div className="flex mt-[20px] flex-row items-start">
              <input
                type="text"
                name="lenderName"
                id="lenderName"
                className="block w-full mt-1 font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="Lender Name"
                value={data.lenderName}
                onChange={handleChange}
                required
                
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="text"
                name="inChargeName"
                id="inChargeName"
                className="block w-full mt-1 font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="In Charge Name"
                value={data.inChargeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <select
                id="category"
                className=" block w-full font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 text-left text-blue bg-white outline-transparent"
                name="category"
                value={data.category}
                onChange={handleChange}
                defaultValue=""
                required
              >
                <option value="0" selected disabled>Lender Category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </select>
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="number"
                name="phnnumber"
                id="number"
                className="block w-full mt-1 font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="In Charge Phone Number"
              />
            </div>
            <div className="flex mt-4 flex-row items-start">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full mt-1 font-normal text-3xl border-solid border-blue border-1 border-t-0 border-x-0 text-left placeholder-blue outline-transparent"
                placeholder="In Charge Email"
              />
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button
                type="submit"
                className="text-white bg-blue border-none text-2xl rounded-lg px-5 py-2.5 mr-2 mb-2 w-[594px] h-[51px]"
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

export default LenderInfo;
