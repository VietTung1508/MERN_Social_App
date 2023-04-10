import "./sideBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSideBar } from "../../redux/modeSlice";

const pages = [
  {
    icon: faHouse,
    page: "Home",
    path: "/",
  },
  {
    icon: faUser,
    page: "Following",
    path: "/following",
  },
  {
    icon: faPlus,
    page: "Upload",
    path: "/upload",
  },
];

const categories = [
  {
    img: "https://i.pinimg.com/474x/23/dd/93/23dd932e24c1709f5f69710a19ad819c.jpg",
    cate: "Cars",
  },
  {
    img: "https://i.pinimg.com/474x/42/72/e1/4272e100cfbabbbd64c20ae1a111726a.jpg",
    cate: "Anime",
  },
  {
    img: "https://i.pinimg.com/474x/dd/97/62/dd97627217ce79e5ae7afe13428c1c99.jpg",
    cate: "Japan",
  },
  {
    img: "https://i.pinimg.com/474x/b5/3e/1c/b53e1c921aca9e6a105a8e1bb5e0bd7f.jpg",
    cate: "Nature",
  },
  {
    img: "https://i.pinimg.com/474x/e2/fd/29/e2fd291b8d860f5de90fbfc195edfe44.jpg",
    cate: "Gaming",
  },

  {
    img: "https://i.pinimg.com/474x/16/38/44/163844c229331ee646efb57779f85a5f.jpg",
    cate: "Animal",
  },

  {
    img: "https://i.pinimg.com/474x/6d/e8/9c/6de89c703f7ee7057ec94f846d1e352e.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/6d/e8/9c/6de89c703f7ee7057ec94f846d1e352e.jpg",
    cate: "Rock",
  },
  {
    img: "https://i.pinimg.com/474x/6d/e8/9c/6de89c703f7ee7057ec94f846d1e352e.jpg",
    cate: "Rock",
  },
];

function SideBar() {
  const { pathname } = useLocation();
  const sidebar = useSelector((state) => state.mode.sideBar);
  const dispatch = useDispatch();

  const handleSidebar = () => {
    dispatch(setSideBar());
  };

  return (
    <div className={`sidebar ${sidebar ? "" : "close"}`}>
      <div className="sidebar__topSidebar">
        <FontAwesomeIcon
          className="bar"
          icon={faBars}
          onClick={handleSidebar}
        />
        <Link to="/">
          <div className="brand">
            <img className="logo" src="/images/logo.png" />
            <h4 className="brandName">MEMORIES</h4>
          </div>
        </Link>
      </div>
      <div className="sidebar__pages">
        {pages.map((page, id) => (
          <Link to={page.path} key={id}>
            <div
              className={`sidebar__pages__page ${
                pathname === page.path ? "active" : ""
              }`}
            >
              <FontAwesomeIcon className="icon" icon={page.icon} />
              <h3>{page.page}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="sidebar__categories">
        <h4 className="sidebar__categories__title">Discovery Categories</h4>
        {categories.map((category, id) => (
          <Link to={`/?category=${category.cate.toLowerCase()}`} key={id}>
            <div className="sidebar__categories__category">
              <img className="cate-img" src={category.img} />
              <h4 className="cate-title">{category.cate}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
