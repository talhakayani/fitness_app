exports.generateRandomString = len => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
