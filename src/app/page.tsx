'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const BOOKING_URL = 'https://zapis.kz/salon/khanbarbershop-9989';
const INSTAGRAM_URL = 'https://www.instagram.com/khanbarbershop.zhez/';
const WHATSAPP_URL = 'https://wa.me/77472580181';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Жезказган+Сейфуллина+53А';

const navItems = [
  ['Услуги', 'services'],
  ['Мастера', 'masters'],
  ['Работы', 'gallery'],
  ['Контакты', 'contacts'],
] as const;

const services = [
  { name: 'Мужская стрижка', price: 'от 4 000 ₸' },
  { name: 'Детская стрижка', price: 'от 3 000 ₸' },
  { name: 'Стрижка + борода', price: 'от 7 000 ₸' },
  { name: 'Депиляция воском', price: 'уточняйте' },
];

const masters = [
  { role: 'Барбер', image: '/images/barber-1.jpg' },
  { role: 'Старший барбер', image: '/images/barber-2.jpg' },
  { role: 'Барбер', image: '/images/barber-3.jpg' },
];

const works = Array.from({ length: 6 }, (_, index) => ({
  src: `/images/work-${index + 1}.jpg`,
  alt: `Работа барберов KHAN — ${index + 1}`,
}));

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SafeImage({ src, alt, sizes, priority = false }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      className={`media-image ${failed ? 'is-unavailable' : ''}`}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('mobile-menu-open', menuOpen);
    return () => document.body.classList.remove('mobile-menu-open');
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="nav container" aria-label="Основная навигация">
          <a className="logo" href="#hero" onClick={closeMenu} aria-label="KHAN Barbershop — на главную">
            <strong>KHAN</strong>
            <span>BARBERSHOP</span>
          </a>

          <ul className="desktop-nav">
            {navItems.map(([label, id]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
          </ul>

          <a className="button button-primary header-cta" href={BOOKING_URL}>Записаться</a>
          <button
            className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          ><span /><span /></button>

        </nav>
      </header>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-nav">
          <div className="mobile-nav-inner">
            <div className="mobile-nav-links">
              {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
            </div>
            <a className="button button-primary" href={BOOKING_URL} onClick={closeMenu}>Записаться онлайн</a>
          </div>
        </div>
      )}

      <main>
        <section id="hero" className="hero anchor-section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">BARBERSHOP <i /> ZHEZKAZGAN</p>
              <h1>Стрижка —<br />часть твоего<br /><em>образа.</em></h1>
              <p className="hero-text">Современные мужские стрижки, оформление бороды и уход в центре Жезказгана.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={BOOKING_URL}>Записаться онлайн <Arrow /></a>
                <a className="button button-quiet" href="#services">Наши услуги</a>
              </div>
              <p className="hero-address">Сейфуллина 53А <span>•</span> Жезказган</p>
            </div>

            <div className="hero-visual">
              <div className="hero-image">
                <SafeImage src="/images/hero.jpg" alt="Интерьер KHAN Barbershop" sizes="(max-width: 900px) 100vw, 55vw" priority />
              </div>
              <div className="hero-note"><span>Ежедневно</span><strong>10:00 — 20:00</strong></div>
            </div>
          </div>
        </section>

        <section id="services" className="section services anchor-section">
          <div className="container editorial-split">
            <div className="section-lead">
              <p className="eyebrow">Прайс</p>
              <h2>Услуги</h2>
              <p>Всё необходимое для аккуратного и уверенного образа.</p>
            </div>
            <div className="service-list">
              {services.map((service, index) => (
                <div className="service-row" key={service.name}>
                  <span className="service-index">0{index + 1}</span>
                  <h3>{service.name}</h3>
                  <strong>{service.price}</strong>
                </div>
              ))}
              <p className="price-note">Актуальную стоимость уточняйте при записи.</p>
            </div>
          </div>
        </section>

        <section id="masters" className="section masters anchor-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Команда</p>
              <h2>Наши мастера</h2>
            </div>
            <div className="masters-grid">
              {masters.map((master, index) => (
                <article className="master" key={`${master.role}-${index}`}>
                  <div className="master-photo">
                    <SafeImage src={master.image} alt={master.role} sizes="(max-width: 640px) 100vw, 33vw" />
                  </div>
                  <div className="master-meta"><h3>{master.role}</h3><span>0{index + 1}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery anchor-section">
          <div className="container">
            <div className="section-heading gallery-heading">
              <div><p className="eyebrow">Портфолио</p><h2>Наши работы</h2></div>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Больше в Instagram <Arrow /></a>
            </div>
            <div className="gallery-grid">
              {works.map((work, index) => (
                <figure className={`gallery-item work-${index + 1}`} key={work.src}>
                  <SafeImage src={work.src} alt={work.alt} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 42vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <div className="ornament" aria-hidden="true" />
          <div className="container about-grid">
            <p className="eyebrow">О BARBERSHOP</p>
            <div>
              <h2>KHAN — место,<br />куда приходят<br />не просто за стрижкой.</h2>
              <p>Аккуратная работа, понятный сервис и атмосфера, в которой можно спокойно обновить свой образ.</p>
            </div>
          </div>
        </section>

        <section id="booking" className="section booking anchor-section">
          <div className="container booking-inner">
            <p className="eyebrow">Запись</p>
            <h2>Готов обновить образ?</h2>
            <p>Выберите удобный способ записи.</p>
            <div className="booking-actions">
              <a className="button button-primary" href={BOOKING_URL}>Записаться онлайн <Arrow /></a>
              <a className="button button-outline" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
              <a className="button button-outline" href="tel:+77472580181">Позвонить</a>
            </div>
          </div>
        </section>

        <section id="contacts" className="section contacts anchor-section">
          <div className="container contacts-grid">
            <div className="contacts-copy">
              <p className="eyebrow">Контакты</p>
              <h2>KHAN<br />BARBERSHOP</h2>
              <dl className="contact-list">
                <div><dt>Адрес</dt><dd>г. Жезказган<br />ул. Сейфуллина 53А, 2 этаж</dd></div>
                <div><dt>Телефон</dt><dd><a href="tel:+77472580181">+7 747 258 01 81</a></dd></div>
                <div><dt>Instagram</dt><dd><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@khanbarbershop.zhez</a></dd></div>
                <div><dt>График</dt><dd>Ежедневно, 10:00–20:00</dd></div>
              </dl>
            </div>
            <div className="address-card">
              <div className="address-mark">KH</div>
              <div><span>Жезказган</span><h3>Сейфуллина 53А</h3><p>2 этаж</p></div>
              <a className="button button-light" href={MAP_URL} target="_blank" rel="noreferrer">Открыть в картах <Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div><a className="footer-logo" href="#hero">KHAN BARBERSHOP</a><span>Жезказган</span></div>
          <nav aria-label="Ссылки в подвале"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a><a href={BOOKING_URL}>Записаться</a></nav>
        </div>
      </footer>
    </div>
  );
}
