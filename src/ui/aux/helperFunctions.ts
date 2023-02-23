interface itemRating {
  cardId: string;
  cardRating: number;
  userId: string;
  id: string;
}

export const getRatingStatsForCard = (
  ratings: itemRating[],
  cardId: string
): { avgRating: number; numUsers: string } => {
  const pluralize = (n: number) => (n === 1 ? "" : "s");
  const filteredRatings = ratings.filter((item) => item.cardId === cardId);
  const numUsers =
    filteredRatings.length === 0
      ? "no yet rated"
      : `by ${filteredRatings.length} traveller${pluralize(
          filteredRatings.length
        )}`;

  const avgRating =
    filteredRatings.length > 0
      ? filteredRatings.reduce((acc, curr) => acc + curr.cardRating, 0) /
        filteredRatings.length
      : 0;
  return { avgRating, numUsers };
};
