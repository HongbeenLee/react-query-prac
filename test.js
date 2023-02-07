const a = {
  1: 1,
  2: 2,
  3: {
    4: 4,
  },
};

console.log({ ...a }[3] === a[3]);

console.log(..."hello");
