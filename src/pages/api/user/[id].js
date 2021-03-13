import { connectToDatabase } from '../../../../util/mongodb';
import { ObjectID } from 'mongodb';

export default async function handler(req, res) {

  const id = req.query.id;

  const { db } = await connectToDatabase();
  
  const data = await db.collection('users').findOne({_id: new ObjectID(id)});
  
  res.json(data);
}