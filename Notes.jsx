import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const TIERS = [['top', 'Top notes', 'First impression'], ['heart', 'Heart notes', 'The character'], ['base', 'Base notes', 'The lasting trail']]

export default function Notes({ product }) {
  const ref = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.from('.tier', { opacity: 0, y: 14, duration: 0.7, stagger: 0.18, ease: 'power2.out', delay: 0.25 })
      gsap.from('.tier li', { opacity: 0, duration: 0.5, stagger: 0.05, delay: 0.5 })
    }, ref)
    return () => ctx.revert()
  }, [product.id])
  return (
    <div className="notes" ref={ref} style={{ '--accent': product.accent }}>
      {TIERS.map(([k, title, sub]) => (
        <section className="tier" key={k} aria-label={title}>
          <h4>{title}<span>{sub}</span></h4>
          <ul>{product.notes[k].map(n => <li key={n}>{n}</li>)}</ul>
        </section>
      ))}
    </div>
  )
}
