const express = require('express');
const app = express();
const port = 3000;
const todosRouter = require('./src/routers/todo');
app.use(express.json());
 app.get('/', (res, req) => {
    res.setEncoding('hello world')
 });
 app.use('/toddo', todosRouter);
 app.listen(port, () =>{
    console.log('Example app listening on port ${port}')
 });
