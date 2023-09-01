import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./repay.css";
import axios from "axios";
import { Divider, Drawer } from "antd";
import "../../styles/Shimmering.css";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
const Repayment = () => {
  const [selectClient, setSelectClient] = React.useState(false);
  const [showClientdDtails, setShowClientdDtails] = React.useState(false);
  const [showTreatments, setShowTreatments] = React.useState(false);

  const [showCreditsLimit, setShowCreditsLimit] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [amounts, setAmounts] = useState({ unsettled: "", settled: "" });
  let navigate = useNavigate();

  const handleApprove = () => {
    setShowApproved(true);
    setShowCreditsLimit(false);
  };

  const onFundAccount = () => {
    setSelectClient(false);
    setShowCreditsLimit(true);
  };
  // const offCanvasRef = React.useRef(null);

  // useEffect(() => {
  //   if (selectClient) {
  //     offCanvasRef.current.classList.add(`.invisible.show`); // Add CSS class to show OffCanvas
  //   } else {
  //     offCanvasRef.current.classList.remove(`.invisible.show`); // Remove CSS class to hide OffCanvas
  //   }
  // }, [selectClient]);
  const handleClientDetails = () => {
    setShowClientdDtails(true);
    setSelectClient(false);
  };
  const onClose = () => {
    setSelectClient(false);
    setShowApproved(false);
    setShowCreditsLimit(false);
  };
  const onCloseClientDetails = () => {
    setSelectClient(true);

    setShowClientdDtails(false);
  };

  const [emiData, setEmi] = useState("");
  const [allEmi, setAllEmis] = useState(null);
  // console.log("Length of all EMI",Object.values(allEmi).length);
  // console.log("EMI DATA===>",emiData.customerId.name)

  const handleClick = async (id) => {
    console.log("Params id", id);
    setSelectClient(!selectClient);
    var paramId = id.replace("#", "");
    try {
      const response = await axios.get(
        `http://localhost:8000/Lenders/selectrepayments?trnId=%23${paramId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("R===>",response)
      const data = response.data;
      console.log("All Emis", data.data.EmiDates);
      setAllEmis(data.data.EmiDates);
      setEmi(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onCloseCredits = () => {
    setShowCreditsLimit(false);
    setSelectClient(true);
  };

  console.log("Length", emiData.length);

  const [repayData, setRepayData] = useState("");
  const getRepay = async () => {
    const response = await fetch("http://localhost:8000/Lenders/repayments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });

    const json = await response.json();
    if (json.status === "Success") {
      setLoading(false);
      setRepayData(json.message);
      setAmounts({ unsettled: json.unsettled, settled: json.settled });
      console.log("hello json", json.message);
    } else {
      alert("Data not found");
    }
  };
  useEffect(() => {
    getRepay();
  }, []);

  // console.log(  "repay===>>>??",repayData.length)

  return (
    <>
      {/* <div className="flex w-full relative">
        <div className="fixed top-0 bottom-0 ">
          <Sidebar />
        </div>
        <div className="w-full mt-[50px] ml-[270px] ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-rowtext-black px-5">
              <div className="flex flex-col justify-center items-start px-6">
                <span className="text-lg font-normal ">Settled Amount</span>
                <span className="text-3xl font-bold ">₹{amounts.settled}</span>
              </div>
              <div className="flex flex-col justify-center items-start px-6">
                <span className="text-lg font-normal ">Unsettled Amount</span>
                <span className="text-3xl font-bold ">
                  ₹{amounts.unsettled}
                </span>
              </div>
            </div>
            <div className=" flex w-[30vw] h-[37px] ml-2 mt-1 rounded-lg border-solid border-1 border-aliceblue bg-transparent justify-start items-center">
              <div className="flex ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="28"
                  viewBox="0 0 26 28"
                  fill="none"
                >
                  <g clipPath="url(#clip0_305_150)">
                    <path
                      d="M10.7994 19.8333C14.833 19.8333 18.1029 16.177 18.1029 11.6667C18.1029 7.15634 14.833 3.5 10.7994 3.5C6.76575 3.5 3.49585 7.15634 3.49585 11.6667C3.49585 16.177 6.76575 19.8333 10.7994 19.8333Z"
                      stroke="#1866F9"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.2763 24.5L16.0161 17.5"
                      stroke="#1866F9"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_305_150">
                      <rect
                        width="25.0406"
                        height="28"
                        fill="white"
                        transform="translate(0.365723)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-start items-center">
                <input
                  type="search"
                  className="block text-lg w-[25vw] px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                  id="searchBar"
                  placeholder="Search.."
                />
              </div>
            </div>
            <div className="flex justify-start items-center mr-12">
              <div className="flex text-lg border-solid border-transparent  w-[250px] h-[37px] ">
                <div
                  className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer"
                  onClick={() => {
                    navigate("/settings");
                    sessionStorage.setItem("selectedSettingTab", "profile");
                  }}
                >
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_305_165)">
                        <path
                          d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 24.5V22.1667C7 20.929 7.49167 19.742 8.36683 18.8668C9.242 17.9917 10.429 17.5 11.6667 17.5H16.3333C17.571 17.5 18.758 17.9917 19.6332 18.8668C20.5083 19.742 21 20.929 21 22.1667V24.5"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_305_165">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex mr-6">Profile</div>
                </div>
                <div
                  className="flex w-[50%] h-[37px] justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    localStorage.setItem("token", "");
                  }}
                >
                  <div className="flex">
                    <img
                      src={require("../../image/logout.png")}
                      className="w-[20px]"
                      alt="logout"
                    />
                  </div>
                  <div className="flex mr-6">Logout</div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex pl-10 pr-12">
              <table cellSpacing="0" className="w-full mt-4">
                <thead>
                  <tr className="border-solid text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                    <td className="pl-4 w-[30px]">
                      <img src={require("./status.png")} alt="status" />
                    </td>
                    <td className="pl-4 w-[150px]">Loan ID</td>
                    <td className="w-[200px]">Name</td>
                    <td className="pl-4 w-[140px]">Phone No</td>
                    <td className="pl-4 w-[150px]">Amount</td>
                    <td className="pl-4 w-[150px]">Date</td>
                    <td className="pl-4 w-[100px]">EMI</td>
                    <td className="pr-4 w-[100px]">Status</td>
                  </tr>
                </thead>
                <tbody className="border-solid text-xl border-1 border-aliceblue bg-white rounded-lg">
                  <tr
                    className={`text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4 shimmer`}
                  >
                    <td colSpan="8"></td>
                  </tr>
                  <tr
                    className={`text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4 shimmer`}
                  >
                    <td colSpan="8"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex pl-10 pr-12">
              <table
                cellSpacing="0"
                className="w-full mt-4"
                style={{ scrollBehavior: "smooth" }}
              >
                <thead>
                  <tr className="border-solid text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                    <td className="pl-4 w-[30px]">
                      <img src={require("./status.png")} alt="status" />
                    </td>
                    <td className="pl-4 w-[150px]">Loan ID</td>
                    <td className="w-[200px]">Name</td>
                    <td className="pl-4 w-[140px]">Phone No</td>
                    <td className="pl-4 w-[150px]">Amount</td>
                    <td className="pl-4 w-[150px]">Date</td>
                    <td className="pl-4 w-[100px]">EMI</td>
                    <td className="pr-4 w-[100px]">Status</td>
                  </tr>
                </thead>
                <tbody className="border-solid text-xl border-1 border-aliceblue bg-white rounded-lg">
                  {repayData.length > 0 ? (
                    repayData.map((repayment) => (
                      <tr className="text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4">
                        <td className="pl-3 w-[30px]">
                          <img
                            src={require("./completed.png")}
                            alt="completed"
                          />
                        </td>
                        <td
                          className="text-aliceblue pl-4 w-[150px] cursor-pointer"
                          onClick={() => handleClick(repayment.trnId)}
                        >
                          {repayment.trnId}
                        </td>
                        <td className="pl-4 w-[200px]">{repayment.name}</td>
                        <td className="pl-4 w-[140px]">{repayment.phone}</td>
                        <td className="pl-4 w-[150px]">₹{repayment.amount}</td>

                        <td className="pl-4 w-[180px]">
                          <span>
                            {new Date(repayment.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </td>
                        <td className="pr-3 w-[100px]">{repayment.emiNo}</td>
                        <td
                          className={
                            repayment.status === true
                              ? "text-green pr-6 w-[80px]"
                              : "text-red pr-6 w-[80px]"
                          }
                        >
                          {repayment.status === true ? "Settled" : "Pending"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div> No repayments data found</div>
                  )}
                </tbody>
              </table>
            </div>
          )} */}
      <div className="flex w-full relative font-poppins">
        <div className="fixed top-0 bottom-0">
          <Sidebar />
        </div>
        <div className="w-full mt-[30px] 2xl:ml-[220px] xl:ml-[195px]">
          <div
            className="grid grid-cols-3 items-center px-[48px] 2xl:px-[68px]"
            style={{ gridTemplateColumns: "350px auto 180px" }}
          >
            <div className="flex flex-row 2xl:max-w-[450px] max-w-[350px] w-full text-black">
              <div className="flex flex-col justify-center items-start pr-4">
                <span className="2xl:text-lg text-base font-normal">
                  Settled Amount
                </span>
                <span className="text-xl 2xl:text-2xl font-bold ">
                  <span>₹</span>
                  <span className={`${loading ? "shimmer bg-lightBlue" : ""}`}>
                    {amounts.settled}
                  </span>
                </span>
              </div>
              <div className="flex flex-col justify-center items-start pr-1">
                <span className="2xl:text-lg text-base font-normal ">
                  Unsettled Amount
                </span>
                <span className="2xl:text-2xl text-xl font-bold ">
                  <span>₹</span>
                  <span className={`${loading ? "shimmer bg-lightBlue" : ""}`}>
                    {amounts.unsettled}
                  </span>
                </span>
              </div>
            </div>
            <div className=" flex ml-auto mr-5  max-w-[550px] 2xl:max-w-[600px] w-full h-[32px]   rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
              <div className="flex ml-2">
                <BsSearch size={24} color="#306FC7" />
              </div>
              <div className="flex flex-grow pr-3">
                <input
                  type="search"
                  className="block text-sm 2xl:text-base w-full px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                  id="searchBar"
                  placeholder="Search.."
                />
              </div>
            </div>
            <div
              className="flex w-[180px] justify-start items-center ml-auto"
              style={{ flex: "0 0 180px" }}
            >
              <div className="flex text-lg border-solid border-transparent w-[180px] h-[32px] ">
                <div
                  className="flex w-[50%] h-[32px] 2xl:text-sm text-sm justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer"
                  onClick={() => {
                    navigate("/settings");
                    sessionStorage.setItem("selectedSettingTab", "profile");
                  }}
                >
                  <div className="flex max-w-[20px] w-full ml-1 mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_305_165)">
                        <path
                          d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 24.5V22.1667C7 20.929 7.49167 19.742 8.36683 18.8668C9.242 17.9917 10.429 17.5 11.6667 17.5H16.3333C17.571 17.5 18.758 17.9917 19.6332 18.8668C20.5083 19.742 21 20.929 21 22.1667V24.5"
                          stroke="white"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_305_165">
                          <rect width="28" height="28" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex mr-2">Profile</div>
                </div>
                <div
                  className="flex w-[50%] h-[32px] 2xl:text-sm text-sm justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    localStorage.setItem("token", "");
                  }}
                >
                  <div className="flex ml-2 mr-1">
                    <img
                      src={require("../../image/logout.png")}
                      className="w-full max-w-[15px]"
                      alt="logout"
                    />
                  </div>
                  <div className="flex mr-2">Logout</div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex px-[40px] 2xl:px-[60px]">
            <table cellSpacing="0" className="w-full mt-4">
              <thead>
                <tr className="border-solid 2xl:text-lg text-base border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                  <td className="flex items-center w-full pl-[10px] max-w-[20px] 2xl:w-[30px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-circle-dashed"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="#306FC7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="text-blue"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                      <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                      <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                      <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                      <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                      <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                      <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                      <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                    </svg>
                  </td>
                  <td className="max-w-[150px] w-full">Loan ID</td>
                  <td className="pr-4 2xl:max-w-[260px] max-w-[200px] w-full relative flex items-center">
                    <span className=" justify-start absolute pl-[80px] align-middle">
                      Name
                    </span>
                  </td>
                  <td className="max-w-[120px] w-full relative flex items-center">
                    <span className="justify-start w-full absolute left-[rem] pl-2 2xl:pl-8 align-middle">
                      Phone No
                    </span>
                  </td>
                  <td className="max-w-[200px]  w-full justify-end relative flex items-center">
                    <span className="w-full absolute  2xl:-right-8 left-0  pl-2 2xl:pl-6">
                      Amount
                    </span>
                  </td>
                  <td className="pr-10 max-w-[150px] w-full">Date</td>
                  <td className="pr-4 max-w-[80px]  w-full">EMI</td>
                  <td className="pr-6 max-w-[80px] xl:max-w-[100px] w-full">
                    <span className="mr-auto">Status</span>
                  </td>
                </tr>
              </thead>
                <tbody className="border-solid text-xl border-2 border-aliceblue bg-white rounded-lg">
                  <tr
                    className={`text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] -mt-1 shimmer`}
                  >
                    <td colSpan="8"></td>
                  </tr>
                  <tr
                    className={`text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4 shimmer`}
                  >
                    <td colSpan="8"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex px-[40px] 2xl:px-[60px]">
              <table cellSpacing="0" className="w-full mt-4">
                <thead>
                  <tr className="border-solid 2xl:text-lg text-base border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                    <td className="flex items-center w-full pl-[10px] max-w-[20px] 2xl:w-[30px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-circle-dashed"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="#306FC7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-blue"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" />
                        <path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" />
                        <path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" />
                        <path d="M8.56 20.31a9 9 0 0 0 3.44 .69" />
                        <path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" />
                        <path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" />
                        <path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" />
                        <path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" />
                      </svg>
                    </td>
                    <td className="max-w-[150px] w-full">Loan ID</td>
                    <td className="pr-4 2xl:max-w-[260px] max-w-[200px] w-full relative flex items-center">
                      <span className=" justify-start absolute pl-[80px] align-middle">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[120px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[rem] pl-2 2xl:pl-8 align-middle">
                        Phone No
                      </span>
                    </td>
                    <td className="max-w-[200px]  w-full justify-end relative flex items-center">
                      <span className="w-full absolute  2xl:-right-8 left-0  pl-2 2xl:pl-6">
                        Amount
                      </span>
                    </td>
                    <td className="pr-10 max-w-[150px] w-full">Date</td>
                    <td className="pr-4 max-w-[80px]  w-full">EMI</td>
                    <td className="pr-6 max-w-[80px] xl:max-w-[100px] w-full">
                      <span className="mr-auto">Status</span>
                    </td>
                  </tr>
                </thead>
                <tbody className="border-solid 2xl:text-lg text-base border-1 border-aliceblue bg-white rounded-lg">
                  {repayData &&
                    repayData
                      .slice()
                      .reverse()
                      .map((transaction, index) => (
                        <tr
                          className={` border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] ${
                            index === 0 ? "-mt-1" : "mt-4"
                          }`}
                          key={transaction.trnId}
                        >
                          {transaction.status ? (
                            <td className="pl-3 flex items-center pr-2 w-full max-w-[20px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#306FC7"
                                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                                />
                              </svg>
                            </td>
                          ) : (
                            <td className="pl-3 pr-2 flex items-center w-full max-w-[20px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  fill="#306FC7"
                                  d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                                />
                              </svg>
                            </td>
                          )}
                          <td
                            className="pr-2 max-w-[100px] w-full cursor-pointer"
                            style={{ color: "#416EC1" }}
                            onClick={() => handleClick(transaction.trnId)}
                          >
                            {transaction.trnId || ""}
                          </td>
                          <td className=" pl-4 max-w-[150px] 2xl:max-w-[200px] w-full truncate">
                            {transaction.name}
                          </td>
                          <td className="pr-4  max-w-[100px] w-full">
                            {transaction.phone}
                          </td>
                          <td className="max-w-[100px] w-full">
                            <span>₹{transaction.amount || ""}</span>
                          </td>
                          <td className=" max-w-[150px] w-full truncate">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="max-w-[80px] w-full">
                            {transaction.emiNo}
                          </td>
                          {transaction.status ? (
                            <td className="text-yellowgreen max-w-[120px]  w-full text-center">
                              <span className="pr-6">Settled</span>
                            </td>
                          ) : (
                            <td className="text-red pr-5 max-w-[100px] w-full">
                              Pending
                            </td>
                          )}
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          )}

          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={selectClient}
            key="right"
            width={700}
          >
            <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
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
                onClick={onClose}
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <line x1="18" y1="6" x2="6" y2="18" />{" "}
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <div className="flex flex-row ml-5 mt-3">
              <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                Client Details
              </span>
            </div>

            <div className="flex w-[600px] h-[550px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
              <div className="flex flex-row w-full">
                <div className="flex w-[75px] mt-[20px] ml-[20px] items-start">
                  <img
                    className="w-[75px] "
                    src={require("./user.png")}
                    alt="user"
                  />
                </div>
                <div className="flex flex-col m-4 mt-9">
                  <span className="2xl:text-xl text-lg text-left font-semibold mr-auto">
                    {emiData ? emiData.customerId.name : "-"}
                  </span>
                  {emiData ? emiData.customerId.phone : "-"}
                </div>

                <div></div>
              </div>

              <div className="flex flex-col w-full mt-8">
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1 ">
                      Address Line1
                    </span>
                    <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                      {emiData
                        ? emiData.customerId.customerLocation.line1
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      Address Line2
                    </span>
                    <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                      {emiData
                        ? emiData.customerId.customerLocation.line2
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-10">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      City
                    </span>
                    <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                      {emiData
                        ? emiData.customerId.customerLocation.city
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      State
                    </span>
                    <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                      {emiData
                        ? emiData.customerId.customerLocation.state
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-10">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      Pan Card No
                    </span>
                    <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                      {emiData ? emiData.customerId.panNumber : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      Aadhar No
                    </span>
                    <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                      {emiData ? emiData.customerId.aadhaar : "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row w-full justify-around mt-10">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      Approved on
                    </span>
                    <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                      {emiData
                        ? new Date(
                            emiData.customerId.aproovedDate
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <div className="flex flex-col w-[40%] items-center justify-start ml-auto mr-[90px]">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                      Approved Limit
                    </span>
                    <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                      ₹{emiData ? emiData.customerId.creditLimit : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row ml-5 mt-3">
              <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">Loan Details</span>
            </div>
            <div className="flex w-[600px] h-[200px] flex-row border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
              <div className="flex flex-col w-full m-3">
                <div className="flex flex-row justify-between mb-4">
                  <div className="flex flex-row  w-[100%] justify-between  ">
                    <span className="text-base 2xl:text-lg text-aliceblue text-left ml-3    ">
                      Loan Amount
                    </span>
                    <span className="text-base 2xl:text-lg text-aliceblue font-normal mr-3 ">
                      ₹{emiData ? emiData.treatmentCost : "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between mb-4">
                  <div className="flex flex-row  w-[100%] justify-between  ">
                    <span className="text-base 2xl:text-lg text-aliceblue text-left  ml-3  ">
                      Interest rate per month
                    </span>
                    <span className="text-base 2xl:text-lg text-aliceblue font-normal mr-3  ">
                      {emiData ? emiData.interestRate : "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between mb-4">
                  <div className="flex flex-row  w-[100%] justify-between  ">
                    <span className="text-base 2xl:text-lg text-aliceblue text-left  ml-3  ">
                      Tensure(months)
                    </span>
                    <span className="text-base 2xl:text-lg text-aliceblue font-normal mr-3 ">
                      {emiData ? emiData.tenure : "-"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-between mb-4">
                  <div className="flex flex-row  w-[100%] justify-between  ">
                    <span className="text-base 2xl:text-lg text-black text-left ml-3   ">
                      EMI
                    </span>
                    <span className="text-base 2xl:text-lg text-black font-normal mr-3 ">
                      ₹{emiData ? emiData.amount : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row ml-5 mt-3">
              <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">EMI Dates</span>
            </div>
            {allEmi ? (
              allEmi.map((emi) => (
                <div className="flex flex-row w-[600px] h-[50px] justify-around items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4">
                  <div className="ml-4 max-w-[20%] w-full text-base 2xl:text-lg font-semibold">
                    {new Date(emi.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>

                  <div className="pl-12 text-base 2xl:text-lg font-semibold">
                    ₹{emi.amount}
                  </div>
                  <div
                    className={
                      emi.status === true
                        ? "text-lg text-yellowgreen ml-auto mr-4"
                        : "text-lg text-red ml-auto mr-4 "
                    }
                  >
                    {emi.status === true ? "Settled" : "Pending"}
                  </div>
                </div>
              ))
            ) : (
              <h2>No emis</h2>
            )}
          </Drawer>
        </div>
      </div>
    </>
  );
};
 export default Repayment