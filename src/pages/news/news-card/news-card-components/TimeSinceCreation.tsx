import { formatDistanceToNow } from "date-fns";

interface Props {
  date: Date;
}

const TimeSinceCreation = ({ date }: Props) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export default TimeSinceCreation;
