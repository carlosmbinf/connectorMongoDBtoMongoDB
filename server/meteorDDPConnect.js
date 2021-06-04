const simpleDDP = require("simpleddp"); // nodejs
const ws = require("isomorphic-ws");
const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;
const { Binary, ObjectID } = require("mongodb");

export function conectMeteor() {
  //   let meteor1 = await DDP.connect("ws://localhost:3020/websocket");
  const credential = Meteor.settings.private.host_first.credentials;
  const host_first = Meteor.settings.private.host_first.host;
  const port_first = Meteor.settings.private.host_first.port;

  //   console.log(meteor1.status());

  // https://casalinda.vacancyrewards.com/
  let opts1 = {
    endpoint: "ws://" + host_first + ":" + port_first + "/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000,
  };
  let opts2 = {
    endpoint: "ws://localhost:3022/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000,
  };
  const server1 = new simpleDDP(opts1);
  const server2 = new simpleDDP(opts2, [simpleDDPLogin]);

  server1.on("connected", async () => {
    // do something
    try {
      await console.log("server1 connected: " + server1.connected);
      // await server1.subscribe("files.agreements.all").ready();
      // await server1.subscribe("files.scannedAgreements.all").ready();
      // await server1.subscribe("files.images.all").ready();
      // await server1.subscribe("fs.chunk.all").ready();
      // await server1.subscribe("fs.files.all").ready();
      // await console.log("Subscrito a FILES ALL ( agreements scannedAgreements  images )");

      // await server1.subscribe("external.members.all",credential).ready();
      // await console.log("Subscrito a Members");

      // await console.log("Subscrito a Services");
      // await server1.subscribe("Comissions").ready();

      // await server1.subscribe("AnnualFees").ready();
      // await console.log("Subscrito a AnnualFees");
      // await server1.subscribe("Services").ready();
      // await console.log("Subscrito a Comissions");
      // await server1.subscribe("MembershipTypes").ready();
      // await console.log("Subscrito a MembershipTypes");

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
    try {
      await console.log("server2 connected: " + server2.connected);
      let password = Meteor.settings.private.host_second.password;
      //  let username = "admin";
      let email = Meteor.settings.private.host_second.email;
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
    try {
      await console.log("User logged in as", m);
      var arrayAgreementsId = [];
      var arrayImagesId =  [];
      var arrayScannedAgreemetnsId = [];
      var arrayFilesId = [];

      await server1.subscribe("external.members.all", credential).ready();
      await console.log("Subscrito a Members");
      await server1.call("getMembersAll").then((members) => {
        members.forEach((member) => {
          try {
            server2
              .call(
                "externalInsertMember",
                { user: "user", password: "password" },
                member
              )
              .then(() => {
                console.log("copia de member: " + member._id + " terminado");
              });
          } catch (error) {
            console.log(error);
          }
          // console.log('member: ' + JSON.stringify(member));
        });
      });

      ////////////// getAgreementsAll /////////////////// 
      await server1.subscribe("files.agreements.all").ready();

      await server1.call("getAgreementsAll").then((data) => {
        data.forEach((Agreement) => {
          try {
            arrayAgreementsId.push({ _id: Agreement._id });
            server2.call("setAgreementsAll", Agreement).then(() => {
              console.log(
                "copia de Agreement: " + Agreement._id + " terminado"
              );
            });
          } catch (error) {
            console.log(error);
          }
          // console.log('Agreement: ' + JSON.stringify(Agreement));
        });
      });

      ////////////////// getScannedAgreementsAll ///////////////////
      await server1.subscribe("files.scannedAgreements.all").ready();
      await server1.call("getScannedAgreementsAll").then((data) => {
        data.forEach((ScannedAgreement) => {
          try {
            arrayScannedAgreemetnsId.push({ _id: ScannedAgreement._id });
            server2
              .call("setScannedAgreementsAll", ScannedAgreement)
              .then(() => {
                console.log(
                  "copia de ScannedAgreement: " +
                    ScannedAgreement._id +
                    " terminado"
                );
              });
          } catch (error) {
            console.log(error);
          }
          // console.log('ScannedAgreement: ' + JSON.stringify(ScannedAgreement));
        });
      });

      ////////////////// getImagesAll ///////////////////
      await server1.subscribe("files.images.all").ready();
      await server1.call("getImagesAll").then((data) => {
        data.forEach((Image) => {
          try {
            arrayImagesId.push({ _id: Image._id });
            server2.call("setImagesAll", Image).then(() => {
              console.log("copia de Image: " + Image._id + " terminado");
            });
          } catch (error) {
            console.log(error);
          }
          // console.log('Image: ' + JSON.stringify(Image));
        });
      });

      //////////////////////// getDocuments ////////////////////////////////
      await server1.subscribe("Documents").ready();
      await console.log("Subscrito a Documents");

      await server1.call("getDocuments", credential).then((data) => {
        try {
          data && data.forEach((document) => {
            try {
              console.log("Documents: " + JSON.stringify(document));
              server2
                .call(
                  "setDocument",
                  document
                )
                .then(() => {
                  console.log(
                    "copia de document: " + document._id + " terminado"
                  );
                });
            } catch (error) {
              console.log(error);
            }
          });
        } catch (e) {
          console.log(e);
        }
      });

      //////////////////////// getfilesAll ////////////////////////////////
      await server1.subscribe("fs.files.all").ready();
      await console.log("Subscrito a fs.files.all");
      await server1.subscribe("fs.chunk.all").ready();
      await console.log("Subscrito a fs.chunk.all");
      
      await server1
        .call(
          "getfilesAll",
          arrayAgreementsId,
          arrayImagesId,
          arrayScannedAgreemetnsId
        )
        .then(async (data) => {
           await JSON.parse(data).forEach(async(file) => {
            //  await arrayFilesId.push({ _id: file._id });
             await server2.call("setfilesAll", file).then(() => {
               console.log(
                 "copia de file: " + JSON.stringify(file._id) + " terminado"
               );
             });

             await console.log("file: " + JSON.stringify(file));

             await server1.call("getchunksAll", file._id).then((data) => {
               JSON.parse(data).forEach(async (chunk) => {
                 await console.log(
                   "copiando los datos del file " +
                     file._id._str +
                     " - chunkID: " +
                     chunk._id._str +
                     " terminado"
                 );

                 await server2.call("setchunksAll", chunk).then(async () => {
                   await console.log(
                     "copia de chunk: " + chunk._id._str + " terminado"
                   );
                 });
               });
             });
              
            });

        });


      // //////////////////// getchunksAll ////////////////////////////////
      
      // (arrayFilesId.length>0) && await server1.call("getchunksAll", arrayFilesId).then((data) => {
      //     JSON.parse(data).forEach((chunk) => {
      //         server2.call("setchunksAll", chunk).then(() => {
      //           console.log("copia de chunk: " + chunk._id + " terminado");
      //         });
      //       console.log("chunk: " + JSON.stringify(chunk));
      //     });
      // });

      
    } catch (error) {
      console.log(error);
    }
  });
  server1.on("disconnected", () => {
    console.log("Disconnected server1");
  });
  server2.on("disconnected", () => {
    console.log("Disconnected server2");
  });
  server2.on("ready", () => {
    console.log("ready server2");
  });
}
