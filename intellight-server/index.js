const WebSocket = require("ws");
const fs = require("fs");
const { EventEmitter } = require("events");
const uuidv4 = require("uuid/v4");
const _ = require("lodash");

const Lock = require("./lock");

const wss = new WebSocket.Server({ port: 8080 });
const state = JSON.parse(fs.readFileSync("./state.json"));
const users = JSON.parse(fs.readFileSync("./users.json"));
const usersLock = new Lock();
const stateLock = new Lock();

const loginResponse = (token, permission) => ({ type: "LOGIN", token, permission });
const getResponse = brightnessPlan => ({ type: "GET", brightnessPlan });
const updateResponse = err => ({ type: "UPDATE", err });
const notification = brightnessPlan => ({ type: "NOTIFY", brightnessPlan });

const active = {
  clients: []
};
const notifier = new EventEmitter();
notifier.on("NOTIFY", (activeHome, plan) => {
  active.clients = active.clients.filter(
    ({ ws }) => ws.readyState === WebSocket.OPEN
  );
  active.clients.forEach(({ ws, home }) => {
    if (home === activeHome) {
      ws.send(JSON.stringify(notification(plan)));
    }
  });
});

const addActiveUser = (user, ws) => {
  const newClient = { user, ws, home: users[user].home };
  active.clients = _.unionBy([newClient], active.clients, "user");
};

const handleLogin = ({ user, pass }, ws) => {

  if(users[user] === undefined)
    console.log("User doesn't exist")
  else if(users[user].pass === pass) {
    const token = uuidv4();
    const permission = users[user].permission;

    usersLock.acquire();
    users[user].token = token;
    fs.writeFileSync("./users.json", JSON.stringify(users));
    usersLock.release();

    addActiveUser(user, ws);

    return loginResponse(token, permission);
  }
  else
  {
    console.log("Wrong password")
  }
  return loginResponse(null, null);
};

const authenticate = (user, token, ws) => {
  if (users[user].token === token) {
    addActiveUser(user, ws);
    return true;
  }
  return false;
};

const handleGet = ({ user, token }, ws) => {
  if (!authenticate(user, token, ws)) {
    return getResponse(null);
  }
  return state[users[user].home];
};

const handleUpdate = ({ user, token, update }, ws) => {
  if (!authenticate(user, token, ws)) {
    return updateResponse(`Token ${token} is not associated with user ${user}`);
  }

  const { home } = users[user];

  // if (users[user].permission !== "admin") {
  //     return updateResponse(
  //       `User ${user} does not have permission for this operation`
  //     );
  //   }
  stateLock.acquire();

  let plan = state[home];
  if (!plan) {
    stateLock.release();
    return updateResponse(`No home ${home} in state`);
  }

  for(let i = 0; i < 13; i++) {
    const item = "item" + i;
    const cur_item = update[item];
    plan[item]["settings"] = cur_item.settings;
  }

  fs.writeFileSync("./state.json", JSON.stringify(state));
  stateLock.release();

  notifier.emit("NOTIFY", home, plan);

  return updateResponse(null);
};

const handlers = {
  LOGIN: handleLogin,
  GET: handleGet,
  UPDATE: handleUpdate
};

const noop = () => {};

const handle = (request, ws) => (handlers[request.type] || noop)(request, ws);

wss.on("connection", ws =>
  ws.on("message", data => {
    const request = JSON.parse(data);

    const response = handle(request, ws);
    console.log(response);
    ws.send(JSON.stringify(response));
  })
);
