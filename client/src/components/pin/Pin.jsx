import "./pin.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Pin(props) {
  const pin = props.data;
  return (
    <div className="pin">
      <a href={pin.image.url}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="pin__download" />
      </a>
      <Link to={`/posts/${pin._id}`}>
        <img src={pin.image.url} alt="" className="pin__img" loading="lazy" />

        <h4 className="pin__info">
          {pin.title} - {pin.author.username}
        </h4>
      </Link>
    </div>
  );
}

export default Pin;
