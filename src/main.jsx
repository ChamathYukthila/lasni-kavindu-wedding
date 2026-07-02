import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const wedding = {
  monogram: 'L & K',
  bride: 'Lasni',
  groom: 'Kavindu',
  date: 'August 03, 2026',
  dateShort: '03',
  month: 'August',
  year: '2026',
  dayName: 'Monday',
  time: 'From 10.00 AM to 4.00 PM',
  ceremony: 'Poruwa Ceremony at 10.00 AM',
  venue: 'Sawingir Hills',
  city: 'Gonapola',
  hall: 'Azelia Hall',
  rsvpBy: 'Before 20th July 2026',
  rsvp: [
    { name: 'Sunil', phone: '0777 377389' },
    { name: 'Pushpakumara', phone: '076 8787206' },
  ],
  parents: [
    'Mr. & Mrs. Y. P. M. Sunil',
    'together with',
    'Mr. & Mrs. M. D. Pushpakumara',
  ],
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sawingir%20Hills%20Gonapola%20Azelia%20Hall',

  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sawingir%20Hills%20Gonapola%20Azelia%20Hall',

   mapEmbedUrl:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.921182728404!2d80.02979217399599!3d6.7794469932175305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae245729e394d1d%3A0x8412a55befcddfe5!2sSawingir%20Hills!5e0!3m2!1sen!2slk!4v1782939495478!5m2!1sen!2slk",

  rsvpSubmitUrl: 'https://script.google.com/macros/s/AKfycbzIUq6WmVhTN2eVRn0d6fHSk9OHHdChzNySsfEk1KSEJmhdNO0H7uNy7crFkW-X-Zw/exec',

  };

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('guest');

  if (!guest || guest.trim() === '') {
    return 'You / Both of You / Family';
  }

  return decodeURIComponent(guest).trim();
}

