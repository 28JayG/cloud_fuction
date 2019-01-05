const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var notificationData;
 
exports.newMessage = functions.firestore.document(
    'messages/{messageID}'
).onCreate((snapshot, context) => {
    notificationData = snapshot.data;

    admin.firestore().collection('tokens').get().then((snapshots) => {
        var tokens = [];
        if(snapshots.empty){
            console.log('No Device');
        }
        else{
            for(var token of snapshots.docs){
                tokens.push(token.data().tokenID);
            }

            var payload = {
                "notification":{
                    "title":"From",
                    "body":"Just a notification",
                },
                "data":{
                    "name":notificationData.name,
                    "text":"just a test",
                },
            }

             admin.messaging().sendToDevice(tokens, payload).then((response) => {
              return  console.log(respone);
            }).catch((err) => {
              return  console.log(err);
            })
        }
        return console.log('deploy karo abb');
    }).catch((err)=>{
        return console.log(err)
    })
})