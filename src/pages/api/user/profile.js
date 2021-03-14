import { connectToDatabase } from '../../../../util/mongodb';

export default async function handler(req, res) {

  const { email, password } = req.body;

  if(!email || !password ) {
    return res.json({message: `Fields cannot be empty`})
  }

  const { db } = await connectToDatabase();
  
  const user = await db.collection('users').findOne({ email });
    
  if(!user) {
    return res.json({ message: "User is not in our system!" })
  }

  const data = await db .collection('users').findOne({email, password});

  if(!data) {
    return res.json({ message: "Password error" })
  }

  return res.json(data);
}