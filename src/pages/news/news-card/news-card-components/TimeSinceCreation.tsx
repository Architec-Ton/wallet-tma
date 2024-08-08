import type React from "react";

import { formatDistanceToNow } from "date-fns";

interface Props {
  date: Date;
}

const TimeSinceCreation = ({ date }: Props) => formatDistanceToNow(new Date(date), { addSuffix: true });

export default TimeSinceCreation;
