import React, { useContext, useEffect, useState } from "react";

import { DataContext } from "../../context";

import { useParams } from "react-router-dom";

import LoadingSpinner from "../../Component/CustomLoader";

import AttendanceRowCard from "../../Component/Cards/AttendanceRowCard";

import { FaSpinner } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const MarkAttendance = ({ setIsItemOpen }) => {

  const {
    apiGet,
    apiPost,
  } = useContext(DataContext);

  const { id } = useParams();
  const [data, setData] = useState(null);

  const [attendance, setAttendance] = useState({});

  const [button, setButton] = useState(false);

  const getData = () => {
    apiGet(
      `/admin/get-class-student/${id}`,
      {},
      (response) => {
        setData(response);
        const attendanceData = {};
        (response?.students || []).forEach((item) => {
          attendanceData[item?.id] = {
            status:
              item.status ?? true,

            remarks:
              item.remarks ?? "",

          };
        });
        setAttendance(attendanceData);
      }
    );
  }
  useEffect(() => {
    getData();
  }, [id]);

  if (!data) {
    return <LoadingSpinner />;
  }
  const students = data?.students || [];
  const updateAttendance = (
    studentId,
    status
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  }

  const updateRemark = (
    studentId,
    remarks
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };
  const saveAttendance = () => {
    setButton(true);
    const attendanceList = Object.entries(
      attendance
    ).map(([studentId, value]) => ({

      classId: Number(id),

      studentId: Number(studentId),

      status: value.status,

      remarks: value.remarks,

    }));

    console.log(attendanceList);
    apiPost(

      "/admin/save-attendance",

      attendanceList,

      (response) => {
        setButton(false);
        /*
        -----------------------------------
        CLOSE MODAL / PANEL
        -----------------------------------
        */
        if (setIsItemOpen) {
          setIsItemOpen(false);
        }
        getData();
      },
      (error) => {
        console.log(error);
        setButton(false);

      }

    );

  };

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-50 p-6">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">

          {/* LEFT */}
          <div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Attendance Console
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage student attendance records
            </p>

          </div>

          {/* RIGHT */}
          <button
            onClick={saveAttendance}
            disabled={button}
            className="w-40 h-11 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition"
          >

            {
              button
                ? (
                  <FaSpinner
                    className="animate-spin"
                    size={18}
                    color="white"
                  />
                )
                : "Save Attendance"
            }

          </button>

        </div>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          {/* HEADER */}
          <div className="grid grid-cols-12 items-center px-6 py-4 bg-gray-50 border-b border-gray-200">

            {/* STUDENT */}
            <div className="col-span-4">

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Student Details
              </p>

            </div>

            {/* REMARKS */}
            <div className="col-span-5">

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Remarks / Notes
              </p>

            </div>

            {/* ATTENDANCE */}
            <div className="col-span-3">

              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Attendance Status
              </p>

            </div>

          </div>

          {/* ROWS */}
          <div className="divide-y divide-gray-100">

            {students.map((item, index) => {

              const studentId = item.id;

              return (

                <AttendanceRowCard

                  key={studentId}

                  index={index}

                  item={{

                    user: item,

                    currentStatus:
                      attendance[studentId]?.status,

                    remarks:
                      attendance[studentId]?.remarks,

                    updateAttendance,

                    updateRemark,

                  }}

                />

              );

            })}

          </div>

        </div>

      </div>
    </>
  );

};

export default MarkAttendance;