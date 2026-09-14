import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Grid3X3,
  Heart,
  Share,
  Search,
  Globe,
  Menu,
  X,
  ArrowUpRight,
  Flag,
  Tag,
  Wifi,
  Car,
  Waves,
  PawPrint,
  Utensils,
  BriefcaseBusiness,
  Camera,
  DoorOpen,
  Shield,
  CalendarDays,
  KeyRound,
  MessageSquare,
  MapPin,
  Star,
} from "lucide-react";
import "./style.css";
import "./overrides.css";

const photos = [
  ["Living room 2", "Ceiling fan · Hot tub", "main"],
  ["Hot tub", "Private jacuzzi", "hot"],
  ["Living room", "Ceiling fan", "living"],
  ["Bedroom", "1 double bed", "bed"],
  ["Building exterior", "Candolim", "building"],
  ["Kitchen & lounge", "Dedicated workspace", "kitchen"],
];

const reviews = [
  [
    "Amit",
    "2 months on Airbnb",
    "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
  ],
  [
    "Aheesh",
    "3 years on Airbnb",
    "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
  ],
  ["Samiksha", "8 months on Airbnb", "the host nitish was really great help"],
  [
    "Vedant",
    "4 years on Airbnb",
    "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived.",
  ],
  [
    "Vaibhav S",
    "3 years on Airbnb",
    "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
  ],
  [
    "Mohd",
    "5 years on Airbnb",
    "Great place. Exactly as described in the listing.",
  ],
];
function Photo({ kind, className = "", onClick }) {
  return (
    <button
      aria-label="Open photo"
      onClick={onClick}
      className={`photo photo-${kind} ${className}`}
    />
  );
}
function BookingCard() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="booking-wrap">
      <div className="coupon">
        <Tag size={25} fill="#55a95a" />
        <span>
          Get 10% off your next stay.
          <br />
          <u>Terms apply</u>
        </span>
        <button>Claim</button>
      </div>
      <div className="booking">
        <div>
          <b className="price">₹28,499</b> <span>for 5 nights</span>
        </div>
        <button onClick={() => setOpen(!open)} className="dates">
          <span>
            <b>CHECK-IN</b>
            <small>10/18/2026</small>
          </span>
          <span>
            <b>CHECKOUT</b>
            <small>10/23/2026</small>
          </span>
          <span className="guests">
            <b>GUESTS</b>
            <small>2 guests</small>
            <ChevronDown size={20} />
          </span>
        </button>
        {open && (
          <div className="date-pop">
            <div>
              <ChevronLeft />
              <b>October 2026</b>
              <b>November 2026</b>
              <ChevronRight />
            </div>
            <div className="cal">
              S　M　T　W　T　F　S
              <br />
              　　　　1　2　3
              <br />
              4　5　6　7　8　9　10
              <br />
              11　12　13　14　15　16　17
              <br />
              <strong>18</strong>　19　20　21　22　<strong>23</strong>　24
            </div>
            <u>Clear dates</u>
          </div>
        )}
        <div className="cancel">
          Free cancellation before <b>17 October</b>
        </div>
        <button className="reserve">Reserve</button>
        <p>You won't be charged yet</p>
      </div>
      <a className="report">
        <Flag size={17} /> Report this listing
      </a>
    </aside>
  );
}
function StickyNav({ active, visible }) {
  return (
    <div className={`sticky-nav ${visible ? "visible" : ""}`}>
      <nav>
        {["Photos", "Amenities", "Reviews", "Location"].map((x) => (
          <a
            key={x}
            className={active === x ? "active" : ""}
            href={`#${x.toLowerCase()}`}
          >
            {x}
          </a>
        ))}
      </nav>
      <div>
        <b>₹28,499</b> for 5 nights
        <br />
        <small>★ 4.95 · 19 reviews</small>
      </div>
      <button className="mini-reserve">Reserve</button>
    </div>
  );
}
function Header() {
  return (
    <header>
      <div className="brand">
        <img src="/assets/logo.png" alt="logo" width="110" />
      </div>
      <div className="search">
        <span>🏡</span>
        <b>Anywhere</b>
        <i />
        <b>Anytime</b>
        <i />
        <span className="muted">Add guests</span>
        <button>
          <Search size={14} />
        </button>
      </div>
      <div className="header-actions">
        <b>Become a host</b>
        <button>
          <Globe size={19} />
        </button>
        <button>
          <Menu size={21} />
        </button>
      </div>
    </header>
  );
}
function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="feature">
      <Icon size={28} />
      <div>
        <b>{title}</b>
        <p>{desc}</p>
      </div>
    </div>
  );
}
function App() {
  const [tour, setTour] = useState(false),
    [light, setLight] = useState(null),
    [showFull, setShowFull] = useState(false),
    [active, setActive] = useState("Photos"),
    [navVisible, setNavVisible] = useState(false);
  useEffect(() => {
    const handle = (e) => {
      if (light !== null) {
        if (e.key === "Escape") setLight(null);
        if (e.key === "ArrowRight") setLight((light + 1) % photos.length);
        if (e.key === "ArrowLeft")
          setLight((light + photos.length - 1) % photos.length);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [light]);
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) =>
        es.forEach((e) => e.isIntersecting && setActive(e.target.dataset.nav)),
      { rootMargin: "-120px 0px -65%" },
    );
    document.querySelectorAll("[data-nav]").forEach((x) => o.observe(x));
    return () => o.disconnect();
  }, []);
  useEffect(() => {
    const update = () => setNavVisible(window.scrollY > 660);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

   const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
  };
  return (
    <>
      <Header />
      <StickyNav active={active} visible={navVisible} />
      <main>
        <section className="hero" id="photos" data-nav="Photos">
          <div className="heading">
            <h1>Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>
            <div>
              <button>
                <Share size={19} />
                Share
              </button>
              <button onClick={handleSave}>
                <Heart
                  size={19}
                  color={saved ? "red" : "currentColor"}
                  fill={saved ? "red" : "none"}
                />
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
          <div className="hero-grid">
            <Photo kind="main" className="big" onClick={() => setTour(true)} />
            <Photo kind="living" onClick={() => setTour(true)} />
            <Photo kind="hot" onClick={() => setTour(true)} />
            <Photo kind="bed" onClick={() => setTour(true)} />
            <div className="last">
              <Photo kind="building" onClick={() => setTour(true)} />
              <button onClick={() => setTour(true)} className="all-photos">
                <Grid3X3 size={18} />
                Show all photos
              </button>
            </div>
          </div>
        </section>
        <div className="two-col">
          <div className="content">
            <section className="intro">
              <h2>Entire serviced apartment in Candolim, India</h2>
              <p>3 guests · 1 bedroom · 1 bed · 1 bathroom</p>
              <div className="favourite">
                <span>
                  ❧
                  <b>
                    Guest
                    <br />
                    favourite
                  </b>
                  ❧
                </span>
                <p>
                  One of the most loved homes on Airbnb,
                  <br />
                  according to guests
                </p>
                <strong>
                  4.95
                  <br />
                  <small>★★★★★</small>
                </strong>
                <strong>
                  19
                  <br />
                  <small>Reviews</small>
                </strong>
              </div>
              <div className="host">
                <div className="avatar host-avatar">M</div>
                <div>
                  <b>Hosted by Mirashya Homes</b>
                  <p>2 years hosting</p>
                </div>
              </div>
              <div className="features">
                <Feature
                  icon={Waves}
                  title="Outdoor entertainment"
                  desc="The pool and alfresco dining are great for summer trips."
                />
                <Feature
                  icon={Waves}
                  title="Designed for staying cool"
                  desc="Beat the heat with the A/C and ceiling fan."
                />
                <Feature
                  icon={DoorOpen}
                  title="Self check-in"
                  desc="You can check in with the building staff."
                />
              </div>
              <div className="translation">
                Some info has been automatically translated.{" "}
                <u>Show original</u>
              </div>
              <p className={showFull ? "description full" : "description"}>
                🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes!
                ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a
                private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi
                💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors.
                Just minutes from Candolim Beach 🏖️, popular cafés, restaurants,
                and nightlife 🍹, it’s a perfect Goa escape.
              </p>
              <button
                className="text-button"
                onClick={() => setShowFull(!showFull)}
              >
                {showFull ? "Show less" : "Show more"}{" "}
                <ChevronRight size={22} />
              </button>
            </section>
            <section className="section" id="sleep">
              <h2>Where you'll sleep</h2>
              <div className="rooms">
                <div>
                  <Photo kind="bed" onClick={() => setTour(true)} />
                  <b>Bedroom</b>
                  <p>1 double bed</p>
                </div>
                <div>
                  <Photo kind="kitchen" onClick={() => setTour(true)} />
                  <b>Living room</b>
                  <p>1 sofa</p>
                </div>
              </div>
            </section>
            <section className="section" id="amenities" data-nav="Amenities">
              <h2>What this place offers</h2>
              <div className="amenities">
                {[
                  [Utensils, "Kitchen"],
                  [Wifi, "Wifi"],
                  [BriefcaseBusiness, "Dedicated workspace"],
                  [Car, "Free parking on premises"],
                  [Waves, "Pool"],
                  [Waves, "Hot tub"],
                  [PawPrint, "Pets allowed"],
                  [Camera, "Exterior security cameras on property"],
                ].map(([I, t]) => (
                  <div key={t}>
                    <I size={28} />
                    {t}
                  </div>
                ))}
              </div>
              <button className="outline">Show all 50 amenities</button>
            </section>
            <section className="section calendar">
              <h2>5 nights in Candolim</h2>
              <p>18 Oct 2026 - 23 Oct 2026</p>
              <div className="months">
                <b>‹　 October 2026</b>
                <b>November 2026　›</b>
                <p>
                  S　 M　 T　 W　 T　 F　 S<br />
                  <br />
                  　　　　1　 2　 3<br />
                  <br />
                  4　 5　 6　 7　 8　 9　10
                  <br />
                  <br />
                  11　12　13　14　15　16　17
                  <br />
                  <br />
                  <strong>18</strong>　19　20　21　22　<strong>23</strong>　24
                </p>
              </div>
            </section>
            <section
              className="section reviews"
              id="reviews"
              data-nav="Reviews"
            >
              <div className="rating">
                ❧ <b>4.95</b> ❧
              </div>
              <h2>Guest favourite</h2>
              <p>
                This home is a guest favourite based on ratings, reviews and
                reliability.
              </p>
              <div className="rating-grid">
                {[
                  "Overall rating",
                  "Cleanliness",
                  "Accuracy",
                  "Check-in",
                  "Communication",
                  "Location",
                  "Value",
                ].map((x) => (
                  <div>
                    <b>{x}</b>
                    <strong>
                      {x === "Location" || x === "Value" ? "4.8" : "5.0"}
                    </strong>
                    <Star size={29} />
                  </div>
                ))}
              </div>
              <div className="review-grid">
                {reviews.map((r, i) => (
                  <article key={r[0]}>
                    <div className="reviewer">
                      <div className="avatar">{r[0][0]}</div>
                      <div>
                        <b>{r[0]}</b>
                        <small>{r[1]}</small>
                      </div>
                    </div>
                    <small>★★★★★ · {i < 2 ? "1 week ago" : "May 2026"}</small>
                    <p>{r[2]}</p>
                    {r[2].length > 120 && <u>Show more</u>}
                  </article>
                ))}
              </div>
              <button className="outline">Show all 19 reviews</button>
            </section>
            <section
              className="section location"
              id="location"
              data-nav="Location"
            >
              <h2>Where you’ll be</h2>
              <p>Candolim, Goa, India</p>
              <div className="map">
                <MapPin fill="white" />
                <button>＋</button>
                <button>−</button>
              </div>
              <p>Exact location will be provided after booking.</p>
              <h3>Neighbourhood highlights</h3>
              <p>
                Located in the heart of Candolim, Amor de Goa offers a peaceful
                stay with easy access to beaches, cafés, and popular
                attractions.
              </p>
              <button className="text-button">
                Show more <ChevronRight size={22} />
              </button>
            </section>
            <section className="section host-section">
              <h2>Meet your host</h2>
              <div className="host-card">
                <div className="avatar host-avatar">M</div>
                <b>
                  Mirashya
                  <br />
                  Homes
                </b>
                <span>
                  <strong>1,463</strong> Reviews
                  <br />
                  <strong>4.68★</strong> Rating
                  <br />
                  <strong>2</strong> Years hosting
                </span>
              </div>
              <div className="cohosts">
                <h3>Co-Hosts</h3>
                {[
                  "Sharath",
                  "Aman Dev Pahwa",
                  "Maria Karen Priyanka",
                  "Simran",
                  "Pallavi",
                  "Sanyukta",
                  "Shruti",
                  "Amisha",
                ].map((x) => (
                  <span>
                    <i>{x[0]}</i>
                    {x}
                  </span>
                ))}
              </div>
            </section>
            <section className="section things">
              <h2>Things to know</h2>
              <div>
                <article>
                  <CalendarDays />
                  <h3>Cancellation policy</h3>
                  <p>
                    Free cancellation before 17 October. Cancel before check-in
                    on 18 October for a partial refund.
                  </p>
                  <u>Learn more</u>
                </article>
                <article>
                  <KeyRound />
                  <h3>House rules</h3>
                  <p>
                    Check-in after 2:00 pm
                    <br />
                    Checkout before 11:00 am
                    <br />3 guests maximum
                  </p>
                  <u>Learn more</u>
                </article>
                <article>
                  <Shield />
                  <h3>Safety & property</h3>
                  <p>
                    Carbon monoxide alarm not reported
                    <br />
                    Smoke alarm not reported
                    <br />
                    Exterior security cameras on property
                  </p>
                  <u>Learn more</u>
                </article>
              </div>
            </section>
          </div>
          <BookingCard />
        </div>
      </main>
      {tour && <Tour onClose={() => setTour(false)} onOpen={setLight} />}{" "}
      {light !== null && (
        <Lightbox
          index={light}
          setIndex={setLight}
          onClose={() => setLight(null)}
        />
      )}
    </>
  );
}
function Tour({ onClose, onOpen }) {
  return (
    <div className="tour">
      <button className="tour-close" onClick={onClose}>
        <ChevronLeft />
      </button>
      <h3>Photo tour</h3>
      <button className="tour-share">
        <Share />
      </button>
      {photos.map(([title, subtitle, kind], i) => {
        const imageSet = [
          i,
          (i + 1) % photos.length,
          (i + 2) % photos.length,
          (i + 3) % photos.length,
        ];
        return (
          <section className="tour-room" key={kind}>
            <div className="tour-copy">
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>
            <div className="tour-pics">
              {imageSet.map((photoIndex) => (
                <Photo
                  key={`${kind}-${photoIndex}`}
                  kind={photos[photoIndex][2]}
                  onClick={() => onOpen(photoIndex)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
function Lightbox({ index, setIndex, onClose }) {
  let [, , kind] = photos[index];
  return (
    <div className="lightbox" role="dialog" aria-modal="true">
      <button className="lb-close" onClick={onClose}>
        <X />
      </button>
      <span>
        {index + 1} / {photos.length}
      </span>
      <Photo kind={kind} className="lb-photo" />
      <button
        className="lb-prev"
        aria-label="Previous photo"
        onClick={() => setIndex((index + photos.length - 1) % photos.length)}
      >
        <ChevronLeft />
      </button>
      <button
        className="lb-next"
        aria-label="Next photo"
        onClick={() => setIndex((index + 1) % photos.length)}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
