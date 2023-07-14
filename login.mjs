import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy, deleteDoc, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAl0DFOcTipe5dPgW_Kpi7KlBfMcEuJN-A",
    authDomain: "threads-8b.firebaseapp.com",
    projectId: "threads-8b",
    storageBucket: "threads-8b.appspot.com",
    messagingSenderId: "347648497810",
    appId: "1:347648497810:web:d4801fdf9f9e63c0b22e4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let loginForm = document.querySelector("#loginForm");
loginForm.addEventListener('submit', (event) => {
    const auth = getAuth();
    event.preventDefault();
    let email = event.target[0].value;
    let password = event.target[1].value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            let popup = `<div class="popup-container" id="popupContainer">
              <div class="popup-content">
                <h2>Login Successfully!</h2>
              </div>
            </div>`;
            let parent = event.target.parentNode.parentNode;
            let sibling = parent.lastChild.previousSibling;
            console.log(sibling);
            console.log(parent);

            let tempElement = document.createElement("div");
            tempElement.innerHTML = popup;
            let newPopupContainer = tempElement.firstChild;
            parent.insertBefore(newPopupContainer, sibling);



            setTimeout(function () {
                let popupContainer = document.getElementById("popupContainer");
                popupContainer.style.opacity = "1";
                popupContainer.style.opacity = "0";
                popupContainer.style.pointerEvents = "none";

                if (user) {
                    window.location.href = './thread.html';
                }
            }, 1000);

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            let errorMsg = document.querySelector(".errorMsg");
            errorMsg.style.display = 'block';
            errorMsg.innerHTML = errorMessage.slice(errorMessage.indexOf('/') + 1, errorMessage.indexOf(')'));
        });
})


let gotoSignup = document.querySelector("#gotoSignup");
gotoSignup.addEventListener('click', () => {
    window.location.href = './signup.html';
})

