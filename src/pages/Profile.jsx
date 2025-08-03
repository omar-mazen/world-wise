import { useAuth } from "../contexts/AuthContext";
import Logo from "../components/Logo";
import styles from "./profile.module.css";
import SpinnerFullPage from "../components/SpinnerFullPage";
import Button from "../components/Button";
import { useState } from "react";
import { updateUser, updateUserPassword } from "../services/auth";
const Profile = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user?.displayName || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [error, setError] = useState("");
  if (!user) <SpinnerFullPage />;
  async function essentialsDataUpdateHandler(e) {
    e.preventDefault();
    await updateUser({ displayName: userName });
  }
  async function updatePasswordHanlder(e) {
    setError("");
    e.preventDefault();
    if (newPassword != conPassword) {
      setError("Passwords do not match");
      return;
    }
    await updateUserPassword(newPassword);
  }
  console.log(user);
  return (
    <div className={styles.profile}>
      <Logo />
      <form action="" onSubmit={essentialsDataUpdateHandler}>
        <input type="email" value={user?.email} disabled readOnly />
        <input
          type="text"
          name="userName"
          required
          defaultValue={userName || ""}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="user name"
        />
        <span style={{ float: "right" }}>
          <Button type="primary">update</Button>
        </span>
      </form>
      <h2>update password</h2>
      <form onSubmit={updatePasswordHanlder}>
        <input
          defaultValue={oldPassword}
          type="password"
          name="oldPassword"
          placeholder="old password"
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          defaultValue={newPassword}
          required
          type="password"
          name="newPassword"
          placeholder="new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          defaultValue={conPassword}
          required
          type="password"
          name="conPassword"
          placeholder="confirm password"
          onChange={(e) => setConPassword(e.target.value)}
        />
        {error && <p style={{ color: "red", fontSize: "1.4rem" }}>{error}</p>}
        <span style={{ float: "right" }}>
          <Button type="primary">update</Button>
        </span>
      </form>
    </div>
  );
};

export default Profile;
