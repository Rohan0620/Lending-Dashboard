import React from "react";
import Sidebar from "../../components/Sidebar";
import { Divider, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayImage from "../../components/DisplayImage";

const PendingCustomer = () => {
  const [selectClient, setSelectClient] = React.useState(false);
  const [showCreditsLimit, setShowCreditsLimit] = React.useState(false);
  const [showApproved, setShowApproved] = React.useState(false);
  const [pendingCustomers, setPendingCustomers] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedCredit, setSelectedcredit] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  let navigate = useNavigate();

  const onClose = () => {
    setSelectClient(false);
    setShowApproved(false);
    setShowCreditsLimit(false);
  };
  const handleClick = async (id) => {
    setSelectClient(!selectClient);
    try {
      const response = await axios.get(`http://localhost:8000/pending/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setSelectedCustomer(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCredits = () => {
    setShowCreditsLimit(true);
    setSelectClient(false);
  };
  const onCloseCredits = () => {
    setShowCreditsLimit(false);
    setSelectClient(true);
  };

  const handleSubmit = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/Lenders/aproove/${id}`,
        {
          creditLimit: selectedCredit,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.status === "success") {
        setShowCreditsLimit(false);
        setShowApproved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setLoading(false);
      setPendingCustomers(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    fetchPendingCustomers();
  }, []);

  return (
    <div className="flex w-full relative">
      <div className="fixed top-0 bottom-0 ">
        <Sidebar />
      </div>
      <div className="container mt-[50px] ml-[270px]">
        <div className="flex flex-row justify-around px-7 ml-6">
          <div className="flex text-black">
            <div className="flex justify-start items-center">
              <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
                <div className="flex w-[50%] h-[35px] text-lg justify-evenly items-center rounded-l-lg border-1 border-solid border-blue bg-white text-blue">
                  <div className="flex"></div>
                  <div className="flex mr-2">
                    <Link
                      className="approve-link no-underline text-blue"
                      to="/approvedcustomer"
                    >
                      Approved
                    </Link>
                  </div>
                </div>

                {/* Pending Link */}
                <div className="flex w-[50%] justify-evenly rounded-r-lg items-center border-1 border-solid border-blue bg-blue text-white">
                  <div className="flex mr-0">
                    <Link
                      className="approve-link no-underline text-white"
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
          <div className="flex justify-start items-center mr-4">
            <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px]">
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
                <div className="flex mr-5">Logout</div>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 align-middle px-[68px] py-[60px] gap-5">
            <div className="flex w-[745px] h-[106px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
              <div className="w-[70px] h-[70px] ml-[20px] rounded-full shimmer" />
              <div className="flex flex-col justify-center items-center p-5">
                <div className="w-[180px] h-[20px] mb-1 shimmer" />
                <div className="w-[150px] h-[18px] shimmer" />
              </div>
              <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                <div className="w-[30px] h-[30px] shimmer" />
              </div>
            </div>
            <div className="flex w-[745px] h-[106px] border-1 border-solid border-aliceblue bg-white rounded-lg items-center cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300">
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
          <div className="grid grid-cols-2 align-middle px-[68px] py-[60px] gap-5 ">
            {pendingCustomers?.length > 0 ? (
              pendingCustomers.map((pendingCustomer) => (
                <div
                  className="flex w-[745px] h-[106px] border-1 border-solid border-aliceblue bg-lightBlue rounded-lg cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-98 duration-300"
                  key={pendingCustomer._id}
                  onClick={() => handleClick(pendingCustomer._id)}
                >
                  <div className="flex w-[75px] mt-[20px] ml-[20px] flex-row items-start">
                    <img
                      src={require("./user.png")}
                      alt="user"
                      className="w-[75px]"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center p-6">
                    <span className="text-xl font-semibold mr-auto">
                      {pendingCustomer.name}
                    </span>
                    <span className="text-lg mr-auto">
                      {pendingCustomer.phone}
                    </span>
                  </div>
                  <div className="flex flex-col content-end justify-center items-center ml-auto mr-11">
                    <span className="ml-auto">
                      <img src={require("./right.png")} alt="user" />
                    </span>
                    <span className="text-lg text-red">Pending</span>
                  </div>
                </div>
              ))
            ) : (
              <div>No pending customers</div>
            )}
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
            <span className="text-4xl font-extrabold mt-4">Client Details</span>
          </div>
          <div className="flex w-[600px] h-[540px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-6">
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
                  {selectedCustomer.name}
                </span>
                <span className="text-lg font-normal">
                  {selectedCustomer.phone}
                </span>
              </div>

              <div></div>
              <div className="flex flex-col w-[30%] items-center justify-start mt-[3rem] ml-auto pr-12">
                <span className="text-[18px] text-left text-red font-semibold ml-auto m-1">
                  Pending
                </span>
              </div>
            </div>

            <div className="flex flex-col w-full mt-8">
              <div className="flex flex-row justify-around">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1 ">
                    Addressline 1
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    {selectedCustomer.customerLocation
                      ? selectedCustomer.customerLocation.line1
                      : ""}
                  </span>
                </div>
                <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Addressline 2
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    {selectedCustomer.customerLocation
                      ? selectedCustomer.customerLocation.line2
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex flex-row w-full justify-around mt-10">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Pincode
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    {selectedCustomer.customerLocation
                      ? selectedCustomer.customerLocation.pincode
                      : ""}
                  </span>
                </div>
                <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    State
                  </span>
                  <span className="text-lg text-left font-normal mr-auto m-1">
                    {selectedCustomer.customerLocation
                      ? selectedCustomer.customerLocation.state
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex flex-row w-full justify-around mt-10">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Pan Card No
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    {selectedCustomer.panNumber}
                  </span>
                </div>
                <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Aadhar No
                  </span>
                  <span className="text-lg text-left font-normal mr-auto m-1">
                    {selectedCustomer.aadhaar}
                  </span>
                </div>
              </div>

              <div className="flex flex-row w-full justify-around mt-10">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Marital Status
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    {selectedCustomer.maritialStatus}
                  </span>
                </div>
                <div className="flex flex-col w-[40%] items-center justify-start ml-auto mr-[90px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Employment Type
                  </span>
                  <span className="text-lg text-left font-normal mr-auto m-1">
                    {selectedCustomer.employmentType}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {selectedCustomer.employmentType === "Salaried" && (
            <>
              <div className="flex flex-row ml-5 mt-3">
                <span className="text-4xl font-extrabold mt-4">
                  Employment Details
                </span>
              </div>
              <div className="flex w-[600px] h-[220px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
                <div className="flex flex-col w-full mt-8">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1 ">
                        Industry Type
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {selectedCustomer.employmentDetails
                          ? selectedCustomer.employmentDetails.industryType
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Employer Name
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {selectedCustomer.employmentDetails
                          ? selectedCustomer.employmentDetails.employerName
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-7">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-[18px] text-left font-semibold mr-auto m-1">
                        Work Email
                      </span>
                      <span className="text-lg font-normal mr-auto m-1">
                        {selectedCustomer.employmentDetails
                          ? selectedCustomer.employmentDetails.workEmail
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-row ml-5 mt-3">
            <span className="text-4xl font-extrabold mt-3">Income Details</span>
          </div>
          <div className="flex w-[600px] h-[120px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-6">
            <div className="flex flex-col w-full mt-8">
              <div className="flex flex-row justify-around">
                <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1 ">
                    Monthly takeaway amount
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    <i className="fa fa-inr"></i>
                    {selectedCustomer.incomeDetails
                      ? selectedCustomer.incomeDetails.monthlyTakeHomeAmount
                      : ""}
                  </span>
                </div>
                <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                  <span className="text-[18px] text-left font-semibold mr-auto m-1">
                    Existing EMIs
                  </span>
                  <span className="text-lg font-normal mr-auto m-1">
                    <i className="fa fa-inr"></i>
                    {selectedCustomer.incomeDetails
                      ? selectedCustomer.incomeDetails.exisitingEmi
                      : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative pb-[100px]">
            <div className="flex flex-row ml-5 mt-3">
              <span className="text-4xl font-extrabold mt-4">Documents</span>
            </div>
            <div
              className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4 cursor-pointer"
              onClick={() => {
                console.log("clicked");
                setSelectedImage(selectedCustomer.pan);
              }}
            >
              <span className="mr-auto ml-4 text-lg font-semibold">
                PAN Card
              </span>
              <span className="ml-auto mr-4">
                <img src={require("./arrow.png")} alt="arrow" />
              </span>
            </div>
            {selectedCustomer.employmentType === "Salaried" && (
              <>
                <div
                  className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4 cursor-pointer"
                  onClick={() => {
                    console.log("clicked");
                    setSelectedImage(selectedCustomer.salarySlip);
                  }}
                >
                  <span className="mr-auto ml-4 text-lg font-semibold">
                    Salary Slip
                  </span>
                  <span className="ml-auto mr-4">
                    <img src={require("./arrow.png")} alt="arrow" />
                  </span>
                </div>
              </>
            )}
            <div
              className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4 cursor-pointer"
              onClick={() => {
                console.log("clicked");
                setSelectedImage(selectedCustomer.bankStatements);
              }}
            >
              <span className="mr-auto ml-4 text-lg font-semibold">
                Bank Statement
              </span>
              <span className="ml-auto mr-4">
                <img src={require("./arrow.png")} alt="arrow" />
              </span>
            </div>
            {selectedCustomer.employmentType === "Self-employed" && (
              <>
                <div
                  className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4 cursor-pointer"
                  onClick={() => {
                    console.log("clicked");
                    setSelectedImage(selectedCustomer.incomeTax);
                  }}
                >
                  <span className="mr-auto ml-4 text-lg font-semibold">
                    Income Tax Return
                  </span>
                  <span className="ml-auto mr-4">
                    <img src={require("./arrow.png")} alt="arrow" />
                  </span>
                </div>
              </>
            )}
            <div
              className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4 cursor-pointer"
              onClick={() => {
                console.log(selectedCustomer.addressProof);
                setSelectedImage(selectedCustomer.addressProof);
              }}
            >
              <span className="mr-auto ml-4 text-lg font-semibold">
                Address Proof
              </span>
              <span className="ml-auto mr-4">
                <img src={require("./arrow.png")} alt="arrow" />
              </span>
            </div>
          </div>
          {selectedImage && (
            // <div className="flex justify-center items-center z-10 mb-[100px]">
            //   <img
            //     src={`http://localhost:8000/${selectedImage}`}
            //     alt="Selected Document"
            //   />
            // </div>
            <DisplayImage imageUrl={`http://localhost:8000/${selectedImage.replace(/\\/g, '/')}`}/>
          )}
          <div className="w-full bottom-3 right-0 absolute z-1 bg-white ">
            <Divider className="bg-blue mr-auto mt-0" />
            <div className="flex justify-end">
              <button
                className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-2 mb-4"
                onClick={onClose}
              >
                <span className="text-xl font-bold">CANCEL</span>
              </button>
              <button
                className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mx-5 mb-4"
                onClick={handleCredits}
              >
                <span className="text-xl font-bold">NEXT</span>
              </button>
            </div>
          </div>
        </Drawer>

        <Drawer
          placement="right"
          closable={false}
          onClose={onCloseCredits}
          open={showCreditsLimit}
          key="rightCredits"
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
          <div className="block px-5 pt-10">
            <span className="text-4xl font-bold">Set Credit Limit</span>
          </div>
          <div className="container relative">
            <div className="w-full ml-5 mt-6">
              <div className="grid grid-cols-2 gap-5 overflow-hidden">
                <div
                  className={`flex justify-center items-center h-[230px] w-[300px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "50000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("50000")}
                >
                  <span className="text-3xl text-blue">&#8377;50,000</span>
                </div>
                <div
                  className={`flex justify-center items-center h-[230px] w-[300px] ml-[-15px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "100000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("100000")}
                >
                  <span className="text-3xl text-blue">&#8377;100,000</span>
                </div>
                <div
                  className={`flex justify-center items-center h-[230px] w-[300px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "500000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("500000")}
                >
                  <span className="text-3xl text-blue">&#8377;500,000</span>
                </div>
                <div
                  className={`flex justify-center items-center h-[230px] w-[300px] ml-[-15px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "1000000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("1000000")}
                >
                  <span className="text-3xl text-blue">&#8377;1,000,000</span>
                </div>
              </div>
              <div className="flex flex-row mt-12 ml-[-20px] justify-center relative text-xl font-bold">
                or
              </div>
              <div className="block mt-10">
                <span className="text-3xl text-blue p-3 mb-[-15px]">
                  &#8377;
                </span>
                <input
                  type="number"
                  className="w-[575px] h-[50px] font-Poppins text-2xl text-blue border-1 border-solid border-blue placeholder-blue bg-white border-x-0 border-t-0"
                  placeholder="Credit Limit"
                  value={selectedCredit}
                  onChange={(e) => setSelectedcredit(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full bottom-3 right-0 absolute z-1 bg-white ">
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
                onClick={() => handleSubmit(selectedCustomer._id)}
                type="submit"
              >
                <span className="text-xl font-bold">NEXT</span>
              </button>
            </div>
          </div>
        </Drawer>

        <Drawer
          placement="right"
          closable={false}
          onClose={onClose}
          open={showApproved}
          key="rightSubmit"
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
      </div>
    </div>
  );
};

export default PendingCustomer;
