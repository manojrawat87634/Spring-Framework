import { useState, useContext, useEffect } from "react";
import Sidebar from "./StudentDisplay";
import StudentDetails from "./studentDetails/StudentDetail";
import { DataContext } from "../../context";
import LoadingSpinner from "../../Component/CustomLoader";
import EnrollStudentForm from "./enrollStudentForm/EnrollStudentForm";
import SelfModal from "../../Component/SelfModal/SelfModal";
import RegisterPage from "../auth/RegisterPage/RegisterUser";
import AddPayment from "../payments/addPayment/AddPayment";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import StepTracker from "../../Component/step_tracker/StepTracker";
import StudentHeaderSearch from "./StudentSearch/StudentSearch";
import StudentList from "./StudentList/StudentList";
import StudentFilter from "./StudentSearch/StudentFilterForm/StudentFilterForm";


export default function StudentDashboard() {
  const [data, setdata] = useState();
  const [filteredData, setFilteredData] = useState();

  const [addCourse, setAddCourse] = useState(false);
  const [addPayments, setAddPayments] = useState(false);
  const [addActivity, setAddActivity] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [showStudentDetail, setShowStudentDetails] = useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const { apiGet } = useContext(DataContext);



  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const form = searchParams.get("form");
  const navigate = useNavigate();
  const getData = async () => {
    await apiGet('/admin/get-student', {}, (res)=>{
      setdata(res);
      setFilteredData(res);
    });
    if (id!= undefined) {
      await apiGet(`/admin/get-student-by-id/${id}`, {}, setSelectedStudent);
    }
  }

  useEffect(() => {
    getData();
  }, [id, form]);

  const steps = [
    {
      id: "create-student",
      title: "Student",
      path: `/students?form=create-student`,
    },
    {
      id: "enroll",
      title: "Enrollment",
      path: `/enrolled-student/${id}?form=enroll`,
    },
    {
      id: "payment",
      title: "Payment",
      path: `/enrolled-student/${id}/?form=payment`,
    },
  ];
  
  if (!data) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="p-4 md:p-6 space-y-5 bg-[#fafafa] ">

        <StudentHeaderSearch setFilteredData={setFilteredData} 
        students={data.students}
        setShowFilterForm={setShowFilterForm} setIsAddStudent={setIsAddStudent} />
        {/* <StudentDetails student={selectedStudent}
          addCourse={addCourse}
          paymentData={paymentData}
          addPayments={addPayments}
          addActivity={addActivity}
          setAddCourse={setAddCourse}
          setAddActivity={setAddActivity}
          setAddPayments={setAddPayments}
          getData={getData}
        /> */}
        <StudentList
        filteredData={filteredData} students={filteredData.students} setShowStudentDetails={setShowStudentDetails} />
      </div>
      <SelfModal
        UpperComp={StepTracker}
        stepArr={steps}
        ModuleCompItem={EnrollStudentForm}
        isItemOpen={addCourse}
        getData={async (res) => {
          setIsAddStudent(false);
          setAddCourse(false);
          setAddPayments(true);
          if (res != null) {
            await apiGet('/admin/get-student', {}, (res)=>{
              setdata(res);
              setFilteredData(res);
            });
            if (id == undefined) {
              return;
            }
            navigate(`/enrolled-student/${id}?form=payment`);
          }
        }}
        width="w-full md:w-[60vw] xl:w-[55vw]"
        data={data.allCourses}
        setIsItemOpen={setAddCourse}
      />

      <SelfModal
        ModuleCompItem={StudentDetails}
        isItemOpen={showStudentDetail}
        setIsItemOpen2={setAddPayments}
        getData={async (res) => {

        }}
        width="w-full md:w-[80vw] xl:w-[85vw]"
        setIsItemOpen={setShowStudentDetails}
      />
      <SelfModal
        ModuleCompItem={StudentFilter}
        isItemOpen={showFilterForm}
        data={data}
        getData={async (res) => {

        }}
        setData={(res)=>{
          setdata(res);
          setFilteredData(res);
        }}
        width="w-full md:w-[50vw] xl:w-[50vw]"
        setIsItemOpen={setShowFilterForm}
      />

      <SelfModal
        stepArr={steps}
        UpperComp={StepTracker}
        ModuleCompItem={RegisterPage}
        isItemOpen={isAddStudent}
        width="w-full md:w-[60vw] xl:w-[55vw]"
        getData={(res = null) => {
          // console.log(res);
          setIsAddStudent(false);
          setAddCourse(true);
          if (res != null) {
            apiGet('/admin/get-student', {}, setdata);
            navigate(`/enrolled-student/${res?.studentId}?form=enroll`);
          }
        }}
        setIsItemOpen={setIsAddStudent}
      />

      <SelfModal
        stepArr={steps}
        UpperComp={StepTracker}
        ModuleCompItem={AddPayment}
        width="w-full md:w-[60vw] xl:w-[55vw]"
        isItemOpen={addPayments}
        data={{ ...data, student: selectedStudent }}
        getData={() => {
          // apiGet(`/admin/payments/${id}`, {}, setPaymentData);
        }}
        setIsItemOpen={setAddPayments}
      />
    </>
  );
}