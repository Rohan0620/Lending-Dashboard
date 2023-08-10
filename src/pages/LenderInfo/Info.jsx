import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const HospitalInfo = () => {
  const [data, setData] = React.useState({
    lenderName: "",
    inChargeName: "",
    category: "",
  });
  const [submitting, setSubmitting] = React.useState(false);

  let navigate = useNavigate();
  const showError = (msg) => {
    toast.error({msg}, {
      position: "top-right",
    });
  };


  // const response = await fetch("http://localhost:8000/addhospinfo",{
  //   method:"PATCH",
  //   headers:{
  //     "Content-Type":"application/json",
  //     "Authorization":`Bearer ${localStorage.getItem('token')}`
  //   },
  //   body: JSON.stringify({
  //     hospitalName: data.hospitalName,
  //     inChargeName: data.inChargeName,
  //     category:data.category
  //   }),
  // })








  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSubmitting(true);
    // try {
      const response = await fetch("http://localhost:8000/Lenders/addlenderinfo",{
          method: "PATCH",
          headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${localStorage.getItem('token')}`
              },
              withCredentials: true,

              body: JSON.stringify({
                lenderName: data.lenderName,
                inChargeName: data.inChargeName,
                category: data.category,
                  }),
        });

      console.log("Respone", response);
      const json = await response.json();
      console.log("Json",json);

      if (json.status === "Success") {
        console.log("Success");
        navigate("/addlenderloc");
      }
      else
      {
        toast.error("Lender already registered!",{
          position:"top-right"
        })
      }
    // } catch (json) {
    //   showError(json.message);
    // }
    // setSubmitting(false);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
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
              src={require("../../image/Home.png")}
              alt="curecoin"
              className="w-[300px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="text-[35px] text-white font-bold">
              Lender Info
            </span>
            <span className="text-2xl text-white mt-2 px-12">
            Tells us about your details<br/> and your category.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 px-12 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="lenderName"
                id="lenderName"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="Lender Name"
                value={data.lenderName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="inChargeName"
                id="inChargeName"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="In Charge Name"
                value={data.inChargeName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <select
                id="category"
                className=" block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-blue border-none text-white"
                name="category"
                value={data.category}
                onChange={handleChange}
                defaultValue="0"
                required
              >
                <option value="0" selected>
                  Hospital Category
                </option>
                <option value="1" className="text-blue">
                  One
                </option>
                <option value="2" className="text-blue">
                  Two
                </option>
                <option value="3" className="text-blue">
                  Three
                </option>
                <option value="4" className="text-blue">
                  Four
                </option>
              </select>
            </div>
            <div className="flex-grow"></div>
            <div className="flex flex-row justify-center items-center mt-12">
              <button
                type="submit"
                className="text-white bg-darkBlue cursor-pointer border-none text-2xl rounded-lg mr-2 mb-2 w-[594px] h-[65px]"
                disabled={submitting}
              >
                <span className="align-center mb-4 font-['Poppins'] font-bold">
                  NEXT
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

export default HospitalInfo;
