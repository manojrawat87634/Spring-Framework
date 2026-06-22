import React, { useContext, useState } from "react";
import DynamicForm from "../../../Component/ComonForm/CommonForm";
import { MdDateRange, MdEmail, MdGolfCourse, MdLock, MdVerifiedUser } from 'react-icons/md';
import logo from "../../../assets/img/logo.png"
import { DataContext } from "../../../context";
import { useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { BiCalendar } from "react-icons/bi";
const CreateBatch = ({ setIsItemOpen, data, getData }) => {
  const navigate = useNavigate();
  const [moduleOption, setModuleOption] = useState([]);

   const courses = data?.allCourses?.map((e)=>{
      return {
        value : e.id,
      label : e.name
      }
    });


    const moudle = data?.modules?.map((e)=>{
      return {
        value : e.id,
        label : e.moduleName
      }
    });

    console.log(courses);
  const batchFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Batch Name',
    placeholder: 'Enter Batch Name',
    required: true,
    icon: MdVerifiedUser,
  },
  {
    name: 'courseId',
    type: 'select',
    label: 'Course',
    placeholder: 'Select Course',
    required: true,
    onFieldChange : (value)=>{
      console.log(value);
      const arr = data.courseModule.filter((e, i)=>{
        return e.course.id == value.value;
      }).map((e, i)=>{
        return {
          label : e?.module?.moduleName,
          value : e?.module?.id
        }
      })
      console.log(arr);
      setModuleOption(arr);
    },
    options: courses, // fill from API
    icon : MdGolfCourse
  },
  {
    name: 'current_module_id',
    type: 'select',
    label: 'Module',
    required: true,
    options: moduleOption
  },
  {
    name: 'startDate',
    type: 'date',
    label: 'Start Date',
    placeholder : "Select Start Date",
    required: true,
    icon : BiCalendar
  },
];
  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   setSubmitting(true);
  // }

  return <>
        <DynamicForm
          fields={batchFields}
          heading="Create New Batch"
          buttonTitle="Create Batch"
          getData={getData}
          postUrl="/admin/create-batch"
          gradientColors={"black"}
          theme="light"
          setIsItemOpen={setIsItemOpen}
          // logo={logo}
        />
  </>
}

export default CreateBatch;