const authenticate = async (email, password) => {
    const response = await axios({
                url: "http://localhost:8000/signin",
                method: "POST", 
                data: {email: email, password: password}
            })
            .then(res => res.data)
            .catch(error => {
                console.error(error);
                return null;
            });

    if(response.success){

        window.location.replace(`/postpage.html?email=${email}`);

    }
    else {
        alert(`Error:  ${response.message}`)
    }
}

const addUser = async (email, password) => {
    const response = await axios({
                url: "http://localhost:8000/signup",
                method: "POST", 
                data: {email: email, password: password}
            })
            .then(res => res.data)
            .catch(error => {
                console.error(error);
                return null;
            });

    if(response.success){
        alert("Signed Up successfully");
        window.location.replace(`/signin.html`);
    }
    else {
        alert(`Error:  ${response.message}`)
    }
}

const postStatus = async (text, email) => {
    const response = await axios({
                url: "http://localhost:8000/postpage",
                method: "POST", 
                data: {text: text, email: email}
            })
            .then(res => res.data)
            .catch(error => {
                console.error(error);
                return null;
            });

    return response;
}

const signInSubmitButton = document.getElementById('signInBtn')
if(signInSubmitButton){
    signInSubmitButton.addEventListener("click",()=>{
        const signInUserId = document.getElementById('signInId').value
        const signInUserPw = document.getElementById('signInPw').value
        authenticate(signInUserId, signInUserPw);
        })
    
    
}

const signUpSubmitButton = document.getElementById('signUpBtn')
if(signUpSubmitButton){
    signUpSubmitButton.addEventListener("click", () =>{
        const signUpUserId = document.getElementById('signUpId').value;
        const signUpUserPw = document.getElementById('signUpPw').value;   
        addUser(signUpUserId, signUpUserPw); 
    })
}

const postButton = document.getElementById('postBtn')
if(postButton){
    postButton.addEventListener("click", async() =>{
        const text = document.getElementById('postArea').value;
        const urlParams = new URLSearchParams(window.location.search)
        const email = urlParams.get('email')
        if(!email){
            alert("Invalid session");
        }
        const response = await postStatus(text, email)
        if(response.success){
            alert("Posted Successfully");
            updatePostsTable();
        }
        else {
            alert(`Error:  ${response.message}`)
        }
    })
}



const getAllPosts = async() => {
    let allposts = [];
    const response = await axios({
        url: "http://localhost:8000/allposts",
        method: "GET",
    })
    .then(res => res.data)
    .catch(error => {
        console.error(error);
        return null;
    });

    if(response.success){
        allposts = response.data;
    }
    return allposts;
}

const updatePostsTable = async () => {
    const allposts = await getAllPosts();
    if(allposts.length > 0){
        const postRows = allposts.map(post => {
            return `
            <tr>
                <td>${post.email}</td>
                <td>${post.post}</td>
                <td>${post.time}</td>
            </tr>
            `
        })
        const postRowsHtml = postRows.join(" "); 
        postsDisplayTableBody.innerHTML = postRowsHtml;
    }
}

const postsDisplayTableBody = document.getElementById("all-posts");
if(postsDisplayTableBody){
    updatePostsTable()
}
