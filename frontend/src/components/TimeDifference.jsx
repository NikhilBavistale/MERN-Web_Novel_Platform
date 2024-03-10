import React from 'react';

const TimeDifference = ({ startDate }) => {
  const start = new Date(startDate);
  const end = new Date(); // Current date and time

  const diffInMs = Math.abs(end - start);
  const diffInSecs = diffInMs / 1000;
  const diffInMins = Math.floor(diffInSecs / 60);
  const diffInHours = Math.floor(diffInMins / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMins < 60) {
    return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
};

export default TimeDifference;