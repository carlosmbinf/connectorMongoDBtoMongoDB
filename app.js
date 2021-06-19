// import { Meteor } from 'meteor/meteor';
var  metodos = require( './meteorDDPConnect');
var  metodosMONGODB = require( './metodo');

// import { exportDataBase, importDataBase, exportImportDataBase } from './metodo';
// const file = "D://meteor/data.json";

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola Mundo\n');
});

server.listen(port, hostname, () => {
  
  try {
    console.log(`Server running at http://${hostname}:${port}/`);
    metodosMONGODB.exportImportDataBase("mongodb://127.0.0.1:3001/meteor","152.206.118.9:27017");
    
    } catch (error) {
      console.log('Error ' + error);
    }
});