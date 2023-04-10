#!/usr/bin/env bash

mongosh --port 27017
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
