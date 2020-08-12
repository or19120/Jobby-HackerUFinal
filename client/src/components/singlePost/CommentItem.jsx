import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";
const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();

  const { loading, user: signedInUser } = useSelector((state) => state.auth);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${_id}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!loading && user === signedInUser._id && (
          <button
            className="btn btn-danger"
            onClick={(e) => dispatch(deleteComment(_id, postId))}
          >
            <i className="fas fa-trash"></i>
            Delete comment
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
