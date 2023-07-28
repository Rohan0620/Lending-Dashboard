import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const AddAccount = () => {
  const [bankDetails, setBankDetails] = React.useState({ accno: "", ifsc: "" });
  const [submitting, setSubmitting] = React.useState(false);
  const [confirmAccno, setConfirmAccno] = React.useState("");

  let navigate = useNavigate();
  const showError = () => {
    toast.error("Please try again later. Server is busy.", {
      position: "top-right",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    if(bankDetails.accno !== confirmAccno)
    {
      setSubmitting(false)
      toast.error("Account numbers do not match. Please try again.",{
        position:"top-right"
      })
      return;
    }
    try {
      const response = await axios.patch(
        "http://localhost:8000/Hospitals/addBankAcc",
        {
          accnumber: bankDetails.accno,
          ifsccode: bankDetails.ifsc,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const json = await response.data;
      console.log(json);
      if (json.status === "Success") {
        navigate("/homepage");
      }
      else
      {
        toast.error(json.message,{
          position:"top-right"
        })
      }
    } catch (err) {
      showError();
    }
    setSubmitting(false);
  };
  const handleChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
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
              src={require("../../image/curecoinHome.jpg")}
              alt="curecoin"
              className="w-[300px]"
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <span className="text-[35px] text-white font-bold">
              Add Bank Account
            </span>
            <span className="text-2xl text-white mt-2 px-12">
              In order to proceed with payouts.
              <br /> Please add your Bank
              <br />
              account.
            </span>
          </div>
          <form
            className="flex flex-col flex-grow ml-2 px-12 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="number"
                name="accno"
                id="accno"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="Account Number"
                value={bankDetails.accno}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="number"
                name="confirmAccno"
                id="confirmAccno"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="Confirm Account Number"
                value={confirmAccno}
                onChange={(e) => setConfirmAccno(e.target.value)}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="ifsc"
                id="ifsc"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none"
                placeholder="IFSC Code"
                value={bankDetails.ifsc}
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

export default AddAccount;
