let users = [
  {
    username: process.env.SPIDERX_USERNAME,
    password: process.env.SPIDERX_PASSWORD,
    admin: true
  }
];

export function getUser(username) {
  return users.find(u => u.username === username);
}

export function createUser(user) {
  users.push(user);
}
