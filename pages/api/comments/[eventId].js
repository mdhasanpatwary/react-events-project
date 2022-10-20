import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    "mongodb+srv://patwary:mhpatwary72@cluster0.og93a4g.mongodb.net/?retryWrites=true&w=majority"
  );

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
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db("events");
    const result = await db.collection("comments").insertOne(newComment);
    newComment.id = result.insertedId;
    console.log(result);

    res.status(201).json({ message: "Added Comment", Comment: newComment });
  }
  if (req.method === "GET") {
    const db = client.db("events");
    const commentsArray = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(201).json({ comments: commentsArray });
  }

  client.close();
}

export default handler;
