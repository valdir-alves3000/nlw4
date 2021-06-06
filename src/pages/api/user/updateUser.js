import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {

  const {
    email,
    level,
    currentExperience,
    experienceToNextLevel,
    challengesCompleted,
  } = req.body;

  const { db } = await connectToDatabase();
  
    const user = await db.collection('users').findOne({email});
  
    if(!user) {
      return res.json({ message: "User not lozalized!"})
    }
    
  const response = await db.collection('users')
    .updateOne(
      { email },
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