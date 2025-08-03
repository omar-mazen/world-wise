import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isAuthenticaed } = useAuth();
  function submitHandle(e) {
    e.preventDefault();
    if (email && userName && password) signup(userName, email, password);
  }
  useEffect(
    function () {
      if (isAuthenticaed) navigate("/app/cities", { replace: true });
    },
    [isAuthenticaed, navigate]
  );
  return (
    <main className={styles.login}>
      <NavBar />
      <form className={styles.form} onSubmit={submitHandle}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            required
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="text">User name</label>
          <input
            required
            type="text"
            id="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button
            type={"primary"}
            cssStyle={{ width: "100%", display: "block" }}
          >
            signup
          </Button>
        </div>
        <p style={{ fontSize: "1.4rem" }}>
          Already have an account?
          <Link to={"/login"}>
            <span
              style={{
                color: "var(--color-brand--2)",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            >
              login →
            </span>
          </Link>
        </p>
      </form>
    </main>
  );
}
