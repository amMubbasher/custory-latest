import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import create from "zustand";
import { persist } from "zustand/middleware";
import { loginUserAPI, registerUserAPI, fetchUserAPI } from "../api/auth.api";
import useAppStore from "./useAppStore";

export const APP_AUTH_KEY = "CUSTORY_AUTH";

// Get UserById

export const useFetchUser = () => {
  const setUser = useAppStore((state) => state.setUser);
  const authData = localStorage.getItem('CUSTORY_AUTH');
  const userId = authData ? JSON.parse(authData)?.user?.id : null; // Extract userId
  const fetchUser = useQuery(['user', userId],() => fetchUserAPI(userId), {
      onError: (error) => {
        toast.error(error?.response?.data?.message);
      },
      select: (data) => setUser(data),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: !!userId, // Only run the query if userId exists
      retry: 0,
    }
  );
  return {
    fetchUser,
  };
};

export const isLoggedinUser = () => {
  const authLocal = localStorage.getItem(APP_AUTH_KEY);
  if (authLocal) {
    let data = JSON.parse(authLocal);
    if (data?.token && data?.user) {
      return { state: true, user: data?.user, token: data?.token };
    }
    return { state: false, user: false, token: false };
  }
  return { state: false, user: false, token: false };
};

const useAuth = (props = {}) => {
  const {
    loginSuccessCallback = () => {},
    loginErrorCallback = () => {},
    registerSuccessCallback = () => {},
    registerErrorCallback = () => {},
  } = props;
  const isLoggedin = useAppStore(state=>state.isLoggedin);
  const setIsLoggedin = useAppStore(state=>state.setIsLoggedin);
  const user = useAppStore(state=>state.user);
  const setUser = useAppStore(state=>state.setUser);
  const setOrders = useAppStore(state=>state.setOrders);
  const queryClient = useQueryClient();
  const clearCartDetails = useAppStore(state=>state.clearCartDetails);


  const setLoginState = (user, token) => {
    if (!user || !token) return;

    localStorage.setItem(APP_AUTH_KEY, JSON.stringify({ user, token }));
    setIsLoggedin(true);

    setUser(user);
  };

  const setLogoutState = () => {
    setIsLoggedin(false);
    setUser(null);
    localStorage.removeItem(APP_AUTH_KEY);
    localStorage.clear();
    setOrders([]);
    clearCartDetails();
  };

  useEffect(() => {
    const authLocal = localStorage.getItem(APP_AUTH_KEY);
    if (authLocal) {
      let data = JSON.parse(authLocal);
      if (data?.token && data?.user) {
        setLoginState(data?.user, data?.token);
      }
    }

    const onStorageChange = () => {
      try {
        const auth = localStorage.getItem(APP_AUTH_KEY);
        if (!auth) setLogoutState();
        let data = JSON.parse(auth);
        setLoginState(data?.user, data?.token);
      } catch (err) {
        setLogoutState();
      }
    };
    onStorageChange();
    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  const {
    mutateAsync: loginUser,
    isLoading: isLoginUserLoading,
    isError: isLoginUserError,
    error: loginUserError,
  } = useMutation(loginUserAPI, {
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Loggedin successfully!");
      setLoginState(data?.user, data?.token);
      setIsLoggedin(true);
      if (typeof loginSuccessCallback !== "undefined")
        loginSuccessCallback(data);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
      if (loginErrorCallback) loginErrorCallback(err);
    },
  });

  const {
    mutateAsync: registerUser,
    isLoading: isRegisterUserLoading,
    isError: isRegisterUserError,
    error: registerUserError,
  } = useMutation(registerUserAPI, {
    onSuccess: (data) => {
      toast.dismiss();
      toast.success("Account has been created successfully!");
      if (registerSuccessCallback) registerSuccessCallback(data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
      if (registerErrorCallback) registerErrorCallback(error);
    },
  });

  return {
    isLoggedin,
    user,
    loginUser,
    isLoginUserLoading,
    isLoginUserError,
    loginUserError,
    registerUser,
    setLogoutState,
    isRegisterUserLoading,
    isRegisterUserError,
    registerUserError,
  };
};

export default useAuth;
