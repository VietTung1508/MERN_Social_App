import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./navBar.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

function NavBar() {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user.user);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="navBar">
      <div className="navBar__search">
        <div className="search-box">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            autoComplete="off"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <button className="btn-search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="navBar__action">
        <Link to="/upload">
          <button className="btn-upload">
            <FontAwesomeIcon className="btn-upload-icon" icon={faPlus} />
          </button>
        </Link>

        {user ? (
          <Link to={`/user/${user.user._id}`}>
            <div className="avatar">
              <span>{user.user.username[0].toUpperCase()}</span>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <button className="btn-login">Log in</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
