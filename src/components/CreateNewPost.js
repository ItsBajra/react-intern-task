import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../API";

const CreateNewPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

     
    const generateUniqueId = () => {
        let lastId = sessionStorage.getItem('lastPostId');
        if (!lastId) {
            lastId = 100;
        }
        const newId = parseInt(lastId) + 1;
        sessionStorage.setItem('lastPostId', newId);
        return newId;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = generateUniqueId();
        const newPost = { id, title, body, createdAt: new Date().toISOString() };
        await createPost(newPost);  
        sessionStorage.setItem(`post-${id}`, JSON.stringify(newPost));
        setSuccessMessage("Post created successfully!");
        setTimeout(() => {
            navigate(`/`);
        }, 1500); 
    }; 

    return (
        <div className="container mx-auto mt-10 p-6  rounded-lg shadow-lg md:w-2/6">
            <h1 className="text-4xl font-bold mb-6 ">Create New Post</h1>
            {successMessage && (
                <div className="border-l-4 bg-alertBg border-green-500 text-green-700 p-4 mb-4" role="alert">
                    <p className="bg-alertBg">{successMessage}</p>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-lg shadow-md space-y-4"
            >
                <div>
                    <label className="block text-gray-700 text-lg text-left font-bold mb-2 ml-2">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border bg-white border-gray-300 rounded-xl"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-lg font-bold mb-2 text-left ml-2">
                        Body
                    </label>
                    <textarea
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full h-36 px-4 py-2 border bg-white border-gray-300 rounded-xl"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ease-in-out duration-500"
                >
                    Create Post
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

export default CreateNewPost;
