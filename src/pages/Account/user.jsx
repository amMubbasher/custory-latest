import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Divider } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { editUserAPI, editUserPassword } from "../../api/auth.api";
import AccountLayout from "../../components/Account/AccountLayout";
import useAppStore from "../../hooks/useAppStore";
import { isLoggedinUser, APP_AUTH_KEY, useFetchUser } from "../../hooks/useAuth";
import useAuth from "../../hooks/useAuth";
import { useFetchAdminOrders, useFetchGifts } from "../../hooks/useGifts";

const InputField = (props) => {
  const {
    id,
    name,
    placeholder,
    type,
    value,
    label,
    onChangeHandler,
    editMode,
    autofocus,
  } = props;

  const inputRef = useRef(null);

  useEffect(() => {
    if (autofocus && editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autofocus, editMode]);

  return (
    <div className="font-poppins">
      <label htmlFor={id} className="text-primary text-sm font-semibold">
        {label}
      </label>
      <div>
        <input
          ref={inputRef}
          name={name}
          type={type}
          onChange={onChangeHandler}
          id={id}
          disabled={!editMode}
          placeholder={placeholder}
          value={value}
          className="py-[8px] disabled:bg-white w-[94%] border-b-2"
        />
      </div>
    </div>
  );
};
const  INITIAL_FORM = {
  firstName : "",
  lastName : "",
  email : "",
  address : "",
}

const Password_INITIAL_FORM = {
  currentPassword : "",
  newPassword : "",
  confirmNewPassword : "",
}

const UserPage = () => {
  const user = useAppStore(state=>state.user);
  const orders = useAppStore(state=>state.orders);
  const {setLogoutState} = useAuth();
  const [userForm, setUserForm] = useState(INITIAL_FORM);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordForm, setPasswordForm] = useState(Password_INITIAL_FORM);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const { fetchUser } = useFetchUser();
  const {id} = useParams();
  const { role } = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user || {};
  const fetchGifts = role === "admin" ? useFetchAdminOrders()?.fetchGifts : useFetchGifts()?.fetchGifts;

  useEffect(() => {
    if (user) setUserForm(user);
  }, [(user && !id)]);

  useEffect(() => {
    if (id) {
      const findObj = orders.find((order)=> order?.userId == id);
      if(findObj){
        setUserForm({
          firstName : findObj?.customerFirstName,
          lastName : findObj?.customerLastName,
          email : findObj?.customerEmail,
          address : findObj?.customerAddress,
        })
      }
    };
  }, [id,orders]);

  const handleChange = (e) => {
    if(editMode){
      setUserForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
    if(passwordEditMode){
      setPasswordForm((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });    }
    setError("");
  };
  const {isLoading : userUpdaeLoading,mutate : userUpdateCall} = useMutation(editUserAPI, {
    onSuccess : (data)=>{
      const authData = isLoggedinUser()
      localStorage.setItem(APP_AUTH_KEY, JSON.stringify({user : data.user,token : authData.token}));
      toast.success('User has been updated successfully!');
      setEditMode(false);
      fetchUser?.refetch();
    },
    onError : (error)=>{
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  })

  const {isLoading : passwordUpdateLoading,mutate : passwordUpdateCall} = useMutation(editUserPassword, {
    onSuccess : (data)=>{
      setPasswordEditMode(false);
      toast.success('Password has been updated successfully!');
      setTimeout(() => navigate('/'), 1000);
      setTimeout(() => setLogoutState(), 2000);
      // setLogoutState();
    },
    onError : (error)=>{
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }
  })

  // const router = useRouter()
  const handleSubmit = () => {
    userUpdateCall({
      data : userForm
    });
  };
  const navigate = useNavigate();
  return (
    <AccountLayout user={user}>
      <div className="p-3 font-poppins lg:p-4">
        <div className="text-2xl font-semibold flex gap-4 items-center"><MdArrowBack onClick={()=>navigate('/account')} className="hidden max-md:block"/>USER DETAILS</div>
        {editMode && (
          <div className="text-green-600 text-sm mt-1">
            You are in Edit Mode, You can change any field and save the changes. Do ensure all the fields are populated before saving
          </div>
        )}
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        <div className="mt-5 space-y-7 lg:space-y-0">
          <div className="w-full">
            <div className="text-gray-700 font-poppins">LOGIN DETAILS</div>
            <div className="mt-6 space-y-5 w-full">
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
              <InputField
                value={userForm?.firstName || ''}
                editMode={editMode}
                autofocus={editMode}
                onChangeHandler={handleChange}
                name="firstName"
                label="First Name"
                type="text"
                placeholder="Edit Your First Name (Required)"
              />
              <InputField
                value={userForm?.lastName || ''}
                editMode={editMode}
                onChangeHandler={handleChange}
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Edit Your Last Name (Required)"
              />
              </div>
              <InputField
                value={userForm?.address || ''}
                editMode={editMode}
                onChangeHandler={handleChange}
                name="address"
                label="Address"
                type="text"
                placeholder="Edit Your Primary Address (Required)"
              />
            </div>
          </div>

        </div>
        <div className="flex space-x-3 my-8">
          {!editMode && (
            <button
              className="p-2 bg-primary text-white w-fit rounded-md cursor-pointer disabled:cursor-not-allowed disabled:hidden"
              disabled={id}
              onClick={() => setEditMode(true)}
            >
              Edit User Detail
            </button>
          )}
          {editMode && (
            <button
              disabled={!userForm.firstName || !userForm.lastName || !userForm.address}
              className="p-2 bg-primary disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed text-white w-fit rounded-md"
              onClick={handleSubmit}
            >
              {userUpdaeLoading?'Loading...':'Save'}
            </button>
          )}
        </div>
        {!id && 
          <>
            <Divider />
            <div className="mt-5 space-y-7 lg:space-y-0">
              <div className="w-full">
                <div className="text-gray-700 font-poppins">CHANGE PASSWORD</div>
                <div className="mt-6 space-y-5 w-full">
                  <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
                  <InputField
                    value={passwordForm?.currentPassword || ''}
                    editMode={passwordEditMode}
                    autofocus={passwordEditMode}
                    onChangeHandler={handleChange}
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    placeholder="Enter Your Current Password (Required)"
                  />
                  <InputField
                    value={passwordForm?.newPassword || ''}
                    editMode={passwordEditMode}
                    onChangeHandler={handleChange}
                    name="newPassword"
                    label="New Password"
                    type="password"
                    placeholder="Enter Your New Password (Required)"
                  />
                  </div>
                  <InputField
                    value={passwordForm?.confirmNewPassword}
                    editMode={passwordEditMode}
                    onChangeHandler={handleChange}
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm Your New Password (Required)"
                  />
                  {passwordError && <span className="text-red-400">{passwordError}</span>}
                </div>
              </div>

            </div>
            <div className="flex space-x-3 my-8">
              {!passwordEditMode && (
                <div
                  className="p-2 bg-primary text-white w-fit rounded-md cursor-pointer"
                  onClick={() => setPasswordEditMode(true)}
                >
                  Edit Password
                </div>
              )}
              {passwordEditMode && (
                <button
                disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword}
                className="p-2 bg-primary disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed text-white w-fit rounded-md"
                  onClick={()=> {
                    const { newPassword, confirmNewPassword, currentPassword } = passwordForm;
                    if(currentPassword === newPassword){
                      setPasswordError("New password can't be the same as the current password")
                    }else if(newPassword !== confirmNewPassword){
                      setPasswordError("Confirm Password doesn't match")
                    }else{
                      const payload = { ...passwordForm, user }
                      passwordUpdateCall({
                        data: payload
                      })
                    }
                  }}
                >
                  {passwordUpdateLoading?'Loading...':'Save'}
                </button>
              )}
            </div>
          </>
        }
      </div>
    </AccountLayout>
  );
};

export default UserPage;