import React, { useContext, useEffect, useState } from "react";
import ClassCard from "../../Component/Cards/ClassCard";
import { DataContext } from "../../context";
import LoadingSpinner from "../../Component/CustomLoader";
import SelfModal from "../../Component/SelfModal/SelfModal";
import MarkAttendance from "../attendance/MarkAttendance";


const ClassManagement = () => {
  const { apiGet } = useContext(DataContext);
  const [data, setData] = useState(null);
  const [attendance, setAttendance] = useState(false);
  useEffect(() => {
    apiGet("/admin/get-today-classes", {}, (res) => {
      console.log("API RESPONSE:", res);
      setData(res);
    });
  }, []);

  if (!data) {
    return <LoadingSpinner />;
  }

  const classes = data?.classes || [];

  return (
    <>
      <div className="p-6 bg-gray-50 min-h-screen w-full">
        <h2 className="text-xl font-bold mb-4">
          Today’s Classes ({data.totalClasses})
        </h2>
        {classes.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No classes scheduled today
          </div>
        ) : (
          <ClassCard
            setAttendance={setAttendance}
            classes={classes} />
        )}
      </div><SelfModal
        ModuleCompItem={MarkAttendance}
        isItemOpen={attendance}
        width="max-w-7xl w-full"
        setIsItemOpen={setAttendance}
      />
    </>
  );
};

export default ClassManagement;