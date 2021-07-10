import { useRouter } from 'next/router';
import MeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetup() {
    const { push } = useRouter();

    const addMeetupHandler = async enteredMeetupData => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log(data);
        push('/');
    };

    return <MeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetup;

export async function getStaticProps() {
    return {
        props: {
            title: 'Add New Meetup',
        },
    };
}
