import firebase from "./firebaseConfig.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { collection, query, orderBy, onSnapshot, getFirestore, doc, updateDoc, setDoc, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";

let students_arr = [];


let count=0; //table row count

let table = document.getElementById('table');
let tableInput = document.getElementsByClassName("tableInput");
let unlockField = document.getElementById("unlockFieldCB");

// Check whether logged in
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (!user)
  {
    location.href="../index.html"
  }
});

let logOut = document.getElementById("logOut");
logOut.addEventListener("click",()=>{
    signOut(auth).then(() => {
        
        }).catch((error) => {
            alert(error);
        });
});

//  Unlock check box
// unlockField.addEventListener('click', function(){
//     try{
//         if (unlockField.checked != true)
//         {
//             for (var i = 0; i < tableInput.length; i++)
//             {
//                 tableInput[i].setAttribute("readonly","true");
//                 //console.log(tableInput.length);
//             }
//         } 
//         else 
//         {
//             for (var i = 0; i < tableInput.length; i++)
//             {
//                 tableInput[i].removeAttribute("readonly");
//                 // tableInput[i].setAttribute("readonly","true");
//             }
//         }
//     }
//     catch(err){
//         model_body_2.innerHTML = err;
//         myModal_.show();
//     }
// })


// Get students details in table and array
const db = getFirestore(firebase);
const q = query(collection(db, "students"), orderBy("RollNo", "asc"));
const unsubscribe = onSnapshot(q, (querySnapshot) => 
{
  querySnapshot.forEach((doc) =>
  {
    students_arr.push(
        {
            id: doc.id,
            Name: doc.data().Name,
            RollNo: doc.data().RollNo
        }
    );
        count++;
        var row = table.insertRow(count);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

       

        cell1.innerHTML = doc.id;
        cell2.innerHTML = `<input type="text" class="w-25 tableInput" readonly="true" id="rollnoInput_${doc.id}" value="${doc.data().RollNo}"/>`;
        cell3.innerHTML = `<input type="text" class="w-50 tableInput" readonly="true" id="studentNameInput_${doc.id}" value="${doc.data().Name}"/>`;

  });
  
});


let addUserBtn = document.getElementById('addUserBtn');


let myModal_2 = new bootstrap.Modal(document.getElementById('exampleModal_2'), {
    keyboard: false
})

addUserBtn.addEventListener('click',async function(){
    let model_body_2 = document.getElementById("model_body_2");
    let modelHead = document.getElementById("exampleModalLabel_2");
    modelHead.innerHTML = "Add student";

    model_body_2.innerHTML = `  <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingTagId" placeholder="Tag Id"."/>
                                    <label for="floatingTagId">Tag Id</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingRollNo" placeholder="Roll No."/>
                                    <label for="floatingRollNo">Roll No.</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingUsername" placeholder="Username"/>
                                    <label for="floatingUsername">Name</label>
                                </div>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" id="addUser" type="button">Add</button>
                                </div>`;
   await myModal_2.show();

    let add = document.getElementById("addUser");
    add.addEventListener('click',async function(){
    let floatingTagId = document.getElementById("floatingTagId");
    let floatingRollNo = document.getElementById("floatingRollNo");
    let floatingUsername = document.getElementById("floatingUsername");

   // Add a new document with a generated id.
    // const doc = await addDoc(collection(db, "students"), {
    //     Name: floatingUsername.value,
    //     RollNo: parseInt(floatingRollNo.value)
    // });

    // Add a new document with custom id.
    await setDoc(doc(db, "students", floatingTagId.value), {
        Name: floatingUsername.value,
        RollNo: parseInt(floatingRollNo.value)
      });

    window.location.reload();
    });
})



//update student
let upadateUserBtn = document.getElementById('upadateUserBtn');
upadateUserBtn.addEventListener('click',async function()
{
    let model_body_2 = document.getElementById("model_body_2");
    let modelHead = document.getElementById("exampleModalLabel_2");
    modelHead.innerHTML = "Update student info";

    model_body_2.innerHTML = ` <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingId" placeholder="Enter Database ID"/>
                                    <label for="floatingRollNo">Database ID</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingRollNo" placeholder="Roll No."/>
                                    <label for="floatingRollNo">Roll No.</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingUsername" placeholder="Username"/>
                                    <label for="floatingUsername">Name</label>
                                </div>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" id="updateUser" type="button">Update</button>
                                </div>`;
   await myModal_2.show();

    let updateUser = document.getElementById("updateUser");
    updateUser.addEventListener('click',async function()
    {
        let databaseID = document.getElementById("floatingId");
        let floatingRollNo = document.getElementById("floatingRollNo");
        let floatingUsername = document.getElementById("floatingUsername");

        const studRef = doc(db, "students", databaseID.value);
        await updateDoc(studRef, {
            Name: floatingUsername.value,
            RollNo: parseInt(floatingRollNo.value)
        });
        window.location.reload();
    });
});

//delete student
let deleteUserBtn = document.getElementById('deleteUserBtn');
deleteUserBtn.addEventListener('click',async function()
{
    let model_body_2 = document.getElementById("model_body_2");
    let modelHead = document.getElementById("exampleModalLabel_2");
    modelHead.innerHTML = "Delete student info";

    model_body_2.innerHTML = ` 
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="floatingId" placeholder="Enter Database ID"/>
                                    <label for="floatingRollNo">Database ID</label>
                                </div>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="btn btn-primary" id="deleteUser" type="button">Delete</button>
                                </div>`;
   await myModal_2.show();

    let deleteUser = document.getElementById("deleteUser");
    deleteUser.addEventListener('click',async function()
    {
        let databaseID = document.getElementById("floatingId");
        await deleteDoc(doc(db, "students", databaseID.value));
        window.location.reload();
    });
    
})