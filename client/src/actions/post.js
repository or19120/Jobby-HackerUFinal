import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS_ERR,
  GET_POSTS,
  GET_POST,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./const";

//getting all posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
//ADDING OR REMOVING A LIKE
export const likeOrUnlike = (postId, action = "like") => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/${action}/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
//ADD POST
export const addPost = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = JSON.stringify({ text: data });

    const res = await axios.post("/api/posts/", req, config);
    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post Added", "success"));
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
//DELETE POST
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert("Post Deleted", "danger"));
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

//get post by id
export const getPostById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

//COMMENT ON POST
export const addComment = (data, postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = JSON.stringify({ text: data });
    const res = await axios.post(`/api/posts/comment/${postId}`, req, config);
    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};

//Delete comment
export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({ type: DELETE_COMMENT, payload: commentId });
    dispatch(setAlert("Comment Removed", "danger"));
  } catch (error) {
    dispatch({
      type: GET_POSTS_ERR,
      payload: {
        msg: error.response,
        status: error.response.status,
      },
    });
  }
};