function Countdown() {
  const target = useMemo(() => new Date('2026-08-03T10:00:00+05:30'), []);
  const [now, setNow] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(target - now, 0);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  return (
    <div className="countdown" aria-label="Wedding countdown">
      {[
        ['Days', days],
        ['Hours', hours],
        ['Minutes', minutes],
        ['Seconds', seconds],
      ].map(([label, value]) => (
        <div className="countBox" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function OpeningScreen({ onOpen, isOpening }) {
  const handleOpen = () => {
    if (!isOpening) onOpen();
  };

  return (
    <section className={`opening ${isOpening ? 'isOpening' : ''}`}>
      <div className="openingGlow one" />
      <div className="openingGlow two" />
      <p className="tracking">YOU ARE INVITED</p>
      <h1>{wedding.monogram}</h1>

      <div
        className="openTrigger"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        aria-label="Open wedding invitation"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
      >
        <div className="envelopeWrap">
          <div className="envelope">
            <div className="flap" />
            <div className="fold left" />
            <div className="fold right" />
          </div>

          <div className="miniCard">
            <p>Wedding Invitation</p>
            <h2>{wedding.bride} &amp; {wedding.groom}</h2>
            <span>{wedding.date}</span>
          </div>

          <div className="seal">
            <span>L</span><em>&amp;</em><span>K</span>
          </div>
        </div>

        <p className="tap">TAP TO OPEN</p>
      </div>
    </section>
  );
}

function FlowerCorner({ position = 'bottom' }) {
  return (
    <svg className={`flowerCorner ${position}`} viewBox="0 0 340 340" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 304 C92 254 106 193 119 135" />
        <path d="M66 264 C35 225 48 184 91 173 C122 205 109 247 66 264Z" />
        <path d="M113 178 C75 154 79 108 122 88 C154 121 151 160 113 178Z" />
        <path d="M135 124 C146 78 184 60 218 87 C204 133 167 144 135 124Z" />
        <path d="M144 240 C185 202 235 208 257 251 C219 286 175 278 144 240Z" />
        <path d="M60 315 C126 270 188 257 299 265" />
        <path d="M198 269 C195 235 221 211 252 220 C255 253 235 275 198 269Z" />
        <path d="M91 289 C101 258 132 244 161 259 C152 292 122 305 91 289Z" />
        <path d="M40 220 C19 186 33 151 69 142" />
        <path d="M129 72 C136 36 164 16 198 22" />
        <path d="M267 264 C305 263 329 286 337 320" />
        <path d="M184 105 C219 107 242 127 254 158" />
        <path d="M260 210 C282 182 312 173 336 187" />
        <path d="M105 42 C77 34 56 46 42 70" />
      </g>
    </svg>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="sectionTitle">
      {eyebrow && <p>{eyebrow}</p>}
      <h2>{title}</h2>
      <span />
    </div>
  );
}

function SaveDateCalendar() {
  const blanks = Array.from({ length: 6 });
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <div className="calendarCard" aria-label="Save the date calendar August 2026">
      <div className="calendarHeader">
        <span>{wedding.month}</span>
        <strong>{wedding.year}</strong>
      </div>
      <div className="calendarGrid weekDays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="calendarGrid">
        {blanks.map((_, index) => <span key={`blank-${index}`} />)}
        {days.map((day) => <span key={day} className={day === 3 ? 'selectedDay' : ''}>{day}</span>)}
      </div>
    </div>
  );
}

function Invitation({ guest }) {
  return (
    <main className="page">
      <article className="mainCard">
        <div className="cardBorder" />

          <div className="sideOrnament left" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="sideOrnament right" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>

        <section className="heroSection contentBlock">

       <p className="smallCaps">Wedding Invitation</p> <br/>  <br/>

        {/*div className="mainMonogram">LK</div>  */}

          <h1>
              {wedding.bride} 
              <br/>
              <span>&amp;</span>
              <br/>
              {wedding.groom}
          </h1>

          <p className="heroDate">{wedding.dayName}, {wedding.date}</p>
        </section>

        <section className="contentBlock ceremonyBlock">
          <SectionTitle eyebrow="Ceremony Info" title="Together With Their Families" />
          <div className="parentsList">
            {wedding.parents.map((line) => <p key={line}>{line}</p>)}
          </div>
          <p className="requestText">Request the honor of your presence to celebrate the marriage of their beloved daughter &amp; son.</p>
        </section>

        <section className="contentBlock guestBlock">
          <SectionTitle eyebrow="Invited Guest" title="We Kindly Invite" />
          <div className="guestName">{guest}</div>
        </section>

        <section className="contentBlock dateLocationBlock">
          <SectionTitle eyebrow="Date & Location" title="Wedding Day Details" />
          <div className="infoGrid">
            <div>
              <span>Date</span>
              <strong>{wedding.date}</strong>
            </div>
            <div>
              <span>Time</span>
              <strong>{wedding.time}</strong>
            </div>
            <div>
              <span>Ceremony</span>
              <strong>{wedding.ceremony}</strong>
            </div>
            <div>
              <span>Venue</span>
              <strong>{wedding.venue}, {wedding.city}<br />{wedding.hall}</strong>
            </div>
          </div>
        </section>

        <section className="contentBlock saveDateBlock">
          <SectionTitle eyebrow="Save The Date" title="August 03, 2026" />
          <SaveDateCalendar />
        </section>

        <section className="contentBlock countdownBlock">
          <SectionTitle eyebrow="Countdown" title="Until Our Wedding Day" />
          <Countdown />
        </section>

          <section className="contentBlock venueSection">
              <SectionTitle eyebrow="Venue Direction" title={wedding.venue} />

              <p className="venueText">
                {wedding.city} — {wedding.hall}
              </p>

              <div className="mapBox">
                <iframe
                  title="Wedding venue map"
                  src={wedding.mapEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mapActions">
                <a
                  className="mapButton primary"
                  href={wedding.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>

                <a
                  className="mapButton secondary"
                  href={wedding.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Google Map
                </a>
              </div>
            </section>

        <section className="contentBlock rsvpBlock">
          <SectionTitle eyebrow="Kindly Respond" title="R.S.V.P." />
          <p className="deadline">R.S.V.P. — Before 20th July 2026</p>

          <RsvpForm guest={guest} />

          <div className="rsvpNumbers">
            {wedding.rsvp.map((person) => (
              <a key={person.name} href={`tel:${person.phone.replace(/\s/g, '')}`}>
                <span>{person.name}</span>
                <strong>{person.phone}</strong>
              </a>
            ))}
          </div>
        </section>
      </article>

      <footer>With love, {wedding.bride} &amp; {wedding.groom}</footer>
    </main>
  );
}


function RsvpForm({ guest }) {
  const [attendance, setAttendance] = useState('yes');
  const [count, setCount] = useState('1');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [submitted, setSubmitted] = useState(() => {
    return localStorage.getItem(`rsvp-submitted-${guest}`) === 'true';
  });

  const submitRsvp = async (e) => {
    e.preventDefault();

    if (submitted) {
      setStatus('Your RSVP has already been submitted.');
      return;
    }

    setStatus('Sending...');

    const payload = {
      guest,
      attendance: attendance === 'yes' ? 'Yes, I will attend' : "Sorry, I can't attend",
      count: attendance === 'yes' ? count : '0',
      message,
    };

    try {
      await fetch(wedding.rsvpSubmitUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      localStorage.setItem(`rsvp-submitted-${guest}`, 'true');
      setSubmitted(true);
      setStatus('Thank you. Your RSVP has been submitted.');
    } catch (error) {
      setStatus('Something went wrong. Please contact us directly.');
    }
  };

  return (
    <form className="rsvpForm" onSubmit={submitRsvp}>
      <p className="rsvpDear">
        Dear <span>{guest}</span>,
      </p>

      <p className="rsvpQuestion">
        Will you be joining us on our special day?
      </p>

      <div className="rsvpChoices">
        <button
          type="button"
          className={attendance === 'yes' ? 'choiceBtn active' : 'choiceBtn'}
          onClick={() => setAttendance('yes')}
          disabled={submitted}
        >
          Yes, I will attend
        </button>

        <button
          type="button"
          className={attendance === 'no' ? 'choiceBtn active' : 'choiceBtn'}
          onClick={() => setAttendance('no')}
          disabled={submitted}
        >
          Sorry, I can’t attend
        </button>
      </div>

      {attendance === 'yes' ? (
        <label className="rsvpLabel">
          Number of guests attending
          <input
            type="number"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            disabled={submitted}
          />
        </label>
      ) : (
        <label className="rsvpLabel">
          Leave a short message optional
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="A short message..."
            disabled={submitted}
          />
        </label>
      )}

      <button className="submitRsvp" type="submit" disabled={submitted}>
        {submitted ? 'RSVP Submitted' : 'Submit RSVP'}
      </button>

      {status && <p className="rsvpStatus">{status}</p>}
    </form>
  );
}


function App() {
  const [stage, setStage] = useState('closed');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const musicRef = useRef(null);
  const autoScrollRef = useRef(null);

  const guest = useMemo(getGuestName, []);

  const startMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    music.volume = 0.45;

    music.play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false));
  };

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    if (music.paused) {
      music.play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => setIsMusicPlaying(false));
    } else {
      music.pause();
      setIsMusicPlaying(false);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      cancelAnimationFrame(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    setIsAutoScrolling(false);
  };

  const runAutoScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (window.scrollY >= maxScroll - 4) {
      stopAutoScroll();
      return;
    }

    window.scrollBy({
      top: 0.75,
      behavior: 'auto',
    });

    autoScrollRef.current = requestAnimationFrame(runAutoScroll);
  };

  const startAutoScroll = () => {
    if (autoScrollRef.current) return;

    setIsAutoScrolling(true);
    autoScrollRef.current = requestAnimationFrame(runAutoScroll);
  };

  const toggleAutoScroll = () => {
    if (autoScrollRef.current) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  React.useEffect(() => {
    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, []);

  const openInvitation = () => {
    if (stage !== 'closed') return;

    startMusic();

    setStage('opening');
    window.setTimeout(() => setStage('opened'), 1800);
  };

  return (
    <>
      <audio
        ref={musicRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
      />

      {stage === 'opened' && (
        <>
          <button className="musicBtn" onClick={toggleMusic}>
            {isMusicPlaying ? 'Pause Music' : 'Play Music'}
          </button>

          <button className="autoScrollBtn" onClick={toggleAutoScroll}>
            {isAutoScrolling ? 'Stop Scroll' : 'Auto Scroll'}
          </button>
        </>
      )}

      {stage === 'opened'
        ? <Invitation guest={guest} />
        : <OpeningScreen onOpen={openInvitation} isOpening={stage === 'opening'} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
