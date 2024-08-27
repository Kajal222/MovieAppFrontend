import FooterBg from "../../assets/images/footer.png";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="h-screen w-full bg-pageBackgroundColor relative flex flex-col justify-between items-center overflow-auto">
            <div className="h-full w-full p-0 md:rounded-2xl overflow-auto">
                <Outlet />
            </div>
            <div className="w-full">
                <img src={FooterBg} className="w-full" />
            </div>
        </div >
    );
}

export default UserLayout;