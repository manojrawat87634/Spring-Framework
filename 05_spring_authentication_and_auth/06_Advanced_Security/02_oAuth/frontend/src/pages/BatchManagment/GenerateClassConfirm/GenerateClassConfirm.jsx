import react, { useContext, useState } from "react";
import ConfirmCard from "../../../Component/Cards/ConfirmationCard";
import { DataContext } from "../../../context";
import { useNavigate, useParams } from "react-router-dom";

const GenerateClassConfirm = ({setIsItemOpen, getData})=>{
    const { id } = useParams();
    const {apiPost} = useContext(DataContext);
    const [button, setButton] = useState(false);
    const confirmFunc = ()=>{
        apiPost(`/admin/generate-classes/${id}`, {}, 
            
            setButton, ()=>{
                getData();
                setIsItemOpen(false)
            });

    }

    return <>
        <ConfirmCard onCancel={()=>{
            setIsItemOpen(false);
        }}
        setButton={setButton}
        button={button}
        onConfirm={confirmFunc}
        confirmText="Confirm"        description="Class will generate automatically on click"
        />
    </>
}

export default GenerateClassConfirm;