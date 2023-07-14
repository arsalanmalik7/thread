import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { collection, addDoc, query, onSnapshot, serverTimestamp, orderBy, deleteDoc, updateDoc, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAl0DFOcTipe5dPgW_Kpi7KlBfMcEuJN-A",
  authDomain: "threads-8b.firebaseapp.com",
  projectId: "threads-8b",
  storageBucket: "threads-8b.appspot.com",
  messagingSenderId: "347648497810",
  appId: "1:347648497810:web:d4801fdf9f9e63c0b22e4b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("readystatechange", async () => {
  const q = query(collection(db, "posts"))

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });


  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.providerData.forEach((profile) => {
        console.log(user);
        console.log("  Provider-specific UID: " + profile.uid);
      })

    } else {
      console.log("User is not signed in");
    }


  });

  let username = document.querySelector("#username");

  let myName = localStorage.getItem('username');
  username.innerHTML = myName;


  let addButton = document.getElementById("add-button");
  let threadContainer = document.getElementById("thread-container");
  const postsCollection = db.collection("posts");

  addButton.addEventListener("click", async function () {
    let postInput = document.getElementById("post-input");

    if (postInput.value.trim() === "") {
      return;
    }

    let postText = postInput.value;
    let postElement = document.createElement("div");
    postElement.classList.add("post");

    let postContent = document.createElement("p");
    postContent.textContent = postText;

    let postTimestamp = document.createElement("span");
    postTimestamp.classList.add("timestamp");
    postTimestamp.textContent = getCurrentTimestamp();
    let postContainer = document.querySelector(".container");
    let parent = postContainer.parentNode;
    console.log(parent);


    postElement.appendChild(postContent);
    postElement.appendChild(postTimestamp);
    parent.appendChild(postElement);

    postInput.value = "";

    const docRef = await addDoc(collection(db, "posts"), {
      userposts: postText
    });
    console.log("Document written with ID: ", docRef.id);

  });

  function createPostElement(postData, postId) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const postContent = document.createElement("p");
    postContent.textContent = postData.text;

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes");

    const likeButton = document.createElement("span");
    likeButton.classList.add("like-button");
    likeButton.textContent = "Like";

    const likeCount = document.createElement("span");
    likeCount.classList.add("like-count");
    likeCount.textContent = "0";

    likesContainer.appendChild(likeButton);
    likesContainer.appendChild(likeCount);

    const commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments");

    const commentInput = document.createElement("input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("placeholder", "Add a comment...");
    const commentButton = document.createElement("button");
    commentButton.textContent = "Comment";

    commentButton.addEventListener("click", () => {
      const commentText = commentInput.value.trim();
      if (commentText !== "") {
        addComment(postId, commentText);
        commentInput.value = "";
      }
    });

    commentsContainer.appendChild(commentInput);
    commentsContainer.appendChild(commentButton);

    postElement.appendChild(postContent);
    postElement.appendChild(likesContainer);
    postElement.appendChild(commentsContainer);

    return postElement;
  }

  // Function to add a post
  function addPost() {
    const postText = postInput.value.trim();
    if (postText !== "") {
      postsCollection.add({ text: postText })
        .then((docRef) => {
          console.log("Post saved with ID:", docRef.id);
          postInput.value = "";
        })
        .catch((error) => {
          console.error("Error saving post:", error);
        });
    }
  }

  // Function to add a comment to a post
  function addComment(postId, commentText) {
    const commentsCollection = postsCollection.doc(postId).collection("comments");
    commentsCollection.add({ text: commentText })
      .then((docRef) => {
        console.log("Comment added with ID:", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  }
})
function getCurrentTimestamp() {
  var now = new Date();
  var timestamp = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric" });
  return timestamp;
}



let signout = document.querySelector("#signout");
signout.addEventListener('click', () => {

  signOut(auth).then(() => {
    console.log('signout successfully');
    window.location.href = './index.html';
  }).catch((error) => {
    console.log(error);
  });
})