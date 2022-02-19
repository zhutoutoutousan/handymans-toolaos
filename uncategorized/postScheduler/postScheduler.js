// create express app


// create an array of posts
const posts = [
    {
        id: 1,
        title: "Post 1",
        content: "This is the first post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        date: "2019-01-01"
    },
    {
        id: 2,
        title: "Post 2",
        content: "This is the second post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        date: "2019-01-02"
    },
    {
        id: 3,
        title: "Post 3",
        content: "This is the third post",
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        date: "2019-01-03"
    }
]

// getPost function
const getPost = (id) => {
    return posts.find(post => post.id === id);
}

// createPost function
const createPost = (post) => {
    posts.push(post);
}

// updatePost function
const updatePost = (id, post) => {
    const index = posts.findIndex(p => p.id === id);
    posts[index] = post;
}

// mockPostData function
const mockPostData = (id) => {
    return {
        id: id,
        title: `Post ${id}`,
        content: "This is the content of post " + id,
        image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        date: "2019-01-0" + id
    }
}

// testMockPostData function
const testMockPostData = () => {
    // add a post to the posts array with id+1
    createPost(mockPostData(posts.length + 1));
    // get the post with id+1
    const post = getPost(posts.length);
    // check if the post is the same as the mock post
    if (post.id === posts.length && post.title === `Post ${posts.length}` && post.content === "This is the content of post " + posts.length && post.image === "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" && post.date === "2019-01-0" + posts.length) {
        console.log("testMockPostData passed");
    }
    else {
        console.log("testMockPostData failed");
    }

}

const postToHtml = (post) => {
    return `
        <div class="post">
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <img src="${post.image}" alt="${post.title}">
            <p>${post.date}</p>
        </div>
    `
}

const startTest = () => {
    // invoke the testMockPostData function randomly from 0 to 10 times
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        testMockPostData();
    }

    const postHtml = posts
    console.log(postHtml);
    return postHtml;   
}


// 

startTest()

