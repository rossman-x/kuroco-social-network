import { useState } from "react";
import avatarImage from "~/assets/avatar.png";
import settingsImage from "~/assets/settings.png";
import useInfo from "~/hooks/useInfo";
import AlertComponent from "./alert-component";

const AppHeader = () => {
  const me = useInfo();
  const [isDropDownVisible, setDropDownVisibility] = useState(false);
  return me ? (
    <div
      data-testid="app-header-main"
      className="w-100 bg-sky-50/100 m-4 h-24 rounded-lg app-header-main"
    >
      <div className="app-header-left">
        <img
          className="p-4 h-24 rounded-full"
          alt="Avatar"
          src={me.avatar ? me.avatar : avatarImage}
        />
        <div>
          <h3 className="text-lg font-bold sans-serif">
            {me.firstName} {me.lastName}
          </h3>
          <h5 className="text-sm sans-serif">Member</h5>
        </div>
      </div>
      <div className="w-24">
        <img
          className="p-8 h-24"
          src={settingsImage}
          alt="Settings"
          onClick={() => setDropDownVisibility(!isDropDownVisible)}
        />
        <div
          id="dropdown"
          className={`z-10 ${
            isDropDownVisible ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700`}
        >
          <ul
            className="py-1 pl-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li
              className="cursor-pointer"
              onClick={() => {
                localStorage.clear();
                window.location.href = "./login";
              }}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <AlertComponent
      title="Cannot fetch data"
      content="Cannot fetch user information."
      action={() => (window.location.href = "/login")}
    />
  );
};

export default AppHeader;
