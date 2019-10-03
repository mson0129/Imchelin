/*
//신규 사용자 가입
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

//기존 사용자 가입
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
*/

/*
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
    }
        // The signed-in user info.
        var user = result.user;
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});
*/
(function () {
    const body = document.querySelector('body');
    const app = document.getElementById('app');

    function get(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === XMLHttpRequest.DONE) {   
                    if (xhr.status === 200) resolve(xhr.response);
                    else reject(xhr.statusText);
                }
            };
            try {
                xhr.send();
            } catch (e) {
                console.log(e);
            }
        });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
            console.log(user);

            get('/data/nav.html?_=' + ((new Date()).getTime()))
            .then(res => {
                body.innerHTML += res;
            }).catch(e => {
                console.error('[Auth]', 'Nav failed.');
            });
        } else {
            // No user is signed in.
            body.classList.add('signin');
            get('/data/signin.html?_=' + ((new Date()).getTime()))
            .then(res => {
                app.innerHTML = res;
                const buttonGoogle = document.getElementById('signInWithGoogle');
                buttonGoogle.addEventListener('click', e => {
                    var provider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithRedirect(provider);
                });
            }).catch(e => {
                console.error('[Auth]', 'Sign-in failed.');
            });
        }
    });

    if(document.getElementById('signOut') !== null) {
        const buttonSignOut = document.getElementById('signOut');
        buttonSignOut.addEventListener('click', e => {
        firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
    });
    } else {
        console.error('[Auth]', 'There is no Sign-out button.');
    }
}());