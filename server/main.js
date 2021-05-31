import { Meteor } from 'meteor/meteor';
import { conectMeteor } from './meteorDDPConnect';
import { exportDataBase, importDataBase, exportImportDataBase } from './metodo';
const file = "D://meteor/data.json";



Meteor.startup(() => {
  try {
  conectMeteor()
  } catch (error) {
    console.log('Error ' + error);
  }
});

