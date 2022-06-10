import avatarImage from "~/assets/avatar.png";
import settingsImage from "~/assets/settings.png";
import useInfo from "~/hooks/useInfo";
import AlertComponent from "./alert-component";

const AppHeader = () => {
  const me = useInfo();
  return me ? (
    <div className="w-100 bg-sky-50/100 m-4 h-24 rounded-lg app-header-main">
      <div className="app-header-left">
        <img
          className="p-4 h-24 rounded-full"
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
        <img className="p-8 h-24" src={settingsImage} />
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
