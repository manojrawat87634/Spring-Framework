// src/context/DataProvider.js
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL, API_EXCEL_URL } from "./config";

export const DataContext = createContext();

export const DataProviderFuncComp = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  const checkSession = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        setLoading(false);
        navigate("/login", { replace: true });
        return null;
      }


      const res = await axios.post(`${API_BASE_URL}/get-user-info`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      if (res.data?.accessToken) {
        const freshToken = res.data.accessToken;
        setToken(freshToken);
        if (res.data.user) setUser(res.data.user);
        return freshToken;
      } else {
        setToken(null);
        localStorage.removeItem("refreshToken");
        setLoading(false);
        navigate("/login", { replace: true });
        return null;
      }
    } catch (error) {
      console.error(error);
      if (error.message?.includes("Network Error") ||
        error.code === 'ECONNABORTED' ||
        error.message?.includes("timeout")) {
        // alert("Please Connect To Internet");
        return;
      }
      setToken(null);
      localStorage.removeItem("refreshToken");
      setLoading(false);
      navigate("/login", { replace: true });
      return null;
    } finally {
      setLoading(false);
    }
  };


  const apiGet = async (endpoint, params = {}, setData, callFunc = () => { }) => {
    try {
      console.log(endpoint);
      const freshToken = await checkSession();
      if (!freshToken) return null;

      const res = await axios.get(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${freshToken}`,
        },
        params,
        timeout: 10000,
      });

      setData(res.data);
      callFunc();
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error)
      checkSession();
      const message = error?.response?.data?.error || "Something went wrong.";
      toast.error(message);
      return null;
    }
  };

  
  const apiPost = async (endpoint, body = {}, setButton, myFunc = async () => { }) => {
    try {
      console.log(endpoint);
      console.log(body);
      setButton?.(true);
      const freshToken = await checkSession();
      if (!freshToken) return null;

      const res = await axios.post(`${API_BASE_URL}${endpoint}`, body, {
        headers: {
          Authorization: `Bearer ${freshToken}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      await myFunc();
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      console.log("FULL ERROR =>", error.response);

const data = error?.response?.data;

const message =
  data?.error ||
  data?.message ||
  (Array.isArray(data?.errors) ? data.errors.join(", ") : null) ||
  error.message ||
  "Something went wrong.";

toast.error(message);
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
      setButton?.(false);
    }
  };
  const apiMPost = async (endpoint, body = {}, setButton, myFunc = async () => { }) => {
    try {
      setButton?.(true);
      const freshToken = await checkSession();
      if (!freshToken) return null;

      const res = await axios.post(`${API_EXCEL_URL}${endpoint}`, body, {
        timeout: 10000,
      });

      await myFunc();
      return res.data;
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.error || "Something went wrong.";
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
      setButton?.(false);
    }
  };

  const apiPut = async (endpoint, body = {}, setButton, myFunc = async () => { }) => {
    try {
      setButton?.(true);
      const freshToken = await checkSession();
      if (!freshToken) return null;

      const res = await axios.put(`${API_BASE_URL}${endpoint}`, body, {
        headers: {
          Authorization: `Bearer ${freshToken}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      toast.success("Updated successfully");
      await myFunc();
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.error || "Update failed.";
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
      setButton?.(false);
    }
  };

  const apiDelete = async (endpoint, optionsOrBody = {}, setButton, myFunc = async () => { }) => {
    try {
      setButton?.(true);
      const freshToken = await checkSession();
      if (!freshToken) return null;

      const config = {
        headers: { Authorization: `Bearer ${freshToken}` },
        timeout: 10000,
        ...optionsOrBody,
      };
      const res = await axios.delete(`${API_BASE_URL}${endpoint}`, config);
      const message = res.data.message;
      if (message){
        toast.success(message);
      }
      else{
        toast.success("Deleted Successfully")
      }
      await myFunc();
      return res.data;
    } catch (error) {
      const message = error?.response?.data?.error || "Delete failed.";
      toast.error(message);
      return null;
    } finally {
      setLoading(false);
      setButton?.(false);
    }
  };

  const logoutFunc = async ({ setButton }) => {
    try {
      const data = await apiPost("/logout/", { userId: user?._id }, () => { });
      if (data !== null) {
        setToken(null);
        setUser(null);
        localStorage.removeItem("refreshToken");
        setLoading(false);
        navigate("/login", { replace: true });
      } else {
        checkSession();
        toast.error("Internal Server Error");
      }
    } catch (err) {
      checkSession();
      toast.error("Please connect to internet");
    } finally {
      setButton(false);
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        checkSession,
        apiGet,
        token,
        user,
        loading,
        apiPost,
        apiMPost,
        logoutFunc,
        setUser,
        setToken,
        setLoading,
        apiPut,
        apiDelete,
      }}
    >
      <ToastContainer />
      {children}
    </DataContext.Provider>
  );
};
