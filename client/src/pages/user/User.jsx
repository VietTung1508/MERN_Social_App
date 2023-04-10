import "./user.scss";
import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import Masonary from "../../components/masonary/Masonary";
import { useSelector } from "react-redux";

function User() {
  const [user, setUser] = useState(null);
  const [createdPin, setcreatedPin] = useState(true);
  const { userId } = useParams();

  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosClient.get(`users/${userId}`);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();

    return () => {
      setUser(null);
    };
  }, [userId]);

  return (
    <div className="userPage container">
      {user && (
        <div className="user">
          {user.avatar ? (
            <div className="user-avatar">
              <img src={user.avatar.url} alt="" />
            </div>
          ) : (
            <div className="user-anonymous-avatar">
              <span>{user.username[0].toUpperCase()}</span>
            </div>
          )}
          <div className="user-info">
            <h1 className="username">{user.username}</h1>
            <p className="email">{user.email}</p>
            <div className="user-actions">
              {currentUser.user._id === user._id ? (
                <button>Edit Profile</button>
              ) : (
                <button>Follow</button>
              )}
            </div>
            <div className="user-filter-pin">
              <button
                className={`btn-created ${createdPin ? "active" : ""}`}
                onClick={() => {
                  setcreatedPin(true);
                }}
              >
                Created
              </button>
              <button
                className={`btn-saved ${createdPin ? "" : "active"}`}
                onClick={() => {
                  setcreatedPin(false);
                }}
              >
                Saved
              </button>
            </div>
          </div>
          <Masonary user={user} savePin={!createdPin && user.savedPin} />
        </div>
      )}
    </div>
  );
}

export default User;
