
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

let floatingEmail = document.getElementById("floatingInput"); 
let floatingPassword = document.getElementById("floatingPassword");
let signInBtn = document.getElementById("signInBtn");


const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        location.href="../dashboard.html";
    } 
  });

signInBtn.addEventListener('click', function()
{
    //alert("working");
    if(floatingEmail.value!=null||floatingPassword.value!=null)
    {
        signInWithEmailAndPassword(auth, floatingEmail.value, floatingPassword.value)
        .then((userCredential) => {
           location.href="../dashboard.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage+" "+errorCode)
        });
    }
    else{
        alert("Empty fields are not allowed");
    }
   
});


//forget password
// let frg_pass = document.getElementById("forgetPass");
// frg_pass.addEventListener("click",()=>{
    
//     sendPasswordResetEmail(auth, email)
//   .then(() => {
//     alert("Password reset link has been sent to your email");
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert(errorCode+" "+errorMessage);
//   });
    
// });