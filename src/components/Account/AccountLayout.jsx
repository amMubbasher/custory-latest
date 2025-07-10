import React from "react";
import BaseLayout from "../Layout/Layout";
import AccountSidebar from "./AccountSidebar";
import { Workspace } from "polotno/canvas/workspace";
import { createStore } from "polotno/model/store";
export const polotonoStore = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
  // showCredit: true,
});

const AccountLayout = ({ children, user }) => {
  return (
    <BaseLayout>
      <div className="hidden">
        <Workspace pageControlsEnabled={false} store={polotonoStore} />
      </div>

      <div className="grid grid-cols-[1fr_3.5fr] max-lg:grid-cols-1 items-start gap-10 max-xl:p-6 lg:p-4 3xl:px-20 3xl:py-10">
        <div className="hidden lg:block rounded-md h-full">
          <AccountSidebar user={user} />
        </div>
        <div className="p-2 max-sm:p-0 bg-white w-[100%]   rounded-md">
          {children}
        </div>
      </div>
    </BaseLayout>
  );
};

export default AccountLayout;
