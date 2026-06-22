import { useContext, useEffect, useState } from "react";
import StudentHeader from "./stuDetailSupport/StudentHeader";
import TabsSection from "./stuDetailSupport/StudentTab";
import logo from "../../../assets/st.webp";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context";
export default function StudentDetails({ 
  // student,
  addCourse,
  addPayments,
  addActivity,  
  setAddCourse,
  setAddActivity,
  setIsItemOpen2,
  setIsItemOpen,
  setAddPayments,
  // paymentData,
  getData
}) {
  const [tab, setTab] = useState("courses");
  const [studentData, setStudentData] = useState();
  const { id } = useParams();
  const { apiGet } = useContext(DataContext)
  
  useEffect(()=>{
    if (id != undefined){
      apiGet(`/admin/get-student-by-id/${id}`, {}, setStudentData);
    }
    // getData();
  },[id])

  if (!studentData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <img
          src="https://cdn.dribbble.com/userupload/35032201/file/original-bd29704daa2c99f4b7406afd3f5ee4fc.gif"
          alt="No student selected"
          className="w-96  mb-4 opacity-80"
        />

        <div className="text-lg font-semibold">No Student Selected</div>
        <div className="text-sm mt-1 text-gray-400 text-center">
          Choose a student from the sidebar to view details
        </div>
      </div>
    );
  }
  console.log(studentData);
  return (
    <div className="flex-1 bg-white overflow-y-auto">

      <div className="">

        {/* PROFILE HEADER */}
        <StudentHeader student={studentData} />
        <TabsSection student={studentData}
        // paymentData={paymentData}
          addCourse={addCourse}
          addPayments={addPayments}
          setIsItemOpen={setIsItemOpen}
          setIsItemOpen2={setIsItemOpen2}
          addActivity={addActivity}
          setAddCourse={setAddCourse}
          setAddActivity={setAddActivity}
          setAddPayments={setAddPayments} />

      </div>
    </div>
  );
}