import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = props => {
    const { isFallback } = useRouter();

    if (isFallback) {
        return <p>...Loading</p>;
    }

    return <MeetupDetail {...props.meetupData} />;
};

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        'mongodb+srv://thanhtut_28:kingkong44110@cluster0.jhbra.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: 'blocking',
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString(),
            },
        })),

        // [
        //     {
        //         params: {
        //             meetupId: 'm1',
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2',
        //         },
        //     },
        // ],
    };
}

export async function getStaticProps(context) {
    const { meetupId } = context.params;

    const client = await MongoClient.connect(
        'mongodb+srv://thanhtut_28:kingkong44110@cluster0.jhbra.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    // console.log(selectedMeetup);

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
            title: selectedMeetup.title,
            description: selectedMeetup.description,
        },
    };
}

export default MeetupDetails;
