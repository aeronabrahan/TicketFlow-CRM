import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {

    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;