import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {

  const email = req.query.email;

  const { db } = await connectToDatabase();
  
  const data = await db.collection('users').findOne({email});
  
  res.json(data);
}