import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { fetchPosts, deletePost } from "../API";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPosts();

            const localPosts = Object.keys(sessionStorage).reduce((acc, key) => {
                if (key.startsWith('post-')) {
                    acc.push(JSON.parse(sessionStorage.getItem(key)));
                }
                return acc;
            }, []);

            const deletedPostIds = Object.keys(sessionStorage).reduce((acc, key) => {
                if (key.startsWith('deleted-post-')) {
                    acc.push(sessionStorage.getItem(key));
                }
                return acc;
            }, []);
            
            const combinedPosts = [...data, ...localPosts].reduce((acc, post) => {
                acc[post.id] = post;
                return acc;
            }, {});
            deletedPostIds.forEach(id => delete combinedPosts[id]);
            setPosts(Object.values(combinedPosts).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
        };

        fetchData();

        const handleStorageChange = () => {
            const updatedPosts = posts.map(post => {
                const storedPost = sessionStorage.getItem(`post-${post.id}`);
                return storedPost ? JSON.parse(storedPost) : post;
            }).filter(post => !sessionStorage.getItem(`deleted-post-${post.id}`));
            setPosts(updatedPosts);
        };

        const handlePostCreated = () => {
            fetchData();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('postCreated', handlePostCreated);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('postCreated', handlePostCreated);
        };
    }, [location.state]);

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const handleDelete = async (id) => {
        await deletePost(id);
        sessionStorage.setItem(`deleted-post-${id}`, id);
        setPosts(posts.filter(post => post.id !== id));
    };

    return (
        <div className="container mx-auto bg-customBg mt-10 rounded-lg">
            <div className="p-4 rounded-lg shadow-lg bg-customBg mb-6">
                <h2 className="text-2xl font-semibold bg-customBg mb-4">All Posts</h2>
                <div className="overflow-x-auto border-gray-500 rounded-lg shadow-md">
                    <table className="w-full text-left">
                        <thead className="bg-gray-600">
                            <tr>
                                <th className="p-4">Id</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Body</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(post => (
                                <tr key={post.id} className="border-b border-gray-600">
                                    <td className="p-4">{post.id}</td>
                                    <td className="p-4">{truncateText(post.title, 6)}</td>
                                    <td className="p-4">{truncateText(post.body, 6)}</td>
                                    <td className="p-4 flex space-x-2">
                                        <Link to={`/posts/${post.id}`}>
                                            <FaEye className="cursor-pointer text-blue-500" />
                                        </Link>
                                        <Link to={`/posts/edit/${post.id}`}>
                                            <FaEdit className="cursor-pointer text-yellow-500" />
                                        </Link>
                                        <FaTrash
                                            onClick={() => handleDelete(post.id)}
                                            className="cursor-pointer text-red-500"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
