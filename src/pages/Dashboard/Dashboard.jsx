import React from "react";
import Sidebar from "../../components/Sidebar";
import Chart from "react-apexcharts";
import "./dashboard.css";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
const HospitalHome = () => {
    const [loans, setLoans] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [dashboardData, setDashboardData] = React.useState(null);
    const [datePicker, setDatePicker] = React.useState(false);
    const [status , setStats] = React.useState("")
    const currentDate = new Date();
    const [startDate, setStartDate] = React.useState(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    const [endDate, setEndDate] = React.useState(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    );
    const backendFormatDate = (dateStr) => {
      const dateObj = new Date(dateStr);
      dateObj.setUTCHours(dateObj.getUTCHours() + 5);
      dateObj.setUTCMinutes(dateObj.getUTCMinutes() + 30);
      const year = dateObj.getUTCFullYear();
      const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getUTCDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    const fetchLoans = async () => {
      const response = await fetch("http://localhost:8000/Lenders/aproovals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    });

    const json = await response.json();
    setStats(json.status)
    if (json.status === "Success") {
      setLoans(json.data.transactions);
      // console.log("hello json", json.data.transactions);
    } else {
      // alert("Data not found");
      console.log("Data not found");
    }
    };
    React.useEffect(() => {
      if (startDate && endDate) {
        setDatePicker(false);
      }
      setLoading(true);
      fetchLoans();
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/Lenders/dashboard?startDate=${backendFormatDate(
              startDate
            )}&endDate=${backendFormatDate(endDate)}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              withCredentials: "include",
            }
          );

          const data = response.data;
          console.log(data);
          setDashboardData(data.data);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, [startDate, endDate]);
  return (
    <>
      <div className="flex w-full relative">
        <div className="fixed top-0 bottom-0">
          <Sidebar />
        </div>
        <div className="container mt-[50px] px-2 ml-[250px]">
          <div className="flex flex-row justify-between">
            <div className="flex ml-10 text-black">
              <span className="text-3xl font-bold">
                {/* {dashboardData ? dashboardData.hospitalName : ""} */}
                XYZ Hospital
              </span>
            </div>
            <div className="flex justify-start items-center mr-10">
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
              <div className="flex w-[50%] h-[37px] justify-evenly rounded-r-lg items-center bg-blue text-white">
                  <div className="flex">
                    <img src={require("../../image/logout.png")} className="w-[20px]" alt="logout" />
                  </div>
                  <div className="flex mr-5">Logout</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-box justify-self-center ">
            <div className="box bg-lightBlue w-[23vw] border-solid border-1 border-aliceblue rounded-2xl">
              <div className="flex flex-row w-full h-full justify-start items-center ">
                <div className="flex justify-center items-center border-1 bg-white w-[105px] h-[105px] rounded-2xl mx-5">
                  <span className="">
                    <img
                      className="w-[34px] h-[34px]"
                      src={require("./sales.png")}
                      alt="sales"
                    />
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-2xl">Today's Sanctioned</span>
                  <span className="font-bold text-4xl text-left">
                    ₹
                    {/* 5000 */}
                    {dashboardData ? dashboardData.todaysSanctioned : 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="box bg-lightBlue w-[23vw] gap-2 border-solid border-1 border-aliceblue rounded-2xl">
              <div className="flex flex-row w-full h-full justify-start items-center">
                <div className="flex justify-center items-center border-1 bg-white w-[105px] h-[105px] rounded-2xl mx-5">
                  <span className="">
                    <img
                      className="w-[34px] h-[34px]"
                      src={require("./settlements.png")}
                      alt="sales"
                    />
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-2xl">Today's Settlements</span>
                  <span className="font-bold text-4xl text-left">
                    ₹
                    {/* 5000 */}
                    {dashboardData ? dashboardData.todaysSettlements : 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="box bg-lightBlue w-[32vw] border-solid border-1 border-aliceblue rounded-2xl">
              <div className="flex flex-row w-full ml-4 mt-7 justify-start items-center">
                <div className="flex flex-col">
                  <div className="block text-xl font-semibold">
                    Cash Settlements
                  </div>
                </div>
              </div>
              {(dashboardData && dashboardData.totalSanctioned === 0)  ? (
               <div className="mt-10 w-full flex justify-center items-center relative">
                <div className="text-center">
                  <Chart
                    type="donut"
                    width={700}
                    height={580}
                    series={[100]}
                    options={{
                      labels: ["Unsettled Amount", "Settled Amount"],
                      colors: ["#fff", "#fff"],
                      dataLabels: {
                        enabled: false,
                      },
                      legend: {
                        show: true,
                        position: "bottom",
                        horizontalAlign: "center",
                        fontSize: "16px",
                        fontFamily: "Arial",
                        markers: {
                          fillColors: ["#FF7B7B", "#306FC7"],
                        },
                      },
                    }}
                  />
                  <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-lg font-bold">
                      Total Settled Amount
                    </span>
                    <span className="text-4xl font-semibold">
                      ₹
                      <span>
                        {/* 5000 */}
                        {dashboardData ? dashboardData.totalSettlements : 0}
                       </span>
                    </span>
                    <span className="text-base">
                      Unsettled Amount - ₹
                      <span>
                         {dashboardData
                            ? dashboardData.totalRevenue -
                              dashboardData.totalSettlements
                            : 0}
                       </span>
                    </span>
                  </div>
                </div>
              </div>
               ) : ( !loading && 
              <div className="mt-10 w-full flex justify-center items-center relative">
                <div className="text-center">
                  <Chart
                    type="donut"
                    width={700}
                    height={580}
                    series={[
                      dashboardData
                        ? dashboardData.totalSanctioned -
                          dashboardData.totalSettlements
                        : 50,
                      dashboardData ? dashboardData.totalSettlements : 50,
                      // 67, 33,
                    ]}
                    options={{
                      labels: ["Unsettled Amount", "Settled Amount"],
                      colors: ["#FF7B7B", "#306FC7"],
                      dataLabels: {
                        enabled: false,
                      },

                      legend: {
                        show: true,
                        position: "bottom",
                        horizontalAlign: "center",
                        fontSize: "16px",
                        fontFamily: "Arial",
                        markers: {
                          fillColors: ["#FF7B7B", "#306FC7"],
                        },
                      },
                      tooltip: {
                        enabled: false,
                      },
                    }}
                  />
                  <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-lg font-bold">
                      Total Settled Amount
                    </span>
                    <span className="text-4xl font-semibold">
                      ₹
                      <span>
                        {/* 50000 */}
                        {dashboardData ? dashboardData.totalSettlements : 0}
                      </span>
                    </span>
                    <span className="text-base">
                      Unsettled Amount - ₹
                      <span>
                        {/* 50000 */}
                        {dashboardData
                            ? dashboardData.totalSanctioned -
                              dashboardData.totalSettlements
                            : 0}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
               )}
            </div>
            <div className="box bg-lightBlue w-[48.5vw] border-solid border-1 border-aliceblue rounded-2xl relative">
              <div className="flex flex-row ml-10 mt-7 justify-start items-center">
                <div className="flex flex-col">
                  <div className="block text-xl text-left font-semibold">
                    Summary
                  </div>
                  <div
                    className="block text-left "
                    onClick={() => setDatePicker(true)}
                  >
                    <span>
                      {startDate &&
                        endDate &&
                        `${new Date(
                          startDate
                        ).toLocaleDateString()} - ${new Date(
                          endDate
                        ).toLocaleDateString()}\t\t`}
                    </span>
                    {!datePicker && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      className="ml-2"
                    >
                      <path
                        id="Vector"
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    )} 
                  </div>
                  {datePicker && (
                    <div className="flex flex-row absolute top-0 left-[200px] w-full h-full z-10 ">
                      <div className="flex flex-col ml-5 mt-4">
                        <span className="text-lg font-bold mb-2">
                          Start Date:
                        </span>
                        <DatePicker
                          selected={
                            startDate
                              ? moment(startDate, "YYYY-MM-DD").toDate()
                              : null
                          }
                          onChange={(date) => setStartDate(date)}
                          dateFormat="dd/MM/yy"
                          placeholderText="Select start date"
                          className="border-1 border-solid border-aliceblue rounded-md p-2"
                        />
                      </div>
                      <div className="flex flex-col ml-5 mt-4">
                        <span className="text-lg font-bold mb-2">
                          End Date:
                        </span>
                        <DatePicker
                          selected={
                            endDate
                              ? moment(endDate, "YYYY-MM-DD").toDate()
                              : null
                          }
                          onChange={(date) => setEndDate(date)}
                          dateFormat="dd/MM/yyyy"
                          placeholderText="Select end date"
                          className="border-1 border-solid border-aliceblue rounded-md p-2"
                        />
                      </div>
                    </div>
                        )}
                </div>
              </div>
              <div className="grid w-[90%] h-[440px] p-8  grid-cols-2 gap-7">
                <div className="text w-[21vw] h-[200px] bg-white border-solid border-1 border-aliceblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch">
                        <span className=" text-lg font-normal">
                          Total Sanctioned
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                        {/* ₹50000 */}
                          ₹{dashboardData ? dashboardData.totalSanctioned : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text w-[21vw] h-[200px] bg-white border-solid border-1 border-aliceblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch">
                        <span className=" text-lg font-normal">
                          Total Settlements
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                          {/* ₹50000 */}
                          ₹{dashboardData ? dashboardData.totalSettlements : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text w-[21vw] h-[200px] text-black bg-white border-solid border-1 border-aliceblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch ml-3">
                        <span className=" text-lg font-normal">
                          Total Loans
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                          54
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text w-[21vw] h-[200px] text-black bg-white border-solid border-1 border-aliceblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch">
                        <span className=" text-lg font-normal">
                          Total Repayments
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                          {/* ₹50000 */}
                          ₹{dashboardData ? dashboardData.totalUnsettled : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="mt-[-50px]">
              <tr
                className={`border-solid w-[79vw] h-[50px] px-7 ml-8 text-xl border-1 border-aliceblue bg-lightBlue rounded-lg mt-4 shimmer`}
              >
                <td colSpan="8"></td>
              </tr>
              <tr
                className={`border-solid w-[79vw] px-7 ml-8 text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4 shimmer`}
              >
                <td colSpan="8"></td>
              </tr>
            </div>
          ) : (
          // 
          <div className="flex w-[80vww] justify-center px-7">
            <table cellSpacing="0" className="w-full mt-4">
              <tbody className="border-solid text-xl border-1 border-aliceblue bg-white rounded-lg">
              {/* {allLoans.length > 0 ? (
                  allLoans.map((transactions) => (
                <> */}
                <tr className=" first-row border-solid text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                <td className="pl-4 w-[30px]">
                    <img src={require("./status.png")} alt="status" />
                  </td>
                  <td className="pl-4 w-[150px]">Loan ID</td>
                  <td className="w-[200px]">Name</td>
                  <td className="pl-4 w-[140px]">Phone No</td>
                  <td className="pl-4 w-[140px]">Tenure</td>
                  <td className="pl-4 w-[150px]">Amount</td>
                  <td className="pl-4 w-[150px]">Date</td>
                  <td className="pr-4 w-[100px]">Status</td>
                </tr>
                {loans && (
                  loans.slice(-2).map((transactions) => (
                <>
                <tr className=" text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-5">
                  <td className="pl-4 w-[30px]">
                    <img src={require("./processing.png")} alt="processing" />
                  </td>
                  <td className="text-aliceblue pl-4 w-[150px]"> {transactions.trnId}</td>
                  <td className="w-[200px]">{transactions.customerId.name}</td>
                  <td className="pl-4 w-[140px]">{transactions.customerId.phone}</td>
                  <td className=" pl-4 w-[140px]">{transactions.tenure}{status === "Success"? " months": " " }</td>
                  {/* <td className="text-center h-[50px] w-[230px]"> transactions.tenure === " " ? " ": 
                    <div className="ml-10 block text-xl text-blue text-center border-solid border-1 border-blue bg-lightBlue rounded-2xl h-[40px]">
                      Kidney Surgery
                    </div>
                  </td> */}
                  <td className="pl-4 w-[150px]">₹{transactions.treatmentCost}</td>
                  <td className="pl-4 w-[150px]">{transactions.date}</td>
                  <td
                        className={
                          transactions.lenderStatus === true
                            ? "text-green pr-4 w-[100px]"
                            : "text-red pr-4 w-[100px]"
                        }
                      >
                        {transactions.lenderStatus === true ? "Settled" : "Pending"}
                      </td>             
                </tr>
              
                </> ))
                  )}
              </tbody>
            </table>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default HospitalHome;
