import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context';
import UnpaidInvoice from './upaid_invoices/UnpaidInvoive';
import LoadingSpinner from '../../Component/CustomLoader';
import SelfModal from '../../Component/SelfModal/SelfModal';
import AddPayment from '../payments/addPayment/AddPayment';
import { useParams } from 'react-router-dom';
import UnpaidHeaderSearch from './UnpaidHeaderSearch/UnpaidHeaderSearch';
import InvoiceFilter from './FeesInvoiceFilter/FeeInvoiceFilter';


const FeeManagement = ()=>{
  const [data, setdata] = useState(null);
  const [filterData, setFilteredData] = useState();
  
    const { apiGet } = useContext(DataContext);
    const [addPayments, setAddPayments] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState();
    const [showInvoiceFilter, setShowInvoiceFilter] = useState(false);
  const {id} = useParams();

 const getData = async () => {
    await apiGet("/admin/unpaid-fees", {}, (res) => {
        setdata(res);
        setFilteredData(res);
    });

    if (id !== undefined) {
        await apiGet(
            `/admin/get-student-by-id/${id}`,
            {},
            setSelectedStudent
        );
    }
};
    useEffect(() => {
        getData();
    } , [id]);

     if (!data) {
    return <LoadingSpinner />;
  }

  
  return <>
        <SelfModal
          ModuleCompItem={selectedStudent ? AddPayment : LoadingSpinner}
          width="w-full md:w-[60vw] xl:w-[55vw]"
          isItemOpen={addPayments}
          data={{...data, student : selectedStudent}}
          getData={() => {
           getData();
          }}
          setIsItemOpen={setAddPayments}
          />
        <SelfModal
          ModuleCompItem={InvoiceFilter}
          width="w-full md:w-[60vw] xl:w-[55vw]"
          isItemOpen={showInvoiceFilter}
          // data={{...data, student : selectedStudent}}
          getData={() => {
            // Skipping the 
          }}
          setIsItemOpen={setShowInvoiceFilter}
          setData={(res)=>{
            setFilteredData(res);
            setdata(res);
          }}
          />
          <div className='m-4 p=4'>
          <UnpaidHeaderSearch 
          invoices={filterData.data}
           setShowInvoiceFilter={setShowInvoiceFilter}
           data={data}
            setFilteredData={setFilteredData} 
          />
      <UnpaidInvoice 
      
      data={filterData} setAddPayments={setAddPayments}/>
          </div>
  </>

}

export default FeeManagement;