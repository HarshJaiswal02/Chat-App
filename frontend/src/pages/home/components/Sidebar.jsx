import Conversations from "../../../globalComponent/sidebar/Conversations";
import LogoutButton from "../../../globalComponent/sidebar/LogoutButton";
import SearchInput from "../../../globalComponent/sidebar/SearchInput";

const Sidebar = () => {
  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col">
        <SearchInput />
        <div className="divider px-3"></div>
        <Conversations />
        <LogoutButton />
      </div>
    </>
  );
};
export default Sidebar;
