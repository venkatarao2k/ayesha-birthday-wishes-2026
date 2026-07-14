import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";

const memories = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  title: ["A Beautiful Memory","That Smile","Our Little Moments","Simply You","A Chapter Worth Remembering","My Bangaram ❤️"][i],
  caption: [
    "Some moments become memories. Some memories become a part of us. ❤️",
    "A smile that somehow makes everything around it feel a little brighter.",
    "The smallest moments often become the ones we remember the longest.",
    "No special occasion needed. Sometimes, just being you is enough.",
    "Every picture holds a story that words can never fully explain.",
    "And somewhere between all these memories, you became incredibly special to me."
  ][i]
}));

const reasons = [
  ["✨","Your Smile","Because somehow, it can make an ordinary moment feel special."],
  ["🌸","Your Heart","For all the kindness, care, and warmth that make you who you are."],
  ["😂","Your Craziness","The silly moments, unexpected laughter, and all the things only we understand."],
  ["🌙","Your Presence","Because sometimes, just knowing you're there changes everything."],
  ["💫","The Little Things","The things you probably don't even notice about yourself, but I do."],
  ["📸","Our Memories","Every conversation, every laugh, every little chapter we've written together."],
  ["❤️","Simply Being Ayesha","Because there is only one you. And that alone makes you irreplaceably special."]
];

function FloatingHearts() {
  const hearts = Array.from({length: 20}, (_, i) => ({
    id:i, left:(i*37)%100, duration:8+(i%7), delay:(i*1.7)%8, size:12+(i%5)*4
  }));
  return <div className="floating-hearts" aria-hidden="true">{hearts.map(h =>
    <span key={h.id} className="floating-heart" style={{left:`${h.left}%`,animationDuration:`${h.duration}s`,animationDelay:`${h.delay}s`,fontSize:`${h.size}px`}}>{h.id%3===0?"♡":"♥"}</span>
  )}</div>;
}

