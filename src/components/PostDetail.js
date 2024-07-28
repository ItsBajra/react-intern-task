import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchPosts } from '../API';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchPostDetails = async () => {
    const posts = await fetchPosts();
    const postDetails = posts.find((post) => post.id.toString() === id);
    setPost(postDetails);
  };

  useEffect(() => {
    const storedPost = sessionStorage.getItem(`post-${id}`);
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    } else if (location.state && location.state.updatedPost) {
      setPost(location.state.updatedPost);
    } else {
      fetchPostDetails();
    }
  }, [id, location.state]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 rounded-lg shadow-lg md:w-2/6">
      <h1 className="text-2xl font-bold mb-6">Post Details</h1>
      <div className="p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-gray-700 text-lg text-left ml-2 font-bold mb-2">ID</label>
          <div className="w-full px-4 py-2 border rounded-xl border-gray-300 bg-gray-100">{post.id}</div>
        </div>
        <div>
          <label className="block text-gray-700 text-lg text-left ml-2 font-bold mb-2">Title</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100">{post.title}</div>
        </div>
        <div>
          <label className="block text-gray-700 text-lg text-left ml-2 font-bold mb-2">Body</label>
          <div className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100">{post.body}</div>
        </div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ease-in-out duration-500"
      >
        Go Back
      </button>
    </div>
  );
};

export default PostDetail;
