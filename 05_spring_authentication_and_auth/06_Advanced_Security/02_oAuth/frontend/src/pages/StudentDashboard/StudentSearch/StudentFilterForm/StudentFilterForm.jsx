import React from "react";
import {
    FaBook,
    FaLayerGroup,
    FaUserCheck
} from "react-icons/fa";
import SearchForm from "../../../../Component/ComonForm/SearchForm";

const StudentFilter = ({
    data, 
    setData,
    setIsItemOpen
}) => {
console.log(data);
    const fields = [
        {
            name: "courseId",
            type: "select",
            placeholder: "Filter By Course",
            icon: FaBook,
            options: data?.allCourses?.map(course => ({
                label: course.name,
                value: course.id
            }))
        },
        {
            name: "batchId",
            type: "select",
            placeholder: "Filter By Batch",
            icon: FaLayerGroup,
            options: data?.batches?.map(batch => ({
                label: batch.name,
                value: batch.id
            }))
        },
        {
            name: "status",
            type: "select",
            placeholder: "Student Status",
            icon: FaUserCheck,
            options: [
                {
                    label: "Active",
                    value: "active"
                },
                {
                    label: "Inactive",
                    value: "inactive"
                }
            ]
        }
    ];

    return (
        <SearchForm
            heading="Student Filters"
            fields={fields}
            route="/admin/get-student"
            setShowModal={setIsItemOpen}
            setData={setData}
            submitButtonText="Apply Filters"
            gradientColors="linear-gradient(to right, #2563EB, #1D4ED8)"
        />
    );
};

export default StudentFilter;