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
        alert("Signed in");
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
        alert("Signed Up");
    }
    else {
        alert(`Error:  ${response.message}`)
    }
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