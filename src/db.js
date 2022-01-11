import Dexie from "dexie";

export const db = new Dexie('cvpap');

db.version(2).stores({
  friends: '++id, name, age',//Friends table 
  users: '++id, name, layout',
});