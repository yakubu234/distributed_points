async function distributePoints(): Promise<{
  totalDistributed: number;
  distributedList: { userIndex: number; points: number }[];
}> {
  const maxDistributed = 300;
  let numOfUsers = 150;
  const minPoints = ( 0.1 * numOfUsers );
  let remainingPoints = maxDistributed - minPoints;
  let totalDistributed = 0;
  const distributedList: { userIndex: number; points: number }[] = [];

  for (let i = 1; i <= numOfUsers; i++) {
    distributedList.push({ userIndex: i , points: 0.1 });
  }

  try {
   
     /* Distribute remaining points efficiently */
    for (let i = 1; i <= distributedList.length && remainingPoints > 0; i++) {
    const randomUserIndex = Math.floor(Math.random() * numOfUsers);
      const randomPoint = Math.min(Math.random() * 9.9, remainingPoints);
      const maxToAdd = Math.min(10 - (distributedList[randomUserIndex].points + randomPoint), remainingPoints);
      distributedList[randomUserIndex].points += maxToAdd;
      remainingPoints -= maxToAdd;
    }

   totalDistributed = distributedList.reduce((acc, item) => acc + item.points, 0);


    return { totalDistributed, distributedList };
  } catch (error: any) {
    console.error("Error occurred:", error.message);
    throw error; // Re-throw to allow handling in the calling code
  }
}

distributePoints()
  .then((res) => {
    console.log(`Total Distributed: ${res.totalDistributed}`);
    res.distributedList.forEach((item) => {
      console.log(`User ${item.userIndex} received => ${item.points} points`);
    });
  })
  .catch((error) => console.error("Error occurred:", error.message));
