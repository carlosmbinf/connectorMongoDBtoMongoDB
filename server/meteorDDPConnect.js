const simpleDDP = require("simpleddp"); // nodejs
const ws = require("isomorphic-ws");
const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;

export async function conectMeteor() {
  //   let meteor1 = await DDP.connect("ws://localhost:3020/websocket");

  //   console.log(meteor1.status());

  // https://casalinda.vacancyrewards.com/
  let opts1 = {
    endpoint: "ws://localhost:3020/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000,
  };
  let opts2 = {
    endpoint: "ws://localhost:3022/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000,
  };
  const server1 = new simpleDDP(opts1);
  const server2 = new simpleDDP(opts2,[simpleDDPLogin]);
  const credential = Meteor.settings.private.api;
  
  const autentication = {
    user: "admin@vr.com",
    password: "duiTqmYGWagkXCwrm",
  };
  server1.on("connected", () => {
    // do something
    console.log("server1 connected: " + server1.connected);

    try {
      (async () => {
        //       // await server1.subscribe("Members").ready()
        //       // await server1.subscribe("external.oldMembers.all",credential).ready()
        //       // await server1.subscribe("external.employees.all",credential).ready()
        //       // await server1.subscribe("external.employeesNotUser.all",credential).ready()
        //       // await server1.subscribe("Folios",credential).ready()
        //       // await server1.subscribe("external.users.all",credential).ready()
        //       // await server1.subscribe("external.club",credential).ready()
        //       // await server1.subscribe("external.annualFee.all",credential).ready()
        //       // await server1.subscribe("external.services.all",credential).ready()
        //       // await server1.subscribe("external.specialIncentives.all",credential).ready()
        //       // await server1.subscribe("external.commissions.all",credential).ready()
        //       // await server1.subscribe("external.connections.all",credential).ready()
        //       // await server1.subscribe("external.documents.all",credential).ready()
        //       // await server1.subscribe("external.letters.all",credential).ready()
        //       // await server1.subscribe("external.membershipTypes.all",credential).ready()
        //       // // await server1.subscribe("external.files.agreements.all",credential)
        //       // // await server1.subscribe("external.files.scannedAgreements.all",credential)
        //       // await server1.subscribe("external.Attendee.all",credential).ready()
        //       // await server1.subscribe("external.log.all",credential).ready()
    
        //       // console.log(await JSON.parse(JSON.stringify(server1.collection()._server1.collections)));
        //       // server1.call("getMembersAll").then((a) => console.log(a));
        //   //all subs are ready here
        //  server1.subscribe("external.members.all", credential)
         await server1.subscribe("external.members.all", credential).ready();
         console.log("Subscrito a external.members.all");
         
         await server2.disconnect();
         await server2.connect();
        })();
    } catch (error) {
      console.log(error);
    }
    
    // for example show alert to user
  });



  // server1.on("ready", () => {
  //   console.log("ready server1");
  //   // server1.call("getMembersAll").then((a) => console.log(a[0]));
  // });

  // server1.on("disconnected", () => {
  //   // for example show alert to user
  //   console.log("disconnected");
  // });

  // server1.on("error", (e) => {
  //   // global errors from server1
  //   console.log("Error: " + e);
  // });


  server2.on("connected", async () => {
    await console.log("server2 connected: " + server2.connected);
        
    try {
      let password = "duiTqmYGWagkXCwrm";
      //  let username = "admin";
      let email = "admin@vr.com";
      server1.connected
        ? await server2.login({
            password,
            user: {
              // username,
              email,
            },
          })
        : server1.connect();
      // you must pass password and at least one of username or email
      // await console.log(server2.userId)
    } catch (error) {
     console.log(error);
   }

  });

  server2.on("login", async (m) => {
    await console.log("User logged in as", m);
    try {
      await server1.call("getMembersAll", credential).then((members) => {
        members.forEach((member) => {
          member &&
            server2
              .call("externalInsertMember", credential, member)
              .then(() => {});
        });
        // console.log(server2.call("externalLogin", autentication));
      });
    } catch (error) {
      console.log(error);
    }
  });

  server2.on("disconnected", () => {
    console.log("Disconnected server2");
   
  });
  server2.on("ready", () => {
    console.log("Disconnected server2");
   
  });
  
}
