import {
  GET_POSTS,
  GET_POSTS_ERR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/const";
const initialState = {
  allPosts: [],
  post: null,
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, allPosts: action.payload, loading: false };
    case GET_POSTS_ERR:
      return { ...state, loading: false, errors: action.payload };
    case UPDATE_LIKES:
      return {
        ...state,
        allPosts: state.allPosts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };
    case ADD_POST:
      return {
        ...state,
        allPosts: [action.payload, ...state.allPosts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        allPosts: state.allPosts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
}
