const db = mysql.createConnection({
    host: 'localhost', // 127 .0.0.1
    user : 'root',
    password: '',
    databasse: 'todolist_app'
});
db.connect((err) =>{
    if (err) {
        console.error('database connection failed: ', err.stack);
        return;
    }
    console.log('connected to mysql database')
});
module.exports = db;