// import { MongoClient, GridFSBucket } from "mongodb";

// const client = new MongoClient(process.env.MONGODB_URI);

// export default async function handler(req, res) {
//   const { lang } = req.query;

//   if (!lang) return res.status(400).json({ message: "Language required" });

//   try {
//     await client.connect();
//     const db = client.db(process.env.MONGODB_DB);
//     const bucket = new GridFSBucket(db, { bucketName: "audios" });

//     let filename = "";
//     if (lang === "en") filename = "english-audio.wav";
//     else if (lang === "ar") filename = "arabic-audio.wav";
//     else return res.status(400).json({ message: "Invalid language" });

//     // Check if file exists
//     const files = await db.collection("audios.files").find({ filename }).toArray();
//     if (!files || files.length === 0) return res.status(404).json({ message: "Audio not found" });

//     // Stream file directly
//     res.setHeader("Content-Type", "audio/wav");
//     res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
//     bucket.openDownloadStreamByName(filename).pipe(res);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// }







// pages/api/audio.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { lang } = req.query;

  // Map language to audio file path
  const fileMap = {
    en: "english-audio.wav",
    ar: "arabic-audio.wav",
  };

  const fileName = fileMap[lang] || fileMap.en;
  const filePath = path.join(process.cwd(), "public", "audios", fileName);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.send(fileBuffer);
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: "Audio not found" });
  }
}


