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
    id: 1,
    name: "Rock"
  },
  {
    id: 2,
    name: "Paper"
  },
  {
    id: 3,
    name: "Scissors"
  },
  {
    id: 4,
    name: "Lizard"
  },
  {
    id: 5,
    name: "Spock"
  },
])
