import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage({ meetups }) {
    return (
        <>
            <MeetupList meetups={meetups} />
        </>
    );
}

//* only executes in build-time, neither on server side nor especially on client side.
export async function getStaticProps() {
    // const res = await fetch(`url`);
    // const meetups = await res.json();
    const client = await MongoClient.connect(
        'mongodb+srv://thanhtut_28:kingkong44110@cluster0.jhbra.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray(); // find method finds all of the documents

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
            title: 'Meetups',
        },

        revalidate: 1,
    };
}

//* only executes in server side.
// export async function getServerSideProps(context) {
//     //fetch data from server

//     const { req, res } = context;
//     console.log(req);

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS,
//         },
//     };
// }

export default HomePage;

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image:
//             'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 5, 12345 Some City',
//         description: 'This is a first meetup!',
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image:
//             'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Some address 10, 12345 Some City',
//         description: 'This is a second meetup!',
//     },
// ];
