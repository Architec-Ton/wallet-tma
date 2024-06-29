import { formatDistanceToNow } from 'date-fns';


const TimeSinceCreation = ({date}) => {

    return formatDistanceToNow(new Date(date), {addSuffix: true})

};

export default TimeSinceCreation;