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
                const idInviteShare = res.id
                const shareOutgoingRef = await db.doc(("users/" + outgoingUserId + "/shares/" + outgoingShareId))
                await shareOutgoingRef.set({incomingShareId: idInviteShare }, {merge: true});
                if (share.status === "pending"){
                const respond = await db.collection("users/" + incomingUserId + "/notifications").add({
                    isRead: false,
                    cta: outgoingUserEmail,
                    type: "invite",
                    date: share.date,
                    change: "new pending"
                })
                console.log(res, respond)
            }}
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
         if(previousValue.direction == "incoming" && previousValue.status != newValue.status && previousValue.status != "accepted"){
             const newStatus = newValue.status; //accepted

             const outgoingUserId = previousValue.user_id;//john id
             const shareId = previousValue.shareIdInOut
             const shareDoc = await db.doc("users/" + outgoingUserId + "/shares/" + shareId).set({
                 status: newStatus }, {merge: true});
             console.log(shareDoc)
             const incomingShareUserId = context.params.userId
             const usersRef = db.collection("users")
             const queryRef = await usersRef.where("uid", "==", incomingShareUserId).get();//merry
             if(!queryRef.empty) {
                 let incomingUserEmail = "";
                 queryRef.forEach(doc => {
                     incomingUserEmail = doc.data()!!.email;//email marry
                 })
                 await db.collection("users/" + outgoingUserId + "/notifications").add({
                     isRead: false,
                     cta: incomingUserEmail,
                     type: "info",
                     date: new Date(),
                     change: "pending to accepted"
                 })
             }
        console.log(queryRef)
         }


     })
exports.changeStatusShareToRejected = functions.firestore
    .document("users/{userId}/shares/{shareId}") //to jest adres shera incoming u marry
    .onUpdate(async (change, context)=>{

        const newValue = change.after.data();
        const previousValue = change.before.data();
        if(previousValue.direction == "incoming" && previousValue.status === "pending" && newValue.status === "rejected"){
            const newStatus = newValue.status; //rejected
            const outgoingUserId = previousValue.user_id;//john id
            const shareId = previousValue.shareIdInOut
            const shareDoc = await db.doc("users/" + outgoingUserId + "/shares/" + shareId).set({
                status: newStatus }, {merge: true});
            console.log(shareDoc)
            const incomingShareUserId = context.params.userId
            const usersRef = db.collection("users")
            const queryRef = await usersRef.where("uid", "==", incomingShareUserId).get();//merry
            if(!queryRef.empty) {
                let incomingUserEmail = "";
                queryRef.forEach(doc => {
                    incomingUserEmail = doc.data()!!.email;//email marry
                })
                await db.collection("users/" + outgoingUserId + "/notifications").add({
                    isRead: false,
                    cta: incomingUserEmail,
                    type: "info",
                    date: new Date(),
                    change: "pending to rejected"
                })
            }
            console.log(queryRef)
        }


    })
