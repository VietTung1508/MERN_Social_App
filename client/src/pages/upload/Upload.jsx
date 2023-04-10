import { Fragment, useEffect, useState } from "react";
import "./upload.scss";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

function Upload() {
  const [postImage, setPostImage] = useState(null);
  const [value, setValue] = useState({
    title: "",
    image: "",
    content: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    return () => {
      postImage && URL.revokeObjectURL(postImage);
    };
  }, [postImage]);

  const handlePreImage = (e) => {
    const img = URL.createObjectURL(e.target.files[0]);
    setPostImage(img);
    setValue({ ...value, image: e.target.files[0] });
  };

  const handleChangeValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("title", value.title);
    data.append("image", value.image);
    data.append("content", value.content);
    data.append("category", value.category.toLowerCase());
    try {
      await axios.post(`http://localhost:5000/posts/${user.user._id}`, data, {
        "content-type": "multipart/form-data",
      });
      setIsLoading(false);
      navigate("/");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="upload container">
      {isLoading ? (
        <Loading isUpload />
      ) : (
        <form
          className="form-upload"
          onSubmit={handleUpload}
          encType="multipart/form-data"
        >
          <div className="upload-img-wrapper">
            {!postImage ? (
              <div className="upload-noImage">
                <input
                  type="file"
                  className="inp-image"
                  name="image"
                  onInput={handlePreImage}
                  required
                />
                <h3>Click on to preview image !</h3>
              </div>
            ) : (
              <Fragment>
                <img src={postImage} alt="" className="post-image" />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  className="delete-icon"
                  onClick={() => {
                    setPostImage(null);
                  }}
                />
              </Fragment>
            )}
          </div>
          <div className="upload-info">
            <input
              type="text"
              name="title"
              className="inp-title"
              placeholder="Add your title"
              autoComplete="off"
              value={value.title}
              onChange={handleChangeValue}
              required
            />
            <div className="upload-author">
              <div className="avatar">
                <span>{user && user.user.username[0]}</span>
              </div>
              <h4 className="author-username">{user && user.user.username}</h4>
            </div>
            <input
              type="text"
              name="content"
              className="inp-content"
              placeholder="Tell everyone what your pin is about"
              autoComplete="off"
              value={value.content}
              onChange={handleChangeValue}
            />
            <input
              type="text"
              name="category"
              className="inp-category"
              placeholder="Add category"
              autoComplete="off"
              required
              value={value.category}
              onChange={handleChangeValue}
            />
            <button className="btn-upload" type="submit">
              Upload
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Upload;
