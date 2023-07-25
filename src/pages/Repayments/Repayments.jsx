import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./repay.css";
import { Divider, Drawer } from "antd";

const Repayment
 = () => {
  const [selectClient, setSelectClient] = React.useState(false);
  const [showClientdDtails, setShowClientdDtails] = React.useState(false);
  const [showTreatments, setShowTreatments] = React.useState(false);
  
  const [showCreditsLimit, setShowCreditsLimit] = useState(false);
  const [showApproved, setShowApproved] = useState(false);
  

  const handleApprove = () => {
    setShowApproved(true);
    setShowCreditsLimit(false);
  };
  
  
  const onFundAccount=()=>{
    setSelectClient(false);
    setShowCreditsLimit(true);

  }
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
  const handleClick = () => {
    setSelectClient(!selectClient);
  };

  const onCloseCredits = () => {
    setShowCreditsLimit(false);
    setSelectClient(true);
  };

  return (
    <>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full mt-[50px] relative">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row w-[vw] text-black px-5">
              <div className="flex flex-col justify-center items-start px-6">
                <span className="text-lg font-normal ">Settled Amount</span>
                <span className="text-3xl font-bold ">
                  <i className="fa fa-rupee"></i>50000.00
                </span>
              </div>
              <div className="flex flex-col justify-center items-start px-6">
                <span className="text-lg font-normal ">Unsettled Amount</span>
                <span className="text-3xl font-bold ">
                  <i className="fa fa-rupee"></i>50000.00
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
            <div className="flex justify-start items-center mr-10 px-5">
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
                          strokeWidth="1.75"
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
          <div className="flex w-[80vww] justify-center p-7">
            <table cellSpacing="0" className="w-full mt-4">
              <tbody className="border-solid text-xl border-1 border-aliceblue bg-white rounded-lg">
                <tr className=" first-row border-solid text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                  <td>
                    <img src={require("./status.png")} alt="status" />
                  </td>
                  <td>Loan ID</td>
                  <td >Name</td>
                  <td>Phone No</td>
                  <td>Amount</td>
                  <td>Date</td>
                  <td>EMI No</td>
                  <td className="mr-4">Status</td>
                </tr>
                <tr className=" text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-5">
                  <td>
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}> #1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>
                  {/* <td className="text-center h-[50px] w-[230px]">
                    <div className="ml-10 block text-xl text-blue text-center border-solid border-1 border-blue bg-lightBlue rounded-2xl h-[40px]">
                      Kidney Surgery
                    </div>
                  </td> */}
                  <td>5000</td>
                  <td>1</td>
                  <td className="text-yellowgreen">Settled</td>                
                </tr>
                <tr className=" text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-8">
                  <td>
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}>#1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>

                  
                  <td>5000</td>
                  <td>4</td>
                  <td className="text-red mr-4">Pending</td>
                </tr>
                <tr className=" items-center text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-8">
                  <td>
                    <img src={require("./completed.png")} alt="completed" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}> #1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>

                  
                  <td>5000</td>
                  <td>6</td>
                  <td className="text-yellowgreen">Settled</td>                
                </tr>
                <tr className=" items-center text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-8">
                  <td>
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}> #1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>

                  
                  <td>5000</td>
                  <td>3</td>
                  <td className="text-yellowgreen">Settled</td>                
                </tr>
                <tr className=" items-center text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-8">
                  <td>
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}> #1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>

                  
                  <td>5000</td>
                  <td>6</td>
                  <td className="text-yellowgreen">Settled</td>                
                </tr>
                <tr className=" items-center text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-8">
                  <td>
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}> #1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>

                  
                  <td>5000</td>
                  <td>4</td>
                  <td className="text-red mr-4">Pending</td>
                </tr>
                <tr className=" items-center text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-8">
                  <td>
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue" onClick={handleClick} style={{cursor:'pointer'}}> #1256784542</td>
                  <td>John doe</td>
                  <td>9874563210</td>
                  <td className="text-center h-[50px] w-[230px]">3 months</td>

                  
                  <td>5000</td>
                  <td>2</td>
                  <td className="text-red mr-4">Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
        
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
              <span className="text-4xl font-extrabold mt-4">
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
                  <span className="text-[22px] text-left font-semibold mr-auto">
                    John Doe
                  </span>
                  <span className="text-lg font-normal">+91 6376078722</span>
                </div>
                
                <div>
                
                </div>
             


              </div>
              
              <div className="flex flex-col w-full mt-8">
                <div className="flex flex-row justify-around">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1 ">
                      Addressline 1
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">ABC Ground Hello World</span>
                  </div>
                  <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      Addressline 2
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">ABC Ground</span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-10">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      City
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">Gadag</span>
                  </div>
                  <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      State
                    </span>
                    <span className="text-lg text-left font-normal mr-auto m-1">Karnataka</span>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around mt-10">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      Pan Card No
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">A54123</span>
                  </div>
                  <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      Aadhar No
                    </span>
                    <span className="text-lg text-left font-normal mr-auto m-1">9876543210</span>
                  </div>
                </div>

                <div className="flex flex-row w-full justify-around mt-10">
                  <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      Approved on 
                    </span>
                    <span className="text-lg font-normal mr-auto m-1">22 July 2023</span>
                  </div>
                  <div className="flex flex-col w-[40%] items-center justify-start ml-auto mr-[90px]">
                    <span className="text-[18px] text-left font-semibold mr-auto m-1">
                      Approved Limit
                    </span>
                    <span className="text-lg text-left font-normal mr-auto m-1">₹50000</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-row ml-5 mt-3">
            <span className="text-4xl font-extrabold mt-4">
              Loan Details
            </span>
          </div>
          <div className="flex w-[600px] h-[200px] flex-row border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
            <div className="flex flex-col w-full m-3">

              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-row  w-[100%] justify-between  ">
                  <span className="text-[25px] text-aliceblue text-left    ">
                    Loan Amount
                  </span>
                  <span className="text-[25px] text-aliceblue font-normal  ">
                    ₹50000
                  </span>
                </div>
              </div>


              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-row  w-[100%] justify-between  ">
                  <span className="text-[25px] text-aliceblue text-left    ">
                    Interest rate per month 
                  </span>
                  <span className="text-[25px] text-aliceblue font-normal  ">
                    1.5%
                  </span>
                </div>
              </div>


              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-row  w-[100%] justify-between  ">
                  <span className="text-[25px] text-aliceblue text-left    ">
                    Tensure 
                  </span>
                  <span className="text-[25px] text-aliceblue font-normal  ">
                    6 mos
                  </span>
                </div>
              </div>


              <div className="flex flex-row justify-between mb-4">
                <div className="flex flex-row  w-[100%] justify-between  ">
                  <span className="text-[25px] text-black text-left    ">
                    EMI
                  </span>
                  <span className="text-[25px] text-black font-normal  ">
                    ₹8333
                  </span>
                </div>
              </div>


            </div>
          </div>

          <div className="flex flex-row ml-5 mt-3">
            <span className="text-4xl font-extrabold mt-4">
            EMI Dates 
            </span>
          </div>
          <div className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4">
            <span className="ml-4 text-lg font-semibold">
            22 July 2023
            </span>

            <span className="mr-auto ml-6 text-lg font-semibold">
            ₹8333
            </span>
            <span className='text-lg text-yellowgreen ml-auto mr-4 '>
            Settled
            </span>

          </div>


          <div className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4">
            <span className="ml-4 text-lg font-semibold">
            22 July 2023
            </span>

            <span className="mr-auto ml-6 text-lg font-semibold">
            ₹8333
            </span>
            <span className='text-lg text-red ml-auto mr-4 '>
            Pending
            </span>

          </div>

          

