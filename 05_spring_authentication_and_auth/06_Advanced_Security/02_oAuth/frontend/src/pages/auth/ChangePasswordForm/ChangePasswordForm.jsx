import React, { useContext } from 'react'
import DynamicForm from '../../../Component/ComonForm/CommonForm';
import logo from "../../../assets/img/logo.png";
import { MdLock } from 'react-icons/md';
import { DataContext } from '../../../context';

const ChangePasswordForm = ({ setIsItemOpen }) => {
    const { apiPut } = useContext(DataContext);
    const handleChange = (values, { resetForm }) => {
        apiPut('/update-profile/', { password: values.password }, () => {
            setIsItemOpen(false);
            resetForm();
        });
    }

    const fields = [
        { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter your password', required: true, icon: MdLock },
        { name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Confirm Password', required: true, icon: MdLock },
    ];

    return (
        <>
            <DynamicForm
                buttonTitle={"Update Password"}

                handleSubmit={handleChange}
                heading={"Update Password"}
                logo={logo}
                setIsItemOpen={setIsItemOpen}
                fields={fields}
            />
        </>
    )
}

export default ChangePasswordForm;