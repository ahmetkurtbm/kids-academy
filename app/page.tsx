"use client";

import { FormEvent, useState } from "react";

const Arrow = () => <span aria-hidden>↗</span>;

export default function Home() {
  const [sent, setSent] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>, kind: string) => {
    e.preventDefault();
    setSent(kind);
    e.currentTarget.reset();
  };

  return (
    <main>
      <div className="topline">Yeni dönem oyun grubu kayıtları başladı <a href="#basvuru">Bilgi al <Arrow /></a></div>
      <nav className="nav shell">
        <a className="logo" href="#"><span>KA</span><b>Kids Academy<small>oyun evi & aktivite merkezi</small></b></a>
        <div className="links"><a href="#programlar">Programlar</a><a href="#tur">Kurum Turu</a><a href="#hakkimizda">Biz Kimiz?</a><a href="#sss">SSS</a></div>
        <a className="navCta" href="#basvuru">Ön başvuru <Arrow /></a>
      </nav>

      <section className="hero shell">
        <div className="heroCopy">
          <div className="eyebrow"><i>●</i> Osmaniye&apos;de oyunla öğrenmenin en neşeli hali</div>
          <h1>Küçük adımlar,<br/><em>kocaman keşifler.</em></h1>
          <p>Çocuğunuzun kendi hızında keşfettiği, özgürce oynadığı ve her gün yeni bir beceriyle eve döndüğü sıcacık bir dünya.</p>
          <div className="heroActions"><a className="primary" href="#basvuru">Tanışma randevusu al <Arrow /></a><a className="secondary" href="#tur"><span>▶</span> Kurumu keşfet</a></div>
          <div className="trust"><div className="faces"><span>👩🏻</span><span>👩🏼</span><span>👩🏽</span></div><div><b>4.9 / 5 veli memnuniyeti</b><small>Mutlu çocuklar, içi rahat veliler</small></div></div>
        </div>
        <div className="heroVisual">
          <div className="heroImage" role="img" aria-label="Kids Academy oyun ve öğrenme alanı" />
          <div className="floatCard available"><span>✓</span><div><small>Bugün açık</small><b>2 kontenjan kaldı</b></div></div>
          <div className="floatCard note"><span>✦</span><div><small>Bugünün kazanımı</small><b>Paylaşma & ince motor</b></div></div>
        </div>
      </section>

      <section className="availability shell" aria-label="Canlı kontenjan">
        <div className="availIntro"><span className="live">● CANLI</span><h2>Bu hafta<br/>neler var?</h2><p>Çocuğunuz için uygun grupta yerinizi kolayca ayırın.</p></div>
        {[
          ["SALI · 10:30", "Duyusal Oyun", "2–4 yaş", "Son 2 yer", "75"],
          ["CUMARTESİ · 14:00", "Robotik Kodlama", "5–7 yaş", "Son 1 yer", "90"],
          ["PAZAR · 11:00", "Sanat Atölyesi", "3–6 yaş", "4 yer açık", "55"],
        ].map((x) => <article className="slot" key={x[1]}><div className="slotTop"><span>{x[0]}</span><b>{x[3]}</b></div><h3>{x[1]}</h3><p>{x[2]} · 60 dakika</p><div className="bar"><i style={{width:`${x[4]}%`}} /></div><a href="#rezervasyon">Yer ayır <Arrow /></a></article>)}
      </section>

      <section id="hakkimizda" className="manifesto shell">
        <div><span className="sectionNo">01 — YAKLAŞIMIMIZ</span><h2>Çocukluğu<br/>aceleye <em>getirmiyoruz.</em></h2></div>
        <div className="manifestoText"><p>Biz klasik bir kreş değiliz. Çocuğun “yapabildiğine” değil, <b>merak ettiğine</b> odaklanan bir oyun evi ve aktivite merkeziyiz.</p><p>Her çocuğu biricik kabul ediyor; baskısız, güvenli ve özgür bir ortamda sosyal, duygusal ve bilişsel gelişimini oyunla destekliyoruz.</p><a href="#ekip">Hikâyemizi ve ekibimizi tanıyın <Arrow /></a></div>
      </section>

      <section id="programlar" className="programSection">
        <div className="shell"><div className="sectionHead"><div><span className="sectionNo">02 — PROGRAMLAR</span><h2>Her yaşa bir<br/><em>keşif yolu.</em></h2></div><p>Küçük gruplar, yaşa uygun akışlar ve bolca oyun. Çocuğunuz için en doğru ritmi birlikte bulalım.</p></div>
          <div className="programGrid">
            <article className="program coral"><span>01</span><div className="programIcon">☀</div><h3>Yarı Zamanlı<br/>Oyun Grubu</h3><p>2–4 yaş · Hafta içi</p><a href="#basvuru">Detayları gör <Arrow /></a></article>
            <article className="program blue"><span>02</span><div className="programIcon">✿</div><h3>Atölye &<br/>Etkinlikler</h3><p>3–7 yaş · Hafta sonu</p><a href="#rezervasyon">Takvimi incele <Arrow /></a></article>
            <article className="program yellow"><span>03</span><div className="programIcon">✦</div><h3>Ödev Takip<br/>Programı</h3><p>İlkokul · Hafta içi</p><a href="#basvuru">Detayları gör <Arrow /></a></article>
            <article className="program green"><span>04</span><div className="programIcon">⌁</div><h3>Yaz Okulu<br/>Programı</h3><p>4–9 yaş · Haziran–Ağustos</p><a href="#basvuru">Ön kayıt ol <Arrow /></a></article>
          </div>
        </div>
      </section>

      <section id="tur" className="tour shell">
        <div className="sectionHead"><div><span className="sectionNo">03 — KURUM TURU</span><h2>İçinizin rahat<br/>edeceği <em>bir dünya.</em></h2></div><p>Her köşesini çocukların güvenliği, özgürlüğü ve merakı için tasarladık.</p></div>
        <div className="tourGrid"><div className="tourPhoto mainPhoto"><span>OYUN & KEŞİF ALANI <b>↗</b></span></div><div className="tourPhoto classPhoto"><span>ATÖLYE SINIFI <b>↗</b></span></div><div className="tourPhoto readingPhoto"><span>SAKİNLEŞME KÖŞESİ <b>↗</b></span></div></div>
      </section>

      <section className="daySection">
        <div className="shell"><span className="sectionNo light">04 — BİZİMLE BİR GÜN</span><h2>Her anı özenle,<br/><em>her günü neşeyle.</em></h2>
          <div className="timeline">{[["09:30","Merhaba!","Karşılama & serbest oyun"],["10:00","Hareket zamanı","Ritim, denge ve beden farkındalığı"],["10:45","Atölye saati","Duyusal keşif & üretim"],["11:30","Birlikte sofra","Sağlıklı ara öğün"],["12:00","Güle güle!","Günün minik paylaşımı"]].map((x,i)=><div className="time" key={x[0]}><span>{String(i+1).padStart(2,"0")}</span><b>{x[0]}</b><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div>
        </div>
      </section>

      <section className="dashboard shell">
        <div className="dashCopy"><span className="sectionNo">05 — VELİ PANELİ</span><h2>Siz yanında değilken de<br/><em>gününe yakın olun.</em></h2><p>Günlük kazanımlar, atölye fotoğrafları, ödev takibi ve haftalık deneme sonuçları tek güvenli panelde.</p><div className="checkList"><span>✓ Günlük kısa gelişim notları</span><span>✓ Haftalık deneme sonuçları</span><span>✓ Etkinlik fotoğrafları</span></div><button onClick={()=>setSent("panel")}>Örnek paneli görüntüle <Arrow /></button></div>
        <div className="phone"><div className="phoneTop"><span>9:41</span><b>kids.</b><span>●●●</span></div><div className="hello"><small>Günaydın,</small><h3>Defne bugün harika! ☀</h3></div><div className="dailyCard"><div className="dailyImg">🎨</div><small>BUGÜN · 11:40</small><h4>Renkleri karıştırdık</h4><p>Defne ana renklerden yeni renkler üretirken sırasını sabırla bekledi.</p><div><span>✦ Merak</span><span>♡ Paylaşım</span></div></div><div className="score"><span>Haftalık deneme</span><b>18 / 20</b><i><em /></i><small>Geçen haftaya göre +2 doğru</small></div></div>
      </section>

      <section className="testimonials"><div className="shell"><span className="sectionNo">06 — VELİLER ANLATIYOR</span><div className="quoteMark">“</div><blockquote>Kızım ilk kez bir yere giderken arkasına bakmadan el sallıyor. Her gün eve yeni bir şarkı, yeni bir kelime ve kocaman bir gülümsemeyle dönüyor.</blockquote><div className="parent"><span>SK</span><div><b>Selin K.</b><small>Ela&apos;nın annesi · Oyun Grubu</small></div></div><p className="privacyNote">* Örnek yorumdur; yayına almadan önce gerçek veli onayı ve içerikleriyle değiştirilmelidir.</p></div></section>

      <section id="rezervasyon" className="reservation shell">
        <div className="formIntro"><span className="sectionNo">07 — YERİNİ AYIR</span><h2>Bir sonraki keşif<br/><em>burada başlıyor.</em></h2><p>Atölyeyi seçin, bilgilerinizi bırakın. Ekibimiz rezervasyonunuzu kısa sürede doğrulasın.</p></div>
        <form onSubmit={(e)=>submit(e,"rezervasyon")}><label>Atölye seçimi<select required defaultValue=""><option value="" disabled>Bir atölye seçin</option><option>Duyusal Oyun · Salı 10:30</option><option>Robotik Kodlama · Cumartesi 14:00</option><option>Sanat Atölyesi · Pazar 11:00</option></select></label><div className="two"><label>Çocuğun adı<input required placeholder="Adı" /></label><label>Yaşı<input required type="number" min="2" max="12" placeholder="Yaşı" /></label></div><label>Telefon numaranız<input required type="tel" placeholder="05__ ___ __ __" /></label><button type="submit">Rezervasyon isteği gönder <Arrow /></button>{sent==="rezervasyon"&&<div className="success">✓ Talebiniz alındı. Sizi kısa süre içinde arayacağız.</div>}</form>
      </section>

      <section id="basvuru" className="apply"><div className="shell applyInner"><div><span className="sectionNo light">08 — ÖN BAŞVURU</span><h2>Tanışalım mı?</h2><p>Programlarımız hakkında bilgi almak ve kurumu yerinde görmek için formu bırakın.</p></div><form onSubmit={(e)=>submit(e,"başvuru")}><input required placeholder="Adınız ve soyadınız"/><input required type="tel" placeholder="Telefon numaranız"/><select required defaultValue=""><option value="" disabled>İlgilendiğiniz program</option><option>Yarı Zamanlı Oyun Grubu</option><option>Yaz Okulu</option><option>Ödev Takip Programı</option></select><button>Benimle iletişime geçin <Arrow /></button>{sent==="başvuru"&&<div className="success inverse">✓ Bilgileriniz alındı. Teşekkürler!</div>}</form></div></section>

      <section id="sss" className="faq shell"><div><span className="sectionNo">09 — MERAK EDİLENLER</span><h2>Aklınıza<br/><em>takılanlar.</em></h2></div><div className="faqList">{[["Hangi yaş gruplarına hizmet veriyorsunuz?","Yarı zamanlı oyun gruplarımız 2–4 yaş; atölyelerimiz 3–7 yaş; ödev takip programımız ise ilkokul öğrencileri içindir."],["Çalışma saatleriniz nedir?","Hafta içi 09:00–18:00, cumartesi atölye programına göre hizmet veriyoruz. Resmî program yayın öncesinde kurum tarafından güncellenmelidir."],["Hijyen ve güvenlik önlemleriniz nelerdir?","Alanlarımız günlük olarak temizlenir; oyuncak ve temas yüzeyleri düzenli dezenfekte edilir. Giriş-çıkışlar yetkili kişilerce takip edilir."],["Çocuğum alışamazsa ne yapıyorsunuz?","Her çocuğun ayrışma sürecine saygı duyuyoruz. Kademeli, aileyle iletişim halinde ve çocuğun sinyallerini izleyen bir uyum planı oluşturuyoruz."]].map((x,i)=><details key={x[0]} open={i===0}><summary>{x[0]}<span>+</span></summary><p>{x[1]}</p></details>)}</div></section>

      <footer><div className="shell footerTop"><a className="logo inverseLogo" href="#"><span>KA</span><b>Kids Academy<small>oyun evi & aktivite merkezi</small></b></a><div><small>HIZLI MENÜ</small><a href="#programlar">Programlar</a><a href="#tur">Kurum Turu</a><a href="#basvuru">Ön Başvuru</a></div><div><small>İLETİŞİM</small><p>Osmaniye, Türkiye</p><p>0 (5__) ___ __ __</p><p>merhaba@kidsacademy.com</p></div><div><small>SOSYAL</small><a href="#">Instagram ↗</a><a href="#">Facebook ↗</a></div></div><div className="shell footerBottom"><span>© 2026 Kids Academy</span><span>Sevgiyle büyütüldü ♥</span></div></footer>

      <a className="whatsapp" href="https://wa.me/905000000000" target="_blank" rel="noreferrer" aria-label="WhatsApp ile iletişime geç"><b>WhatsApp</b><span>●</span></a>
      {sent==="panel"&&<div className="modal" onClick={()=>setSent("")}><div onClick={e=>e.stopPropagation()}><button onClick={()=>setSent("")}>×</button><span>VELİ PANELİ DEMOSU</span><h3>Güvenli alan, gerçek bağ.</h3><p>Bu bölüm canlı sistemde veliye özel şifre, KVKK onayı ve güvenli fotoğraf erişimiyle çalışır. Tasarımda günlük notlar, haftalık denemeler ve gelişim özeti hazırlandı.</p><a href="#basvuru" onClick={()=>setSent("")}>Bilgi almak istiyorum <Arrow /></a></div></div>}
    </main>
  );
}
