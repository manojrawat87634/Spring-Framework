import React, { useContext, useEffect } from "react";
import DynamicForm from "../../../Component/ComonForm/CommonForm";
import { MdEmail, MdLock, MdVerifiedUser } from 'react-icons/md';

import { DataContext } from "../../../context";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { BiPhone, BiUser } from "react-icons/bi";
import { FaFileExcel } from "react-icons/fa";

const EnrollStudentForm = ({ setIsItemOpen, data, getData }) => {
  const navigate = useNavigate();
  const {user } = useContext(DataContext);
  const { id } = useParams();
  const fields = [
    { name: 'courseId', type: 'select',
        options : data.map((e)=> {
        return {  label : e.name, value : e.id}
        }),        
        label: 'Name', placeholder: 'Course', required: true, icon: MdVerifiedUser },
    { name: 'enrolledAt', type: 'date',
      value : new Date().toISOString().split("T")[0],
        label: 'Enrolled At', placeholder: 'Enrolled At', required: true, icon: MdVerifiedUser },
 ];

  const { setToken, setUser } = useContext(DataContext);

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   setSubmitting(true);
  // }
  return <>
        <DynamicForm
        // logo={"https://cdn-icons-png.flaticon.com/512/4076/4076549.png"}         
          fields={fields}
          heading="Enroll Student"
          buttonTitle="Enroll"
          postUrl={`/admin/enrollments/${id}`}
          theme="light"
          data={data}
          getData={getData}
          gradientColors={"black"}
          setIsItemOpen={setIsItemOpen}
        //   ExtraContent={UploadFromExcel}
        />
  </>
}

export default EnrollStudentForm;