const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Regras de autorização
const rules = auth.rewriter({
  // Permissionamento: /resource/:id
  users: 600,
  posts: 644
});

// Middlewares
server.db = router.db; // Necessário para json-server-auth
server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});