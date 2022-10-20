import {
  connectDatabase,
  insertedDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    //add server-side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input!" });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertedDocument(client, "comments", newComment);

      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added Comment", Comment: newComment });
    } catch (err) {
      res.status(500).json({ message: "Inserting Data failed!" });
    }
  }
  if (req.method === "GET") {
    try {
      const commentsArray = await getAllDocuments(client, "comments", {
        _id: -1,
      });
      res.status(201).json({ comments: commentsArray });
    } catch (err) {
      res.status(500).json({ message: "Getting Comments Failed!" });
    }
  }

  client.close();
}

export default handler;
