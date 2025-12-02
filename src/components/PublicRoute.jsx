import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PublicRoute({ children }) {
    const uid = Cookies.get("uid");

    // If user is logged in, redirect to /dashboard
    if (uid) {
        return <Navigate to="/dashboard" replace />;
    }

    // Otherwise, allow access
    return children;
}
