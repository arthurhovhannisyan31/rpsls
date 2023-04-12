db.getSiblingDB('admin').auth(
  process.env.MONGO_INITDB_ROOT_USERNAME,
  process.env.MONGO_INITDB_ROOT_PASSWORD
);
db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: ["readWrite"],
});

const conn = new Mongo();
db = conn.getDB("rpsls");

db.users.createIndex({ "name": 1 }, { unique: true });
db.rooms.createIndex({ "name": 1 }, { unique: true });
db.rounds.createIndex({ "room_id": 1 }, { unique: true });
db.sessions.createIndex({ "user_id": 1 }, { unique: true });
