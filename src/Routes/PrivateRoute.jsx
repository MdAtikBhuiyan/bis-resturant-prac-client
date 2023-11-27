import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <span className="loading loading-spinner loading-lg text-center mx-auto mt-40"></span>
    }
    if (user) {
        return children
    }
    return <Navigate to={'/login'} state={{ from: location?.pathname }} replace />
};

export default PrivateRoute;