export default function App() {
  const [opened,setOpened]=useState(false);
  const [letterOpen,setLetterOpen]=useState(false);
  const [finalOpen,setFinalOpen]=useState(false);
  const [candles,setCandles]=useState([true,true,true,true,true]);
  const [musicPlaying,setMusicPlaying]=useState(false);

  const launchConfetti=()=>{
    const end=Date.now()+2200;
    const timer=setInterval(()=>{
      if(Date.now()>end){clearInterval(timer);return;}
      confetti({particleCount:6,spread:85,startVelocity:30,origin:{x:Math.random(),y:Math.random()*.3}});
    },120);
  };
  useEffect(()=>{if(opened) launchConfetti();},[opened]);

  const blowCandle=(index)=>{
    const next=[...candles]; next[index]=false; setCandles(next);
    if(next.every(c=>!c)) setTimeout(launchConfetti,300);
  };
  const toggleMusic=()=>{
    const audio=document.getElementById("birthday-music");
    if(!audio)return;
    if(musicPlaying) audio.pause(); else audio.play().catch(()=>{});
    setMusicPlaying(!musicPlaying);
  };

  if(!opened) return <main className="opening-screen">
    <FloatingHearts/><div className="stars"/>
    <div className="opening-content">
      <p className="eyebrow">A LITTLE SOMETHING SPECIAL</p>
      <div className="envelope"><div className="envelope-flap"/><div className="envelope-letter"><span>For</span><strong>Ayesha ❤️</strong></div><div className="wax-seal">A</div></div>
      <h1>Hey, Ayesha...</h1>
      <p className="opening-description">Someone made a little corner of the internet just for you.</p>
      <button className="primary-button pulse" onClick={()=>setOpened(true)}>Open Your Surprise 💌</button>
      <p className="opening-note">Made with thoughts, memories & a little bit of magic ✨</p>
    </div>
  </main>;

  return <div className="website">
    <FloatingHearts/>
    <audio id="birthday-music" loop><source src={`${import.meta.env.BASE_URL}music/our-song.mp3`} type="audio/mpeg"/></audio>
    <button className="music-button" onClick={toggleMusic}>{musicPlaying?"♫":"♪"}</button>

    <section className="hero section">
      <div className="hero-content">
        <p className="eyebrow">A VERY SPECIAL DAY</p><p className="hero-small">Happy Birthday</p>
        <h1 className="hero-name">Ayesha</h1>
        <div className="heart-divider"><span/><b>♥</b><span/></div>
        <h2>My Beautiful Bangaram ❤️</h2>
        <p className="hero-message">Today isn't just another day. It's a celebration of someone who makes this world a little warmer, a little brighter, and infinitely more beautiful simply by being in it.</p>
        <div className="scroll-hint">Scroll through something made just for you ↓</div>
      </div>
    </section>

    <section className="section photo-hero-section">
      <div className="section-heading"><span>CHAPTER ONE</span><h2>The Girl Behind My Favourite Memories</h2><p>Some people enter your life and somehow make ordinary moments unforgettable.</p></div>
      <div className="main-photo-frame">
        <img src={`${import.meta.env.BASE_URL}photos/ayesha-main.jpeg`} alt="Ayesha" className="actual-photo main-photo"/>
        <div className="photo-caption">❝ Some people become memories. You became a part of my heart.</div>
      </div>
    </section>

    <section className="section memory-section">
      <div className="section-heading"><span>CHAPTER TWO</span><h2>Our Little Memory Lane</h2><p>Every picture has a story. Every story has a feeling. And some feelings are impossible to forget.</p></div>
      <div className="memory-grid">{memories.map((m,i)=><article className={`memory-card rotate-${i%3+1}`} key={m.id}>
        <img src={`${import.meta.env.BASE_URL}photos/memory-${m.id}.jpeg`} alt={`Memory ${m.id}`} className="actual-photo memory-photo"/>
        <div className="memory-content"><h3>{m.title}</h3><p>{m.caption}</p></div>
      </article>)}</div>
    </section>

    <section className="section reasons-section">
      <div className="section-heading"><span>CHAPTER THREE</span><h2>7 Things About My Bangaram</h2><p>Seven is nowhere near enough, but every beautiful list has to start somewhere.</p></div>
      <div className="reasons-grid">{reasons.map((r,i)=><article className="reason-card" key={r[1]}><div className="reason-number">0{i+1}</div><div className="reason-icon">{r[0]}</div><h3>{r[1]}</h3><p>{r[2]}</p></article>)}</div>
    </section>

    <section className="section difficult-days-section">
      <div className="stars"/><div className="difficult-content"><span className="moon">☾</span><p className="eyebrow">BETWEEN THE SILENCE & THE WORDS</p>
      <h2>Even When Things Aren't Perfect...</h2>
      <p>I know the last few days haven't been the easiest for us. There have been misunderstandings, silence, and moments where we haven't spoken the way we normally do.</p>
      <p>But some feelings don't disappear just because conversations become difficult. Some memories don't lose their meaning because of a few hard days.</p>
      <blockquote>“No matter how complicated some days become, today I just want you to smile.”</blockquote></div>
    </section>

    <section className="section letter-section">
      <div className="section-heading"><span>CHAPTER FOUR</span><h2>A Letter From My Heart</h2><p>Some words are easier to write than to say.</p></div>
      {!letterOpen ? <button className="letter-envelope" onClick={()=>setLetterOpen(true)}><div className="letter-envelope-flap"/><div className="letter-seal">♥</div><span>Tap to open my letter</span></button> :
      <article className="open-letter"><div className="letter-date">For Ayesha, on her special day ❤️</div><h3>My Dear Bangaram,</h3>
      <p>I know the last few days haven't been the easiest for us. We've had our misunderstandings, our silence, and moments where things didn't feel the way they usually do.</p>
      <p>But today is your day, Ayesha, and more than anything, I want you to smile.</p>
      <p>No matter how complicated some days become, you are still someone incredibly special to me. The memories we've made, the laughter we've shared, and all those little moments that only we understand mean more to me than I can explain.</p>
      <p>I didn't make this little place to fix everything with a few beautiful words. I made it because, on your birthday, I wanted you to know that you are thought of, you are cherished, and your happiness truly matters to me.</p>
      <p>I hope this new year of your life brings you endless happiness, peace, beautiful surprises, and everything your heart secretly wishes for.</p>
      <p>And somewhere between all our memories, our silly fights, our laughter, and our silence... I hope there will always be a reason for us to smile again. ❤️</p>
      <div className="letter-signature"><span>Happy Birthday,</span><strong>My Bangaram ❤️</strong></div></article>}
    </section>

    <section className="section cake-section">
      <div className="section-heading light"><span>ONE LITTLE WISH</span><h2>Make a Birthday Wish ✨</h2><p>Close your eyes, make a wish, and tap each candle to blow it out.</p></div>
      <div className="cake"><div className="candles">{candles.map((lit,i)=><button key={i} className="candle" onClick={()=>blowCandle(i)}>{lit&&<span className="flame"/>}</button>)}</div><div className="cake-top">Happy Birthday</div><div className="cake-layer"/><div className="cake-layer layer-two"/><div className="cake-plate"/></div>
      {candles.every(c=>!c)&&<div className="wish-complete"><h3>Your wish is on its way to the universe ✨</h3><p>I hope everything you wished for finds its way to you.</p></div>}
    </section>

    <section className="section final-section">
      {!finalOpen?<div className="final-before"><p className="eyebrow">BEFORE YOU GO...</p><h2>There's one last thing I want to tell you.</h2><button className="primary-button" onClick={()=>{setFinalOpen(true);launchConfetti();}}>One Last Surprise ❤️</button></div>:
      <div className="final-message"><span className="final-heart">♥</span><p className="eyebrow">FOR MY BANGARAM</p><h2>Happy Birthday,<br/><strong>Ayesha ❤️</strong></h2><p>Whatever tomorrow brings, whatever words remain unsaid, and wherever life takes us...</p><p className="final-highlight">Today, I just want you to know that your smile still matters to me.</p><div className="final-divider">✦ ♥ ✦</div><p>May this year bring you all the happiness your beautiful heart deserves.</p><h3>Happy Birthday, My Bangaram. 🎂❤️</h3></div>}
    </section>
    <footer><p>Made with ❤️, memories, and countless thoughts of you.</p><span>Especially for Ayesha</span></footer>
  </div>;
}
