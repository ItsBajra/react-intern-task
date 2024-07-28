import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPosts, updatePost } from "../API";

const PostUpdate = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ id: id, title: "", body: "" });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPost = sessionStorage.getItem(`post-${id}`);
    if (storedPost) {
      setPost(JSON.parse(storedPost));
    } else {
      const fetchPostDetails = async () => {
        const posts = await fetchPosts();
        const postDetails = posts.find((post) => post.id.toString() === id);
        if (postDetails) {
          setPost(postDetails);
        }
      };

      fetchPostDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating post:", post); 
    try {
      const updatedPost = await updatePost(id, post);
      console.log("Updated post response:", updatedPost); 
      updatedPost.id = parseInt(id, 10);
      sessionStorage.setItem(`post-${id}`, JSON.stringify(updatedPost));
      setSuccessMessage('Post updated successfully!');
      setTimeout(() => {
        navigate(`/posts/${id}`, { state: { updatedPost } });
      }, 1500);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-6  rounded-lg shadow-lg md:w-2/6">
      <h1 className="text-4xl font-bold mb-6">Update Post</h1>
      {successMessage && (
        <div className="bg-alertBg border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p className="bg-alertBg">{successMessage}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-gray-700 text-left ml-2 text-lg font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg text-left ml-2 font-bold mb-2">
            Body
          </label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            className="w-full h-36 px-4 py-2 border bg-white border-gray-300 rounded-xl"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ease-in-out duration-500"
        >
          Update Post
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ease-in-out duration-500"
          type="button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PostUpdate;
