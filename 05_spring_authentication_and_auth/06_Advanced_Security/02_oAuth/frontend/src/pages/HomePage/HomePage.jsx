import React, { useContext, useEffect, useState } from 'react'
// import AdminHomePage from './HomeSupport/AdminHome';
// import UserHome from './HomeSupport/UserHome';
import { DataContext } from '../../context';
import { VscLoading } from 'react-icons/vsc';

const HomePage = () => {
    const { apiGet, user } = useContext(DataContext);
    const [data, setData] = useState();
    useEffect(() => {
      apiGet("/get-student", {}, setData);
    }, []);
  
      if (!data) {
        return (
          <div className="flex justify-center items-center min-h-screen">
            <VscLoading className="text-blue-600 animate-spin text-4xl" />
          </div>
        );
      }
  return (
    // user?.user_type == "admin" ? <AdminHomePage data={data} setData={setData}/> : <UserHome data={data}/>
    user?.user_type == "admin" ? <h1>Admin Page</h1> : <h1>User Page</h1>
  )
}

export default HomePage