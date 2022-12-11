import firebase from "./firebaseConfig.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { collection, query, orderBy, onSnapshot, getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";

let count=0; //table row count

let table = document.getElementById('table');
let tableInput = document.getElementsByClassName("tableInput");
// let unlockField = document.getElementById("unlockFieldCB");

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (!user) {
        location.href="../index.html";
    } 
  });

let logOut = document.getElementById("logOut");
logOut.addEventListener("click",()=>{
    signOut(auth).then(() => {
    
        }).catch((error) => {
        alert(error);
        });
});

// Get students details in table
const db = getFirestore(firebase);
const q = query(collection(db, "entry_log"), orderBy("Timestamp", "desc"));
const unsubscribe =  onSnapshot(q, (querySnapshot) => 
{
  querySnapshot.forEach((doc) =>
  {
        count++;
        var row = table.insertRow(count);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = doc.id;
        cell2.innerHTML = `<input type="text" class="w-25 tableInput text-center" readonly="true" id="rollnoInput_${doc.data().id}" value="${doc.data().RollNo}"/>`;
        cell3.innerHTML = `<input type="text" class="w-50 tableInput text-center" readonly="true" id="studentNameInput_${doc.data().id}" value="${doc.data().Name}"/>`;
        cell4.innerHTML = `<input type="text" class="w-50 tableInput text-center" readonly="true" id="timeInput_${doc.data().id}" value="${doc.data().Timestamp}"/>`;
  });
});



