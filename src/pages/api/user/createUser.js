import { connectToDatabase } from '../../../../util/mongodb';

export default async function handler(req, res) {

  const { 
    email,
    name,
    level,
    currentExperience,
    experienceToNextLevel,
    challengesCompleted, 
  } = req.body;

  const data = {
    email,
    name,
    level,
    currentExperience,
    experienceToNextLevel,
    challengesCompleted,
  }

  if(!email || !name) {
    return res.status(404).json({ message: "Empty field is not allowed!" })
  }

  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({email});

  if(user) {
    return res.json({ message: true})
  }
  
  const response = await db.collection('users')
  .insertOne(data)

  res.status(200).json({ message: "Usuário registrado com sucesso!" });
}