require('dotenv').config();

const app = require('./server');
require('./database.js');

console.log(process.env.MONGODB_URI);



app.listen(app.get('port'), ()=>{
    console.log(`Server on port:`, app.get('port'))
})