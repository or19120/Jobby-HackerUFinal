import React, { useState } from "react";
import { addComment } from "../../actions/post";
import { useDispatch } from "react-redux";
const CommentForm = (props) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(text, props.post));
  };
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Comment</h3>
      </div>
      <form onSubmit={handleSubmit} className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
