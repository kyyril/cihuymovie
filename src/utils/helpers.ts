export const minutesTohours = (minutes: any) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}h ${mins}m`;
};

export const ratingToPercentage = (rating: any) => {
  return (rating * 10)?.toFixed(0);
};

export const resolveRatingColor = (rating: any) => {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
};
