import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

exports.onNewShare = functions.firestore
    .document("users/{userId}/shares/{shareId}") //to jest adres shera outgoing wysłanego przez johna
    .onCreate(async (snap, context) => {
        const share = snap.data();//
        const incomingUserEmail = share.user_email //merry email
        const outgoingShareId = context.params.shareId
        if (share.direction === "outgoing") {
            const usersRef = db.collection("users");
            const outgoingUserRef = await usersRef.doc(context.params.userId).get();//jonh id
            let outgoingUserEmail =""; //john email
            let outgoingUserId ="";
            if(outgoingUserRef.exists){
                outgoingUserEmail = outgoingUserRef.data()!!.email;
                outgoingUserId = outgoingUserRef.data()!!.uid;
            }


            const queryRef = await usersRef.where("email", "==", incomingUserEmail).get();//merry
            if(!queryRef.empty){
                let incomingUserId = "";
                queryRef.forEach(doc=> {
                    incomingUserId = doc.id //id marry
                })
                const res = await db.collection("users/" + incomingUserId + "/shares").add({
                    user_email: outgoingUserEmail,
                    date: share.date,
                    direction: "incoming",
                    status: share.status,
                    user_id: outgoingUserId,
                    shareIdInOut: outgoingShareId
                })
                const respond = await db.collection("users/" + incomingUserId + "/notifications").add({
                    isRead: false,
                    cta: outgoingUserEmail,
                    type: "invite",
                    date: share.date
                })
                console.log(res, respond)
            }
            console.log(queryRef)
            console.log(context.params.userId)

        }
        return null;
    });
 exports.changeStatusShareToAccepted = functions.firestore
     .document("users/{userId}/shares/{shareId}") //to jest adres shera incoming u marry
     .onUpdate(async (change, context)=>{

         const newValue = change.after.data();
         const previousValue = change.before.data();
         if(previousValue.direction == "incoming" && previousValue.status != newValue.status){
             const newStatus = newValue.status; //accepted

             const outgoingUserId = previousValue.user_id;//john id
             const shareId = previousValue.shareIdInOut
             const shareDoc = await db.doc("users/" + outgoingUserId + "/shares/" + shareId).set({
                 status: newStatus }, {merge: true});
             console.log(shareDoc)
             console.log(context.params.userId)
         }

     })
