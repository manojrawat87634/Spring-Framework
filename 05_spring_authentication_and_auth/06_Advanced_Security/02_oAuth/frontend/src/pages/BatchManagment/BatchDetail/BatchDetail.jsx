import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context";
import LoadingSpinner from "../../../Component/CustomLoader";
import BatchStudentCard from "../../../Component/Cards/BatchStudentCard";

const BatchDetail = ({getData,setIsItemOpen}) => {
    const { id } = useParams();

    const { apiGet } = useContext(DataContext);
    const [data, setData] = useState();

    useEffect(() => {
        if (id){
            apiGet(`/admin/batch/${id}`, {}, setData);
        }
    }, [id]);

    if (!data) {
        return <LoadingSpinner />
    }

    console.log(data);
    return <>
     <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

  {/* Header */}
  <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-sm font-semibold text-gray-500 border-b border-gray-200">

    <div className="col-span-4">Student</div>

    <div className="col-span-3">Email</div>

    <div className="col-span-3">Phone</div>

    <div className="col-span-2 text-right">Action</div>

  </div>
  {/* Students */}
  <div className="divide-y divide-gray-100">
    {data?.students?.map((student) => (
      <BatchStudentCard
        key={student.id}
        getData={async()=>{
            await getData();

            await apiGet(`/admin/batch/${id}`, {}, setData);
            // setIsItemOpen(false);
        }}
        student={student}
      />
    ))}
  </div>

</div>
    </>;
}

export default BatchDetail;