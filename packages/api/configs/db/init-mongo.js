db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);
db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: ["root"],
});

const conn = new Mongo();
db = conn.getDB("rpsls");

db.choices.insertMany([
  {
    value: 1,
    name: "ROCK"
  },
  {
    value: 2,
    name: "PAPER"
  },
  {
    value: 3,
    name: "SCISSORS"
  },
  {
    value: 4,
    name: "LIZARD"
  },
  {
    value: 5,
    name: "SPOCK"
  },
])

db.users.insertOne({
  name: "PC"
})
