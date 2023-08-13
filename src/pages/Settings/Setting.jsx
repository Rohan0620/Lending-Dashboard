import React from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Divider, Drawer } from "antd";

const Setting = () => {
  const [showSelected, setShowSelected] = React.useState(() => {
    return sessionStorage.getItem("selectedSettingTab") || "profile";
  });
  const [mailDrawer, setMailDrawer] = React.useState(false);
  const [otpDrawer, setOtpDrawer]  = React.useState(false);
  const [nameDrawer, setNameDrawer] = React.useState(false)
  let navigate = useNavigate();

  const onCloseMailDrawer = () => {
    setMailDrawer(false);
  };
  const onCloseNameDrawer = () => {
    setNameDrawer(false);
  };
  const onCloseOtpDrawer = () =>{
    setMailDrawer(true)
    setOtpDrawer(false)
  }
  const handleOtpDrawer = () =>{
    setMailDrawer(false)
    setOtpDrawer(true)
  }

  const handleTabClick = (tabName) => {
    setShowSelected(tabName);
    sessionStorage.setItem("selectedSettingTab", tabName);
  };
  return (
    <div className="flex w-full font-poppins">
      <div className="fixed top-0 bottom-0">
        <Sidebar />
      </div>

      <div className="flex ml-[258px] px-2">
        <div className="flex flex-col w-[400px] h-screen bg-lightBlue">
          <div className="flex flex-row w-full mt-[12%]">
            <span className="ml-[10%] text-4xl font-bold ">Settings</span>
          </div>
          <div className="flex flex-col w-full justify-start text-left ml-[5%] mt-[8%]">
            <ul className="font-normal text-[20px] leading-[70px] text-left text-black pl-0 mr-auto ml-2">
              <li
                className={`flex flex-row w-[220px] cursor-pointer items-center`}
                onClick={() => {
                  handleTabClick("profile");
                }}
                style={
                  showSelected === "profile"
                    ? { backgroundColor: "#ffffff", borderRadius: 10 }
                    : {}
                }
              >
                {" "}
                <div className=" flex mx-2 items-center">
                  <img src={require("./images/profile.png")} alt="profile" />
                </div>
                Profile
              </li>
              <li
                className="flex  justify-start cursor-pointer items-center"
                onClick={() => {
                  handleTabClick("bankaccount");
                }}
                style={
                  showSelected === "bankaccount"
                    ? { backgroundColor: "#ffffff", borderRadius: 10 }
                    : {}
                }
              >
                {" "}
                <div className=" flex items-center mx-2">
                  <img
                    src={require("./images/bank_account.png")}
                    alt="bank_account"
                  />
                </div>
                Bank Account
              </li>
              <li
                className="flex justify-start cursor-pointer items-center"
                onClick={() => {
                  handleTabClick("notifications");
                }}
                style={
                  showSelected === "notifications"
                    ? { backgroundColor: "#ffffff", borderRadius: 10 }
                    : {}
                }
              >
                {" "}
                <div className="flex items-center mx-2">
                  <img
                    src={require("./images/notifications.png")}
                    alt="notifications"
                  />
                </div>
                Notifications
              </li>
              <li
                className="flex justify-start cursor-pointer items-center"
                onClick={() => {
                  handleTabClick("help");
                }}
                style={
                  showSelected === "help"
                    ? { backgroundColor: "#ffffff", borderRadius: 10 }
                    : {}
                }
              >
                {" "}
                <div className="flex items-center mx-2">
                  <img src={require("./images/help.png")} alt="help_centre" />
                </div>
                Help Center
              </li>
            </ul>
          </div>
          <div className="flex justify-start ml-[10%]">
            <div
              className="flex w-[150px] h-[37px] bg-black text-xl justify-center items-center text-white border-1 rounded-lg absolute bottom-6 cursor-pointer"
              onClick={() => {
                navigate("/login");
                localStorage.setItem("token", "");
              }}
            >
              <span className="mr-auto ml-2 mt-2">
                <img src={require("../../image/logout.png")} alt="logout" />
              </span>
              <span className="ml-auto mr-8">Logout</span>
            </div>
          </div>
        </div>
        {showSelected === "profile" && (
          <>
            <div className=" mt-[5%]">
              <span className="ml-[45%] text-4xl font-bold ">Profile</span>
            </div>
            <div className="flex flex-col mt-[13%] ml-[-7%] gap-6">
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <span className="ml-[8%] mr-auto">Username</span>
                <span className="ml-[8%] mr-auto font-bold">test</span>
              </div>
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <span className="ml-[8%] mr-auto">Lender Name</span>
                <span className="ml-[8%] mr-auto font-bold">XYZ Hospital</span>
              </div>
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <div className="flex">
                <span className="ml-[8%] mr-auto">Incharge Name</span>
                <span
                    className="text-xl text-blue ml-auto mr-4 cursor-pointer"
                    onClick={() => setNameDrawer(true)}
                  >
                    Edit
                  </span>

                </div>
                <span className="ml-[8%] mr-auto font-bold">John Doe</span>
              </div>
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <span className="ml-[8%] mr-auto">Address</span>
                <span className="ml-[8%] mr-auto font-bold flex-wrap">
                  XYZ Hospital, abc nagar Hubli Karnataka 582101
                </span>
              </div>
            </div>
          </>
        )}
        {showSelected === "bankaccount" && (
          <>
            <div className="flex flex-col w-full mt-[3%]">
              <div className="flex-row flex ">
                <span className="ml-[3%] mr-auto text-4xl font-bold ">
                  Bank Account
                </span>
              </div>
              <div className=" flex flex-row w-full text-lg mt-[1px] ml-[3%] mr-auto text-left">
                You will receive your settlements in the bank account below.
                Write to care@curecoin.in <br /> or contact your Account Manager
                to update the bank account.
              </div>
            </div>
            <div className="flex flex-col mt-[12%] ml-[-97%] gap-6">
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <span className="ml-[8%] mr-auto">Account Number</span>
                <span className="ml-[8%] mr-auto font-bold">
                  1234567899008777
                </span>
              </div>
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <span className="ml-[8%] mr-auto">IFSC Code</span>
                <span className="ml-[8%] mr-auto font-bold">SBI000567899</span>
              </div>
            </div>
          </>
        )}
        {showSelected === "notifications" && (
          <>
            <div className="flex flex-col w-full mt-[3%]">
              <div className="flex-row flex ">
                <span className="ml-[3%] mr-auto text-4xl font-bold ">
                  Notifications
                </span>
              </div>
              <div className=" flex flex-row w-full text-lg mt-[1px] ml-[3%] mr-auto align-start">
                You will receive the notifications about settlements to below
                email id.
              </div>
            </div>
            <div className="flex flex-col mt-[10%] ml-[-97%] gap-6">
              <div className="flex flex-col w-[600px] h-[110px] justify-center border-1 border-none text-xl bg-lightBlue rounded-xl mt-[15px]">
                <div className="flex ">
                  <span className="ml-[8%] mr-auto">Email</span>
                  <span
                    className="text-xl text-blue ml-auto mr-4 cursor-pointer"
                    onClick={() => setMailDrawer(true)}
                  >
                    Edit
                  </span>
                </div>
                <span className="ml-[8%] mr-auto font-bold">ABC@gmail.com</span>
              </div>
            </div>
          </>
        )}
        {showSelected === "help" && (
          <>
            <div className="flex flex-col w-full mt-[3%]">
              <div className="flex-row flex ">
                <span className="ml-[3%] mr-auto text-4xl font-bold ">
                  Help Centre
                </span>
              </div>
              <div className=" flex flex-row w-full text-lg mt-[1px] ml-[3%] mr-auto text-left flex-wrap">
                If you are facing any problem or have any query feel free to
                reach us at help@curecoin.in or write us below.
              </div>
            </div>
            <div className="flex flex-col mt-[10%] ml-[-97%]  relative">
              <input
                id="customInput"
                className="block w-[740px] h-[500px]  border-1 border-none outline-none text-xl bg-lightBlue rounded-xl mt-[] placeholder-black"
                type="text"
                placeholder=""
                style={{
                  paddingLeft: "5px",
                }}
              />
              <label
                className="absolute top-10 left-0 text-xl -mt-[10px] ml-[8px] text-black"
                htmlFor="customInput"
              >
                Write us here...
              </label>
              <div className="flex flex-row">
                <button className="w-[170px] h-[45px] text-xl rounded-lg bg-blue text-white border-none ml-auto">
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
        {mailDrawer && (
          <>
            <Drawer
              placement="right"
              closable={false}
              onClose={onCloseMailDrawer}
              open={mailDrawer}
              width={700}
              className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
            >
              {/* {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )} */}
              <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
                <svg
                  className="h-8 w-8 text-black cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={onCloseMailDrawer}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <form>
                <div className="flex flex-col ml-5 mt-8 font-Poppins">
                  <span className="text-4xl font-bold mt-4">New Email</span>
                  <span className="text-2xl font-normal mt-4">
                    We will send verification code to the email you choose.
                  </span>
                </div>
                <div className="block mt-5 ml-7">
                  <input
                    type="text"
                    name="name"
                    className="w-[575px] h-[50px] font-Poppins text-2xl text-blue border-1 border-solid border-blue placeholder-blue bg-white border-x-0 border-t-0"
                    placeholder="New Email"
                    // value={otp}
                    // onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full block absolute bottom-3 right-0">
                  <Divider className="bg-blue mr-auto" />
                  <div className="flex justify-end ">
                    <button
                      className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                      onClick={onCloseMailDrawer}
                    >
                      <span className="text-xl font-bold">CANCEL</span>
                    </button>
                    <button
                      className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                      type="submit"
                      onClick={handleOtpDrawer}
                    >
                      <span className="text-xl font-bold">NEXT</span>
                    </button>
                  </div>
                </div>
              </form>
            </Drawer>
          </>
        )}
        {nameDrawer && (
          <>
            <Drawer
              placement="right"
              closable={false}
              onClose={onCloseNameDrawer}
              open={nameDrawer}
              width={700}
              className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
            >
              {/* {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )} */}
              <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
                <svg
                  className="h-8 w-8 text-black cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={onCloseNameDrawer}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <form>
                <div className="flex flex-col ml-5 mt-8 font-Poppins">
                  <span className="text-4xl font-bold mt-4">Incharge Name</span>
                </div>
                <div className="block mt-5 ml-7">
                  <input
                    type="text"
                    name="name"
                    className="w-[575px] h-[50px] font-Poppins text-2xl text-blue border-1 border-solid border-blue placeholder-blue bg-white border-x-0 border-t-0"
                    placeholder="New Name"
                    // value={otp}
                    // onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full block absolute bottom-3 right-0">
                  <Divider className="bg-blue mr-auto" />
                  <div className="flex justify-end ">
                    <button
                      className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                      onClick={onCloseNameDrawer}
                    >
                      <span className="text-xl font-bold">CANCEL</span>
                    </button>
                    <button
                      className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                      type="submit"
                    >
                      <span className="text-xl font-bold">DONE</span>
                    </button>
                  </div>
                </div>
              </form>
            </Drawer>
          </>
        )}
        {otpDrawer && (
          <>
            <Drawer
              placement="right"
              closable={false}
              onClose={onCloseOtpDrawer}
              open={otpDrawer}
              width={700}
              className="border-solid border-2 border-aliceblue border-t-0 border-b-0 border-r-0 "
            >
              {/* {submitting && (
          <div
            className="bg-blue h-1 absolute top-0 left-0 right-0"
            style={{ width: "100%", animation: "loading-bar 2s infinite" }}
          ></div>
        )} */}
              <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
                <svg
                  className="h-8 w-8 text-black cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={onCloseOtpDrawer}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <form>
                <div className="flex flex-col ml-5 mt-8 font-Poppins">
                  <span className="text-4xl font-bold mt-4">Verification Code</span>
                  <span className="text-2xl font-normal mt-4">
                  Enter the 6-digit code that we sent to your phone number to finish your authentication.
                  </span>
                </div>
                <div className="block mt-5 ml-7">
                  <input
                    type="text"
                    name="otp"
                    className="w-[575px] h-[50px] font-Poppins text-2xl text-blue border-1 border-solid border-blue placeholder-blue bg-white border-x-0 border-t-0"
                    placeholder="OTP"
                    // value={otp}
                    // onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full block absolute bottom-3 right-0">
                  <Divider className="bg-blue mr-auto" />
                  <div className="flex justify-end ">
                    <button
                      className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                      onClick={onCloseOtpDrawer}
                    >
                      <span className="text-xl font-bold">CANCEL</span>
                    </button>
                    <button
                      className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                      type="submit"
                    >
                      <span className="text-xl font-bold">DONE</span>
                    </button>
                  </div>
                </div>
              </form>
            </Drawer>
          </>
        )}
      </div>
    </div>
  );
};

export default Setting;
