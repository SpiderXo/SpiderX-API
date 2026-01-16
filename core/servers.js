let servers = [];

export function createServer(name, owner) {
  const server = {
    id: Math.random().toString(36).substring(2, 10),
    name,
    owner,
    status: "stopped",
    logs: [],
    files: ["index.js", "package.json"]
  };
  servers.push(server);
  return server;
}

export function getServers(owner) {
  return servers.filter(s => s.owner === owner);
}

export function getServer(id) {
  return servers.find(s => s.id === id);
}
