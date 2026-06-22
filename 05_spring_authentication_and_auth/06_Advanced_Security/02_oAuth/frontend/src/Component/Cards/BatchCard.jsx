import React from "react";
import { BiPlus } from "react-icons/bi";
import {
  FiUsers,
  FiClock,
  FiEye,
  FiEdit,
  FiChevronRight,
  FiPlay,
  FiZap,
} from "react-icons/fi";
import { useNavigate, useNavigation } from "react-router-dom";

const BatchCard = ({ batch, 
  setscheduleModuleDetail,
  setScheduleBatch, setAddStudentForm, setShowBatchDetails, setConfirmGenerateClass }) => {

  const getDays = (schedules) => {
    if (!schedules || schedules.length === 0) return [];
    return schedules.map((s) => s.dayOfWeek);
  };
  const navigate = useNavigate();
  const getTime = (schedules) => {
    if (!schedules || schedules.length === 0) return "Not set";

    const s = schedules[0];
    return `${s.startTime} - ${s.endTime}`;
  };

  const getNextClass = (classes) => {
    if (!classes || classes.length === 0) return "Not scheduled";

    const sorted = [...classes].sort(
      (a, b) => new Date(a.classDate) - new Date(b.classDate)
    );

    return sorted[0]?.classDate;
  };

  const days = getDays(batch.schedules);
  const time = getTime(batch.schedules);
  const nextClass = getNextClass(batch.classes);

  return (
    <div

      key={batch.id}
      className="grid grid-cols-12 items-center px-4 py-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition group cursor-pointer"
    >
      {/* Batch Info */}
      {/* Batch Info */}
      <div className="col-span-2">
        <p className="text-[15px] font-semibold text-gray-800 tracking-tight">
          {batch.name}
        </p>

        <p className="text-[12px] font-medium text-gray-500 mt-1">
          {batch.course?.name}
        </p>

        <p className="text-[11px] font-medium text-blue-600 mt-2">
          Next: {nextClass}
        </p>
      </div>

      {/* Students */}
      <div className="col-span-2 flex items-center gap-2 text-[13px] font-medium text-gray-700">
        <FiUsers className="text-gray-400 text-sm" />
        <span>{batch.students?.length || 0} Students</span>
      </div>

      {/* Schedule */}
      <div className="col-span-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {days.length > 0 ? (
            days.map((d) => (
              <span
                key={d}
                className="text-[10px] font-semibold tracking-wide bg-white border border-gray-200 px-2.5 py-1 rounded-md text-gray-700"
              >
                {d}
              </span>
            ))
          ) : (
            <span className="text-[12px] text-gray-400 font-medium">
              No schedule
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[12px] font-medium text-gray-500">
          <FiClock className="text-sm" />
          {time}
        </div>
      </div>

      {/* Status */}
      <div className="col-span-1">
        <span
          className={`px-3 py-1 text-[11px] rounded-full font-semibold tracking-wide uppercase ${batch.status === "active"
            ? "bg-green-100 text-green-700"
            : batch.status === "paused"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
            }`}
        >
          {batch.status}
        </span>
      </div>
      {/* Actions */}
      <div className="col-span-2 flex  items-center gap-2">
        {/* Primary Action */}
        <button
          onClick={() => {
            navigate(`/batch-management/${batch.id}`);
            setShowBatchDetails(true);
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-medium">
          <FiEye />
        </button>
        <button
          onClick={() => {
            setAddStudentForm(true);
            navigate(`/batch-management/${batch?.id}?tab=students`)
          }}
          className="p-2 flex rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition"
        >
          <FiUsers /> <BiPlus />
        </button>
        {/* Secondary Actions */}

        <button
          onClick={() => {
            navigate(`/batch-management/${batch?.id}`);
            // setScheduleBatch(true);
            setscheduleModuleDetail(true);
          }}
          className="p-2 rounded-md text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 transition">
          <FiEdit />
        </button>


      </div>

      {/* <div className="col-span-2">
        <button 
        onClick={()=>{
            navigate(`/batch-management/${batch?.id}`);
          setConfirmGenerateClass(true);
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
  <FiZap className="text-lg" />
  Generate Classes
</button>
      </div> */}
      <div className="col-span-2">
     <button
  onClick={() => {
    navigate(`/batch-management/${batch?.id}`);
    setScheduleBatch(true);
  }}
  className="flex items-center text-sm gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium whitespace-nowrap"
>
  <FiPlay className="text-sm " />
  Schedule Next Module
</button>
      </div>
    </div>
  );
};

export default BatchCard;