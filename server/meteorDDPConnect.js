
const simpleDDP = require("simpleddp"); // nodejs
const ws = require("isomorphic-ws");

export async function  conectMeteor(){
//   let meteor1 = await DDP.connect("ws://localhost:3020/websocket");
  
//   console.log(meteor1.status());
  
// https://casalinda.vacancyrewards.com/
  let opts = {
    endpoint: "ws://localhost:3020/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000
};
const server = new simpleDDP(opts);

server.on("connected", () => {
  // do something
  console.log(server.connected);
const credential = Meteor.settings.private.api;

  (async () => {
        await server.subscribe("external.members.all", credential).ready()
        await server.subscribe("external.oldMembers.all",credential).ready()
        await server.subscribe("external.employees.all",credential).ready()
        await server.subscribe("external.employeesNotUser.all",credential).ready()
        await server.subscribe("Folios",credential).ready()
        await server.subscribe("external.users.all",credential).ready()
        await server.subscribe("external.club",credential).ready()
        await server.subscribe("external.annualFee.all",credential).ready()
        await server.subscribe("external.services.all",credential).ready()
        await server.subscribe("external.specialIncentives.all",credential).ready()
        await server.subscribe("external.commissions.all",credential).ready()
        await server.subscribe("external.connections.all",credential).ready()
        await server.subscribe("external.documents.all",credential).ready()
        await server.subscribe("external.letters.all",credential).ready()
        await server.subscribe("external.membershipTypes.all",credential).ready()
        // await server.subscribe("external.files.agreements.all",credential) 
        // await server.subscribe("external.files.scannedAgreements.all",credential) 
        await server.subscribe("external.Attendee.all",credential).ready()
        await server.subscribe("external.log.all",credential).ready() 
   
        console.log(await JSON.parse(JSON.stringify(server.collection()._server.collections)));

    //all subs are ready here
  })();
  
  // for example show alert to user
});

server.on('ready', () => {
    

   
});

server.on('disconnected', () => {
    // for example show alert to user
    console.log(server.connected);
});

server.on('error', (e) => {
    // global errors from server
    console.log(server.connected);
});

}