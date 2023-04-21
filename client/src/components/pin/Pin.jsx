import "./pin.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosClient from "../../api/axiosClient";

function Pin(props) {
  const pin = props.data;
  const savedPin = props.savedPin;
  const refData = props.refData;
  const [isSaved, setIsSaved] = useState(false);
  const currentUser = useSelector((state) => {
    if (state.user.user === null) {
      return state.user.user;
    } else if (state.user.user !== null && !state.user.user.user) {
      return state.user.user;
    } else {
      return state.user.user.user;
    }
  });

  useEffect(() => {
    if (savedPin && pin) {
      setIsSaved(savedPin.some((el) => el._id === pin._id));
    }
  }, [savedPin, pin]);

  const handleSavedPin = async () => {
    try {
      await axiosClient.post(`users/${pin._id}`, { userId: currentUser._id });
      setIsSaved(!isSaved);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="pin" ref={refData ? refData : null}>
      <div className="pin__actions">
        <a href={pin.image.url}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="pin-download" />
        </a>
        {currentUser && (
          <button
            className={`pin-save ${isSaved && "active"}`}
            onClick={handleSavedPin}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        )}
      </div>
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
