const mongoose = require('mongoose');

const connecDatabase = () =>{
      mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      }).then((data) =>{
            console.log(`mongod is connected to the sever: ${data.connection.host}`)
      })
}

module.exports = connecDatabase;