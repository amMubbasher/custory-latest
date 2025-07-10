import React, { useState } from "react";
import useAppStore from "../../hooks/useAppStore";
import BasicModal from "../common/BasicModal";
import ForgotPasswordView from "./ForgotPasswordView";
import LoginView from "./LoginView";
import RegisterView from "./RegisterView";

export const AUTH_MODAL_STATES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
};

const AuthModal = () => {
  const showAuthModal = useAppStore((state) => state.showAuthModal);
  const setShowAuthModal = useAppStore((state) => state.setShowAuthModal);
  const view = useAppStore((state)=> state.view);
  const setView = useAppStore((state)=> state.setView)

  return (
    <BasicModal
      open={showAuthModal}
      handleClose={() => {setShowAuthModal(false); setView(AUTH_MODAL_STATES.LOGIN)}}
    >
      <div className="w-[35vw] max-lg:w-[70vw] max-md:w-[80vw] max-sm:w-[90vw] max-xs:w-[96vw] max-w-[800px] h-auto px-5 pb-16 py-2">
        {view === AUTH_MODAL_STATES.LOGIN && (
          <LoginView
            setView={setView}
            handleClose={() => setShowAuthModal(false)}
          />
        )}
        {view === AUTH_MODAL_STATES.REGISTER && (
          <RegisterView
            setView={setView}
            handleClose={() => setShowAuthModal(false)}
          />
        )}
        {view === AUTH_MODAL_STATES.FORGOT_PASSWORD && (
          <ForgotPasswordView
            setView={setView}
            handleClose={() => setShowAuthModal(false)}
          />
        )}
      </div>
    </BasicModal>
  );
};

export default AuthModal;
