import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

const db = admin.firestore();

exports.onNewShare = functions.firestore
    .document("users/{userId}/shares/{shareId}")
    .onCreate(async (snap, context) => {
        const share = snap.data();

        if (share.direction === "outgoing") {
            const userEmail = share.user_email;
            const usersRef = db.collection("users");


            const outgoingUserRef = await usersRef.doc(context.params.userId).get();
            let outgoingUserEmail ="";
            if(outgoingUserRef.exists){
                outgoingUserEmail = outgoingUserRef.data()!!.email;
            }


            const queryRef = await usersRef.where("email", "==", userEmail).get();
            if(!queryRef.empty){
                let userId = "";
                queryRef.forEach(doc=> {
                    userId = doc.id
                })
                const res = await db.collection("users/" + userId + "/shares").add({
                    user_email: outgoingUserEmail
                })
                console.log(res)
            }
            console.log(queryRef)
            console.log(context.params.userId)

        }
        return null;
    });
