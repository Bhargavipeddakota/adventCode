const getpeople = (limit) => {
  const people = [];
  for(let i =1;i <= limit;i++){
    people.push(i);
  }
  return people;
}
const whoWillAlive = (people) => {
  const fakePeople = [...people]
  let index = 0
  while(fakePeople.length !== 1){
    index = (index + 1) % fakePeople.length;
    fakePeople.splice(index,1);
  }
  return fakePeople
}
console.log(whoWillAlive(getpeople(100))[0]);