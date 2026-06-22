import React, { useContext, useEffect, useState } from "react";
import BatchList from "./BatchList/BatchList";
import SelfModal from "../../Component/SelfModal/SelfModal";
import CreateBatchForm from "./CreateBatch/CreateBatch";
import { DataContext } from "../../context";
import LoadingSpinner from "../../Component/CustomLoader";
import BatchModuleSchedule from "../BatchManagment/BatchModuleSchedule/BatchModuleSchedule";
import AddStudent from "./AddStudent/AddStudent";
import GenerateClassConfirm from "./GenerateClassConfirm/GenerateClassConfirm";
import BatchDetail from "./BatchDetail/BatchDetail";
import StepTracker from "../../Component/step_tracker/StepTracker";
import { useNavigate, useParams } from "react-router-dom";
import NextBatchModule from "./BatchScheduleDetails/BatchScheduleDetails";

const BatchManagement = () => {
  // batches table
  const { apiGet } = useContext(DataContext);
  const [showBatch, setShowBatch] = useState(false);
  const [scheduleBatch, setScheduleBatch] = useState(false);
  const [studentForm, setAddStudentForm] = useState(false);
  const [confirmGenerateClass, setConfirmGenerateClass] = useState(false);
  const [showBatchDetails, setShowBatchDetails] = useState(false);
  const [scheduleModuleDetail, setscheduleModuleDetail] = useState(false);
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    apiGet('/admin/batch-home', {}, setData);
  }, [])
  const navigate = useNavigate();
  if (!data) {
    return <LoadingSpinner />
  }
  const steps = [
    {
      id: "create-batch",
      title: "Create Batch",
      path: `/batch-management${id}?form=create-batch`,
    },
    {
      id: "schedule-batch",
      title: "Schedule",
      path: `/batch-management?form=schedule-batch`,
    },
    {
      id: "add-student",
      title: "Students",
      path: `/batch-management?form=add-student`,
    },
  ];

  return (
    <>
      {console.log(data)}
      <SelfModal
        width="w-full md:w-[60vw] xl:w-[55vw]"
        UpperComp={StepTracker}
        stepArr={steps}
        ModuleCompItem={CreateBatchForm}
        isItemOpen={showBatch}
        getData={async (res) => {
          setShowBatch(false);
          setScheduleBatch(true);
          navigate(`/batch-management/${res?.batchId}?form=schedule-batch`);
          await apiGet('/admin/batch-home', {}, setData);
        }}
        setIsItemOpen={setShowBatch}
        data={data}
      />
      <SelfModal
        width="w-full md:w-[60vw] xl:w-[55vw]"
        UpperComp={StepTracker}
        stepArr={steps}
        ModuleCompItem={BatchModuleSchedule}
        getData={
          (res) => {
            setScheduleBatch(false);
            setAddStudentForm(true);
            // then navigate
            navigate(`/batch-management/${id}?form=add-student`);
            apiGet('/admin/batch-home', {}, setData);
          }
        }

        isItemOpen={scheduleBatch}
        setIsItemOpen={setScheduleBatch}
        data={data}
      />
      <SelfModal
        width="w-full md:w-[60vw] xl:w-[55vw]"
        UpperComp={StepTracker}
        stepArr={steps}
        getData={
          (res) => {
            setAddStudentForm(false);
            // setConfirmGenerateClass(true);
            // then navigate
            // navigate(`/batch-management/${id}?form=generate-class`);
            apiGet('/admin/batch-home', {}, setData);
          }
        }
        ModuleCompItem={AddStudent}
        isItemOpen={studentForm}
        setIsItemOpen={setAddStudentForm}
        data={data}
      />
      <SelfModal
        width="w-full md:w-[60vw] xl:w-[55vw]"
        UpperComp={StepTracker}
        stepArr={steps}
        getData={
          (res) => {
            apiGet('/admin/batch-home', {}, setData);
          }
        }
        ModuleCompItem={GenerateClassConfirm}
        isItemOpen={confirmGenerateClass}
        setIsItemOpen={setConfirmGenerateClass}
        data={data}
      />
      <SelfModal
        width="w-full md:w-[60vw] xl:w-[55vw]"
        getData={
          () => {
            apiGet('/admin/batch-home', {}, setData);
          }
        }
        ModuleCompItem={BatchDetail}
        isItemOpen={showBatchDetails}
        setIsItemOpen={setShowBatchDetails}
        data={data}

      />
      <SelfModal
        width="w-full md:w-[78vw] xl:w-[90vw]"
        getData={
          () => {
            apiGet('/admin/batch-home', {}, setData);
          }
        }
        
        ModuleCompItem={NextBatchModule}
        isItemOpen={scheduleModuleDetail}
        setIsItemOpen={setscheduleModuleDetail}
        data={data}

      />
      <div className="p-6 bg-gray-100 min-h-screen">
        <BatchList
          setShowBatch={setShowBatch}
          setScheduleBatch={setScheduleBatch}
          setAddStudentForm={setAddStudentForm}
          setConfirmGenerateClass={setConfirmGenerateClass}
          batches={data.allBatches}
          setscheduleModuleDetail={setscheduleModuleDetail}
          setShowBatchDetails={setShowBatchDetails}
        />
      </div>
    </>

  );
};

export default BatchManagement;