import express from "express";
import firebase from "./firebaseConfig.js"
import { collection, query, orderBy, onSnapshot, getFirestore, doc, updateDoc, addDoc } from "firebase/firestore";

let app = express();
let currentTime = new Date();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT);

app.get('/myReq', (req, res)=>{
  res.send("got your request as /myReq");
});

app.post('/myPost', function (req, res) {
   let data = req.body;
   check(data, req, res);
   //res.send(data.id.toString());
 });




 function check(data, req, res)
 {
   const db = getFirestore(firebase);
   const q = query(collection(db, "students"), orderBy("RollNo", "asc"));

   onSnapshot(q, (querySnapshot) => 
   {
     querySnapshot.forEach((doc) => {
      try {
            if (data.id == doc.id)
            {
               addDoc(collection(db, "entry_log"), {
                  id: data.id,
                  Name: doc.data().Name,
                  RollNo: doc.data().RollNo,
                  Timestamp: currentTime.toString().slice(0, 25)
               });
               return res.send(data.id.toString());
            }
         } 
         catch (error)
         {
            res.send(error);
         }
        });
   });
 };