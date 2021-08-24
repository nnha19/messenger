const users = [];

const addUser = (userArg, room) => {
  const userExist = users.find((user) => user._id === userArg._id);
  if (userExist) {
    return userExist;
  } else {
    const user = { ...userArg, room };
    users.push(user);
    return user;
  }
};

const getUser = (userId) => users.find((user) => user._id === userId);

module.exports = { addUser, getUser };
