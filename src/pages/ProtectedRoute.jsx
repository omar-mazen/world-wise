/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticaed } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticaed) navigate("/", { replace: true });
    },
    [isAuthenticaed, navigate]
  );
  return isAuthenticaed ? children : null;
}
