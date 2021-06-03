//引入mongose数据库插件
const mongoose = require('mongoose');
const chalk = require('chalk')

mongoose.connect( process.env.DB_HOST || 'mongodb://localhost:27018/project',{    
    useNewUrlParser: true,
    useUnifiedTopology: true
})
let db = mongoose.connection;

db.once('open', () => {
    console.info(
        chalk.green('连接数据库成功')
    );
})

db.on('error', (error)=> {
    console.error(
        chalk.red('Error in MongoDb connection: ' + error)
    );
    mongoose.disconnect();
});

db.on('close', ()=>{
    console.log(
        chalk.red('数据库断开，重新连接数据库')
    );
    mongoose.connect(process.env.DB_HOST, { server: { auto_reconnect: true } });
});

module.exports = db;

