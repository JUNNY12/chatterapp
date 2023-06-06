import { Navbar } from "../modules";
import { Outlet } from "react-router";

export const ProfileUserLayout = (): React.JSX.Element => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}