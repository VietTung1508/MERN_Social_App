import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./navBar.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import SearchItem from "../searchItem/SearchItem";

function NavBar() {
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getSearch = setTimeout(async () => {
      if (search === "" || search.trim() === "") {
        return;
      }
      const res = await axiosClient.get(`posts/search/?q=${search}`);
      setSearchArray(res.data);
    }, 1000);

    return () => {
      clearTimeout(getSearch);
    };
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log(searchArray);

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

        <div className="search-results">
          {searchArray &&
            searchArray.map((item, i) => <SearchItem data={item} key={i} />)}
        </div>
      </div>
      <div className="navBar__action">
        <Link to="/upload">
          <button className="btn-upload">
            <FontAwesomeIcon className="btn-upload-icon" icon={faPlus} />
          </button>
        </Link>

        {user ? (
          <Link to={`/user/${user.user._id}`}>
            {user.user.avatar ? (
              <div className="avatar">
                <img src={user.user.avatar.url} alt="" draggable="false" />
              </div>
            ) : (
              <div className="anonymous-avatar">
                <span>{user.user.username[0].toUpperCase()}</span>
              </div>
            )}
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
