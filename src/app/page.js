"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  const [language, setLanguage] = useState("en");
  const [audioBlobUrl, setAudioBlobUrl] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // Load Inter font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Fetch audio on language change
  useEffect(() => {
    fetchAudio();
  }, [language]);

  // Fetch audio from API as Blob
  async function fetchAudio() {
    if (!language) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/audio?lang=${language}`);
      if (!res.ok) throw new Error("Audio fetch failed");

      const blob = await res.blob();

      // Revoke old blob URL
      if (audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);

      const url = URL.createObjectURL(blob);
      setAudioBlobUrl(url);

      // Play audio
      if (audioRef.current) {
        audioRef.current.src = url;
        await audioRef.current.play();
      }
    } catch (err) {
      console.error("Error fetching or playing audio:", err);
    } finally {
      setLoading(false);
    }
  }

  const tabs = [
    { name: "Text to Speech" },
    { name: "Agents" },
    { name: "Music" },
    { name: "Speech to Text" },
    { name: "Dubbing" },
    { name: "Voice Cloning" },
    { name: "ElevenReader" },
  ];

  const chips = [
    { img: "/voices/samara.png", title: "Samara", subtitle: "Narrate a story" },
    { img: "/voices/spuds.png", title: "Spuds", subtitle: "Recount an old story" },
    { img: "/voices/jessica.png", title: "Jessica", subtitle: "Provide customer support" },
    { img: "/voices/ethan.png", title: "Announcer", subtitle: "Voiceover a game" },
    { img: "/voices/ava.png", title: "Sergeant", subtitle: "Play a drill sergeant" },
  ];

  return (
    <div
      className="min-h-screen bg-white text-[#0b0b0b] flex flex-col items-stretch pb-24"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; height: 0; width: 0; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pill { background: #f6f6f7; border: 1px solid #e9e9e9; color: #2d2d2d; transition: transform .15s ease, box-shadow .15s ease, background-color .15s ease, color .15s ease; }
        .pill:hover { transform: translateY(-3px); }
        .pill-active { background: #0b0b0b; color: #ffffff; border: 1px solid rgba(0,0,0,0.18); box-shadow: 0 8px 26px rgba(11,11,11,0.12); transform: translateY(-3px) scale(1.01); }
        .outer-card { border-radius: 20px; border: 1px solid #efefef; background: #fff; box-shadow: 0 14px 42px rgba(16,24,40,0.06); position: relative; overflow: visible; }
        .backplate { position: absolute; inset: 6px; border-radius: 16px; z-index: 0; background: radial-gradient(1200px 200px at 95% 95%, rgba(255,208,190,0.95) 0%, rgba(255,239,255,0.85) 25%, rgba(203,241,255,0.9) 52%, rgba(255,244,236,0.8) 100%); filter: blur(10px) saturate(1.02); opacity: 0.95; }
        .inner-box { position: relative; z-index: 2; border-radius: 12px; background: #fff; border: 1px solid #ececec; box-shadow: 0 6px 18px rgba(16,24,40,0.03); }
        .circle { width: 56px; height: 56px; border-radius: 9999px; display: inline-flex; align-items: center; justify-content: center; transition: transform .14s ease, box-shadow .14s ease, opacity .14s ease; }
        .circle:hover { transform: translateY(-3px); }
        .play-circle { background: #0b0b0b; color: white; box-shadow: 0 10px 28px rgba(11,11,11,0.14); }
        .dl-circle { background: white; border: 1px solid #e9e9e9; color: #111; box-shadow: 0 8px 18px rgba(16,24,40,0.06); }
        .token { display: inline-block; padding: 3px 6px; border-radius: 6px; background: rgba(238,232,255,0.5); color: #b13ed3; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; margin-right: 4px; }
        .fade-in-up { animation: fadeUp .36s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .chip { transition: transform .12s ease, box-shadow .12s ease; }
        .chip:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(16,24,40,0.06); }
        .loading-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.6); display: flex; align-items: center; justify-content: center; border-radius: 12px; z-index: 10; font-weight: bold; }
      `}</style>

      {/* NAV */}
      <header className="flex flex-wrap justify-between items-center px-6 md:px-12 py-5 border-b border-[#ececec]">
        <h1 className="text-[18px] md:text-[20px] font-bold">ElevenLabs</h1>
        <nav className="hidden md:flex gap-8 text-[14px] text-[#5f5f5f]">
          <a className="hover:text-black" href="#">Creative Platform</a>
          <a className="hover:text-black" href="#">Agents Platform</a>
          <a className="hover:text-black" href="#">Developers</a>
          <a className="hover:text-black" href="#">Resources</a>
          <a className="hover:text-black" href="#">Enterprise</a>
          <a className="hover:text-black" href="#">Pricing</a>
        </nav>
        <div className="flex items-center gap-3 mt-3 md:mt-0">
          <button className="px-4 py-1.5 border border-[#e6e6e6] rounded-full text-[14px] hover:bg-gray-50">Log in</button>
          <button className="px-4 py-1.5 bg-black text-white rounded-full text-[14px]">Sign up</button>
        </div>
      </header>

      {/* HERO */}
      <section className="text-center mt-12 md:mt-16 px-6">
        <h2 className="text-[26px] md:text-[32px] font-semibold mb-4 leading-tight">The most realistic voice AI platform</h2>
        <p className="text-[#6b6b6b] max-w-3xl mx-auto text-[15px] md:text-[16px] leading-relaxed">
          AI voice models and products powering millions of developers, creators, and enterprises.
          From low-latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button className="px-6 py-2 bg-black text-white rounded-full font-medium text-[14px] hover:opacity-95">Sign up</button>
          <button className="px-6 py-2 border border-[#e6e6e6] rounded-full font-medium text-[14px] hover:bg-gray-50">Contact sales</button>
        </div>
      </section>

      {/* PILL TAB LIST */}
      <div className="max-w-4xl w-full mx-auto mt-8 px-4 md:px-0">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
          {tabs.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActiveTab(i)}
              className={`whitespace-nowrap rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium ${i === activeTab ? "pill-active" : "pill"}`}
              style={{ minWidth: 150, height: 42 }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CARD */}
      <main className="max-w-4xl w-full mx-auto mt-6 px-4 md:px-0 relative z-10 fade-in-up">
        <div className="outer-card p-5 md:p-6 relative">
          <div className="backplate" />

          {loading && <div className="loading-overlay">Loading...</div>}

          <div className="inner-box p-5 md:p-6">
            <div
              contentEditable
              suppressContentEditableWarning
              className="w-full bg-transparent resize-none outline-none text-[15px] md:text-[15px] leading-relaxed text-[#111] min-h-[120px]"
              style={{ whiteSpace: "pre-wrap" }}
            >
              In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros.{" "}
              <span className="token">[sarcastically]</span> Not the “burn it all down” kind...{" "}
              <span className="token">[giggles]</span> but he was gentle, wise, with eyes like old stars.{" "}
              <span className="token">[whispers]</span> Even the birds fell silent when he passed.
            </div>

            {/* Voice chips */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-wrap gap-3 items-center">
                {chips.slice(0, 3).map((c, idx) => (
                  <button key={idx} className="chip flex items-center gap-3 bg-white border border-[#ececec] rounded-full px-3 py-2 text-[13px] shadow-sm">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={c.img} alt={c.title} width={32} height={32} className="object-cover" />
                    </div>
                    <div className="text-left leading-tight">
                      <div className="font-medium text-[13px] text-[#222]">{c.title}</div>
                      <div className="text-[12px] text-[#6d6d6d]">{c.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-start md:justify-end">
                {chips.slice(3).map((c, idx) => (
                  <button key={idx + 3} className="chip flex items-center gap-3 bg-white border border-[#ececec] rounded-full px-3 py-2 text-[13px] shadow-sm">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={c.img} alt={c.title} width={32} height={32} className="object-cover" />
                    </div>
                    <div className="text-left leading-tight">
                      <div className="font-medium text-[13px] text-[#222]">{c.title}</div>
                      <div className="text-[12px] text-[#6d6d6d]">{c.subtitle}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls row: language dropdown, play & download */}
          <div className="relative z-10 mt-6 md:mt-8 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[20px]">🌐</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-[#e6e6e6] rounded-md px-3 py-2 text-[14px]"
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Download button */}
              <a
                href={audioBlobUrl || "#"}
                download={`${language === "en" ? "english-audio.wav" : "arabic-audio.wav"}`}
                className={`dl-circle circle ${!audioBlobUrl || loading ? "opacity-50 pointer-events-none" : ""}`}
                aria-label="Download"
                title="Download"
                style={{ width: 56, height: 56 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 3v12" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11l4 4 4-4" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21H3" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Play button */}
              <button
                onClick={fetchAudio}
                disabled={loading}
                className="play-circle circle"
                aria-label="Play"
                title="Play"
                style={{ width: 56, height: 56 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 5v14l12-7L7 5z" fill="#fff" />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-center mt-6 text-[13px] text-[#7d7d7d] z-10 relative">Powered by Eleven v3 (alpha)</div>
        </div>
      </main>

      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}
