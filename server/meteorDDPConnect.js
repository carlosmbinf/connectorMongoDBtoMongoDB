const simpleDDP = require("simpleddp"); // nodejs
const ws = require("isomorphic-ws");
const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;
const { Binary, ObjectID } = require('mongodb')

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
  server1.on("connected",async () => {
    // do something 
    await console.log("server1 connected: " + server1.connected);
    await server1.subscribe("files.agreements.all").ready();
    await server1.subscribe("files.scannedAgreements.all").ready();
    await server1.subscribe("files.images.all").ready();
    await server1.subscribe("fs.chunk.all").ready();
    await console.log("Subscrito a FILES ALL ( agreements scannedAgreements  images )");
    
    await server1.subscribe("Members").ready();
    await console.log("Subscrito a Members");

    
    await console.log("Subscrito a Services");
    await server1.subscribe("Comissions").ready();

    await server1.subscribe("Documents").ready();
    await console.log("Subscrito a Documents");
    await server1.subscribe("AnnualFees").ready();
    await console.log("Subscrito a AnnualFees");
    await server1.subscribe("Services").ready();
    await console.log("Subscrito a Comissions");
    await server1.subscribe("MembershipTypes").ready();
    await console.log("Subscrito a MembershipTypes");
    try {
      // await server1.subscribe('file.agreements.all').ready()
      // await console.log("Subscrito a file.agreements.all");
      // await server1.subscribe('files.scannedAgreements.all').ready()
      // await console.log("Subscrito a files.scannedAgreements.all");

      //       // await server1.subscribe("Members").ready()
      //       // await server1.subscribe("external.oldMembers.all",credential).ready()
      //       // await server1.subscribe("external.employees.all",credential).ready()
      //       // await server1.subscribe("external.employeesNotUser.all",credential).ready()
      //       // await server1.subscribe("Folios",credential).ready()
      //       // await server1.subscribe("external.users.all",credential).ready()
      //       // await server1.subscribe("external.club",credential).ready()
      // await server1.subscribe("AnnualFees").ready()
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
      //  await server1.subscribe("external.members.all", credential).ready();
      //  await console.log("Subscrito a external.members.all");
      //  await console.log("Subscrito a AnnualFees");

      await server2.disconnect();
      await server2.connect();
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
      // await server1.call("getMembersAll", credential).then((members) => {
      //   members.forEach((member) => {
      //     member &&
      //       server2
      //         .call("externalInsertMember", credential, member)
      //         .then(() => {});
      //   });
      //   // console.log(server2.call("externalLogin", autentication));
      // });
    
      ////////////////// getAgreementsAll ///////////////////
      // await server1.call("getAgreementsAll").then((data) => {
      //   data.forEach((Agreement) => {
      //     Agreement &&
      //       server2
      //         .call("setAgreementsAll", Agreement)
      //         .then(() => {});
      //     console.log(Agreement);
      //   });

      //   // console.log(server2.call("externalLogin", autentication));
      // });

      //  ////////////////// getScannedAgreementsAll ///////////////////
      //  await server1.call("getScannedAgreementsAll").then((data) => {
      //   data.forEach((ScannedAgreement) => {
      //     ScannedAgreement &&
      //       server2
      //         .call("setScannedAgreementsAll", ScannedAgreement)
      //         .then(() => {});
      //     console.log(ScannedAgreement);
      //   });

      //   // console.log(server2.call("externalLogin", autentication));
      // });

      //  ////////////////// getImagesAll ///////////////////
      //  await server1.call("getImagesAll").then((data) => {
      //   data.forEach((Image) => {
      //     Image &&
      //       server2
      //         .call("setImagesAll", Image)
      //         .then(() => {});
      //     console.log(Image);
      //   });
      //   // console.log(server2.call("externalLogin", autentication));
      // });


        await server1.call("getchunksAll").then(async (data) => {
          try {
          await  JSON.parse(data).forEach((chunk) => {
            // console.log(chunk._id);
            // console.log(chunk.data);

            console.log(Binary(Array(chunk.data)));
            // chunk.data = new Binary(Array(chunk.data))
            // console.log(chunk._id);

              chunk &&
                server2
                  .call("setchunksAll", chunk).then((data)=>{console.log('terminado');});
            });
            // server2
            //       .call("setchunksAll", data).then(()=>{console.log('terminado');});
              
            // console.log(data);
          } catch (e) {
            console.log(e);
          }
      

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
    console.log("ready server2");
   
  });
  
}
