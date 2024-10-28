import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { FC, ReactNode } from "react";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: FC<ProtectedProps> = ({ children }) => {
  const { user, isLoading } = useAuth() as any;
  if (isLoading) {
    return null;
  }
  return <>{user ? children : <Navigate to={"/"} />}</>;
};

export default Protected;
