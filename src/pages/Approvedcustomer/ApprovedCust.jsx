import React from "react";
import Sidebar from "../../components/Sidebar";
import { Drawer } from "antd";
import { Progress } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

import { Spinner } from "@chakra-ui/react";
import { FormContext } from "../../Contexts/FormContext";

const ApprovedCust = () => {
  const [selectClient, setSelectClient] = useState(false);
  const [showTreatments, setShowTreatments] = useState(false);
  const [showClientdDtails, setShowClientdDtails] = useState(false);
  const [custDetails, setCustDetails] = useState(null);
  const [customers, setCustomers] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [drawers, setDrawers] = React.useState(false);

  const { isFormSubmitted } = useContext(FormContext);
  const handleClientDetails = () => {
    setShowClientdDtails(true);
    setSelectClient(false);
  };
  const onClose = () => {
    setShowClientdDtails(false);
  };
  const onCloseClientDetails = () => {
    setSelectClient(true);

    setShowClientdDtails(false);
  };

  console.log("state data", custDetails);
  const handleClick = async (id) => {
    setShowClientdDtails(true);
    setSelectClient(!selectClient);
    console.log("ID34==>", id);
    // console.log(custDetails);
    try {
      const response = await axios.get(
        `http://localhost:8000/Lenders/aproovedCustomers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      const data = response.data;
      console.log("dat of object", data);
      setCustDetails(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/Lenders/aproovedCustomers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: "include",
        }
      );
      setLoading(false);
      const data = response.data;
      console.log("data in json", data);
      setCustomers(data.message);
      console.log("A---->", data.message);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    fetchCustomers();
    if (isFormSubmitted) {
      setDrawers(false);
      fetchCustomers();
    }
  }, [isFormSubmitted]);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="container mt-[50px]">
        <div className="flex flex-row justify-around">
          <div className="flex text-black">
            {/* <span className="text-3xl font-bold text-left"></span> */}
            {/* <div className="flex mr-6">Help</div> */}

            <div className="flex justify-start items-center">
              <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
                <div className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg border-2 border-blue bg-blue text-white">
                  <div className="flex"></div>
                  <div className="flex mr-2">
                    <Link
                      className="approve-link no-underline text-white"
                      to="/approvedcustomer"
                    >
                      Approved
                    </Link>
                  </div>
                </div>

                {/* Pending Link */}
                <div className="flex w-[50%] justify-evenly rounded-r-lg items-center border-1 border-solid border-blue bg-white text-black">
                  <div className="flex mr-0">
                    <Link
                      className="approve-link no-underline text-black"
                      to="/pendingcustomer"
                    >
                      Pending
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <button className="approve-btn  "> Approved</button> */}
          </div>
          <div className=" flex w-[900px] h-[37px]  mt-1 rounded-lg border-1 border-solid border-blue bg-transparent justify-start items-center relative">
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
            <div className="flex">
              <input
                type="search"
                className="block text-lg w-[800px] px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
                id="searchBar"
                placeholder="Search.."
              />
            </div>
          </div>
          <div className="flex justify-start items-center">
            <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
              <div className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg bg-black text-white">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_305_158)">
                      <path
                        d="M14 24.5C19.799 24.5 24.5 19.799 24.5 14C24.5 8.20101 19.799 3.5 14 3.5C8.20101 3.5 3.5 8.20101 3.5 14C3.5 19.799 8.20101 24.5 14 24.5Z"
                        stroke="white"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 19.8333V19.845"
                        stroke="white"
                        stroke-Width="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.0001 15.75C13.9786 15.3713 14.0808 14.9958 14.2912 14.6802C14.5016 14.3645 14.8089 14.1258 15.1667 14C15.6053 13.8323 15.9989 13.5651 16.3166 13.2194C16.6343 12.8738 16.8674 12.4591 16.9976 12.008C17.1278 11.5569 17.1516 11.0818 17.0669 10.62C16.9823 10.1582 16.7916 9.72235 16.5099 9.34676C16.2283 8.97117 15.8632 8.66609 15.4436 8.45554C15.024 8.245 14.5612 8.13474 14.0917 8.13343C13.6222 8.13213 13.1588 8.23983 12.738 8.44804C12.3172 8.65625 11.9505 8.9593 11.6667 9.33332"
                        stroke="white"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_305_158">
                        <rect width="28" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="flex mr-6">Help</div>
              </div>
              <div className="flex w-[50%] justify-evenly rounded-r-lg items-center bg-blue text-white">
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
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 align-middle py-[60px] px-[68px] gap-5">
            <div className="flex w-[745px] h-[105px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[70px] h-[70px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-5">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
            <div className="flex w-[745px] h-[105px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[70px] h-[70px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-5">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 align-middle p-10 gap-5">
            {customers ? (
              customers.map((cust) => (
                <div className="flex w-[732px] h-[136px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg -5">
                  <div className="flex w-[93x] mt-[20px] ml-[20px] flex-row items-start">
                    <img src={require("./user.png")} alt="user" />
                  </div>
                  <div className="flex flex-col justify-center items-center p-6 ">
                    <span className="text-xl text-left font-semibold mr-auto">
                      {cust.name}
                    </span>
                    <span className="text-lg">{cust.phone}</span>
                  </div>
                  <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                    <span
                      className="text-right ml-auto cursor-pointer"
                      onClick={() => handleClick(cust._id)}
                    >
                      <img src={require("./right.png")} alt="user" />
                    </span>
                    {cust.status ? (
                      <span
                        className="text-lg text-yellowgreen"
                        onClick={() => handleClick(cust._id)}
                      >
                        Approved
                      </span>
                    ) : (
                      <span
                        className="text-lg text-red"
                        onClick={() => handleClick(cust._id)}
                      >
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div>No data found</div>
            )}
          </div>
        )}

        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          open={showClientdDtails}
          key="rightClientDetails"
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
            <span className="text-4xl font-extrabold mt-4">Client Details</span>
          </div>
          {custDetails === null ? (
            <div className="transition ease-in delay-300 ">
              <Spinner size="xl" color="blue.500" />
            </div>
          ) : (
            <div>
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
                    <span className="text-[22px] text-left font-semibold mr-auto">
                      {custDetails.data.name ? custDetails.data.name : "-"}
                    </span>
                    <span className="text-lg font-normal">
                      {custDetails.data.phone ? custDetails.data.phone : ""}
                    </span>
                  </div>

                  <div className="flex flex-col w-[30%] items-center justify-start mt-[3rem] ml-auto pr-12">
                    {/* <span className="text-[18px] text-left text-red font-semibold ml-auto m-1">
                  Pending
                </span> */}
                    {custDetails.status ? (
                      <span className="text-lg text-yellowgreen">Approved</span>
                    ) : (
                      <span className="text-lg text-red">Pending</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full mt-8">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1 ">
                        Addressline 1
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.line1
                          ? custDetails.data.customerLocation.line1
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Addressline 2
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.line2
                          ? custDetails.data.customerLocation.line2
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        City
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.residenceType
                          ? custDetails.data.customerLocation.residenceType
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        State
                      </span>
                      <span className="text-lg text-left font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.state
                          ? custDetails.data.customerLocation.state
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    {/* <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Approved
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {custDetails.topInfo.aproovedStatus
                          ? "Approved"
                          : "Not Approved"}
                      </span>
                    </div> */}

                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Pan No
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {custDetails.data.panNumber
                          ? custDetails.data.panNumber
                          : ""}
                      </span>
                    </div>

                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Aadhar No
                      </span>
                      <span className="text-lg text-left font-normal mr-auto m-1">
                        {custDetails.data.aadhaar
                          ? custDetails.data.aadhaar
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Martial Status
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {custDetails.data.maritialStatus
                          ? custDetails.data.maritialStatus
                          : ""}
                      </span>
                    </div>

                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Employment Type
                      </span>
                      <span className="text-lg text-left font-normal mr-auto m-1">
                        {custDetails.data.employmentType
                          ? custDetails.data.employmentType
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {custDetails.status ? (
                <div>
                  <div className="flex flex-row ml-5 mt-3">
                    <div className="block">
                      <span className="text-4xl text-left font-extrabold mr-auto">
                        Credit Limit
                      </span>
                    </div>
                    <div className="block ml-auto p-5 mr-3 text-left">
                      <span className="text-base font-normal">
                        Total Limit-<i className="fa fa-inr custom"></i>
                        {custDetails.data.creditLimit}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <div className="block relative">
                      <Progress
                        percent={
                          (custDetails.data.creditUsed /
                            custDetails.data.creditLimit) *
                          100
                        }
                        size={[600, 30]}
                        showInfo={false}
                      />
                      {custDetails.data.creditUsed > 0 &&
                      custDetails.data.creditUsed <
                        custDetails.data.creditLimit ? (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: `${
                              (custDetails.data.creditUsed /
                                custDetails.data.creditLimit) *
                              100
                            }%`,
                            transform: "translate(-50%, -50%)",
                            fontSize: "17px",
                            color: "#000",
                            marginTop: "30px",
                          }}
                        >
                          <i className="fa fa-inr custom"></i>
                          {custDetails.data.creditUsed}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="block text-base ml-8">
                      <i className="fa fa-inr custom"></i>
                      00
                    </div>
                    <div className="block ml-auto text-base mr-8">
                      <i className="fa fa-inr custom"></i>
                      {custDetails.data.creditLimit}
                    </div>
                  </div>
                  <div className="flex flex-row ml-5 mt-3 ">
                    <div className="block">
                      <span className="text-4xl text-left font-extrabold mr-auto">
                        Ongoing Treatments
                      </span>
                    </div>
                  </div>
                  {custDetails.data.creditUsed ? (
                    <div className="w-[600px] h-[55px] bg-lightBlue border-1 border-solid border-blue rounded-lg flex flex-row items-center ml-6 mt-6">
                      <span className="text-xl ml-5">
                        Treatment ID -{" "}
                        {custDetails.data.pendingTransaction.treatmentCode}
                      </span>
                      <span className="ml-auto mr-5 text-red text-xl">
                        Pending
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-row w-full mt-8 mb-10 justify-center items-center">
                      <div className="block">No Ongoing Treatments</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[600px] h-[55px] bg-lightYellow border-1 border-solid border-yellow rounded-lg flex flex-row items-center ml-6 bottom-9 absolute">
                  <span className="text-xl text-yellow ml-5">
                    The Account is under processing.
                  </span>
                </div>
              )}
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default ApprovedCust;
