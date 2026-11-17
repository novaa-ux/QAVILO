import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Check, Menu, X, MessageCircle } from 'lucide-react';
import './styles.css';

const WHATSAPP = ['201111088069', '201203654420'];
const products = [
  {id:1,name:'Spanish Latte',category:'Coffee',type:'Iced',description:'Espresso, chilled milk and a soft sweetness from condensed milk.',ingredients:['Double espresso','Cold milk','Condensed milk','Ice'],image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=85',alt:'Iced latte in a clear glass'},
  {id:2,name:'Flat White',category:'Coffee',type:'Hot',description:'A short, balanced espresso drink finished with silky microfoam.',ingredients:['Double ristretto','Steamed milk','Fine microfoam'],image:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85',alt:'Freshly prepared coffee'},
  {id:3,name:'Mocha',category:'Coffee',type:'Hot / Iced',description:'A full espresso profile with deep chocolate notes.',ingredients:['Espresso','Milk','Dark chocolate','Cocoa'],image:'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=1000&q=85',alt:'Chocolate coffee drink'},
  {id:4,name:'Classic Matcha',category:'Matcha',type:'Hot / Iced',description:'A clean, gently earthy matcha with a smooth finish.',ingredients:['Matcha powder','Milk or water','Ice (for iced serving)'],image:'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=1000&q=85',alt:'Matcha green tea drink'},
  {id:5,name:'Strawberry Matcha',category:'Matcha',type:'Iced',description:'Fresh strawberry character layered with creamy matcha.',ingredients:['Matcha','Milk','Strawberry purée','Ice'],image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=1000&q=85',alt:'Iced green tea drink'},
  {id:6,name:'V60 Ethiopia',category:'Specialty',type:'Hand brew',description:'A clean pour-over that lets the coffee origin lead.',ingredients:['Ethiopian single-origin coffee','Filtered water','Paper filter'],image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85',alt:'Pour-over coffee preparation'},
  {id:7,name:'Iced Americano',category:'Coffee',type:'Iced',description:'Espresso and cold water for a crisp, straightforward cup.',ingredients:['Double espresso','Cold filtered water','Ice'],image:'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=85',alt:'Iced black coffee'},
  {id:8,name:'Pistachio Croissant',category:'Bakery',type:'Fresh bakery',description:'Buttery, flaky pastry filled and finished with pistachio.',ingredients:['Croissant pastry','Pistachio cream','Crushed pistachio'],image:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=85',alt:'Fresh croissant pastry'}
];
const categories = ['All','Coffee','Specialty','Matcha','Bakery'];

function WhatsAppLink({number,children,className=''}) {
  const message = 'Hello, I would like to discuss creating a menu for my café.';
  return <a className={className} href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">{children}</a>;
}
function OrderSheet({product,onClose}) {
  return <motion.div className="sheet-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
    <motion.article className="order-sheet" initial={{y:28,opacity:0}} animate={{y:0,opacity:1}} exit={{y:18,opacity:0}} transition={{duration:.24}}>
      <button className="sheet-close" onClick={onClose} aria-label="Close"><X size={19}/></button>
      <img className="sheet-image" src={product.image} alt={product.alt}/>
      <div className="sheet-content"><span className="eyebrow">{product.category} / {product.type}</span><h2>{product.name}</h2><p>{product.description}</p>
        <div className="sheet-divider"/><h3>Ingredients</h3>
        <ul className="ingredient-list">{product.ingredients.map((x,i)=><li key={x}><span>{String(i+1).padStart(2,'0')}</span>{x}<Check size={15}/></li>)}</ul>
        <p className="sheet-note">Ingredient overview only. No recipe ratios or gram measurements are displayed.</p>
        <button className="sheet-done" onClick={onClose}>Close details <ArrowRight size={16}/></button>
      </div>
    </motion.article>
  </motion.div>;
}
export default function App() {
  const [active,setActive] = useState('All');
  const [selected,setSelected] = useState(null);
  const [mobileOpen,setMobileOpen] = useState(false);
  const filtered = useMemo(()=>products.filter(p=>active==='All'||p.category===active),[active]);
  const goTo = id=>{setMobileOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'});};
  return <div className="site">
    <header className="header">
      <a className="wordmark" href="#top" onClick={e=>{e.preventDefault();goTo('top');}}>QAVILO<span>®</span></a>
      <nav className={mobileOpen?'navigation is-open':'navigation'}>
        <button onClick={()=>goTo('services')}>What we do</button><button onClick={()=>goTo('work')}>Menu examples</button><button onClick={()=>goTo('contact')}>Contact</button>
      </nav>
      <button className="header-cta" onClick={()=>goTo('contact')}>Discuss your menu <ArrowUpRight size={16}/></button>
      <button className="menu-toggle" onClick={()=>setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen?<X/>:<Menu/>}</button>
    </header>
    <main id="top">
      <section className="hero"><div className="hero-image"/><div className="hero-shade"/>
        <div className="hero-content"><span className="eyebrow light">DIGITAL MENUS FOR CAFÉS</span><h1>A menu that feels<br/>like <em>your place.</em></h1>
          <p>We build clear, considered digital menus for commercial cafés, specialty coffee bars and matcha spots.</p>
          <div className="hero-buttons"><button className="button-light" onClick={()=>goTo('contact')}>Let's talk about your café <ArrowUpRight size={17}/></button><button className="button-text-light" onClick={()=>goTo('work')}>See menu examples <ArrowRight size={16}/></button></div>
        </div><div className="hero-caption"><span>01 — 03</span><span>BUILT AROUND YOUR CAFÉ</span></div>
      </section>
      <section className="intro section"><div className="intro-label">A GOOD MENU DOES MORE THAN LIST DRINKS.</div><div className="intro-copy"><h2>It helps people understand what makes <em>your café different.</em></h2><p>From a busy neighbourhood coffee shop to a detail-led specialty bar, we shape the menu around the way your guests order and the way your team works.</p></div></section>
      <section className="services section" id="services"><div className="section-title"><div><span className="eyebrow">WHAT WE DO</span><h2>Made for the way<br/><em>you serve.</em></h2></div><p>One focused service: a digital menu that looks right, reads easily and works beautifully on a phone.</p></div>
        <div className="service-list">
          <article className="service-item"><span>01</span><div><h3>Commercial cafés</h3><p>Easy-to-browse menus for broad selections, daily favourites and fast ordering.</p></div><span className="service-mark">↗</span></article>
          <article className="service-item"><span>02</span><div><h3>Specialty coffee</h3><p>Room for origins, brew methods, tasting notes and the details your guests care about.</p></div><span className="service-mark">↗</span></article>
          <article className="service-item"><span>03</span><div><h3>Matcha & focused concepts</h3><p>A visual direction that gives a smaller, specialised menu its own character.</p></div><span className="service-mark">↗</span></article>
        </div>
      </section>
      <section className="work" id="work"><div className="section section-work"><div className="section-title work-title"><div><span className="eyebrow">A LOOK INSIDE</span><h2>Menu <em>examples.</em></h2></div><p>Sample items showing how each product can be presented. Select one to see its ingredients.</p></div>
        <div className="filter-row"><div className="filters">{categories.map(c=><button key={c} className={active===c?'selected':''} onClick={()=>setActive(c)}>{c}</button>)}</div><span>{filtered.length} SAMPLE ITEMS</span></div>
        <div className="menu-grid"><AnimatePresence mode="popLayout">{filtered.map((p,i)=><motion.button className="menu-card" key={p.id} onClick={()=>setSelected(p)} layout initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={{duration:.24,delay:i*.02}} whileHover={{y:-4}}>
          <div className="menu-photo"><img src={p.image} alt={p.alt} loading="lazy"/><span className="photo-arrow"><ArrowUpRight size={18}/></span></div>
          <div className="menu-card-copy"><span>{p.category} · {p.type}</span><h3>{p.name}</h3><p>{p.description}</p><b>View ingredients <ArrowRight size={14}/></b></div>
        </motion.button>)}</AnimatePresence></div>
      </div></section>
      <section className="contact" id="contact"><div className="contact-image"/><div className="contact-overlay"/>
        <div className="contact-content"><span className="eyebrow light">NEED A SECOND OPINION?</span><h2>If you're not sure<br/>where to start, <em>ask us.</em></h2>
          <p>If you feel stuck or need advice from an experienced menu specialist, send us a WhatsApp message. We'll talk through your café and help you find a clear direction.</p>
          <div className="contact-links"><WhatsAppLink number={WHATSAPP[0]} className="button-light"><MessageCircle size={17}/> 0111 108 8069 <ArrowUpRight size={16}/></WhatsAppLink><WhatsAppLink number={WHATSAPP[1]} className="button-outline-light"><MessageCircle size={17}/> 0120 365 4420 <ArrowUpRight size={16}/></WhatsAppLink></div>
        </div>
      </section>
    </main>
    <footer className="footer"><a className="wordmark" href="#top" onClick={e=>{e.preventDefault();goTo('top');}}>QAVILO<span>®</span></a><span>Digital menus for cafés.</span><button onClick={()=>goTo('top')}>BACK TO TOP ↑</button></footer>
    <AnimatePresence>{selected&&<OrderSheet product={selected} onClose={()=>setSelected(null)}/>}</AnimatePresence>
  </div>;
}
