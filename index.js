import express from 'express';

const PORT = 3000;
const app = express();

// formata a visualização do JSON no response
app.use('json spaces', 4)

app.get('/', (req, res) => res.json({status: 'NTask API'}));

app.get('/tasks', (req, res) => {
  res.json({
    tasks: [
      {title: "fazer compras"},
      {title: "Ler o clean code"},

    ]
  })
})

app.listen(PORT, ()=> console.log(`iniciado ${PORT}` ))
