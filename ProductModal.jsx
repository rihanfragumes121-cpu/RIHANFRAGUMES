import { useEffect, useRef } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { MRP, PRICE, SAVING, whatsappUrl } from '../data.js'
import Notes from './Notes.jsx'

export default function ProductModal({ product, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const prev = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [onClose])
  const p = product
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="pm-title" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel" style={{ '--accent': p.accent }}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close details"><X size={22} /></button>
        <img className="modal-img" src={p.image} alt={`${p.name} perfume bottle and box by RIHAN FRAGUMES`} />
        <div className="modal-body">
          <p className="family">{p.family}</p>
          <h2 id="pm-title">{p.name}</h2>
          <p className="character">{p.character}</p>
          <p className="price"><strong>₹{PRICE}</strong> <s>₹{MRP}</s> <span>Save ₹{SAVING}</span></p>
          <p className="meta">{p.quantity ? p.quantity : 'Quantity to be confirmed'}{p.lasting ? ` · Lasts ${p.lasting}` : ''}</p>
          {p.bestFor && <p className="meta">Best for: {p.bestFor.join(', ')}</p>}
          <Notes product={p} />
          <a className="btn btn-gold" href={whatsappUrl(p)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Order {p.name} on WhatsApp</a>
        </div>
      </div>
    </div>
  )
}
