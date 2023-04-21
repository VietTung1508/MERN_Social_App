import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faEdit,
  faEllipsis,
  faHeart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartless } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./comment.scss";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";

function Comment(props) {
  const [formComment, setFormComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state) => {
    if (state.user.user === null) {
      return state.user.user;
    } else if (state.user.user !== null && !state.user.user.user) {
      return state.user.user;
    } else {
      return state.user.user.user;
    }
  });

  const activeComment = props.activeComment;
  const setActiveComment = props.setActiveComment;
  const newComment = props.newComment;
  const setNewComment = props.setNewComment;
  const setConfirmDeleteModal = props.setConfirmDeleteModal;
  const comment = props.comment;
  const parentId = props.parentId || null;

  let id;

  parentId ? (id = parentId) : (id = comment._id);

  useEffect(() => {
    if (!user) return;
    if (comment.userLike) {
      const isLike = comment.userLike.some((el) => el === user._id);
      setIsLiked(isLike);
    }
  }, [comment.userLike, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(`comments/${id}/child`, {
        parentId: id,
        author: user._id,
        content: formComment,
      });
      setFormComment("");
      setActiveComment(null);
      setNewComment(!newComment);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(
        `comments/${comment._id}?isChild=${parentId ? true : false}`,
        {
          content: formComment,
        }
      );
      setFormComment("");
      setActiveComment(null);
      setNewComment(!newComment);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLikeComment = async () => {
    try {
      await axiosClient.post(
        `/comments/${comment._id}/likeComment?isChild=${
          parentId ? true : false
        }`,
        {
          userId: user._id,
        }
      );
      setIsLiked(!isLiked);
      setNewComment(!newComment);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = () => {
    setConfirmDeleteModal({
      modal: true,
      id: comment._id,
      isChild: parentId ? true : false,
    });
    setActiveComment(null);
  };

  const handleEdit = () => {
    setActiveComment({
      id: comment._id,
      type: "Edit",
    });
    setFormComment(comment.content);
  };

  const handleReply = () => {
    setActiveComment({
      id: comment._id,
      type: "Reply",
    });
    setFormComment(`@${comment.author.username}`);
  };

  const handleActions = () => {
    setActiveComment({
      id: comment._id,
      type: "Actions",
    });
    setFormComment(`@${comment.author.username}`);
  };

  return (
    <div className="comment">
      <Link to={`/user/${comment.author._id}`}>
        {comment.author.avatar ? (
          <div className="comment__avatar">
            <img src={comment.author.avatar.url} alt="" draggable="false" />
          </div>
        ) : (
          <div className="comment__anonymous-avatar">
            <span>{comment.author.username[0].toUpperCase()}</span>
          </div>
        )}
      </Link>
      <div className="comment__info">
        <div className="comment__info__user">
          <Link to={`/user/${comment.author._id}`}>
            <span className="comment-username">{comment.author.username}</span>
          </Link>
          <span className="comment-content">{comment.content}</span>
        </div>
        <div className="comment__info__action">
          <h5 className="time">
            {moment(new Date(comment.createdAt)).fromNow()}
          </h5>
          <Fragment>
            {user && (
              <h5 className="reply" onClick={handleReply}>
                Reply
              </h5>
            )}

            <h5 className="likeCount">
              {user && (
                <Fragment>
                  {isLiked ? (
                    <span onClick={handleLikeComment}>
                      <FontAwesomeIcon icon={faHeart} className="icon-heart" />
                    </span>
                  ) : (
                    <span onClick={handleLikeComment}>
                      <FontAwesomeIcon
                        icon={heartless}
                        className="icon-heartless"
                      />
                    </span>
                  )}
                  <span>{comment.like === 0 ? "" : comment.like}</span>
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  <FontAwesomeIcon icon={faHeart} className="icon-heart" />
                  <span>{comment.like === 0 ? "" : comment.like}</span>
                </Fragment>
              )}
            </h5>
          </Fragment>

          {user && comment.author._id === user._id && (
            <div className="actions-wrapper">
              <FontAwesomeIcon
                icon={faEllipsis}
                className="actions-icon"
                onClick={handleActions}
              />
              {
                <div
                  className={`actions-list ${
                    activeComment &&
                    activeComment.type === "Actions" &&
                    activeComment.id === comment._id
                      ? "active"
                      : ""
                  }`}
                >
                  <div className="action-item" onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                    <h5 className="edit-comment">Edit</h5>
                  </div>
                  <div className="action-item" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />
                    <h5 className="delete">Delete</h5>
                  </div>
                  <div
                    className="action-item"
                    onClick={() => {
                      setActiveComment(null);
                    }}
                  >
                    <FontAwesomeIcon icon={faCancel} />
                    <h5 className="cancel">Cancel</h5>
                  </div>
                </div>
              }
            </div>
          )}
        </div>

        <form
          className={`replyForm ${
            activeComment &&
            activeComment.type === "Reply" &&
            activeComment.id === comment._id
              ? "active"
              : ""
          }`}
          onSubmit={handleSubmit}
        >
          <textarea
            className="reply-inp"
            value={formComment}
            onChange={(e) => {
              setFormComment(e.target.value);
            }}
            placeholder="Reply..."
          ></textarea>
          <div className="reply-action">
            <button
              className="btn-cancle"
              onClick={() => setActiveComment(null)}
              type="button"
            >
              Cancle
            </button>
            <button
              className={`btn-reply ${formComment !== "" ? "active" : ""}`}
              type="submit"
            >
              Reply
            </button>
          </div>
        </form>
        <form
          className={`editForm ${
            activeComment &&
            activeComment.type === "Edit" &&
            activeComment.id === comment._id
              ? "active"
              : ""
          }`}
          onSubmit={handleSubmitEdit}
        >
          <textarea
            className="edit-inp"
            value={formComment}
            onChange={(e) => {
              setFormComment(e.target.value);
            }}
          ></textarea>
          <div className="edit-action">
            <button
              className="btn-cancle"
              onClick={() => setActiveComment(null)}
              type="button"
            >
              Cancle
            </button>
            <button
              className={`btn-edit ${formComment !== "" ? "active" : ""}`}
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
        <div className="childComments">
          {comment.childComments &&
            comment.childComments.length > 0 &&
            comment.childComments.map((childComment, id) => (
              <Comment
                key={id}
                comment={childComment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                parentId={comment._id}
                newComment={newComment}
                setNewComment={setNewComment}
                setConfirmDeleteModal={setConfirmDeleteModal}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Comment);
