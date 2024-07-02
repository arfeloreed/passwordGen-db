function genPass(length) {
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let res = "";
  for (let i = 0; i < length; i++) {
    res += str[Math.floor(Math.random() * str.length)];
  }
  return res;
}

export { genPass };
