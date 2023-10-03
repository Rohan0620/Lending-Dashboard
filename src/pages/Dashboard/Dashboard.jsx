// import React from "react";
// import Sidebar from "../../components/Sidebar";
// import Chart from "react-apexcharts";
// import "./dashboard.css";
// import axios from "axios";
// import { DatePicker } from "antd";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// const HospitalHome = () => {
//   const [loans, setLoans] = React.useState(null);
//   const [loading, setLoading] = React.useState(false);
//   const [dashboardData, setDashboardData] = React.useState(null);
//   const [datePicker, setDatePicker] = React.useState(false);
//   const [status, setStats] = React.useState("");
//   let navigate = useNavigate()
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
//   const fetchLoans = async () => {
//     const response = await fetch("http://localhost:8000/Lenders/aproovals", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       withCredentials: true,
//     });

//     const json = await response.json();
//     setStats(json.status);
//     if (json.status === "Success") {
//       setLoans(json.data.transactions);
//       // console.log("hello json", json.data.transactions);
//     } else {
//       // alert("Data not found");
//       console.log("Data not found");
//     }
//   };
//   React.useEffect(() => {
//     if (startDate && endDate) {
//       setDatePicker(false);
//     }
//     setLoading(true);
//     fetchLoans();
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/Lenders/dashboard?startDate=${backendFormatDate(
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
//   return (
//     <>
//       <div className="flex w-full relative">
//         <div className="fixed top-0 bottom-0">
//           <Sidebar />
//         </div>
//         <div className="container mt-[50px] px-2 ml-[250px]">
//           <div className="flex flex-row justify-between">
//             <div className="flex ml-10 text-black">
//               <span className="text-3xl font-bold">
//                 {/* {dashboardData ? dashboardData.hospitalName : ""} */}
//                 XYZ Hospital
//               </span>
//             </div>
//             <div className="flex justify-start items-center mr-10">
//               <div className="flex text-lg border-solid border-transparent  w-[258px] h-[37px] ">
//                 <div className="flex w-[50%] h-[37px] text-lg justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer"
//                 onClick={()=>{
//                   navigate("/settings")
//                   sessionStorage.setItem("selectedSettingTab","profile")
//                 }}>
//                   <div className="flex">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="28"
//                       height="28"
//                       viewBox="0 0 28 28"
//                       fill="none"
//                     >
//                       <g clipPath="url(#clip0_305_165)">
//                         <path
//                           d="M13.9999 12.8333C16.5772 12.8333 18.6666 10.744 18.6666 8.16667C18.6666 5.58934 16.5772 3.5 13.9999 3.5C11.4226 3.5 9.33325 5.58934 9.33325 8.16667C9.33325 10.744 11.4226 12.8333 13.9999 12.8333Z"
//                           stroke="white"
//                           strokeWidth="1.75"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                         <path
//                           d="M7 24.5V22.1667C7 20.929 7.49167 19.742 8.36683 18.8668C9.242 17.9917 10.429 17.5 11.6667 17.5H16.3333C17.571 17.5 18.758 17.9917 19.6332 18.8668C20.5083 19.742 21 20.929 21 22.1667V24.5"
//                           stroke="white"
//                           strokeWidth="1.75"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </g>
//                       <defs>
//                         <clipPath id="clip0_305_165">
//                           <rect width="28" height="28" fill="white" />
//                         </clipPath>
//                       </defs>
//                     </svg>
//                   </div>
//                   <div className="flex mr-6">Profile</div>
//                 </div>
//                 <div className="flex w-[50%] h-[37px] justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer"
//                 onClick={()=>{
//                   navigate("/login")
//                   localStorage.setItem("token","")
//                 }}>
//                   <div className="flex">
//                     <img
//                       src={require("../../image/logout.png")}
//                       className="w-[20px]"
//                       alt="logout"
//                     />
//                   </div>
//                   <div className="flex mr-5">Logout</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="grid-box justify-self-center ">
//             <div className="box bg-lightBlue w-[23vw] border-solid border-1 border-aliceblue rounded-2xl">
//               <div className="flex flex-row w-full h-full justify-start items-center ">
//                 <div className="flex justify-center items-center border-1 bg-white w-[105px] h-[105px] rounded-2xl mx-5">
//                   <span className="">
//                     <img
//                       className="w-[34px] h-[34px]"
//                       src={require("./sales.png")}
//                       alt="sales"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex flex-col justify-start">
//                   <span className="text-2xl">Today's Sanctioned</span>
//                   <span className="font-bold text-4xl text-left">
//                     ₹{/* 5000 */}
//                     {dashboardData ? dashboardData.todaysSanctioned : 0}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="box bg-lightBlue w-[23vw] gap-2 border-solid border-1 border-aliceblue rounded-2xl">
//               <div className="flex flex-row w-full h-full justify-start items-center">
//                 <div className="flex justify-center items-center border-1 bg-white w-[105px] h-[105px] rounded-2xl mx-5">
//                   <span className="">
//                     <img
//                       className="w-[34px] h-[34px]"
//                       src={require("./settlements.png")}
//                       alt="sales"
//                     />
//                   </span>
//                 </div>
//                 <div className="flex flex-col justify-start">
//                   <span className="text-2xl">Today's Settlements</span>
//                   <span className="font-bold text-4xl text-left">
//                     ₹{/* 5000 */}
//                     {dashboardData ? dashboardData.todaysSettlements : 0}
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="box bg-lightBlue w-[32vw] border-solid border-1 border-aliceblue rounded-2xl">
//               <div className="flex flex-row w-full ml-4 mt-7 justify-start items-center">
//                 <div className="flex flex-col">
//                   <div className="block text-xl font-semibold">
//                     Cash Settlements
//                   </div>
//                 </div>
//               </div>
//               {dashboardData && dashboardData.totalSanctioned === 0 ? (
//                 <div className="mt-10 w-full flex justify-center items-center relative">
//                   <div className="text-center">
//                     <Chart
//                       type="donut"
//                       width={700}
//                       height={580}
//                       series={[100]}
//                       options={{
//                         labels: ["Unsettled Amount", "Settled Amount"],
//                         colors: ["#fff", "#fff"],
//                         dataLabels: {
//                           enabled: false,
//                         },
//                         legend: {
//                           show: true,
//                           position: "bottom",
//                           horizontalAlign: "center",
//                           fontSize: "16px",
//                           fontFamily: "Arial",
//                           markers: {
//                             fillColors: ["#FF7B7B", "#306FC7"],
//                           },
//                         },
//                       }}
//                     />
//                     <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                       <span className="text-lg font-bold">
//                         Total Settled Amount
//                       </span>
//                       <span className="text-4xl font-semibold">
//                         ₹
//                         <span>
//                           {/* 5000 */}
//                           {dashboardData ? dashboardData.totalSettlements : 0}
//                         </span>
//                       </span>
//                       <span className="text-base">
//                         Unsettled Amount - ₹
//                         <span>
//                           {dashboardData
//                             ? dashboardData.totalRevenue -
//                               dashboardData.totalSettlements
//                             : 0}
//                         </span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 !loading && (
//                   <div className="mt-10 w-full flex flex-col justify-center items-center relative">
//                     <div className="text-center relative mb-[40px]">
//                       <Chart
//                         type="donut"
//                         width={700}
//                         height={520}
//                         series={[
//                           dashboardData
//                             ? dashboardData.totalSanctioned -
//                               dashboardData.totalSettlements
//                             : 50,
//                           dashboardData ? dashboardData.totalSettlements : 50,
//                         ]}
//                         options={{
//                           labels: ["Unsettled Amount", "Settled Amount"],
//                           colors: ["#FF7B7B", "#306FC7"],
//                           dataLabels: {
//                             enabled: false,
//                           },

//                           legend: {
//                             show: false,
//                           },
//                           tooltip: {
//                             enabled: false,
//                           },
//                         }}
//                       />
//                       <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                         <span className="text-lg font-bold">
//                           Total Settled Amount
//                         </span>
//                         <span className="text-4xl font-semibold">
//                           ₹
//                           <span>
//                             {/* 50000 */}
//                             {dashboardData ? dashboardData.totalSettlements : 0}
//                           </span>
//                         </span>
//                         <span className="text-base">
//                           Unsettled Amount - ₹
//                           <span>
//                             {/* 50000 */}
//                             {dashboardData
//                               ? dashboardData.totalSanctioned -
//                                 dashboardData.totalSettlements
//                               : 0}
//                           </span>
//                         </span>
//                       </div>
//                     </div>
//                     <div className="flex justify-center pt-6">
//                         <div className="text-center">
//                           <div className="flex justify-center mt-3 text-2xl">
//                             <span className="mr-3 text-[70px]" style={{ color: "#FF7B7B" }}>
//                               •
//                             </span>
//                             <span className="mr-3 mt-9">Unsettled Amount</span>
//                             <span className="ml-3 text-[70px]" style={{ color: "#306FC7" }}>
//                               •
//                             </span>
//                             <span className="ml-3 mt-9">Settled Amount</span>
//                           </div>
//                           <div className="flex justify-center mt-1"></div>
//                         </div>
//                       </div>
//                   </div>
                  
//                 )
//               )}
//             </div>
//             <div className="box bg-lightBlue w-[48.5vw] border-solid border-1 border-aliceblue rounded-2xl relative">
//               <div className="flex flex-row ml-10 mt-7 justify-start items-center">
//                 <div className="flex flex-col">
//                   <div className="block text-xl text-left font-semibold">
//                     Summary
//                   </div>
//                   <div
//                     className="block text-left "
//                     onClick={() => setDatePicker(true)}
//                   >
//                     <span>
//                       {startDate &&
//                         endDate &&
//                         `${new Date(
//                           startDate
//                         ).toLocaleDateString()} - ${new Date(
//                           endDate
//                         ).toLocaleDateString()}\t\t`}
//                     </span>
//                     {!datePicker && (
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="12"
//                         height="8"
//                         viewBox="0 0 12 8"
//                         fill="none"
//                         className="ml-2"
//                       >
//                         <path
//                           id="Vector"
//                           d="M1 1.5L6 6.5L11 1.5"
//                           stroke="black"
//                           stroke-width="1.5"
//                           stroke-linecap="round"
//                           stroke-linejoin="round"
//                         />
//                       </svg>
//                     )}
//                   </div>
//                   {datePicker && (
//                     <div className="flex flex-row absolute top-0 left-[200px] w-full h-full z-10 ">
//                       <div className="flex flex-col ml-5 mt-4">
//                         <span className="text-lg font-bold mb-2">
//                           Start Date:
//                         </span>
//                         <DatePicker
//                           selected={
//                             startDate
//                               ? moment(startDate, "YYYY-MM-DD").toDate()
//                               : null
//                           }
//                           onChange={(date) => setStartDate(date)}
//                           dateFormat="dd/MM/yy"
//                           placeholderText="Select start date"
//                           className="border-1 border-solid border-aliceblue rounded-md p-2"
//                         />
//                       </div>
//                       <div className="flex flex-col ml-5 mt-4">
//                         <span className="text-lg font-bold mb-2">
//                           End Date:
//                         </span>
//                         <DatePicker
//                           selected={
//                             endDate
//                               ? moment(endDate, "YYYY-MM-DD").toDate()
//                               : null
//                           }
//                           onChange={(date) => setEndDate(date)}
//                           dateFormat="dd/MM/yyyy"
//                           placeholderText="Select end date"
//                           className="border-1 border-solid border-aliceblue rounded-md p-2"
//                         />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid w-[90%] h-[440px] p-8  grid-cols-2 gap-7">
//                 <div className="text w-[21vw] h-[200px] bg-white border-solid border-1 border-aliceblue rounded-2xl">
//                   <div className="flex flex-row w-full h-full">
//                     <div className="flex w-[50%] justify-center items-center">
//                       <div className="flex flex-col justify-start items-stretch">
//                         <span className=" text-lg font-normal">
//                           Total Sanctioned
//                         </span>
//                         <span className="text-4xl text-left font-semibold mt-7">
//                           {/* ₹50000 */}₹
//                           {dashboardData ? dashboardData.totalSanctioned : 0}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text w-[21vw] h-[200px] bg-white border-solid border-1 border-aliceblue rounded-2xl">
//                   <div className="flex flex-row w-full h-full">
//                     <div className="flex w-[50%] justify-center items-center">
//                       <div className="flex flex-col justify-start items-stretch">
//                         <span className=" text-lg font-normal">
//                           Total Settlements
//                         </span>
//                         <span className="text-4xl text-left font-semibold mt-7">
//                           {/* ₹50000 */}₹
//                           {dashboardData ? dashboardData.totalSettlements : 0}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text w-[21vw] h-[200px] text-black bg-white border-solid border-1 border-aliceblue rounded-2xl">
//                   <div className="flex flex-row w-full h-full">
//                     <div className="flex w-[50%] justify-center items-center ml-[-20px]">
//                       <div className="flex flex-col justify-start items-stretch">
//                         <span className=" text-lg font-normal text-left">
//                           Total Loans
//                         </span>
//                         <span className="text-4xl text-left font-semibold mt-7">
//                           {loans ? loans.length : 0}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text w-[21vw] h-[200px] text-black bg-white border-solid border-1 border-aliceblue rounded-2xl">
//                   <div className="flex flex-row w-full h-full">
//                     <div className="flex w-[50%] justify-center items-center">
//                       <div className="flex flex-col justify-start items-stretch">
//                         <span className=" text-lg font-normal">
//                           Total Repayments
//                         </span>
//                         <span className="text-4xl text-left font-semibold mt-7">
//                           {/* ₹50000 */}₹
//                           {dashboardData ? dashboardData.totalUnsettled : 0}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {loading ? (
//             <div className="mt-[-50px]">
//               <tr
//                 className={`border-solid w-[79vw] h-[50px] px-7 ml-8 text-xl border-1 border-aliceblue bg-lightBlue rounded-lg mt-4 shimmer`}
//               >
//                 <td colSpan="8"></td>
//               </tr>
//               <tr
//                 className={`border-solid w-[79vw] px-7 ml-8 text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-4 shimmer`}
//               >
//                 <td colSpan="8"></td>
//               </tr>
//             </div>
//           ) : (
//             //
//             <div className="flex w-[80vww] justify-center px-7">
//               <table cellSpacing="0" className="w-full mt-4">
//                 <tbody className="border-solid text-xl border-1 border-aliceblue bg-white rounded-lg">
//                   {/* {allLoans.length > 0 ? (
//                   allLoans.map((transactions) => (
//                 <> */}
//                   <tr className=" first-row border-solid text-xl border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
//                     <td className="pl-4 w-[30px]">
//                       <img src={require("./status.png")} alt="status" />
//                     </td>
//                     <td className="pl-4 w-[150px]">Loan ID</td>
//                     <td className="w-[200px]">Name</td>
//                     <td className="pl-4 w-[140px]">Phone No</td>
//                     <td className="pl-4 w-[140px]">Tenure</td>
//                     <td className="pl-4 w-[150px]">Amount</td>
//                     <td className="pl-4 w-[150px]">Date</td>
//                     <td className="pr-4 w-[100px]">Status</td>
//                   </tr>
//                   {loans &&
//                     loans.slice(-2).map((transactions) => (
//                       <>
//                         <tr className=" text-xl border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] mt-5">
//                           <td className="pl-4 w-[30px]">
//                             <img
//                               src={require("./processing.png")}
//                               alt="processing"
//                             />
//                           </td>
//                           <td className="text-aliceblue pl-4 w-[150px]">
//                             {" "}
//                             {transactions.trnId}
//                           </td>
//                           <td className="w-[200px]">
//                             {transactions.customerId.name}
//                           </td>
//                           <td className="pl-4 w-[140px]">
//                             {transactions.customerId.phone}
//                           </td>
//                           <td className=" pl-4 w-[140px]">
//                             {transactions.tenure}
//                             {status === "Success" ? " months" : " "}
//                           </td>
//                           {/* <td className="text-center h-[50px] w-[230px]"> transactions.tenure === " " ? " ": 
//                     <div className="ml-10 block text-xl text-blue text-center border-solid border-1 border-blue bg-lightBlue rounded-2xl h-[40px]">
//                       Kidney Surgery
//                     </div>
//                   </td> */}
//                           <td className="pl-4 w-[150px]">
//                             ₹{transactions.treatmentCost}
//                           </td>
//                           <td className="pl-4 w-[150px]">
//                           {new Date(transactions.date).toLocaleDateString(
//                             "en-GB",
//                             {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             }
//                           )}
//                           </td>
//                           <td
//                             className={
//                               transactions.lenderStatus === true
//                                 ? "text-green pr-4 w-[100px]"
//                                 : "text-red pr-4 w-[100px]"
//                             }
//                           >
//                             {transactions.lenderStatus === true
//                               ? "Settled"
//                               : "Pending"}
//                           </td>
//                         </tr>
//                       </>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default HospitalHome;

import React from "react";
import Sidebar from "../../components/Sidebar";
import Chart from "react-apexcharts";
import "./dashboard.css";
import axios from "axios";
import { DatePicker } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../../Contexts/FormContext";
import Footer from "../../components/Footer";
const HospitalHome = () => {
  const [transactions, setTransactions] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [dashboardData, setDashboardData] = React.useState(null);
  const [datePicker, setDatePicker] = React.useState(false);
  const parentRef = React.useRef(null);
  const currentDate = new Date();
  const {baseUrl} = React.useContext(FormContext)
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
    try{
    const response = await fetch("http://localhost:8000/Lenders/aproovals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    })

      const data = response.data;
      setTransactions(data.transactions);
      setLoading(false)
  }
    catch(err) {
      console.error(err);
    }
  };
  const countTransaction = () => {
    return transactions
      ? transactions.reduce((acc, transaction) => {
          if (
            new Date(transaction.date) > new Date(startDate) &&
            new Date(transaction.date) < new Date(endDate)
          ) {
            return acc + 1;
          }
          return acc;
        }, 0)
      : 0;
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
          `${baseUrl}/Lenders/dashboard?startDate=${backendFormatDate(
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
    countTransaction();
    /*eslint-disable*/
  }, [startDate, endDate]);
  const parentDivWidth = parentRef.current ? parentRef.current.offsetWidth : 0;
  const chartWidth = parentDivWidth * 0.85;
  return (
    <>
      <div className="flex w-full relative">
        <div className="fixed top-0 bottom-0">
          <Sidebar />
        </div>
        <div
          className={`w-full mt-[30px] py-2 2xl:ml-[200px] ml-[170px] px-5 `}
        >
          <div className="flex flex-row justify-between ml-10 mr-6 2xl:mx-10 ">
            <div className="flex  text-black">
              <span
                className={`text-2xl font-bold ${loading ? "shimmer" : ""}`}
              >
                {dashboardData ? dashboardData.hospitalName : ""}
              </span>
            </div>
            <div className="flex justify-start items-center mr-[-0.1vw] 2xl:mr-[-1vw]">
              <div className="flex 2xl:text-sm text-[10px] border-solid border-transparent w-full max-w-[180px] h-[32px] ">
                <div
                  className="flex w-[50%] h-[32px] justify-evenly items-center rounded-l-lg bg-black text-white cursor-pointer"
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
                  className="flex w-[50%] h-[32px] justify-evenly rounded-r-lg items-center bg-blue text-white cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    localStorage.removeItem("token");
                  }}
                >
                  <div className="flex w-full max-w-[20px] ml-2 mr-1">
                    <img
                      src={require("../../image/logout.png")}
                      className="w-full max-w-[15px]"
                      alt="logout"
                    />
                  </div>
                  <div className="flex mr-2 ">Logout</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-box 2xl:h-[720px] h-[620px] justify-self-center ">
            <div
              className={`box bg-lightBlue w-[22.1vw] 2xl:w-[21.7vw] border-solid border-1 border-aliceblue rounded-2xl ${
                loading ? "shimmer" : ""
              }`}
            >
              <div className="flex flex-row w-full h-full justify-start items-center ">
                <div className="flex justify-center items-center border-1 bg-white w-[75px] h-[75px] rounded-2xl mx-5">
                  <span className="">
                    <img
                      className="w-[34px] h-[34px]"
                      src={require("./sales.png")}
                      alt="sales"
                    />
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="text-lg 2xl:text-xl text-left">
                    Today's Sanctioned
                  </span>
                  <span
                    className={`font-bold 2xl:text-3xl text-2xl text-left ${
                      loading ? "hidden" : ""
                    }`}
                  >
                    ₹{dashboardData ? dashboardData.todaysSanctioned : 0}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`box bg-lightBlue w-[21.8vw] 2xl:w-[21.7vw] border-solid border-1 border-aliceblue rounded-2xl ${
                loading ? "shimmer" : ""
              }`}
            >
              <div className="flex flex-row w-full h-full justify-start items-center">
                <div className="flex justify-center items-center border-1 bg-white w-[75px] h-[75px] rounded-2xl mx-5">
                  <span className="">
                    <img
                      className="w-[34px] h-[34px]"
                      src={require("./settlements.png")}
                      alt="sales"
                    />
                  </span>
                </div>
                <div className="flex flex-col justify-start">
                  <span className="2xl:text-xl text-lg text-left">
                    Today's Settlements
                  </span>
                  <span
                    className={`font-bold text-2xl 2xl:text-3xl text-left ${
                      loading ? "hidden" : ""
                    }`}
                  >
                    ₹{dashboardData ? dashboardData.todaysSettlements : 0}
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`box bg-lightBlue 2xl:w-[31.5vw] w-[33vw] border-solid border-1 border-aliceblue rounded-2xl ${
                loading ? "shimmer" : ""
              }`}
              ref={parentRef}
            >
              <div className="flex flex-row w-full ml-4 mt-7 justify-start items-center">
                <div className="flex flex-col">
                  <div className="block 2xl:text-xl text-lg font-semibold ml-4">
                    Cash Settlements
                  </div>
                </div>
              </div>
              {dashboardData && dashboardData.totalSanctioned === 0 ? (
                <div
                  className={`mt-10 flex justify-center items-center relative ${
                    loading ? "shimmer" : ""
                  }`}
                >
                    <Chart
                      type="donut"
                      width={chartWidth}
                      height={chartWidth * 1.05}
                      series={[100]}
                      options={{
                        labels: ["Unsettled Amount", "Settled Amount"],
                        colors: ["#fff", "#fff"],
                        dataLabels: {
                          enabled: false,
                        },
                        legend: {
                          show: false,
                        },
                      }}
                    />
                    <div className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="2xl:text-lg text-base font-bold">
                        Total Settled Amount
                      </span>
                      <span
                        className={`2xl:text-3xl text-2xl font-semibold ${
                          loading ? "hidden" : ""
                        }`}
                      >
                        ₹
                        <span>
                          {dashboardData ? dashboardData.totalSettlements : 0}
                        </span>
                      </span>
                      <span className="text-[12px] 2xl:text-base ">
                        Unsettled Amount - ₹
                        <span className={`${loading ? "shimmer" : ""}`}>
                          {dashboardData
                            ? dashboardData.totalSanctioned -
                              dashboardData.totalSettlements
                            : 0}
                        </span>
                      </span>
                    </div>
                  </div>
              ) : (
                !loading && (
                  <div className=" flex-col mt-10 w-full flex justify-center items-center relative">
                    <Chart
                      type="donut"
                      width={chartWidth}
                      height={chartWidth * 1.05}
                      series={[
                        dashboardData
                          ? dashboardData.totalSanctioned -
                            dashboardData.totalSettlements
                          : 50,
                        dashboardData ? dashboardData.totalSettlements : 50,
                      ]}
                      options={{
                        labels: ["Unsettled Amount", "Settled Amount"],
                        colors: ["#F3B246", "#306FC7"],
                        dataLabels: {
                          enabled: false,
                        },

                        legend: {
                          show: false,
                        },
                        tooltip: {
                          enabled: false,
                        },
                      }}
                    />
                    <div className="flex flex-col absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-[40%]">
                      <span className="2xl:text-lg text-base font-bold">
                        Total Settled Amount
                      </span>
                      <span
                        className={`2xl:text-3xl text-2xl font-semibold ${
                          loading ? "shimmer" : ""
                        }`}
                      >
                        ₹
                        <span>
                          {dashboardData ? dashboardData.totalSettlements : 0}
                        </span>
                      </span>
                      <span className="text-[12px] 2xl:text-base">
                        Unsettled Amount - 
                        <br/>
                        <span className={`${loading ? "shimmer" : ""}`}>
                        ₹{dashboardData
                            ? dashboardData.totalSanctioned -
                              dashboardData.totalSettlements
                            : 0}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-center items-start">
                      <div className="flex justify-center mt-1 2xl:text-xl text-lg 2xl:pt-6">
                        <span
                          className="mt-4 text-[50px]"
                          style={{ color: "#F3B246" }}
                        >
                          ■
                        </span>
                        <span className="text-left ml-1 mr-3 mt-11">
                          Unsettled Amount
                        </span>
                        <span
                          className="ml-2 mt-4 text-[50px]"
                          style={{ color: "#306FC7" }}
                        >
                          ■
                        </span>
                        <span className="ml-1 text-left mt-11">
                          Settled Amount
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="box bg-lightBlue max-w-[46vw] 2xl:max-w-[49vw] border-solid border-1 border-aliceblue rounded-2xl relative">
              <div className="flex flex-row ml-10 mt-7 justify-start items-center">
                <div className="flex flex-col">
                  <div className="block 2xl:text-xl text-lg text-left font-semibold">
                    Summary
                  </div>
                  <div
                    className="block text-left"
                    onClick={() => setDatePicker(!datePicker)}
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
                    <div className="flex flex-row absolute top-0 left-[220px] w-full h-full z-10 ">
                      <div className="flex flex-col ml-5 mt-4">
                        <span className="2xl:text-lg text-base font-bold mb-2">
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
                        <span className="text-base 2xl:text-lg font-bold mb-2">
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
              <div className="grid w-[92%] 2xl:w-[95%] 2xl:h-[380px] h-[280px] mt-3 p-6 2xl:p-4 grid-cols-2 gap-7">
                <div
                  className={`text w-full max-w-[20.5vw] max-h-[180px] bg-white border-solid border-1 border-aliceblue rounded-2xl mr-6 ${
                    loading ? "shimmer" : ""
                  }`}
                >
                  <div className="flex flex-row w-full h-full relative">
                    <div className="flex flex-col justify-start items-stretch absolute top-1/4">
                      <span className=" 2xl:text-lg text-base font-normal mr-auto ml-9 2xl:ml-11 w-full text-left">
                        Total Revenue
                      </span>
                      <span
                        className={`2xl:text-3xl text-2xl text-left font-semibold mt-2 2xl:mt-5 ml-9 2xl:ml-11 mr-auto ${
                          loading ? "hidden" : ""
                        }`}
                      >
                        ₹{dashboardData ? dashboardData.totalSanctioned : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text w-full max-w-[20.5vw] max-h-[180px] bg-white border-solid border-1 border-aliceblue rounded-2xl mr-6 ${
                    loading ? "shimmer" : ""
                  }`}
                >
                  <div className="flex flex-row w-full h-full relative">
                    <div className="flex flex-col justify-start items-stretch absolute top-1/4">
                      <span className=" 2xl:text-lg text-base font-normal mr-auto ml-9 2xl:ml-11 text-left w-full">
                        Total Settlements
                      </span>
                      <span
                        className={`2xl:text-3xl text-2xl text-left font-semibold mt-2 2xl:mt-5 ml-9 2xl:ml-11 mr-auto ${
                          loading ? "hidden" : ""
                        }`}
                      >
                        ₹{dashboardData ? dashboardData.totalSettlements : 0}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text w-full max-w-[20.5vw] max-h-[180px] bg-white text-black border-solid border-1 border-aliceblue rounded-2xl ${
                    loading ? "shimmer" : ""
                  }`}
                >
                  <div className="flex flex-row w-full h-full relative">
                    <div className="flex flex-col justify-start items-stretch absolute top-1/4">
                      <span className=" text-base 2xl:text-lg font-normal mr-auto ml-7 w-full">
                        Total Loans
                      </span>
                      <span
                        className={`2xl:text-3xl text-2xl text-left font-semibold mt-2 2xl:mt-5 ml-10 mr-auto ${
                          loading ? "hidden" : ""
                        }`}
                      >
                        {countTransaction()}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text w-full max-w-[20.5vw] max-h-[180px] bg-white text-black border-solid border-1 border-aliceblue rounded-2xl ${
                    loading ? "shimmer " : ""
                  }`}
                >
                  <div className="flex flex-row w-full h-full relative">
                    <div className="flex flex-col justify-start items-stretch absolute top-1/4">
                      <span className=" text-base 2xl:text-lg font-normal mr-auto ml-7 w-full">
                        Total Repayments
                      </span>
                      <span
                        className={`2xl:text-3xl text-2xl text-left font-semibold mt-2 2xl:mt-5 ml-10 mr-auto ${
                          loading ? "hidden" : ""
                        }`}
                      >
                        {dashboardData ? dashboardData.totalUnsettled : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex px-[20px] 2xl:px-[30px] pb-7">
              <table cellSpacing="0" className="w-full mt-4">
                <thead>
                  <tr className="border-solid text-lg xl:text-base border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
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
                      <span className=" justify-start absolute left-12 2xl:left-7 align-middle">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[100px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[-10px] 2xl:left-0 align-middle">
                        Phone No
                      </span>
                    </td>
                    <td className="pl-2 max-w-[200px]  w-full">Tenure</td>
                    <td className="max-w-[100px]  w-full relative flex items-center">
                      <span className="justify-start w-full absolute 2xl:left-2 left-0">
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
            <div className="flex pr-[20px] ml-[35px] 2xl:pr-5 pb-7">
              <table cellSpacing="0" className="w-full mt-4">
                <thead>
                  <tr className="border-solid text-lg xl:text-base border-1 border-aliceblue bg-lightBlue rounded-lg h-[50px]">
                  <td className="flex items-center w-full pl-[11px] max-w-[20px] 2xl:w-[30px]">
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
                      <span className=" justify-start absolute left-12 2xl:left-7 align-middle">
                        Name
                      </span>
                    </td>
                    <td className="max-w-[100px] w-full relative flex items-center">
                      <span className="justify-start w-full absolute left-[-10px] 2xl:left-0 align-middle">
                        Phone No
                      </span>
                    </td>
                    <td className="pr-4 max-w-[200px]  w-full">Tenure</td>
                    <td className="max-w-[100px]  w-full relative flex items-center">
                      <span className="justify-start w-full absolute 2xl:left-2 left-0">
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
                  {transactions ?
                    transactions.slice(-10).reverse().map((transaction, index) => (
                      <tr
                        className={` border-solid border-1 border-aliceblue bg-lightBlue rounded-lg h-[65px] ${
                          index == 0 ? '-mt-1' : 'mt-4'}`}
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
                        <td className="pr-2 text-aliceblue max-w-[100px] w-full">
                          {transaction.trnId || ""}
                        </td>
                        <td className=" pl-4 max-w-[150px] 2xl:max-w-[200px] w-full truncate">
                          {transaction.customerId && transaction.customerId.name
                            ? transaction.customerId.name
                            : ""}
                        </td>
                        <td className="pr-4  max-w-[100px] w-full">
                          {transaction.customerId &&
                          transaction.customerId.phone
                            ? transaction.customerId.phone
                            : ""}
                        </td>
                        <td className="max-w-[150px] 2xl:max-w-[200px] w-full text-blue">
                              {transaction.tenure
                                ? transaction.tenure
                                : ""}
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
                          <td className="text-yellowgreen max-w-[100px]  w-full">
                            Settled
                          </td>
                        ) : (
                          <td className="text-red pr-5 max-w-[100px] w-full">
                            Pending
                          </td>
                        )}
                      </tr>
                    ))
                  :(
                    <div className="flex w-full justify-center items-end text-lg 2xl:text-xl">
                      Nothing to display.
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <footer className="bottom-0 absolute right-0 2xl:left-[226px] left-[198px]">
        <Footer/>
      </footer>
      </div>
    </>
  );
};

export default HospitalHome;
