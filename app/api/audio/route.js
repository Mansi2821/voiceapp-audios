import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

const AudioSchema = new mongoose.Schema({
  lang: String,
  url: String,
});
const Audio =
  mongoose.models.Audio || mongoose.model("Audio", AudioSchema);

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  const audio = await Audio.findOne({ lang });
  if (!audio) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ url: audio.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
