import React, { useContext, useEffect, useState } from "react";
import DynamicForm from "../../../Component/ComonForm/CommonForm";
import { DataContext } from "../../../context";
import { useParams } from "react-router-dom";

import { BiBook, BiCalendar } from "react-icons/bi";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

import LoadingSpinner from "../../../Component/CustomLoader";

const BatchModuleSchedule = ({
  setIsItemOpen,
  data,
  getData
}) => {

  const [compData, setCompData] = useState(null);

  const { id } = useParams();

  const { apiGet } = useContext(DataContext);

  useEffect(() => {

    if (!id) return;

    apiGet(
      `/admin/batch-module-progress/${id}`,
      {},
      setCompData
    );

  }, [id]);

  if (!compData) {
    return <LoadingSpinner />;
  }
  console.log(compData);

  const scheduleFields = [
    {
      name: "faculty_id",
      type: "select",
      label: "Trainer",
      required: true,
      icon: FiUser,
      options:
        data?.users?.map((e) => ({
          label: e.name,
          value: e.id
        })) || []
    },
    {
      name: "batchModuleId",
      type: "select",
      label: "Course Module",
      placeholder: "Select Module",
      required: true,
      icon: BiBook,
      options:
        compData?.modules
          ?.filter(
            (e) =>
              e.classesGenerated != true
          )
          ?.map((e) => ({
            label: e.moduleName,
            value: e.batchModuleId
          })) || []
    },
    {
      name: "day_of_week",
      type: "select",
      label: "Day",
      required: true,
      icon: FiCalendar,
      isMulti: true,
      options: [
        { label: "Monday", value: "MONDAY" },
        { label: "Tuesday", value: "TUESDAY" },
        { label: "Wednesday", value: "WEDNESDAY" },
        { label: "Thursday", value: "THURSDAY" },
        { label: "Friday", value: "FRIDAY" },
        { label: "Saturday", value: "SATURDAY" },
        { label: "Sunday", value: "SUNDAY" }
      ]
    },
    {
      name: 'startDate',
      type: 'date',
      placeholder: 'Select Start Date',
      label: 'Module Start Date',
      required: true,
      // min: compData?.lastClassDate ? new Date(compData?.lastClassDate) : new Date(),
      error: "Please select a start date after the previous module ends",
      icon: BiCalendar
    },
    {
      name: "start_time",
      type: "time",
      label: "Start Time",
      required: true,
      icon: FiClock
    },
    {
      name: "end_time",
      type: "time",
      label: "End Time",
      required: true,
      icon: FiClock
    }
  ];

  return (
    <DynamicForm
      fields={scheduleFields}
      heading="Configure Module Schedule"
      buttonTitle="Save Module Schedule"
      postUrl={`/admin/batch-module-schedule`}
      theme="light"
      getData={getData}
      setIsItemOpen={setIsItemOpen}
      gradientColors={"black"}
    />
  );
};

export default BatchModuleSchedule;