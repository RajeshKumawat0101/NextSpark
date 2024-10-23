const { getDBInstance } = require('../db/db');
const {v4 :uuidv4} = require('uuid');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { setUser } = require('../service/auth');
const forScore = require('firebase-admin');
// const { default: LogOut } = require('../../frontend/src/Pages/LogOutUser');



const signUp = async(req,res) => {
  try {
    const db = await getDBInstance();
    const usersCollection = db.collection('users');
    const {username,useremail,userpassword} = req.body;
    // console.log("body is ",req.body);
    // console.log('signup continue');
    //check all field are fill or not
    if ([useremail, username, userpassword].some((field) => field?.trim() === "")) {
          console.log(400, "All fields are required")
          return res.status(400).send({
            message: 'All fields are required',
            status: false,
          });
    }
  
    const existedUser = await usersCollection.findOne({
      $or:[{username},{useremail}]
    });
    
    if(existedUser){
      console.log("user already exist ",existedUser);
      return res.status(200).send(existedUser._id);
    }

    const result = await usersCollection.insertOne(
      {username, useremail, userpassword}
    );//_id return
    
    if(result.insertedId){
      console.log(result.insertedId);
      
      return res.status(200).send(result.insertedId);
    }
    else{
        return res.status(404).send({
            message:"Can not sign-up",
            status:"false",
        })
    }
  } catch (error) {
    console.error('Error signing-up:', error);
    return res.status(500).send({
      message: 'Internal Server Error',
      status: false,
    });
  }

}

const logIn = async(req,res) =>{
  try {
    const db = await getDBInstance();
    const usersCollection = db.collection('users');
    const {useremail,userpassword} = req?.body;
    // console.log("body is ",req.body);
    // console.log("email is ",useremail);
    // console.log("password ",userpassword)
  
    if([useremail,userpassword].some((field)=>field?.trim === "")){
      console.log("all field are required");
      return res.status(200).send({
        message:"all field required",
        status: false
      })
    }
    const user = await usersCollection.findOne({
      $or:[{useremail}]
    });
  
    if(!user){
      return res.send({code:500,message:"User is not registered"})
    }
  
    // console.log("user password ",typeof(user.userpassword));
    // console.log("password ",typeof(userpassword))
  
    if(!(user.userpassword === userpassword)){
      // console.log("password is incorrect")
      return res.send({code:500,message:"password is incorrect"})
    }
      
    const sessionId = uuidv4();
    setUser(sessionId,user);
    return res.status(200)
    .cookie("uuid",sessionId,{httpOnly:true})
    .json({code:200,user,sessionId, message: "Login successful" });
    
  } catch (error) {
    console.log("error is ",error);
  }
}

const logOut = async(req,res)=>{
  const {sessionId} = req?.body;

  if(!sessionId){
    return res.status(400)
    .json({message: "Session ID is required" })
  }
  delete sessionId;
  return res.status(200)
  .json({message : "Logout successful"});
} 

const reviewList = async(req,res)=>{
    try {
        const db = await getDBInstance();
        const allWorksCollection = db.collection('allWorks');
        const allWorks = await allWorksCollection.find({}).toArray();
    
        return res.status(200).json({
          message: 'All works retrieved successfully',
          status: true,
          data: allWorks
        });
      } catch (error) {
        console.error('Error retrieving all works:', error);
        return res.status(500).json({
          message: 'Internal Server Error',
          status: false
        });
      }
}

const updateScore = async (uid) => {

  try {
    
    const db = getDatabase();
    const scoreRef = ref(db, `usersInfo/${uid}/score`);
    const snapshot = await get(scoreRef);

    if (snapshot.exists()) {
      const currentScore = snapshot.val();
      await set(scoreRef, currentScore + 500);
    } else {
      await set(scoreRef, 500);
    }

    //res.status(200).json({ success: true, message: 'Score updated successfully.' });
  } catch (error) {
    console.error('Error updating score:', error);
    //res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const toReview = async (req, res) => {
  console.log('66');
  const db = await connectDatabase();
  const allWorksCollection = db.collection('allWorks');
  const worksCollection = db.collection('works');
  const workId = req.params.workId;
  console.log(workId, 29)
  const { action } = req.body;
  console.log(action, 73)
  if (!workId || !action) {
      return res.status(400).send({
          message: 'Invalid request parameters',
          status: false
      });
  }
  
  try {
      const allWork_work = await allWorksCollection.findOne({ _id: new ObjectId(workId) });

      if (!allWork_work) {
          return res.status(404).send({
              message: 'Work not found',
              status: false
          });
      }

      // Exclude _id when moving the document to jobsCollection
      delete allWork_work._id;

      // Update the job status based on admin's action
      if (action === 'accept') {
          allWork_work.approvedBy = req.cookies.name;
          console.log(allWork_work.posedByUid);
          await updateScore(allWork_work.posedByUid);
          await worksCollection.insertOne(allWork_work); // Move to jobsCollection
      }

      // Remove from allWorksCollection in both cases (accept or reject)
      await allWorksCollection.deleteOne({ _id: new ObjectId(workId) });

      return res.status(200).send({
          message: 'Work review updated successfully',
          status: true
      });
  } catch (error) {
      console.error('Error reviewing work:', error);
      return res.status(500).send({
          message: 'Internal Server Error',
          status: false
      });
  }
};


module.exports = {
    toReview,
    reviewList,
    signUp,
    logIn,
    logOut,
} 