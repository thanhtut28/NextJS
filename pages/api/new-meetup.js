//* /api/new-meetup
//* server-side code
//* won't increase client-side bundle size

import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const { title, image, addresss, description } = data;
        // cuz insert whole data obj

        // connect returns a promise
        const client = await MongoClient.connect(
            'mongodb+srv://thanhtut_28:kingkong44110@cluster0.jhbra.mongodb.net/meetups?retryWrites=true&w=majority'
        );

        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        // collection is a collection of documents.
        // collection is like table and documents like entries

        const result = await meetupsCollection.insertOne(data);
        // document in mongoDB is object type

        console.log(result);

        client.close();
        //close connection when it is done

        res.status(201).json({ message: 'Meetup inserted!' });
    }
}

export default handler;
