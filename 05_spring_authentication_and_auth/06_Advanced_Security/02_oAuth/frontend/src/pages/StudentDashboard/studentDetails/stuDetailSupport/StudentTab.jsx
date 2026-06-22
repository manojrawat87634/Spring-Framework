import React, { useContext, useState } from "react";
import SelfModal from "../../../../Component/SelfModal/SelfModal";
import EnrollStudent from "../../enrollStudentForm/EnrollStudentForm";
import CourseCard from "../../../../Component/Cards/CourseCard";
import PaymentTab from "./PaymentTab";
import AttendanceAnalysis from "./AttendanceAnalysis";


export const EmptyState = ({ title, buttonText, onCl }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        className="w-20 opacity-60"
      />
      <p className="mt-4 text-sm text-gray-600">{title}</p>
      {buttonText && (
        <button
          onClick={() => {
            onCl();
          }}
          className="mt-4 px-4 py-2 bg-black text-white text-sm rounded-md">
          {buttonText}
        </button>
      )}
    </div>
  );
};

const TabsSection = ({ student,
  addCourse,
  addPayments,
  addActivity,
  setAddCourse,
  setAddActivity,
  paymentData,
  setIsItemOpen,
  setIsItemOpen2,
  setAddPayments,
}) => {
  const [tab, setTab] = useState("courses");
  const tabs = ["courses", "payments", "attendance"];

  return (
    <div>
      {/* TABS */}
      <div className="flex gap-2  bg-gray-100 p-1 rounded-lg w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 text-sm capitalize rounded-md transition
        ${tab === t
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {t}
          </button>
        ))}
      </div>


      {/* CONTENT */}
      <div className="">

        {/* COURSES */}
        {console.log(student)}
        {tab === "courses" && (
          student.courses.length > 0 ? (
            student.courses.map((e) => {
              return <CourseCard course={e} />
            })
          ) : (
            <EmptyState
              title="No courses yet"
              buttonText="+ Add Course"
              onCl={() => { setAddCourse(true) }}
            />
          )
        )}

        {/* PAYMENTS */}
        {tab === "payments" && (
          <PaymentTab setIsItemOpen={setIsItemOpen} setIsItemOpen2={setIsItemOpen2}/>
        )}

        {/* attendance */}
        {tab === "attendance" && (
         <AttendanceAnalysis />
        )}

      </div>
    </div>
  );
};

export default TabsSection;