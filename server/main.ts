import Server from './server';

const PORT = 1997;
const server = new Server();

server.start(PORT);
console.log(`Server started on port ${PORT}..`);