exports.changeStatusAcceptedShareToRejected = functions.firestore
    .document("users/{userId}/shares/{shareId}")
    //share u johna wychodzacy  date direction:outgoing status accepted user_emeial:marry incomingShareId: id shera u merry
    //share u marry przychodzacy  date direction:incoming shareidinout:id shera u johna status accepted user_emeial:john user_id: id johna idShare: id shera
    .onUpdate(async (change, context)=>{
        const newValue = change.after.data();
        const previousValue = change.before.data();
        if (previousValue.direction === "incoming" && previousValue.status === "accepted" && newValue.status === "rejected"){ //marry anuluje

            const outgoingUserId = previousValue.user_id
            console.log("outgoingUserId" + outgoingUserId)
            console.log("previousValue.shareIdInOut" + previousValue.shareIdInOut)
            await db.doc("users/" + outgoingUserId + "/shares/" + previousValue.shareIdInOut).set({
                status: newValue.status }, {merge: true});
            const userRef = await db.doc("users" + context.params.userId).get()
            let incomingUserEmail
            if(userRef.exists) {
                incomingUserEmail = userRef.data()!!.email;
            }
            const respond = await db.collection("users/" + outgoingUserId + "/notifications").add({
                isRead: false,
                cta: incomingUserEmail,
                type: "info",
                date: new Date(),
                change: "accepted to rejected"
            })
            console.log(respond)
            console.log(userRef)
        }
        else if(previousValue.direction === "outgoing" && previousValue.status === "accepted" && newValue.status === "rejected"){ //u johna z accepted na rejected
            const usersRef = db.collection("users");
            const userRef = await db.doc("users" + context.params.userId).get()
            let outgoingUserEmail
            if(userRef.exists) {
                outgoingUserEmail = userRef.data()!!.email;//john email
            }
            const queryRef = await usersRef.where("email", "==", previousValue.user_email).get();//merry
            if(!queryRef.empty){
                let incomingUserId = ""
                    queryRef.forEach(doc=> {
                        incomingUserId = doc.id //id marry
                    })
                console.log("incomingUserId" + incomingUserId)
                console.log(" previousValue.incomingShareId" +  previousValue.incomingShareId)
                await db.doc("users/" + incomingUserId + "/shares/" + previousValue.incomingShareId).set({
                    status: newValue.status }, {merge: true});
                await db.collection("users/" + incomingUserId + "/notifications").add({
                    isRead: false,
                    cta: outgoingUserEmail,
                    type: "info",
                    date: new Date(),
                    change: "accepted to rejected"
                })
            }
        }
    })

exports.changeStatusRejectedShareToAccepted = functions.firestore
    .document("users/{userId}/shares/{shareId}")
    //share u johna wychodzacy  date direction:outgoing status accepted user_emeial:marry incomingShareId: id shera u merry
    //share u marry przychodzacy  date direction:incoming shareidinout:id shera u johna status accepted user_emeial:john user_id: id johna idShare: id shera
    .onUpdate(async (change, context)=>{
        const newValue = change.after.data();
        const previousValue = change.before.data();
        if (previousValue.direction === "incoming" && previousValue.status === "rejected" && newValue.status === "accepted"){ //marry zmienia
            const outgoingUserId = previousValue.user_id
            await db.doc("users/" + outgoingUserId + "/shares/" + previousValue.shareIdInOut).set({
                status: newValue.status }, {merge: true});
            const userRef = await db.doc("users" + context.params.userId).get()
            let incomingUserEmail
            if(userRef.exists) {
                incomingUserEmail = userRef.data()!!.email;
            }
            const respond = await db.collection("users/" + outgoingUserId + "/notifications").add({
                isRead: false,
                cta: incomingUserEmail,
                type: "info",
                date: new Date(),
                change: "rejected to accepted"
            })
            console.log(respond)
            console.log(userRef)
        } else if(previousValue.direction === "outgoing" && previousValue.status === "rejected" && newValue.status === "accepted") { //john zmienia
            const usersRef = db.collection("users");
            const userRef = await db.doc("users" + context.params.userId).get()
            let outgoingUserEmail
            if(userRef.exists) {
                outgoingUserEmail = userRef.data()!!.email;
            }
            const queryRef = await usersRef.where("email", "==", previousValue.user_email).get();//merry
            if(!queryRef.empty){
                let incomingUserId = ""
                queryRef.forEach(doc=> {
                    incomingUserId = doc.id //id marry
                })
                // const sharesRef = db.collection("users" + incomingUserId + "/shares");
                // const shareRef = await sharesRef.where("shareId" = )
                await db.doc("users/" + incomingUserId + "/shares/" + previousValue.incomingShareId).set({
                    status: newValue.status }, {merge: true});
                await db.collection("users/" + incomingUserId + "/notifications").add({
                    isRead: false,
                    cta: outgoingUserEmail,
                    type: "info",
                    date: new Date(),
                    change: "rejected to accepted"
                })
                //notyficacja do merry ze john anulowal
            }
        }
    })
