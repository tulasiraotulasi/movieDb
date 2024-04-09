import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");

  const updateUser = (event) => {
    setUserInput(event.target.value);
  };

  const onCheckUserInput = () => {
    if (userInput.length === 0) {
      return;
    } else {
      navigate(`/searchpage/${userInput}`);
    }
  };

  return (
    <nav className="header-container">
      <div className="logo-and-title-container">
        <h1 className="title">MovieDb</h1>
      </div>

      <div className="menuBar">
        <ul className="nav-items-list">
          <li className="link-item">
            <Link className="route-link" to="/">
              Popular
            </Link>
          </li>
          <li className="link-item">
            <Link className="route-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="link-item">
            <Link className="route-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>
        <div className="headright">
          <input
            id="searchBar"
            className="searchBar"
            type="text"
            placeholder="search..."
            value={userInput}
            onChange={updateUser}
          />
          <button type="button" className="btn" onClick={onCheckUserInput}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
