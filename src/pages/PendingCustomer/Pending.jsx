import React from "react";
import Sidebar from "../../components/Sidebar";
import { Divider, Drawer, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BiDownload } from "react-icons/bi";
import DisplayImage from "../../components/DisplayImage";
import { FormContext } from "../../Contexts/FormContext";
import { BsSearch } from "react-icons/bs";
import Lightbox from "yet-another-react-lightbox";
// import "react-18-image-lightbox/style.css";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Footer from "../../components/Footer";

const PendingCustomer = () => {
  const [selectClient, setSelectClient] = React.useState(false);
  const [showCreditsLimit, setShowCreditsLimit] = React.useState(false);
  const [showApproved, setShowApproved] = React.useState(false);
  const [pendingCustomers, setPendingCustomers] = React.useState([]);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedCredit, setSelectedcredit] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [openLightbox, setOpenLightbox] = React.useState(false);
  const { baseUrl } = React.useContext(FormContext);
  let navigate = useNavigate();

  const onClose = () => {
    setSelectClient(false);
    setShowApproved(false);
    setShowCreditsLimit(false);
    setSelectedCustomer(null);
  };
  const handleClick = async (id) => {
    setSelectClient(!selectClient);
    try {
      const response = await axios.get(`${baseUrl}/pending/${id}`, {
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

  const closeLightbox = () => {
    setOpenLightbox(false);
    setSelectedImage(null);
  };

  const handleImage = (img) => {
    setSelectedImage(`${baseUrl}/${img}`);
    setOpenLightbox(true);
  };

  const handleSubmit = async (id) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/Lenders/aproove/${id}`,
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
  const zoomRef = React.useRef(null);

  const fetchPendingCustomers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pending`, {
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
    console.log(openLightbox);
    fetchPendingCustomers();
  }, []);

  return (
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
          <div
            className="flex 2xl:text-base text-sm border-solid border-transparent  w-[200px] h-[32px] "
            style={{ flex: "0 0 200px" }}
          >
            <div className="flex w-[50%] h-[31px] justify-evenly items-center rounded-l-lg border-solid border-1 border-blue bg-white text-black">
              <div className="flex">
                <Link
                  className="approve-link no-underline text-black"
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
                  className="pending-link no-underline text-white"
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
            {pendingCustomers.length > 0 ?
              pendingCustomers
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
                )):(
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
          open={selectClient}
          key="right"
          width={700}
          className=""
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
          {selectedCustomer === null ? (
            <>
              <div className="fixed inset-0 bg-gray-500 opacity-100 z-50"></div>
              <div className=" flex justify-center items-center w-full h-full transition ease-in delay-300 ">
                <Spin size="large" />
              </div>
            </>
          ) : (
            <>
              <div className="flex w-[600px] h-[540px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-6 py-5 ">
                <div className="flex flex-row w-full">
                  <div className="flex w-[75px] h-[75px] mt-[20px] ml-[20px] items-start rounded-full overflow-hidden">
                    <img
                      className="w-[75px] h-[75px]"
                      src={`${baseUrl}/${selectedCustomer.profileImage}`}
                      alt="user"
                    />
                  </div>
                  <div className="flex flex-col m-4 mt-9">
                    <span className="text-base 2xl:text-lg text-left font-semibold mr-auto">
                      {selectedCustomer.name}
                    </span>
                    <span className="text-base 2xl:text-lg  font-normal">
                      {selectedCustomer.phone}
                    </span>
                  </div>

                  <div></div>
                  <div className="flex flex-col w-[30%] items-center justify-start mt-[3rem] ml-auto pr-12">
                    <span className="text-base 2xl:text-lg  text-left text-red font-semibold ml-auto m-1">
                      Pending
                    </span>
                  </div>
                </div>

                <div className="flex flex-col w-full mt-8">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-base 2xl:text-lg  text-left font-semibold mr-auto m-1 ">
                        Addressline 1
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {selectedCustomer.customerLocation
                          ? selectedCustomer.customerLocation.line1
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-base 2xl:text-lg  text-left font-semibold mr-auto m-1">
                        Addressline 2
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {selectedCustomer.customerLocation
                          ? selectedCustomer.customerLocation.line2
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-base 2xl:text-lg  text-left font-semibold mr-auto m-1">
                        Pincode
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {selectedCustomer.customerLocation
                          ? selectedCustomer.customerLocation.pincode
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        State
                      </span>
                      <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                        {selectedCustomer.customerLocation
                          ? selectedCustomer.customerLocation.state
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Pan Card No
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {selectedCustomer.panNumber}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-base 2xl:text-lg  text-left font-semibold mr-auto m-1">
                        Aadhar No
                      </span>
                      <span className="text-base 2xl:text-lg text-left font-normal mr-auto m-1">
                        {selectedCustomer.aadhaar}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row w-full justify-around mt-10">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-base 2xl:text-lg  text-left font-semibold mr-auto m-1">
                        Marital Status
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        {selectedCustomer.maritialStatus}
                      </span>
                    </div>
                    <div className="flex flex-col w-[40%] items-center justify-start ml-auto mr-[90px]">
                      <span className="text-base 2xl:text-lg  text-left font-semibold mr-auto m-1">
                        Employment Type
                      </span>
                      <span className="text-base 2xl:text-lg  text-left font-normal mr-auto m-1">
                        {selectedCustomer.employmentType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedCustomer.employmentType === "Salaried" && (
                <>
                  <div className="flex flex-row ml-5 mt-3">
                    <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                      Employment Details
                    </span>
                  </div>
                  <div className="flex w-[600px] h-[220px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-9">
                    <div className="flex flex-col w-full mt-8">
                      <div className="flex flex-row justify-around">
                        <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                          <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1 ">
                            Industry Type
                          </span>
                          <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                            {selectedCustomer.employmentDetails
                              ? selectedCustomer.employmentDetails.industryType
                              : ""}
                          </span>
                        </div>
                        <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                          <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                            Employer Name
                          </span>
                          <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                            {selectedCustomer.employmentDetails
                              ? selectedCustomer.employmentDetails.employerName
                              : ""}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row w-full justify-around mt-7">
                        <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                          <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                            Work Email
                          </span>
                          <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
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
                <span className="text-2xl 2xl:text-3xl font-extrabold mt-3">
                  Income Details
                </span>
              </div>
              <div className="flex w-[600px] h-[120px] flex-col border-solid border-1 bg-lightBlue border-aliceblue rounded-lg m-5 mt-6">
                <div className="flex flex-col w-full mt-8">
                  <div className="flex flex-row justify-around">
                    <div className="flex flex-col w-[70%] justify-start items-center mr-auto ml-5">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1 ">
                        Monthly takeaway amount
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        <i className="fa fa-inr"></i>₹
                        {selectedCustomer.incomeDetails
                          ? selectedCustomer.incomeDetails.monthlyTakeHomeAmount
                          : ""}
                      </span>
                    </div>
                    <div className="flex flex-col w-[30%] items-center justify-start ml-auto mr-[130px]">
                      <span className="text-base 2xl:text-lg text-left font-semibold mr-auto m-1">
                        Existing EMIs
                      </span>
                      <span className="text-base 2xl:text-lg font-normal mr-auto m-1">
                        <i className="fa fa-inr"></i>₹
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
                  <span className="text-2xl 2xl:text-3xl font-extrabold mt-4">
                    Documents
                  </span>
                </div>
                <div
                  className="flex flex-row w-[600px] h-[50px] items-center border-solid border-1 border-blue bg-lightBlue rounded-lg ml-6 mt-4 cursor-pointer"
                  onClick={() => {
                    handleImage(selectedCustomer.pan);
                  }}
                >
                  <span className="mr-auto ml-4 text-base 2xl:text-lg font-semibold">
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
                        handleImage(selectedCustomer.salarySlip);
                      }}
                    >
                      <span className="mr-auto ml-4 text-base 2xl:text-lg font-semibold">
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
                    handleImage(selectedCustomer.bankStatements);
                  }}
                >
                  <span className="mr-auto ml-4 text-base 2xl:text-lg font-semibold">
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
                        handleImage(selectedCustomer.incomeTax);
                      }}
                    >
                      <span className="mr-auto ml-4 text-base 2xl:text-lg font-semibold">
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
                    handleImage(selectedCustomer.addressProof);
                  }}
                >
                  <span className="mr-auto ml-4 text-base 2xl:text-lg font-semibold">
                    Address Proof
                  </span>
                  <span className="ml-auto mr-4">
                    <img src={require("./arrow.png")} alt="arrow" />
                  </span>
                </div>
              </div>
              {openLightbox && (
                <div className="">
                  <Lightbox
                    open={openLightbox}
                    slides={[{ src: selectedImage }]}
                    close={() => setOpenLightbox(false)}
                    plugins={[Download , Zoom]}
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
                      finite:true,
                      preload:2,
                      imageFit : "contain",
                      padding: "16px",
                      spacing: "16px",
                    }}
                    render={{
                      buttonPrev:()=>null,
                      buttonNext:()=>null,
                      buttonZoom:()=>true,
                    }}
                  />
                </div>
              )}
              <div className="w-full block bg-white  absolute bottom-0 right-0 overflow-hidden">
                <Divider className="bg-blue mr-auto mt-0" />
                <div className="flex justify-end pb-2">
                  <button
                    className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-1 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                    onClick={onClose}
                  >
                    <span className="2xl:text-lg text-base font-bold">
                      CANCEL
                    </span>
                  </button>
                  <button
                    className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mr-5 ml-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                    onClick={handleCredits}
                  >
                    <span className="2xl:text-lg text-base font-bold">
                      NEXT
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
            <span className="text-2xl 2xl:text-3xl font-bold">
              Set Credit Limit
            </span>
          </div>
          <div className="container relative pb-[120px]">
            <div className="w-full ml-5 mt-6">
              <div className="grid grid-cols-2 gap-5 overflow-hidden">
                <div
                  className={`flex justify-center items-center h-[180px] w-[250px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "50000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("50000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;50,000
                  </span>
                </div>
                <div
                  className={`flex justify-center items-center h-[180px] w-[250px] ml-[-15px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "100000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("100000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;100,000
                  </span>
                </div>
                <div
                  className={`flex justify-center items-center h-[180px] w-[250px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "500000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("500000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;500,000
                  </span>
                </div>
                <div
                  className={`flex justify-center items-center h-[180px] w-[250px] ml-[-15px] bg-lightBlue rounded-lg cursor-pointer ${
                    selectedCredit === "1000000"
                      ? "border-2 border-solid border-blue"
                      : "border-none"
                  }`}
                  onClick={() => setSelectedcredit("1000000")}
                >
                  <span className="text-xl 2xl:text-2xl text-blue">
                    &#8377;1,000,000
                  </span>
                </div>
              </div>
              <div className="flex flex-row mt-12 ml-[-20px] justify-center relative text-xl font-bold">
                or
              </div>
              <div className="block mt-10">
                <span className="text-xl 2xl:text-2xl text-blue p-3 mb-[-15px]">
                  &#8377;
                </span>
                <input
                  type="number"
                  className="w-[575px] h-[50px] font-Poppins text-lg 2xl:text-xl text-blue border-1 border-solid outline-none border-blue placeholder-blue bg-white border-x-0 border-t-0"
                  placeholder="Credit Limit"
                  value={selectedCredit}
                  onChange={(e) => setSelectedcredit(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-full block bg-white  absolute bottom-0 right-0 overflow-hidden">
            <Divider className="bg-blue mr-auto mt-0" />
            <div className="flex justify-end pb-2">
              <button
                className=" bg-white text-blue border-solid border-1 border-aliceblue rounded-xl w-[150px] h-[55px] mx-1 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-lightBlue"
                onClick={onClose}
              >
                <span className="2xl:text-lg text-base font-bold">CANCEL</span>
              </button>
              <button
                className=" bg-blue text-white border-solid border-1 border-lightBlue rounded-xl w-[150px] h-[55px] mr-5 ml-2 bottom-1 cursor-pointer transition duration-300 ease-in-out hover:bg-darkBlue"
                onClick={handleCredits}
              >
                <span className="2xl:text-lg text-base font-bold">NEXT</span>
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
      <footer className="bottom-0 absolute right-0 2xl:left-[226px] left-[198px] ">
        <Footer/>
      </footer>
    </>
  );
};

export default PendingCustomer;
