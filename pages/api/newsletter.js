import { connectDatabase, insertedDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid Email Address!" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertedDocument(client, "emails", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting Data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed Up!" });
  }
}

export default handler;
