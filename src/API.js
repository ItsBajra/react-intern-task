export const fetchPosts = () => fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json());

export const deletePost = (id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {method: 'DELETE'});

export const updatePost = (id, post) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    }).then(response => response.json());

    export const createPost = (post) => fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then(response => response.json());