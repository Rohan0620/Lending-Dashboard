import React from "react";
import { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import "./loans.css";
import { Divider, Drawer, Spin } from "antd";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FormContext } from "../../Contexts/FormContext";
import Footer from "../../components/Footer";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const Loans = () => {
  const [selectClient, setSelectClient] = React.useState(false);
  const [showClientdDtails, setShowClientdDtails] = React.useState(false);
  const [showTreatments, setShowTreatments] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [showCreditsLimit, setShowCreditsLimit] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  const [approveStatus, setApproveStatus] = useState();
  const [amounts, setAmounts] = useState({ unsettled: "", settled: "" });
  const { baseUrl } = React.useContext(FormContext);
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const [invoice, setInvoice] = useState(null)
  let navigate = useNavigate();

  const socketRef = useRef(null);

  const handleApprove = () => {
    setShowApproved(true);
    setShowCreditsLimit(false);
  };

  const connectSocket = (idd) => {
    const serverURL = `ws://localhost:8000/?trnId=%23${idd}`;
    const socket = io(serverURL);
    socket.on("message", (data) => {
      console.log("Received message:", data);
    });
  };

  const [fundData, setFund] = useState(null);

  console.log(socketRef.current);
  // useEffect(() => {
  //   if (socketRef.current) {
  //     console.log(fundData, "checking");
  //     socketRef.current.on("credited", (data) => {
  //       console.log("credited");
  //       const newFundData = Object.assign({}, fundData, {
  //         data: {
  //           ...fundData.data,
  //           amountReceived: data.amount,
  //         },
  //       });
  //       console.log(newFundData);
  //       setFund(newFundData);
  //     });
  //   }
  // }, [socketRef]);
  if (socketRef.current) {
    socketRef.current.on("credited", (data) => {
      console.log(fundData)
      console.log("check",data)
      const newFundData = Object.assign({}, fundData, {
        data: {
          ...fundData.data,
          amountReceived: data.amount,
        },
      });
      console.log(newFundData)
      setFund(newFundData);
      if (data.amount >= IdAmt) {
        socketRef.current.close();
      }
    });
  }
  const handleInvoice = (img) =>{
    const _invoice = img.replace("public","https://cashwave.nyc3.digitaloceanspaces.com")
    setInvoice(_invoice)
  }

  const getFundDetails = async () => {
    const fundId = paramIds.replace("#", "");
    console.log("Fund ID===>", fundId);
    try {
      const response = await axios.get(
        `${baseUrl}/Lenders/getvirtualaccount?trnId=%23${fundId}&amount=${totalPay}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFund(response.data);
      console.log(fundData)
    } catch (err) {
      console.error(err);
    }
  };

  const onFundAccount = () => {
    console.log("socket api is going call");
    const socket = io(`${baseUrl}`, {
      withCredentials: true,
      query: {
        // Add your parameters here as key-value pairs
        trnId: paramIds,
      }, // Use WebSockets
      // auth: {
      //   token:`Bearer ${localStorage.getItem("token")}`
      // },
      extraHeaders: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    socketRef.current = socket;
    getFundDetails();
    setSelectClient(false);
    setShowCreditsLimit(true);
  };

  const handleClientDetails = () => {
    setShowClientdDtails(true);
    setSelectClient(false);
  };
  const onClose = () => {
    setSelectClient(false);
    setShowApproved(false);
    setShowCreditsLimit(false);
    setEmi(null)
  };
  const onCloseClientDetails = () => {
    setSelectClient(true);

    setShowClientdDtails(false);
  };

  const [emiData, setEmi] = useState(null);
  const [allEmi, setAllEmis] = useState(null);
  const [paramIds, setParams] = useState("");
  const [IdAmt, setEmiAmt] = useState("");
  console.log("Parammmmmm===>", paramIds);
  console.log("ID amount===>", IdAmt);
  // console.log("Length of all EMI",Object.values(allEmi).length);
  // console.log("EMI DATA===>",emiData.customerId.name)
  const [totalPay, setTotalPay] = useState(0)
  const handleClick = async (id) => {
    console.log("Params id", id);
    setSelectClient(!selectClient);
    setParams(id);
    var paramId = id.replace("#", "");

    try {
      const response = await axios.get(
        `${baseUrl}/Lenders/selectAproovals?trnId=%23${paramId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("R===>", response.data);
      const data = response.data;
      console.log("All Emis", data.data.EmiDates);
      setAllEmis(data.data.EmiDates);
      setEmi(data.data);
      setEmiAmt(data.data.treatmentCost);
      setTotalPay(data.data.totalPay)
    } catch (err) {
      console.error(err);
    }
  };

  const onCloseCredits = () => {
    setShowCreditsLimit(false);
    setSelectClient(true);
    setFund(null)
  };

  const [allLoans, setLoanData] = useState("");
  const [status, setStats] = useState("");
  const getDetails = async () => {
    const response = await fetch(`${baseUrl}/Lenders/aproovals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });

    const json = await response.json();
    console.log("JSON", json);
    setStats(json.status);
    if (json.status === "Success") {
      setLoading(false);
      setAmounts({ unsettled: json.unsettled, settled: json.settled });
      setLoanData(json.data.transactions);
      console.log("hello json", json.data.transactions);
    } else {
      // alert("Data not found");
      console.log("Data not found");
    }
  };
  useEffect(() => {
    getDetails();
    console.log("Approve j", approveStatus);
  }, [approveStatus]);

  return (
    <>
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
                    localStorage.removeItem("token");
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
                    <td className="pr-4 2xl:max-w-[160px] max-w-[200px] w-full relative flex items-center">
                      <span className=" justify-start absolute left-12 2xl:left-12 align-middle">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[100px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[-3rem] 2xl:left-2 align-middle">
                        Phone No
                      </span>
                    </td>
                    <td className="pr-6 max-w-[80px] pl-8 w-full relative flex items-center">
                      <span className=" justify-start absolute left-1 2xl:left-12 align-middle">
                        Tenure
                      </span>
                    </td>
                    <td className="max-w-[100px]  w-full relative flex items-center">
                      <span className="justify-start w-full absolute 2xl:left-2 -left-2">
                        Amount
                      </span>
                    </td>
                    <td className="pl-2 max-w-[140px] w-full">Date</td>
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
                    <td className="pr-4 2xl:max-w-[160px] max-w-[200px] w-full relative flex items-center">
                      <span className=" justify-start absolute left-12 2xl:left-12 align-middle">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[100px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[-3rem] 2xl:left-2 align-middle">
                        Phone No
                      </span>
                    </td>
                    <td className="pr-6 max-w-[80px] pl-8 w-full relative flex items-center">
                      <span className=" justify-start absolute left-1 2xl:left-12 align-middle">
                        Tenure
                      </span>
                    </td>
                    <td className="max-w-[100px]  w-full relative flex items-center">
                      <span className="justify-start w-full absolute 2xl:left-2 -left-2">
                        Amount
                      </span>
                    </td>
                    <td className="pl-2 max-w-[140px] w-full">Date</td>
                    <td className="pr-6 max-w-[80px] xl:max-w-[100px] w-full">
                      <span className="mr-auto">Status</span>
                    </td>
                  </tr>
                </thead>
                <tbody className="border-solid 2xl:text-lg text-base border-1 border-aliceblue bg-white rounded-lg">
                  {allLoans.length> 0 ? 
                    allLoans
                      .slice()
                      .reverse()
                      .map((transaction, index) => (
                        <tr
                          className={` border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] ${
                            index === 0 ? "-mt-1" : "mt-4"
                          }`}
                          key={transaction.trnId}
                        >
                          {transaction.lenderStatus ? (
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
                            {transaction.customerId &&
                            transaction.customerId.name
                              ? transaction.customerId.name
                              : ""}
                          </td>
                          <td className="pr-4  max-w-[100px] w-full">
                            {transaction.customerId &&
                            transaction.customerId.phone
                              ? transaction.customerId.phone
                              : ""}
                          </td>
                          <td className="max-w-[120px] 2xl:max-w-[100px] w-full pr-5">
                            {transaction.tenure}
                            {status === "Success" ? " days" : " "}
                          </td>
                          <td className="max-w-[100px] w-full">
                            <span>₹{transaction.treatmentCost || ""}</span>
                          </td>
                          <td className=" max-w-[140px] w-full truncate">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          {transaction.lenderStatus ? (
                            <td className="text-yellowgreen max-w-[120px] text-left  w-full">
                              <span className="ml-6">Settled</span>
                            </td>
                          ) : (
                            <td className="text-red pr-5 max-w-[100px] w-full">
                              Pending
                            </td>
                          )}
                        </tr>
                      )):(
                        <div className="flex w-full justify-center items-end pt-[200px] text-lg 2xl:text-xl">
                      Nothing to display.
                    </div>
                      )}
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
            {emiData === null ? (
              <>
                <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
                <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
                  <Spin size="large" />
                </div>
              </>
            ) : (
              <>
                <div className="flex w-[600px] h-[550px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
                  <div className="flex flex-row w-full">
                    <div className="flex w-[75px] mt-[20px] ml-[20px] items-start">
                      <img
                        className="w-[75px] "
                        src={`${baseUrl}/${emiData?.customerId?.profileImage}`}
                        alt="user"
                      />
                    </div>
                    <div className="flex flex-col m-4 mt-9">
                      <span className="text-lg 2xl:text-[22px] text-left font-semibold mr-auto">
                        {emiData ? emiData.customerId.name : ""}
                      </span>
                      {emiData ? emiData.customerId.phone : ""}
                    </div>
                  </div>

                  <div className="flex flex-col w-full mt-8">
                    <div className="flex flex-row justify-around">
                      <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1 ">
                          Address Line1
                        </span>
                        <span className="text-base 2xl:text-[18px] font-normal mr-auto m-1">
                          {emiData
                            ? emiData.customerId.customerLocation.line1
                            : ""}
                        </span>
                      </div>
                      <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1">
                          Address Line2
                        </span>
                        <span className="text-base 2xl:text-[18px] font-normal mr-auto m-1">
                          {emiData
                            ? emiData.customerId.customerLocation.line2
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row w-full justify-around mt-10">
                      <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1">
                          City
                        </span>
                        <span className="text-base 2xl:text-[18px] font-normal mr-auto m-1">
                          {emiData
                            ? emiData.customerId.customerLocation.city
                            : ""}
                        </span>
                      </div>
                      <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1">
                          State
                        </span>
                        <span className="text-base 2xl:text-[18px] text-left font-normal mr-auto m-1">
                          {emiData
                            ? emiData.customerId.customerLocation.state
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row w-full justify-around mt-10">
                      <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1">
                          Pan Card No
                        </span>
                        <span className="text-lg font-normal mr-auto m-1">
                          {emiData ? emiData.customerId.panNumber : ""}
                        </span>
                      </div>
                      <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1">
                          Aadhar No
                        </span>
                        <span className="text-base 2xl:text-[18px] text-left font-normal mr-auto m-1">
                          {emiData ? emiData.customerId.aadhaar : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row w-full justify-around mt-10">
                      <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                        <span className="text-base 2xl:text-[18px] text-left font-semibold mr-auto m-1">
                          Approved on
                        </span>
                        <span className="text-base 2xl:text-[18px] font-normal mr-auto m-1">
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
                        <span className="text-sm 2xl:text-base text-left font-semibold mr-auto m-1">
                          Approved Limit
                        </span>
                        <span className="text-lg text-left font-normal mr-auto m-1">
                          ₹{emiData ? emiData.customerId.creditLimit : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row ml-5 mt-3">
                  <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                    Loan Details
                  </span>
                </div>
                <div className="flex w-[600px] py-5 flex-row border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
                  <div className="flex flex-col w-full mx-6">
                    <div className="flex flex-row justify-between mb-4">
                      <div className="flex flex-row  w-[100%] justify-between  ">
                        <span className="text-base 2xl:text-xl text-aliceblue text-left    ">
                          Loan Amount
                        </span>
                        <span className="text-base 2xl:text-xl text-aliceblue font-normal  ">
                          ₹{emiData ? emiData.treatmentCost : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between mb-4">
                      <div className="flex flex-row  w-[100%] justify-between  ">
                        <span className="text-base 2xl:text-xl text-aliceblue text-left    ">
                          Total Interest
                        </span>
                        <span className="text-base 2xl:text-xl text-aliceblue font-normal  ">
                          {emiData ? emiData.interestRate : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between mb-4">
                      <div className="flex flex-row  w-[100%] justify-between  ">
                        <span className="text-base 2xl:text-xl text-aliceblue text-left    ">
                          Tenure(days)
                        </span>
                        <span className="text-base 2xl:text-xl text-aliceblue font-normal  ">
                          {emiData ? emiData.tenure : ""}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between mb-4">
                      <div className="flex flex-row  w-[100%] justify-between  ">
                        <span className="text-base 2xl:text-xl text-black text-left    ">
                          Total Payable
                        </span>
                        <span className="text-base 2xl:text-xl text-black font-normal  ">
                          ₹{emiData ? emiData.amount : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row ml-5 mt-3">
                  <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                    Payment Dates
                  </span>
                </div>
                <div className="">
                  {allEmi ? (
                    allEmi.map((emi) => (
                      <>
                        <div className="w-[600px] ">
                          <div className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4">
                            <span className="ml-4 text-sm 2xl:text-base font-semibold">
                              {new Date(emi.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>

                            <span className="ml-auto mr-4 text-sm 2xl:text-base font-semibold">
                              ₹{emi.amount}
                            </span>
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <h2>No emis</h2>
                  )}
                </div>
                <div className="flex flex-row ml-5 mt-3">
                  <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                    Merchant Details
                  </span>
                </div>
                <div className="flex w-[600px] py-4 flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-4 ml-5 mr-0">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1 ">
                        Merchant Name
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {emiData ? emiData.merchantName : "-"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Merchant Code
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {emiData ? emiData.merchantCode : "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row ml-5 mt-3">
                  <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                    Invoice Details
                  </span>
                </div>
                <div
                  className="flex flex-row w-[600px] h-[50px] mb-[100px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-5 mt-4 cursor-pointer"
                  onClick={() => {
                    setOpenLightbox(!openLightbox);
                    handleInvoice(emiData.invoice)
                  }}
                >
                  <span className="mr-auto ml-4 text-lg font-semibold">
                    Invoice Details
                  </span>
                  <span className="ml-auto mr-4">
                    <img src={require("./arrow.png")} alt="arrow" />
                  </span>
                </div>
                {openLightbox && (
                  <div>
                    <Lightbox
                      open={openLightbox}
                      slides={[{ src: invoice }]}
                      close={() => setOpenLightbox(!openLightbox)}
                      plugins={[Download, Zoom]}
                      animation={{ zoom: 500 }}
                      // zoom={{
                      //   maxZoomPixelRatio:1,
                      //   zoomInMultiplier:2,
                      //   doubleTapDelay:300,
                      //   doubleClickDelay:300,
                      //   doubleClickMaxStops:2,
                      //   keyboardMoveDistance:50,
                      //   wheelZoomDistanceFactor:100,
                      //   pinchZoomDistanceFactor:100,
                      //   scrollToZoom:false,

                      // }}
                      carousel={{
                        finite: true,
                        preload: 2,
                        imageFit: "contain",
                        padding: "16px",
                        spacing: "16px",
                      }}
                      render={{
                        buttonPrev: () => null,
                        buttonNext: () => null,
                        buttonZoom: () => true,
                      }}
                    />
                  </div>
                )}

                <div className="w-full bottom-0 right-0 absolute z-1 bg-white ">
                  <Divider className="bg-blue mr-auto mt-0" />
                  <div className="flex justify-end">
                    <button
                      className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-5 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue "
                      onClick={onClose}
                    >
                      <span className="text-base 2xl:text-lg font-bold">
                        CANCEL
                      </span>
                    </button>
                    <button
                      className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue "
                      onClick={onFundAccount}
                    >
                      <span className="text-base 2xl:text-lg font-bold">
                        PROCEED
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </Drawer>

          <Drawer
            placement="right"
            closable={false}
            onClose={onCloseCredits}
            open={showCreditsLimit}
            key="right"
            width={700}
          >
            <div className="flex mt-[10px] flex-row justify-start items-start ml-5">
              <svg
                className="h-8 w-8 text-black cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={onCloseCredits}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            {/* <div className="block px-5 pt-10">
            <span className="text-4xl font-bold">Set Credit Limit</span>
          </div> */}
          {fundData === null ? (
              <>
                <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
                <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
                  <Spin size="large" />
                </div>
              </>
            ) : (
              <>

            <div className="flex flex-row ml-5 mt-3">
              <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                Fund Account
              </span>
            </div>

            <div className="flex w-[600px] h-[220px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
              <div className="flex flex-col w-full mt-8">
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-sm 2xl:text-base text-left font-semibold mr-auto m-1 ">
                      Account No
                    </span>
                    <span className="text-sm 2xl:text-base font-normal mr-auto m-1">
                      {fundData ? fundData.data.accountNumber : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col w-[35%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-sm 2xl:text-base text-left font-semibold mr-auto m-1">
                      IFSC Code
                    </span>
                    <span className="text-sm 2xl:text-base font-normal mr-auto m-1">
                      {fundData ? fundData.data.ifsc : "-"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-7">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-sm 2xl:text-base text-left font-semibold mr-auto m-1">
                      UPI id
                    </span>
                    <span className="text-sm 2xl:text-base font-normal mr-auto m-1">
                      {fundData ? fundData.data.upiId : "-"}
                    </span>
                  </div>

                  <div className="flex flex-col w-[35%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-sm 2xl:text-base text-left font-semibold mr-auto m-1">
                      Amount Received
                    </span>
                    <span className="text-sm 2xl:text-base font-normal mr-auto m-1">
                    ₹{fundData ? fundData.data.amountReceived : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            </>)}

            {/* <div className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-gold bg-lightBlue rounded-lg ml-6 mt-40">
            <span className="mr-auto ml-4 text-lg font-semibold text-gold">
            Amount to be received is ₹50000
            </span>
            
          </div> */}

            <div className="w-full bottom-0 right-0 absolute z-1 bg-white ">
              <Divider className="bg-blue mr-auto pt-0 " />
              <div className="flex justify-end">
                <button
                  className="  bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                  onClick={onCloseCredits}
                >
                  <span className="text-base 2xl:text-lg font-bold">
                    CANCEL
                  </span>
                </button>
                <button
                  className={`  bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mr-5 ml-2 mb-3 bottom-3 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue ${
                    approveStatus === false ? "opacity-67" : ""
                  }`}
                  onClick={handleApprove}
                  disabled={approveStatus === false ? false : true}
                >
                  <span className="text-base 2xl:text-lg font-bold">
                    APPROVE
                  </span>
                </button>
              </div>
            </div>
          </Drawer>

          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            open={showApproved}
            key="right"
            width={700}
          >
            <div className="w-full h-screen relative">
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
              <div className="flex w-full justify-center pt-[80px] space-y-5 font-Poppins">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-[250px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#306FC7"
                        d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                      />
                    </svg>
                  </div>
                  <span className="font-bold text-2xl 2xl:text-3xl mt-5">
                    Approved Successfully
                  </span>
                  
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <footer className="bottom-0 absolute right-0 2xl:left-[226px] left-[198px] ">
        <Footer/>
      </footer>
    </>
  );
};

export default Loans;
