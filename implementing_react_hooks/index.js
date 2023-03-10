function add() {
  let num = 1;

  return (add_num) => {
    num = num + add_num;
    return num;
  };
}

let addNum = add();
console.log(addNum(4));
console.log(addNum(5));
console.log(addNum(1));
