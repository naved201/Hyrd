import { Link } from "react-router-dom";
import "../styles/header.css";

import profileIcon from "../assets/icons/profile-icon.png";
import settingsIcon from "../assets/icons/settings-icon.png";

export default function Header() {
  return (
    <header className="site-header">
      <div
        className="inner"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to="/" className="logo">
          <span className="logo-cap">H</span>YRD
        </Link>

        <div className="web-icons">
          <img className="profile-icon" src={profileIcon} alt="Profile" />
          <img className="settings-icon" src={settingsIcon} alt="Settings" />
        </div>
      </div>
    </header>
  );
}
