module.exports = (app) => {
  return {
    // params serve para filtros de pesquisa
    findAll: (params, callback) => {
      return callback([
        { title: "fazer compras" },
        { title: "Ler o clean code" },
      ]);
    },
  };
};
