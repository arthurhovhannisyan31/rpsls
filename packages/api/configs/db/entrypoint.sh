#!/usr/bin/env bash

mongosh --port 27017 -u root -p root --authenticationDatabase admin
use admin
db.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
