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
    name: "Rock"
  },
  {
    value: 2,
    name: "Paper"
  },
  {
    value: 3,
    name: "Scissors"
  },
  {
    value: 4,
    name: "Lizard"
  },
  {
    value: 5,
    name: "Spock"
  },
])

db.users.insertOne({
  name: "PC"
})
