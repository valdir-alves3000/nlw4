import { connectToDatabase } from '../../../../util/mongodb';

export default async function handler(req, res) {

  const { email } = req.body;

  const { db } = await connectToDatabase();
  
  const user = await db.collection('users').findOne({ email });
  
  return res.json(user);
}