import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, MessageCircle, Instagram, MapPin, Phone, Youtube } from 'lucide-react'
import logo from './assets/logo.png'
import { BRAND, PRODUCTS, MRP, PRICE, SAVING, whatsappUrl, generalWhatsapp } from './data.js'
import ProductModal from './components/ProductModal.jsx'

gsap.registerPlugin(ScrollTrigger)
const LINKS = [['Home', '#home'], ['Collection', '#collection'], ['About', '#about'], ['Contact', '#contact']]

function Logo({ className }) {
  return <img className={className} src={logo} alt="RIHAN FRAGUMES" width="680" height="804" decoding="async" />
}

export default function App() {
  const root = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const closeModal = useCallback(() => setActive(null), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // One orchestrated opening: loader -> hero
        const tl = gsap.timeline()
        tl.fromTo('.loader-logo', { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' })
          .fromTo('.loader-line', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, '<0.1')
          .to('.loader', { yPercent: -100, duration: 0.9, ease: 'power3.inOut', delay: 0.15 })
          .set('.loader', { display: 'none' })
          .from('.hero-line > span', { yPercent: 110, duration: 1, ease: 'power3.out', stagger: 0.12 }, '-=0.35')
          .from('.hero-sub, .hero-cta', { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, '-=0.6')
          .from('.tri figure', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power3.inOut', stagger: 0.14 }, '-=1.4')
        gsap.to('.tri img', { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.utils.toArray('.card figure').forEach(f => {
          gsap.from(f, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: f, start: 'top 85%', once: true } })
        })
        gsap.utils.toArray('.statement, .why li').forEach(el => {
          gsap.from(el, { opacity: 0, y: 20, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
        })
      })
      mm.add('(prefers-reduced-motion: reduce)', () => { gsap.set('.loader', { display: 'none' }) })
    }, root)
    return () => { ctx.revert(); mm.revert() }
  }, [])

  const go = () => setOpen(false)
  return (
    <div ref={root}>
      <div className="loader" aria-hidden="true"><Logo className="loader-logo" /><span className="loader-line" /></div>
      <a className="skip" href="#collection">Skip to collection</a>

      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <a href="#home" className="nav-logo" aria-label="RIHAN FRAGUMES home" onClick={go}><Logo /></a>
        <nav id="menu" className="nav-links" aria-label="Main">
          {LINKS.map(([l, h]) => <a key={l} href={h} onClick={go}>{l}</a>)}
          <a className="btn btn-gold nav-cta" href={generalWhatsapp} target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
        </nav>
        <button className="nav-toggle" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(o => !o)}>{open ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-text">
            <h1>
              <span className="hero-line"><span>Three fragrances.</span></span>
              <span className="hero-line"><span>One signature.</span></span>
            </h1>
<p className="hero-sub">Breeze, Velour and Striker. Premium luxury perfumes, &#8377;{PRICE} each, ordered directly on WhatsApp.</p>
            <div className="hero-cta">
              <a className="btn btn-gold" href="#collection">Shop the collection</a>
              <a className="btn btn-line" href={generalWhatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Chat with us</a>
            </div>
          </div>
          <div className="tri">
            {PRODUCTS.map(p => (
              <figure key={p.id} style={{ '--accent': p.accent }}>
                <button onClick={() => setActive(p)} aria-label={`View ${p.name} details`}>
                  <img src={p.image} alt={`${p.name} perfume and box`} fetchpriority="high" />
                  <figcaption>{p.name}</figcaption>
                </button>
              </figure>
            ))}
          </div>
        </section>
        <section id="about" className="about">
          <Logo className="about-logo" />
          <p className="statement">For over 1.5 years, our three signature fragrances have earned customer love and strong demand. Discover the scents customers keep coming back for.</p>
        </section>

        <section id="collection" className="collection">
          <h2>Signature collection</h2>
          <p className="sec-sub">Each perfume: MRP &#8377;{MRP}, now &#8377;{PRICE}. You save &#8377;{SAVING}.</p>
          <p className="sec-sub"><strong>PREPAID ONLY — NO COD</strong><br />Cash on Delivery is not available. Contact us on WhatsApp to confirm payment details.</p>
          <p className="fragrance-note">EAU DE PARFUM • 25%+ • more concentration</p>
          <div className="cards">
            {PRODUCTS.map(p => (
              <article className="card" key={p.id} style={{ '--accent': p.accent }}>
                <figure><img loading="lazy" src={p.image} alt={`${p.name} perfume bottle and box by RIHAN FRAGUMES`} width="896" height="1200" /></figure>
                <div className="card-body">
                  <h3>{p.name}</h3>
                  <p className="family">{p.family}</p>
                  <p>{p.character}</p>
                  <p className="meta">{p.quantity || 'Quantity to be confirmed'}</p>
                  <p className="price"><strong>&#8377;{PRICE}</strong> <s>&#8377;{MRP}</s> <span>Save &#8377;{SAVING}</span></p>
                  <div className="card-actions">
                    <button className="btn btn-line" onClick={() => setActive(p)}>View details</button>
                    <a className="btn btn-gold" href={whatsappUrl(p)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Order on WhatsApp</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="why">
          <h2>Why RIHAN FRAGUMES</h2>
          <ul>
            <li><h3>Three distinct profiles</h3><p>Fresh aquatic, fruity floral and citrus spice: each fragrance has its own notes and mood.</p></li>
            <li><h3>One clear price</h3><p>Every perfume is &#8377;{PRICE} against an MRP of &#8377;{MRP}, so you save &#8377;{SAVING}.</p></li>
            <li><h3>Order directly</h3><p>Message us on WhatsApp with the perfume you want. Ordering and payment are handled there.</p></li>
            <li><h3>A local shop</h3><p>Visit us in Pimpri, near YCM Hospital.</p></li>
          </ul>
        </section>

        <section className="insta">
          <h2>Follow RIHAN FRAGUMES</h2>
          <a className="btn btn-line" href={BRAND.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} /> @rihanfragumes</a>
          <a className="btn btn-line" href="https://youtube.com/@rehan_vlogs9107" target="_blank" rel="noopener noreferrer"><Youtube size={18} /> @vlogs by rehan</a>
        </section>

        <section id="contact" className="contact">
          <h2>Contact</h2>
          <ul>
            <li><Phone size={18} /><a href={generalWhatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {BRAND.whatsappDisplay}</a></li>
            <li><MapPin size={18} /><address>{BRAND.address}</address></li>
            <li><Instagram size={18} /><a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">instagram.com/rihanfragumes</a></li>
          </ul>
          <a className="btn btn-gold" href={generalWhatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Message on WhatsApp</a>
        </section>
      </main>

      <footer className="footer">
        <Logo className="footer-logo" />
        <nav aria-label="Footer"><h3>Explore</h3>{LINKS.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</nav>
        <nav aria-label="Products"><h3>Perfumes</h3>{PRODUCTS.map(p => <button key={p.id} onClick={() => setActive(p)}>{p.name}</button>)}</nav>
        <div><h3>Visit and chat</h3><address>{BRAND.address}</address><a href={generalWhatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {BRAND.whatsappDisplay}</a><a href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></div>
        <p className="copy">Â© {new Date().getFullYear()} RIHAN FRAGUMES. All rights reserved.</p>
      </footer>

      {active && <ProductModal product={active} onClose={closeModal} />}
    </div>
  )
}



