import { Outlet } from "react-router-dom"; // Ensure correct import
import Navbar from "./Navbar";

const AppLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default AppLayout;
