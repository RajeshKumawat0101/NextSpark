const { ReturnDocument,ObjectId } = require('mongodb');
const { getDBInstance } = require('../db/db');

const postWorkForReview = async (req, res) => {
    try {
      const db = await getDBInstance();
      const allWorksCollection = db.collection('allWorks');
  
      const body = req.body;
      body.createdAt = new Date();
      body.status = 'pending'; // Initial status
  
      const result = await allWorksCollection.insertOne(body);
      //  console.log("result i s ",result);
      if (result.insertedId) {
        // console.log("1 go to updation")
        const updateResult = await reviewWork(result.insertedId);
        // console.log("update work");

        if(updateResult.status){
          // console.log("Work updated successfully");
          return res.status(200).json({
              message: 'Work posted for review and updated successfully',
              status: true,
              workId: result.insertedId
          })
        } else {
          // If update fails
          return res.status(500).json({
              message: updateResult.message || 'Failed to update work',
              status: false
          });
        }

      } else {
        return res.status(404).send({
          message: 'Can not get result of pushed work',
          status: false,
        });
      }
    } catch (error) {
      console.error('89Error posting work for review:', error);
      return res.status(500).send({
        message: '89Internal Server Error',
        status: false,
      });
    }
  };
 
const getAllWorks = async (req, res) => {
    try {
        const db = await getDBInstance();
        const allWorksCollection = db.collection('allWorks');        
        const works = await allWorksCollection.find({}).toArray();
    
        return res.status(200).json({
          message: 'All works retrieved successfully',
          status: true,
          data: works,
        });
      } catch (error) {
        console.error('Error retrieving all works:', error);
        return res.status(500).json({
          message: 'Internal Server Error',
          status: false,
        });
      }
};
  
const getMyWorks = async (req, res) => {
 try {
   const db = await getDBInstance();
   const worksCollection = db.collection('works');
  //  console.log("parame is ",req.params);
   const {useremail} = req.params;
  //  console.log(useremail);
   const workByMail = await worksCollection.find({postedBy:useremail}).toArray();
  //  console.log("worek is ",workByMail);
   res.send(workByMail);
 } catch (error) {
  return res.status(500).send({
    message: 'Internal Server Error',
    status: false,
  }); 
 }
};

const reviewWork = async (insertedId, res) => {
  // console.log('inside toReview');
  try {
    // console.log("2 updation starts");
    
    const db = await getDBInstance();
    const worksCollection = db.collection('works');
    const allWorksCollection = db.collection("allWorks");
    const work = await allWorksCollection.findOneAndUpdate({
     _id :insertedId, status: "pending"
    },{
      $set: {
        status: "completed",
      },
    },
    {returnDocument: "after"}
  );
//  console.log(" work is ", work);
  if (!work) {
    return {
        message: 'Work not found or already processed',
        status: false,
    };  
}
   // Ensure only necessary fields are inserted into the `worksCollection`
  //  const { _id, ...workData } = work; // Exclude `_id` if needed
    worksCollection.insertOne(work);
    console.log("4 updation complete")
    return {
      status : true,
      "message": "Record updated successfully",
    };
  } catch (error) {
    console.error('89Error at update work status:', error);
      return {
        message: '89Internal Server Error',
        status: false,
      };
  }
};

const deleteByID = async (req,res)=>{
        try {
          const db = await getDBInstance();
          const worksCollection = db.collection('works');
          // console.log("rew is ",req)
          const id = req.params?.id;
          // console.log("id is ",id); 
          if (!ObjectId.isValid(id)) {
            return res.status(400).send({
              message: 'Invalid ID format',
              status: false,
            });
          }
          const result = await worksCollection.findOneAndDelete({_id:new ObjectId(id)});

          if (!result.value) {
            return res.status(404).send({
              message: 'Work not found',
              status: false,
            });
          }
          // console.log("result is ",result);
          return res.status(200).send({
            message: 'work deleted successfully',
            status: true,
          });
        } catch (error) {
          // console.log(error)
          return res.status(500).send({
            message: 'Internal Server Error',
            status: false,
          }); 
        }  
}

const getWork = async (req,res)=> {
  console.log("inside to get work");
  try {
    const db = await getDBInstance();
    const worksCollection = db.collection('works');
    const id = req.params?.id;
    // const id = "6709712d05c20528feff0d97";
    if (!ObjectId.isValid(id)) {
      return res.status(400)
      .json({ message: 'Invalid work ID' });
    }
    console.log("id is",id);
    const work = await worksCollection.findOne({ _id: new ObjectId(id)});
   //  console.log("worek is ",workByMail);
   if (!work) {
    return res.status(404).json({ message: 'Work not found' });
  }
   console.log("work is ",work);
    return res.status(200)
    .json(work);
  } catch (error) {
   return res.status(500).send({
     message: 'Internal Server Error',
     status: false,
   }); 
  }   
}

const updateWork = async(req,res)=>{
  try {
    const db = await getDBInstance();
    const worksCollection = db.collection('works');

    const id = req?.params?.id;
    const updatedWork = req?.body;
    updatedWork.createdAt = new Date();
    console.log("new datae i s", updatedWork.createdAt);

    // Check if `id` is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400)
      .json({ message: 'Invalid work ID' });
    }
 
    // Update the work document with the specified id
    const result = await worksCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },  // Match the work by ID
      { $set: updatedWork }        // Set the new values for the fields
    );

    // Check if any document was modified
    if (result.matchedCount === 0) {
      return res.status(404)
      .json({ message: 'Work not found' });
    }

    if (result.modifiedCount === 0) {
      return res.status(304)
      .json({ message: 'No changes made to the work' });
    }

    // Return success response
    res.status(200)
    .json({ message: 'Work updated successfully' });

  } catch (error) {
    console.error('Error updating work:', error);
    res.status(500)
    .json({ message: 'Internal Server Error' });
  }
};

   
module.exports = {
  postWorkForReview,
  reviewWork,
  getAllWorks,
  getMyWorks,
  updateWork,
  deleteByID,
  getWork
};