{/* 
          <div className="w-full bottom-3 right-0 absolute z-1 bg-white ">
                <Divider className="bg-blue mr-auto pt-0 " />
                <div className="flex justify-end">
                  <button
                    className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-4"
                    onClick={onClose}
                  >
                    <span className="text-xl font-bold">CANCEL</span>
                  </button>
                  <button
                    className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-4"
                    onClick={onFundAccount}
                  >
                    <span className="text-xl font-bold">PROCEED</span>
                  </button>
                </div>
              </div> */}

          </Drawer>

          {/* <Drawer
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
          </div> */}

          {/* <div className="block px-5 pt-10">
            <span className="text-4xl font-bold">Set Credit Limit</span>
          </div> */}


{/* 
<div className="flex flex-row ml-5 mt-3">
            <span className="text-4xl font-extrabold mt-4">
            Fund Account
            </span>
          </div>
          <div className="flex w-[600px] h-[220px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
            <div className="flex flex-col w-full mt-8">
              <div className="flex flex-row justify-around">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1 ">
                  Account No
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                  1234556777788
                  </span>
                </div>
                <div className="flex flex-col w-[35%] items-center justify-start ml-auto mr-[130px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    IFSC Code
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                  SBI0009373
                  </span>
                </div>
              </div>
              <div className="flex flex-row w-full justify-around mt-7">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                  UPI id
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">upi@okaxis</span>
                </div>

                <div className="flex flex-col w-[35%] items-center justify-start ml-auto mr-[130px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                  Amount Received
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                  ₹28000
                  </span>
                </div>
              </div>

              
            </div>
          </div> */}


          
         
          {/* <div className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-gold bg-lightBlue rounded-lg ml-6 mt-40">
            <span className="mr-auto ml-4 text-lg font-semibold text-gold">
            Amount to be received is ₹50000
            </span>
            
          </div> */}
 
          {/* <div className="w-full bottom-3 right-0 absolute z-1 bg-white ">
            <Divider className="bg-blue mr-auto pt-0 " />
            <div className="flex justify-end">
              <button
                className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-4"
                onClick={onCloseCredits}
              >
                <span className="text-xl font-bold">CANCEL</span>
              </button>
              <button
                className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-4"
                onClick={handleApprove}
              >
                <span className="text-xl font-bold">Approve</span>
              </button>
            </div>
          </div>
        </Drawer> */}



{/*         
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
            <div className="flex w-full h-screen justify-center top-[50%] font-Poppins">
              <div className="flex flex-col flex-wrap justify-center items-center">
                <div className="">
                  <img src={require("./approved.png")} alt="congrats" />
                </div>
                <span className=" w-[500px] break-words text-3xl  font-bold text-center">
                  Approved Successfully
                </span>
              </div>
            </div>
          </div>
        </Drawer>
          
       */}
        </div>
      </div>
    </>
  );
};

export default Repayment;
