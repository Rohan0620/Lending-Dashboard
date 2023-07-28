import React from "react";
import Sidebar from "../../components/Sidebar";
import Chart from "react-apexcharts";
import "./dashboard.css";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
const HospitalHome = () => {
  //   const [transactions, setTransactions] = React.useState(null);
  //   const [loading, setLoading] = React.useState(false);
  //   const [dashboardData, setDashboardData] = React.useState(null);
  //   const [datePicker, setDatePicker] = React.useState(false);
  //   const currentDate = new Date();
  //   const [startDate, setStartDate] = React.useState(
  //     new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  //   );
  //   const [endDate, setEndDate] = React.useState(
  //     new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  //   );
  //   const backendFormatDate = (dateStr) => {
  //     const dateObj = new Date(dateStr);
  //     dateObj.setUTCHours(dateObj.getUTCHours() + 5);
  //     dateObj.setUTCMinutes(dateObj.getUTCMinutes() + 30);
  //     const year = dateObj.getUTCFullYear();
  //     const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  //     const day = String(dateObj.getUTCDate()).padStart(2, "0");

  //     return `${year}-${month}-${day}`;
  //   };
  //   const fetchTransactions = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8000/Hospitals/gettransactions",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           withCredentials: "include",
  //         }
  //       );

  //       const data = response.data;
  //       setTransactions(data.data);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   React.useEffect(() => {
  //     if (startDate && endDate) {
  //       setDatePicker(false);
  //     }
  //     setLoading(true);
  //     fetchTransactions();
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8000/Hospitals/dashboard?startDate=${backendFormatDate(
  //             startDate
  //           )}&endDate=${backendFormatDate(endDate)}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //             withCredentials: "include",
  //           }
  //         );

  //         const data = response.data;
  //         console.log(data);
  //         setDashboardData(data.data);
  //         setLoading(false);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     fetchData();
  //   }, [startDate, endDate]);
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
                <div className="flex w-[50%] justify-evenly rounded-r-lg items-center bg-aliceblue text-white">
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
                    ₹5000
                    {/* {dashboardData ? dashboardData.todaysRevenue : 0} */}
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
                    ₹5000
                    {/* {dashboardData ? dashboardData.todaysSettlemments : 0} */}
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
              {/* {(dashboardData && dashboardData.totalRevenue === 0)  ? ( */}
              {/* <div className="mt-10 w-full flex justify-center items-center relative">
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
                        5000
                        {/* {dashboardData ? dashboardData.totalSettlements : 0} */}
                      {/* </span>
                    </span>
                    <span className="text-base">
                      Unsettled Amount - ₹
                      <span>
                        5000 */}
                        {/* {dashboardData
                            ? dashboardData.totalRevenue -
                              dashboardData.totalSettlements
                            : 0} */}
                      {/* </span>
                    </span>
                  </div>
                </div>
              </div> */} 
              {/* ) : ( !loading && */}
              <div className="mt-10 w-full flex justify-center items-center relative">
                <div className="text-center">
                  <Chart
                    type="donut"
                    width={700}
                    height={580}
                    series={[
                      // dashboardData
                      //   ? dashboardData.totalRevenue -
                      //     dashboardData.totalSettlements
                      //   : 50,
                      // dashboardData ? dashboardData.totalSettlements : 50,
                      67, 33,
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
                        50000
                        {/* {dashboardData ? dashboardData.totalSettlements : 0} */}
                      </span>
                    </span>
                    <span className="text-base">
                      Unsettled Amount - ₹
                      <span>
                        50000
                        {/* {dashboardData
                            ? dashboardData.totalRevenue -
                              dashboardData.totalSettlements
                            : 0} */}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {/* )} */}
            </div>
            <div className="box bg-lightBlue w-[48.5vw] border-solid border-1 border-aliceblue rounded-2xl relative">
              <div className="flex flex-row ml-10 mt-7 justify-start items-center">
                <div className="flex flex-col">
                  <div className="block text-xl text-left font-semibold">
                    Summary
                  </div>
                  <div
                    className="block text-left "
                    // onClick={() => setDatePicker(true)}
                  >
                    <span>
                      {/* {startDate &&
                        endDate &&
                        `${new Date(
                          startDate
                        ).toLocaleDateString()} - ${new Date(
                          endDate
                        ).toLocaleDateString()}\t\t`} */}
                      01/01/2023 - 31/12/2023
                    </span>
                    {/* {!datePicker && ( */}
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
                    {/* )} */}
                  </div>
                  {/* {datePicker && (
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
                        )} */}
                </div>
              </div>
              <div className="grid w-[90%] h-[440px] p-8  grid-cols-2 gap-7">
                <div className="text w-[21vw] h-[200px] bg-lightBlue border-solid border-1 border-aliceblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch">
                        <span className=" text-lg font-normal">
                          Total Sanctioned
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                        ₹50000
                          {/* ₹{dashboardData ? dashboardData.totalRevenue : 0} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text w-[21vw] h-[200px] bg-lightBlue border-solid border-1 border-aliceblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch">
                        <span className=" text-lg font-normal">
                          Total Settlements
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                          ₹50000
                          {/* ₹{dashboardData ? dashboardData.totalSettlements : 0}
                           */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text w-[21vw] h-[200px] text-white bg-aliceblue border-solid border-2 border-softblue rounded-2xl">
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
                <div className="text w-[21vw] h-[200px] text-white bg-aliceblue border-solid border-2 border-softblue rounded-2xl">
                  <div className="flex flex-row w-full h-full">
                    <div className="flex w-[50%] justify-center items-center">
                      <div className="flex flex-col justify-start items-stretch">
                        <span className=" text-lg font-normal">
                          Total Repayments
                        </span>
                        <span className="text-4xl text-left font-semibold mt-7">
                          ₹50000
                          {/* {dashboardData ? dashboardData.totalTreatments : 0} */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {loading ? (
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
          ) : ( */}
          <div className="flex px-7">
          <table cellSpacing="0" className="w-full">
                <thead>
                  <tr className="border-solid text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                    <td className="pl-4 w-[30px]">
                      <img src={require("./status.png")} alt="status" />
                    </td>
                    <td className="pl-4 w-[150px]">Loan ID</td>
                    <td className="w-[200px]">Name</td>
                    <td className="pl-4 w-[140px]">Phone No</td>
                    <td className="pl-6 w-[150px]">Amount</td>
                    <td className="pl-4 w-[150px]">Tenure</td>
                    <td className="pl-4 w-[140px]">Date</td>
                    <td className="pr-4 w-[100px]">Status</td>
                  </tr>
                </thead>
                <tbody className="border-solid text-xl border-1 border-aliceblue bg-white rounded-lg">
                      <tr
                        className="text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-3">
                          <td className="pl-3 w-[30px]">
                            <img
                              src={require("./completed.png")}
                              alt="completed"
                            />
                          </td>
                        <td className="text-aliceblue pl-4 w-[150px]">
                        #1256784542
                        </td>
                        <td className="pl-4 w-[200px]">
                          John Doe
                        </td>
                        <td className="pl-4 w-[140px]">
                        9874563210
                        </td>
                        <td className="pl-4 w-[150px]">
                        ₹50000
                        </td>
                        <td className="pl-4 w-[150px] ">
                        3 months
                        </td>
                        <td className="pl-4 w-[150px]">
                          <span>Jul 26 2023</span>
                        </td>
                          <td className="text-red pr-6 w-[80px]">
                            Pending
                          </td>
                      </tr>
                      <tr
                        className="text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4">
                          <td className="pl-3 w-[30px]">
                            <img
                              src={require("./completed.png")}
                              alt="completed"
                            />
                          </td>
                        <td className="text-aliceblue pl-4 w-[150px]">
                        #1256784542
                        </td>
                        <td className="pl-4 w-[200px]">
                          John Doe
                        </td>
                        <td className="pl-4 w-[140px]">
                        9874563210
                        </td>
                        <td className="pl-4 w-[150px]">
                        ₹50000
                        </td>
                        <td className="pl-4 w-[150px]">
                        3 months
                        </td>
                        <td className="pl-4 w-[150px]">
                          <span>Jul 26 2023</span>
                        </td>
                          <td className="text-yellowgreen pr-6 w-[80px]">
                            Settled
                          </td>
                      </tr>
                      <tr
                        className="text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4">
                          <td className="pl-3 w-[30px]">
                            <img
                              src={require("./completed.png")}
                              alt="completed"
                            />
                          </td>
                        <td className="text-aliceblue pl-4 w-[150px]">
                        #1256784542
                        </td>
                        <td className="pl-4 w-[200px]">
                          John Doe
                        </td>
                        <td className="pl-4 w-[140px]">
                        9874563210
                        </td>
                        <td className="pl-4 w-[150px]">
                        ₹50000
                        </td>
                        <td className="pl-4 w-[150px]">
                        3 months
                        </td>
                        <td className="pl-4 w-[150px]">
                          <span>Jul 26 2023</span>
                        </td>
                          <td className="text-yellowgreen pr-6 w-[80px]">
                            Settled
                          </td>
                      </tr>
                </tbody>
              </table>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default HospitalHome;
