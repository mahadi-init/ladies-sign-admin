// Function to calculate the difference in days
export function getDaysAgo(dateString: string) {
  // Parse the given date
  const givenDate = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in time
  // @ts-ignore
  const differenceInTime = currentDate - givenDate;

  // Convert the difference in time from milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

  if (differenceInDays < 0) {
    return null;
  }

  return differenceInDays;
}
