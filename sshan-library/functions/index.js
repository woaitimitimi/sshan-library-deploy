/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// 将 Firebase Functions 和 admin SDK modules模块导入到你的代码

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
// const functions = require("firebase-functions");
// const { error } = require("firebase-functions/logger");

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error conting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.capviaonerequest = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "POST");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).send("");
      return;
    }
    if (req.method === "POST") {
      try {
        const booksCollection = admin.firestore().collection("books");
        const snapshot = await booksCollection.get();

        if (snapshot.empty) {
          res.send("cannot found books");
          return;
        }

        const batch = admin.firestore().batch();

        snapshot.forEach((doc) => {
          const bookData = doc.data();
          const capitalizedName = bookData.name.toUpperCase();
          const bookid = booksCollection.doc(doc.id);
          batch.update(bookid, {name: capitalizedName});
        });
        await batch.commit();

        const newBook = req.body;

        if (!newBook || !newBook.name || !newBook.isbn) {
          res.status(400).send("invalid book data");
          return;
        }

        const capitalizedNewBookName = newBook.name.toUpperCase();
        await booksCollection.add({
          isbn: newBook.isbn,
          name: capitalizedNewBookName,
        });

        res.send("successfully added and updated book collection");
      } catch (e) {
        console.error("error during updated: ", e);
        // eslint-disable-next-line max-len
        res.status(500).send("errors during batch capitalized or newbook adding");
      }
    } else {
      res.status(405).send("Method Not Allowed");
    }
  });
});

exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = [];

      snapshot.forEach((doc) => {
        books.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      res.status(200).json(books);
    } catch (e) {
      console.error("error getting all books:", e);
      res.status(500).send("error getting all books");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// when a new book is inserted and stored in books collection, trigger onCreate
// when a new document is created in the specified collection
// Firestore document path that the function listens to
// exports.capitalizeBookName = functions.firestore
//     .document("books/{id}")
//     .onCreate(async (snap, context) => {
//       const newbook = snap.data();
//       if (!newbook || !newbook.name) {
//         console.log("no valid book name");
//         return null;
//       }
//       const capitalizedName = newbook.name.toUpperCase();
//       console.log(`finishedResult: ${newbook.name} -> ${capitalizedName}`);
//       // Update the newly created book in Firestore
//       try {
//         await snap.ref.update({
//           name: capitalizedName,
//         });
//         console.log("successful capitalized book name");
//       } catch (error) {
//         console.error("errors during updating firestore: ", error);
//       }
//     });

// exports.capitalizeAllBooks = onRequest((req, res) => {
//   cors(req, res, async () => {
//     try {
//       const booksCollection = admin.firestore().collection("books");
//       const snapshot = await booksCollection.get();
//       if (snapshot.empty) {
//         res.send("cannot found book in books collection");
//         return;
//       }

//       const batch = admin.firestore().batch();

//       snapshot.forEach((doc) => {
//         const bookData = doc.data();
//         const capitalizedName = bookData.name.toUpperCase();
//         const bookid = booksCollection.doc(doc.id);
//         batch.update(bookid, {name: capitalizedName});
//       });
//       await batch.commit();
//       res.send("all books name are capitalized!");
//     } catch (error) {
//       console.error("error during updated: ", error);
//       res.status(500).send("errors during batch capitalized");
//     }
//   });
// });

