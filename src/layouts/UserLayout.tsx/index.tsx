import { useEffect } from "react";
import FooterBg from "../../assets/images/footer.png";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    const tokenValue = sessionStorage.getItem("authToken")
    useEffect(() => {
        window.scrollTo(0, 0);
        // sessionStorage.removeItem("authToken");  
        if (tokenValue && tokenValue.length > 0) {
            // navigate("/dashboard");
        }
    }, [tokenValue]);

    return (
        <div className="h-screen w-full bg-pageBackgroundColor relative flex flex-col justify-between items-center overflow-auto">
            <div className="h-full w-full p-0 md:rounded-2xl overflow-auto">
                <Outlet />
            </div>
            <div>
                <img src={FooterBg} />
            </div>
        </div >
    );
}

export default UserLayout;