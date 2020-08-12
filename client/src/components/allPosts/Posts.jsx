import React, { useEffect } from "react";
import { getAllPosts } from "../../actions/post";
import Loader from "../layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
const Posts = () => {
  const { allPosts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [getAllPosts]);
  return loading ? (
    <Loader />
  ) : (
    <section className="container">
      <h1 className="text-primary large">Posts</h1>
      <p className="lead">
        Welcome! Here you will be able to talk to each other!
      </p>
      <PostForm />
      <div className="posts">
        {allPosts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Posts;
