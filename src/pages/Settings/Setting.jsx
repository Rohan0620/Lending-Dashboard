import React from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const [showSelected, setShowSelected] = React.useState(() => {
    return sessionStorage.getItem("selectedSettingTab") || "profile";
  });
  let navigate = useNavigate();

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
                <span className="ml-[8%] mr-auto">Incharge Name</span>
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
                <span className="ml-[8%] mr-auto">Email</span>
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
      </div>
    </div>
  );
};

export default Setting;
