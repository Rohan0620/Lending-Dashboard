import React from "react";
import Sidebar from "../../components/Sidebar";
import { Drawer, Spin } from "antd";
import { Progress } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";

import { Spinner } from "@chakra-ui/react";
import { FormContext } from "../../Contexts/FormContext";
import { BsSearch } from "react-icons/bs";
import Footer from "../../components/Footer";

const ApprovedCust = () => {
  const [selectClient, setSelectClient] = useState(false);
  const [showTreatments, setShowTreatments] = useState(false);
  const [showClientdDtails, setShowClientdDtails] = useState(false);
  const [custDetails, setCustDetails] = useState(null);
  const [customers, setCustomers] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [drawers, setDrawers] = React.useState(false);
  let navigate = useNavigate();
  const { isFormSubmitted } = useContext(FormContext);
  const { baseUrl } = useContext(FormContext);
  const handleClientDetails = () => {
    setShowClientdDtails(true);
    setSelectClient(false);
  };
  const onClose = () => {
    setShowClientdDtails(false);
    setCustDetails(null)
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
        `${baseUrl}/Lenders/aproovedCustomers/${id}`,
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
    console.log("env var", process.env.REACT_APP_API_URL_PROD);
    try {
      const response = await axios.get(`${baseUrl}/Lenders/aproovedCustomers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: "include",
      });
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
    // <div className="flex w-full relative">
    //   <div className="fixed top-0 bottom-0 ">
    //     <Sidebar />
    //   </div>
    //   <div className="container mt-[50px] ml-[270px]">
    //     <div className="flex flex-row justify-around px-7 ml-6">
    //       <div className="flex text-black">
    //         {/* <span className="text-3xl font-bold text-left"></span> */}
    //         {/* <div className="flex mr-6">Help</div> */}

    //         <div className="flex justify-start items-center">
    //           <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
    //             <div className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg border-2 border-blue bg-blue text-white">
    //               <div className="flex"></div>
    //               <div className="flex mr-2">
    //                 <Link
    //                   className="approve-link no-underline text-white"
    //                   to="/approvedcustomer"
    //                 >
    //                   Approved
    //                 </Link>
    //               </div>
    //             </div>

    //             {/* Pending Link */}
    //             <div className="flex w-[50%] justify-evenly rounded-r-lg items-center border-1 border-solid border-blue bg-white text-black">
    //               <div className="flex mr-0">
    //                 <Link
    //                   className="approve-link no-underline text-black"
    //                   to="/pendingcustomer"
    //                 >
    //                   Pending
    //                 </Link>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* <button className="approve-btn  "> Approved</button> */}
    //       </div>
    //       <div className=" flex w-[900px] h-[37px]  mt-1 rounded-lg border-1 border-solid border-blue bg-transparent justify-start items-center relative">
    //         <div className="flex ml-1">
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             width="26"
    //             height="28"
    //             viewBox="0 0 26 28"
    //             fill="none"
    //           >
    //             <g clipPath="url(#clip0_305_150)">
    //               <path
    //                 d="M10.7994 19.8333C14.833 19.8333 18.1029 16.177 18.1029 11.6667C18.1029 7.15634 14.833 3.5 10.7994 3.5C6.76575 3.5 3.49585 7.15634 3.49585 11.6667C3.49585 16.177 6.76575 19.8333 10.7994 19.8333Z"
    //                 stroke="#1866F9"
    //                 strokeWidth="1.75"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //               />
    //               <path
    //                 d="M22.2763 24.5L16.0161 17.5"
    //                 stroke="#1866F9"
    //                 strokeWidth="1.75"
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //               />
    //             </g>
    //             <defs>
    //               <clipPath id="clip0_305_150">
    //                 <rect
    //                   width="25.0406"
    //                   height="28"
    //                   fill="white"
    //                   transform="translate(0.365723)"
    //                 />
    //               </clipPath>
    //             </defs>
    //           </svg>
    //         </div>
    //         <div className="flex">
    //           <input
    //             type="search"
    //             className="block text-lg w-[800px] px-2 py-[0.20rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
    //             id="searchBar"
    //             placeholder="Search.."
    //           />
    //         </div>
    //       </div>
    //       <div className="flex justify-start items-center mr-4">
    //         <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
    //           <div
    //             className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer"
    //             onClick={() => {
    //               navigate("/settings");
    //               sessionStorage.setItem("selectedSettingTab", "profile");
    //             }}
    //           >
    //             <div className="flex">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="28"
    //                 height="28"
    //                 viewBox="0 0 28 28"
    //                 fill="none"
    //               >
    //                 <g clipPath="url(#clip0_305_165)">
    //                   <path
    //                     d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
    //                     stroke="white"
    //                     strokeWidth="1.75"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                   />
    //                   <path
    //                     d="M7 24.5V22.1667C7 20.929 7.49167 19.742 8.36683 18.8668C9.242 17.9917 10.429 17.5 11.6667 17.5H16.3333C17.571 17.5 18.758 17.9917 19.6332 18.8668C20.5083 19.742 21 20.929 21 22.1667V24.5"
    //                     stroke="white"
    //                     strokeWidth="1.75"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                   />
    //                 </g>
    //                 <defs>
    //                   <clipPath id="clip0_305_165">
    //                     <rect width="28" height="28" fill="white" />
    //                   </clipPath>
    //                 </defs>
    //               </svg>
    //             </div>
    //             <div className="flex mr-6">Profile</div>
    //           </div>
    //           <div
    //             className="flex w-[50%] h-[37px] justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer"
    //             onClick={() => {
    //               navigate("/login");
    //               localStorage.setItem("token", "");
    //             }}
    //           >
    //             <div className="flex">
    //               <img
    //                 src={require("../../image/logout.png")}
    //                 className="w-[20px]"
    //                 alt="logout"
    //               />
    //             </div>
    //             <div className="flex mr-5">Logout</div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {loading ? (
    //       <div className="grid grid-cols-2 align-middle px-[68px] py-[60px] gap-5 ">
    //         <div className="flex w-[745px] h-[106px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
    //           <div className="w-[70px] h-[70px] ml-[20px] rounded-full shimmer" />
    //           <div className="flex flex-col justify-center items-center p-5">
    //             <div className="w-[180px] h-[20px] mb-1 shimmer" />
    //             <div className="w-[150px] h-[18px] shimmer" />
    //           </div>
    //           <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
    //             <div className="w-[30px] h-[30px] shimmer" />
    //           </div>
    //         </div>
    //         <div className="flex w-[745px] h-[106px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
    //           <div className="w-[70px] h-[70px] ml-[20px] rounded-full shimmer" />
    //           <div className="flex flex-col justify-center items-center p-5">
    //             <div className="w-[180px] h-[20px] mb-1 shimmer" />
    //             <div className="w-[150px] h-[18px] shimmer" />
    //           </div>
    //           <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
    //             <div className="w-[30px] h-[30px] shimmer" />
    //           </div>
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="grid grid-cols-2 align-middle px-[68px] py-[60px] gap-5">
    //         {customers ? (
    //           customers.slice().reverse().map((cust) => (
    //             <div className="flex w-[745px] h-[106px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
    //               <div className="flex w-[75px] h-[75px] mt-[20px] ml-[20px] flex-row items-start rounded-full overflow-hidden">
    //                 <img
    //                   src={`${baseUrl}/${cust.profileImage}`}
    //                   className=" w-[75px] h-[75px]"
    //                   alt="user"
    //                 />
    //               </div>
    //               <div className="flex flex-col justify-center items-center p-6 text-left">
    //                 <span className="text-xl font-semibold mr-auto">
    //                   {cust.name}
    //                 </span>
    //                 <span className="text-lg mr-auto ">{cust.phone}</span>
    //               </div>
    //               <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
    //                 <span
    //                   className="text-right ml-auto cursor-pointer"
    //                   onClick={() => handleClick(cust._id)}
    //                 >
    //                   <img src={require("./right.png")} alt="user" />
    //                 </span>
    //                 {cust.status ? (
    //                   <span
    //                     className="text-lg text-yellowgreen"
    //                     onClick={() => handleClick(cust._id)}
    //                   >
    //                     Approved
    //                   </span>
    //                 ) : (
    //                   <span
    //                     className="text-lg text-red"
    //                     onClick={() => handleClick(cust._id)}
    //                   >
    //                     Pending
    //                   </span>
    //                 )}
    //               </div>
    //             </div>
    //           ))
    //         ) : (
    //           <div>No data found</div>
    //         )}
    //       </div>
    //     )}
    <>
    <div className="flex w-full relative overflow-hidden">
      <div className="fixed top-0 bottom-0">
        <Sidebar />
      </div>
      <div className="w-full mt-[30px] 2xl:ml-[220px] xl:ml-[195px]">
        <div
          className="grid grid-cols-3  px-[68px]"
          style={{ gridTemplateColumns: "200px auto 180px" }}
        >
          <div className="flex 2xl:text-base text-sm border-solid border-transparent  w-[200px] h-[32px] " style={{ flex: "0 0 200px" }}>
            <div className="flex w-[50%] h-[32px] justify-evenly items-center rounded-l-lg border-2 border-blue bg-blue text-white">
              <div className="flex">
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
                  className="pending-link no-underline text-black"
                  to="/pendingcustomer"
                >
                  Pending
                </Link>
              </div>
            </div>
          </div>
          <div className=" flex ml-auto mr-5  max-w-[550px] 2xl:max-w-[600px] w-full h-[32px] rounded-lg border-1 border-solid border-aliceblue bg-transparent justify-start items-center">
            <div className="flex ml-2">
              <BsSearch size={24} color="#306FC7" />
            </div>
            <div className="flex flex-grow pr-3">
              <input
                type="search"
                className="block text-sm 2xl:text-base w-full px-2 py-[0.1rem] leading-[1.6] border-none outline-none placeholder:text-aliceblue "
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
          <div className="grid grid-cols-2 align-middle py-[40px] px-[68px] gap-5">
            <div className="flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-6">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
            <div className="flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[55px] h-[55px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-6">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 align-middle py-[40px] px-[68px] gap-5">
            {customers.length > 0 ?
              customers
                .slice()
                .reverse()
                .map((customer, index) => (
                  <div
                    className={`flex max-w-[765px] w-full h-[90px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300`}
                    onClick={() => handleClick(customer._id)}
                    key={index}
                  >
                    <div className="flex w-[55px] mt-[20px] ml-[20px] flex-row items-start rounded-full overflow-hidden">
                      <img
                        src={
                          customer.profileImage
                            ? `${baseUrl}/${customer.profileImage}`
                            : "./user.png"
                        }
                        alt="profilePic"
                        className="w-[55px] h-[55px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center p-6 text-left">
                      <span className="2xl:text-xl text-lg text-left font-semibold mr-auto">
                        {customer.name}
                      </span>
                      <span className="2xl:text-lg text-[16px] mr-auto">
                        {customer.phone}
                      </span>
                    </div>
                    <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                      <span className="text-right ml-auto w-[15px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#306FC7"
                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                          />
                        </svg>
                      </span>
                      {customer.status ? (
                        <span className="text-green">Approved</span>
                      ) : (
                        <span className="text-red">Pending</span>
                      )}
                    </div>
                  </div>
                ))
              :(
                <div className="flex w-full justify-center items-end pt-[200px] pl-[200px] text-lg 2xl:text-xl">
              No customers found. 
            </div>
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
            <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">Client Details</span>
          </div>
          {custDetails === null ? (
            <>
            <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
            <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
              <Spin size="large" />
            </div>
          </>
          ) : (
            <div>
              <div className="flex w-[600px] py-8 flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5">
                <div className="flex flex-row w-full">
                  <div className="flex w-[75px] h-[75px] ml-[20px] items-start rounded-full overflow-hidden">
                    <img
                      className="w-[75px] h-[75px] "
                      src={`${baseUrl}/${custDetails.data.profileImage}`}
                      alt="user"
                    />
                  </div>
                  <div className="flex flex-col m-4">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto">
                      {custDetails.data.name ? custDetails.data.name : "-"}
                    </span>
                    <span className="text-base 2xl:text-lg font-normal">
                      {custDetails.data.phone ? custDetails.data.phone : ""}
                    </span>
                  </div>

                  <div className="flex flex-col w-[30%] items-center justify-start mt-6 ml-auto pr-12">
                    {/* <span className="text-[18px] text-left text-red font-semibold ml-auto m-1">
                  Pending
                </span> */}
                    {custDetails.status ? (
                      <span className="text-base 2xl:text-lg text-yellowgreen">Approved</span>
                    ) : (
                      <span className="text-base 2xl:text-lg text-red">Pending</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col w-full mt-8">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1 ">
                        Addressline 1
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.line1
                          ? custDetails.data.customerLocation.line1
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Addressline 2
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.line2
                          ? custDetails.data.customerLocation.line2
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        City
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.residenceType
                          ? custDetails.data.customerLocation.residenceType
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        State
                      </span>
                      <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                        {custDetails.data.customerLocation.state
                          ? custDetails.data.customerLocation.state
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    {/* <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Approved
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {custDetails.topInfo.aproovedStatus
                          ? "Approved"
                          : "Not Approved"}
                      </span>
                    </div> */}

                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Pan No
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {custDetails.data.panNumber
                          ? custDetails.data.panNumber
                          : ""}
                      </span>
                    </div>

                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Aadhar No
                      </span>
                      <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                        {custDetails.data.aadhaar
                          ? custDetails.data.aadhaar
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col max-w-[60%] w-full justify-start items-center mr-auto ml-5 pr-4">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Martial Status
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {custDetails.data.maritialStatus
                          ? custDetails.data.maritialStatus
                          : ""}
                      </span>
                    </div>

                    <div className="flex flex-col items-center max-w-[40%] w-full justify-start pr-8">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Credit Limit
                      </span>
                      <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                      ₹{custDetails.data.creditLimit
                          ? custDetails.data.creditLimit
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
                      <span className="text-2xl 2xl:text-3xl text-left font-extrabold mr-auto">
                        Credit Limit
                      </span>
                    </div>
                    <div className="block ml-auto p-5 mr-3 text-left">
                      <span className="text-[10px] 2xl:text-sm font-normal">
                        Available Limit-₹
                        {custDetails.data.creditLimit - custDetails.data.creditUsed}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-center items-center">
                    <div className="block relative text-[10px] 2xl:text-sm">
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
                            fontSize: "12px",
                            color: "#000",
                            marginTop: "20px",
                          }}
                        >
                          ₹{custDetails.data.creditUsed}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="block text-[10px] 2xl:text-sm ml-4 mt-1">₹00</div>
                    <div className="block ml-auto text-[10px] 2xl:text-sm mr-4 mt-1">
                      ₹{custDetails.data.creditLimit}
                    </div>
                  </div>
                  <div className="flex flex-row ml-5 mt-3 ">
                    <div className="block">
                      <span className="text-2xl 2xl:text-3xl text-left font-extrabold mr-auto">
                        Ongoing Loans
                      </span>
                    </div>
                  </div>
                  {custDetails.data.creditUsed ? (
                    <div className="w-[600px] h-[55px] bg-lightBlue border-1 border-solid border-blue rounded-lg flex flex-row items-center ml-6 mt-6">
                      <span className="text-base 2xl:text-lg ml-5">
                        Loan ID -{" "}
                        {custDetails.data.pendingTransaction.trnId}
                      </span>
                      <span className="ml-auto mr-5 text-red text-base 2xl:text-lg">
                        Pending
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-row w-full mt-8 mb-10 justify-center items-center">
                      <div className="block">No Ongoing Loans</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-[600px] h-[50px] bg-lightYellow border-1 border-solid border-yellow rounded-lg flex flex-row items-center ml-6 bottom-9 absolute">
                  <span className="text-base 2xl:text-lg text-yellow ml-5">
                    The Account is under processing.
                  </span>
                </div>
              )}
            </div>
          )}
        </Drawer>
      </div>
    </div>
      <footer className="bottom-0 absolute right-0 2xl:left-[226px] left-[198px] ">
        <Footer/>
      </footer>
    </>
  );
};

export default ApprovedCust;
