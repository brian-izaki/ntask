const cluster = require("cluster"),
  os = require("os");

const CPUS = os.cpus();
if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());
  cluster.on("listening", (worker) => {
    console.log("Cluster %d conectado", worker.process.pid);
  });
  cluster.on("disconnect", (worker) => {
    console.log("Cluster %d desconectado", worker.process.pid);
  });

  cluster.on("exit", (worker) => {
    console.log("Cluster %d saiu do ar", worker.process.pid);
    cluster.fork();
    // inicia um novo cluster quando um sai do ar
  });
} else {
  require("./index");
}
