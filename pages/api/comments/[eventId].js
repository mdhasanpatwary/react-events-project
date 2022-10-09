function handler(req, res) {
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
    console.log(email, name, text);
    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    res.status(201).json({ message: "Added Comment", Comment: newComment });
  }
  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Adhara", text: "A First Comment." },
      { id: "c2", name: "Arora", text: "A Second Comment." },
    ];

    res.status(201).json({ comments: dummyList });
  }
}

export default handler;
