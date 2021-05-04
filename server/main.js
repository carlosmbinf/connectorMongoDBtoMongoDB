import { Meteor } from 'meteor/meteor';
import { conectMeteor } from './meteorDDPConnect';
import { exportDataBase, importDataBase, exportImportDataBase } from './metodo';
const file = "D://meteor/data.json";



Meteor.startup(async() => {
  // If the Links collection is empty, add some data.
  await conectMeteor()
  // conectMeteor()

});

