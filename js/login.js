function onBtnClick() {

    let inputEmail = document.getElementById("enterEmail").value;
    let inputPassword = document.getElementById("enterPassword").value;
    console.log(inputEmail.value);

    axios
        .post('http://52.49.132.146/auth/local', {
            identifier: inputEmail,
            password: inputPassword,
        })

        .then(response => {
            // Handle success.
            // send token to sessionStorage
            window.sessionStorage.setItem("token", response.data.jwt); 

            // send username to sessionstorage
            window.sessionStorage.setItem("username", response.data.user.username); 

            console.log('Well done!');
            console.log('User profile', response.data.user.username);
            console.log('User token', response.data.jwt);

            // Refresh the site 0,5 seconds after click of login button
            
            
            setTimeout(function() {
                window.location.reload();
            }, 500);





        })

        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error);
            // send Error message in HTML
            document.getElementById("wrongUsr").style.display = "block";
        });
}

function checkToken() {
    // if there is a token in sessionStorage: 
    if ("token" in sessionStorage) {
        // display logout button 
        console.log("Token is here");
        document.getElementById("loginBtn").style.display = "none";
        document.getElementById("logoutBtn").style.display = "block";

    // stores username in variable 
        let getName = sessionStorage.getItem("username")

    // adds the username to the HTML 
        document.getElementById("header-welcome").innerHTML += 
        `Welcome, ${getName}`;  
    

    } else {
        // When no token, remove navigationUl and display only login btn
        console.log("Help, I need your Token");
        document.getElementById('loginModal').style.display = 'block';
        document.getElementById("navigationUl").style.display = "none";
        document.getElementById("loginBtn").style.display = "block";
        document.getElementById("logoutBtn").style.display = "none";
    }
}
checkToken();

// Remove token on logout click and refresh website 
function removeToken() {
    sessionStorage.removeItem("token");
    window.location.reload();
}

