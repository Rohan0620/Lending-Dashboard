import React from "react";
import State from "../../data/States";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const LenderLocation = () => {
  const [address, setAddress] = React.useState({
    line1: "",
    line2: "",
    state: "",
    city: "",
    pincode: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [cities, setCities] = React.useState([]);

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
      const response = await axios.patch("http://localhost:8000/Lenders/addlenderloc", {
        line1: address.line1,
        line2: address.line2,
        state: address.state,
        city: address.city,
        pincode: address.pincode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.data;
      console.log(json);
      if (json.status === "Success") {
        navigate("/addaccount");
      }
    } catch (err) {
      showError();
    }
    setSubmitting(false);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  React.useEffect(() => {
    if (address.state) {
      const selectedState = State.states.find((state) => state.state === address.state);
      setCities(selectedState ? selectedState.cities : []);
    } else {
      setCities([]);
    }
  }, [address.state]);
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
            <img src={require("../../image/bg_login.png")} alt="bgimage" className='w-[70vw] h-screen' />
        </div>
        <div className="bg-blue w-[30vw]">
            <div className="mt-[120px]">
                <img src={require("../../image/Home.png")} alt="curecoin" className='w-[300px]' />
            </div>
        <div className="flex flex-col justify-center items-center mt-6">
           <span className='text-[35px] text-white font-bold'>Branch Location</span> 
           <span className='text-2xl text-white mt-2 px-12'>Tells us where you are located.</span>
        </div>
        <form
            className="flex flex-col flex-grow ml-2 px-12 mt-6"
            onSubmit={handleSubmit}
          >
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="line1"
                id="line1"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Address Line 1"
                onChange={handleChange}
                value={address.line1}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="text"
                name="line2"
                id="line2"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Address Line 2"
                onChange={handleChange}
                value={address.line2}
                required
              />
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <select
                id="state"
                name="state"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none text-white"
                onChange={handleChange}
                value={address.state}
                required
              >
                <option selected>Choose State</option>
                {State?.states.map((e, key) => {
                  return (
                    <option value={e.state} key={key} className="text-blue">
                      {e.state}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <select
                id="city"
                name="city"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none placeholder-white border-none text-white"
                onChange={handleChange}
                value={address.city}
                required
              >
                <option disabled value="">
                  Choose City
                </option>
                {cities.map((city, key) => (
                  <option
                    value={city}
                    key={key}
                    className="text-blue"
                  >
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mt-[20px] h-[65px] flex-row items-start border-1 border-solid bg-softblue rounded-lg border-transparent">
              <input
                type="number"
                name="pincode"
                id="pincode"
                className="block w-full my-auto ml-4 font-normal text-3xl text-left bg-transparent outline-none text-white placeholder-white border-none"
                placeholder="Pincode"
                onChange={handleChange}
                value={address.pincode}
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

export default LenderLocation;

