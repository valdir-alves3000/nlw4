import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectID } from 'mongodb';
import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(req: NowRequest, res: NowResponse) {

  const {
    id,
    level,
    currentExperience,
    experienceToNextLevel,
    challengesCompleted,
   } = req.body;

   const _id = new ObjectID(id)
   
  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({_id});

  if(!user) {
    return res.json({ message: "User not lozalized!"})
  }
  
  const response = await db.collection('users')
  .updateOne(
    { _id},
    {
      $set: {
        level: level,
        currentExperience: currentExperience,
        experienceToNextLevel: experienceToNextLevel,
        challengesCompleted: challengesCompleted,
      }
    }
  )

  res.json({ message: "Data updated successfully!" });
}