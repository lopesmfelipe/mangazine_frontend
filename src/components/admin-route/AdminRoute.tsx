import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Axios from "axios";

interface User {
  role: String;
}

const AdminRoute = ({ element: Element, ...rest }) => {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure that 'userId' is available from 'useAuth()' when the component mounts
    if (userId) {
      console.log(userId);

      // Fetch user role
      Axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`)
        .then((response) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user?.role === "admin" ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/home" />
  );
};
export default AdminRoute;
