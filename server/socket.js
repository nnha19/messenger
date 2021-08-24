const users = [];

const addUser = (userId, username, room) => {
  const userExist = users.find((user) => user.userId === userId);
  if (userExist) {
    return userExist;
  } else {
    const user = { userId, username, room };
    users.push(user);
    return user;
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports = { addUser, getUser };
