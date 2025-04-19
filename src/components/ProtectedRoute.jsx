import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const { auth } = useAuth();

    if (!auth?.accessToken) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}

export default ProtectedRoute;