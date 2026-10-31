import breeze from './assets/breeze.jpg'
import velour from './assets/velour.jpg'
import striker from './assets/striker.jpg'

export const BRAND = {
  name: 'RIHAN FRAGUMES',
  whatsapp: '917757019107',
  whatsappDisplay: '77570 19107',
  instagram: 'https://www.instagram.com/rihanfragumes/',
  address: 'RIHAN FRAGUMES, Aksha Society, Sant Tukaram Nagar, Pimpri, Near YCM Hospital.',
}
export const MRP = 799
export const PRICE = 700
export const SAVING = MRP - PRICE

// VELOUR quantity is unconfirmed: set `quantity: '50 ML'` (or the real value) and it appears everywhere, including the WhatsApp message.
export const PRODUCTS = [
  { id: 'breeze', name: 'BREEZE', image: breeze, accent: '#6fb1dc', quantity: '50 ML',
    family: 'Fresh Green Aquatic Woody', character: 'Fresh, clean, smooth and masculine.',
    lasting: '8–10 hours (brand-provided)', bestFor: ['Summer', 'Daytime', 'Office', 'Casual wear'],
    notes: { top: ['Fresh Green Notes', 'Citrus', 'Bergamot', 'Watermelon'], heart: ['Lavender', 'Lotus', 'Jasmine', 'Aromatic Green Accords'], base: ['White Musk', 'Amber', 'Sandalwood', 'Soft Woody Notes'] } },
  { id: 'velour', name: 'VELOUR', image: velour, accent: '#a46bd1', quantity: '50 ML',
    family: 'Fruity, Nutty, Floral', character: 'Fruity, nutty, floral, warm and sweet.',
    lasting: '8–10 hours (brand-provided)',
    notes: { top: ['Pear', 'Mandarin', 'Almond', 'Coffee'], heart: ['Gardenia', 'Jasmine', 'Tuberose', 'Frangipani'], base: ['Tonka Bean', 'Cocoa', 'Brown Sugar', 'Patchouli'] } },
  { id: 'striker', name: 'STRIKER', image: striker, accent: '#e0453f', quantity: '50 ML',
    family: 'Fresh Citrus, Sweet Spicy, Woody', character: 'Fresh, citrus, sweet, spicy and woody.',
    lasting: '8–10 hours (brand-provided)',
    notes: { top: ['Calabrian Lemon', 'Bergamot', 'Mint', 'Mandarin Orange', 'Sage'], heart: ['Praline', 'Cinnamon', 'Ginger', 'Black Cardamom', 'Aromatic Floral Accords'], base: ['Black Amber', 'Patchouli', 'Sandalwood', 'Cedarwood', 'Musk'] } },
]

export function whatsappUrl(p) {
  const qty = p.quantity ? ` (${p.quantity})` : ''
  const text = `Hello RIHAN FRAGUMES,\nI want to order ${p.name}${qty}.\nMRP: â‚¹${MRP}\nSelling Price: â‚¹${PRICE}.\nPlease share the ordering details.`
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`
}
export const generalWhatsapp = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hello RIHAN FRAGUMES, I would like to know more about your perfumes.')}`


