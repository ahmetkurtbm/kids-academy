"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Parent = { id: string; slug: string; parent_name: string; student_name: string; active: boolean };
type Subject = { id?: string; subject_name: string; correct_count: number; wrong_count: number; blank_count: number; review_topics?: string };
type Exam = { id: string; parent_id: string; title: string; exam_date: string; score: number; note?: string; exam_subjects: Subject[] };
type EventItem = { id: string; title: string; event_date: string; summary: string; details?: string; image_path?: string; image_url?: string; published: boolean };
const subjectNames = ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilgiler", "İngilizce"];
const emptySubjects = () => subjectNames.map((name) => ({ name, correct: 0, wrong: 0, blank: 0, topics: "" }));

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [parents, setParents] = useState<Parent[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [message, setMessage] = useState("");
  const [subjects, setSubjects] = useState(emptySubjects);
  const [savingEvent, setSavingEvent] = useState(false);

  const load = useCallback(async () => {
    const response = await fetch("/api/admin/data", { cache: "no-store" });
    if (response.status === 401) { setLoggedIn(false); setReady(true); return; }
    const data = await response.json();
    if (!response.ok) { setMessage(data.error); setReady(true); return; }
    setParents(data.parents || []); setExams(data.exams || []); setEvents(data.events || []); if (data.eventSetupRequired) setMessage("Etkinlik özelliğini açmak için Supabase SQL Editor'da 20260630_add_events.sql dosyasını çalıştırın."); setLoggedIn(true); setReady(true);
  }, []);
  useEffect(() => { load(); }, [load]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: form.get("password") }) });
    const data = await response.json();
    if (!response.ok) return setMessage(data.error);
    await load();
  }

  async function createParent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); const formElement = event.currentTarget; const form = new FormData(formElement);
    const response = await fetch("/api/admin/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "parent", parentName: form.get("parentName"), studentName: form.get("studentName"), slug: form.get("slug"), password: form.get("password") }) });
    const data = await response.json(); if (!response.ok) return setMessage(data.error);
    formElement.reset(); setMessage("Veli hesabı oluşturuldu."); await load();
  }

  async function createExam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); const formElement = event.currentTarget; const form = new FormData(formElement);
    const response = await fetch("/api/admin/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: "exam", parentId: form.get("parentId"), title: form.get("title"), examDate: form.get("examDate"), score: Number(form.get("score")), note: form.get("note"), subjects }) });
    const data = await response.json(); if (!response.ok) return setMessage(data.error);
    formElement.reset(); setSubjects(emptySubjects()); setMessage("Deneme sonucu kaydedildi."); await load();
  }

  async function createEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage(""); setSavingEvent(true);
    const formElement = event.currentTarget;
    try {
      const response = await fetch("/api/admin/events", { method: "POST", body: new FormData(formElement) });
      const data = await response.json();
      if (!response.ok) return setMessage(data.error);
      formElement.reset(); setMessage("Etkinlik yayınlandı."); await load();
    } finally { setSavingEvent(false); }
  }

  async function removeEvent(id: string) {
    if (!confirm("Bu etkinlik ve fotoğrafı silinsin mi?")) return;
    const response = await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    const data = await response.json(); if (!response.ok) return setMessage(data.error); setMessage("Etkinlik silindi."); await load();
  }

  async function remove(type: "exam" | "parent", id: string) {
    if (!confirm(type === "exam" ? "Bu deneme silinsin mi?" : "Veli ve tüm sonuçları silinsin mi?")) return;
    const response = await fetch("/api/admin/data", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, id }) });
    const data = await response.json(); if (!response.ok) return setMessage(data.error); await load();
  }

  if (!ready) return <main className="portalCenter"><p>Yükleniyor…</p></main>;
  if (!loggedIn) return <main className="portalCenter"><form className="loginCard" onSubmit={login}><a className="portalLogo" href="/">KA <b>Kids Academy</b></a><span>YÖNETİM PANELİ</span><h1>Hoş geldiniz.</h1><p>İçerikleri yönetmek için admin şifrenizi girin.</p><label>Admin şifresi<input name="password" type="password" required autoFocus /></label><button>Panele giriş yap →</button>{message && <div className="formMessage error">{message}</div>}</form></main>;

  return <main className="adminShell">
    <aside className="adminSidebar"><a className="portalLogo inversePortal" href="/">KA <b>Kids Academy</b></a><nav><a href="#overview">Genel Bakış</a><a href="#events">Etkinlikler</a><a href="#new-exam">Deneme Girişi</a><a href="#parents">Veli Hesapları</a></nav><button onClick={async()=>{await fetch("/api/admin/logout",{method:"POST"});location.reload();}}>Çıkış yap</button></aside>
    <div className="adminMain"><header><div><small>YÖNETİM PANELİ</small><h1>Merhaba 👋</h1></div><a href="/" target="_blank">Siteyi görüntüle ↗</a></header>{message && <div className="formMessage">{message}</div>}
      <section id="overview" className="stats statsFour"><article><small>VELİ HESABI</small><b>{parents.length}</b></article><article><small>TOPLAM DENEME</small><b>{exams.length}</b></article><article><small>ETKİNLİK</small><b>{events.length}</b></article><article><small>SON DENEME</small><b className="smallStat">{exams[0]?.exam_date ? new Date(exams[0].exam_date).toLocaleDateString("tr-TR") : "—"}</b></article></section>
      <section id="events" className="adminColumns eventAdminColumns"><div className="adminCard"><div className="cardHead"><div><small>ETKİNLİK YAYINLA</small><h2>Yeni etkinlik ekle</h2></div></div><form className="adminForm" onSubmit={createEvent}><label>Etkinlik başlığı<input name="title" required placeholder="Örn. Renkli Bilim Atölyesi" /></label><label>Etkinlik tarihi<input name="eventDate" type="date" required /></label><label>Kısa açıklama<textarea name="summary" rows={2} required maxLength={220} placeholder="Ana sayfada görünecek kısa açıklama" /></label><label>Detaylar<textarea name="details" rows={4} placeholder="Etkinliğin içeriği, kazanımları ve diğer bilgiler" /></label><label>Etkinlik fotoğrafı<input className="fileInput" name="image" type="file" accept="image/jpeg,image/png,image/webp" /><small>JPG, PNG veya WebP · En fazla 4 MB</small></label><button className="adminPrimary" disabled={savingEvent}>{savingEvent ? "Yükleniyor…" : "Etkinliği yayınla →"}</button></form></div>
        <div className="adminCard"><div className="cardHead"><div><small>YAYINDAKİ ETKİNLİKLER</small><h2>Son etkinlikler</h2></div></div><div className="eventAdminList">{events.length===0?<div className="adminEmpty"><b>Henüz etkinlik yok.</b><span>İlk etkinliğinizi soldaki formdan yayınlayın.</span></div>:events.map(item=><article key={item.id}>{item.image_url?<img src={item.image_url} alt="" />:<div className="eventPlaceholder">✦</div>}<div><time>{new Date(item.event_date).toLocaleDateString("tr-TR")}</time><b>{item.title}</b><span>{item.summary}</span></div><button onClick={()=>removeEvent(item.id)}>Sil</button></article>)}</div></div>
      </section>
      <section id="new-exam" className="adminCard"><div className="cardHead"><div><small>DENEME SONUCU</small><h2>Yeni sonuç ekle</h2></div><p>Her ders için doğru, yanlış, boş ve çalışılması gereken konuları yazın.</p></div>
        <form onSubmit={createExam} className="adminForm"><div className="formGrid four"><label>Öğrenci<select name="parentId" required defaultValue=""><option value="" disabled>Öğrenci seçin</option>{parents.map(p=><option key={p.id} value={p.id}>{p.student_name} · {p.slug}</option>)}</select></label><label>Deneme adı<input name="title" required placeholder="Türkiye Geneli Deneme 3" /></label><label>Tarih<input name="examDate" type="date" required /></label><label>Puan (0–100)<input name="score" type="number" min="0" max="100" step="0.01" required /></label></div>
          <div className="subjectEditor"><div className="subjectHeader"><span>Ders</span><span>Doğru</span><span>Yanlış</span><span>Boş</span><span>Yanlış / boş bırakılan konular</span></div>{subjects.map((s,i)=><div className="subjectRow" key={s.name}><b>{s.name}</b><input aria-label={`${s.name} doğru`} type="number" min="0" value={s.correct} onChange={e=>setSubjects(v=>v.map((x,j)=>j===i?{...x,correct:Number(e.target.value)}:x))}/><input aria-label={`${s.name} yanlış`} type="number" min="0" value={s.wrong} onChange={e=>setSubjects(v=>v.map((x,j)=>j===i?{...x,wrong:Number(e.target.value)}:x))}/><input aria-label={`${s.name} boş`} type="number" min="0" value={s.blank} onChange={e=>setSubjects(v=>v.map((x,j)=>j===i?{...x,blank:Number(e.target.value)}:x))}/><input aria-label={`${s.name} konular`} placeholder="Örn. Sözcükte anlam, yazım kuralları" value={s.topics} onChange={e=>setSubjects(v=>v.map((x,j)=>j===i?{...x,topics:e.target.value}:x))}/></div>)}</div>
          <label>Genel öğretmen notu<textarea name="note" rows={3} placeholder="İsteğe bağlı kısa değerlendirme" /></label><button className="adminPrimary">Sonucu kaydet →</button>
        </form>
      </section>
      <section id="parents" className="adminColumns"><div className="adminCard"><div className="cardHead"><div><small>VELİ HESABI</small><h2>Yeni hesap oluştur</h2></div></div><form className="adminForm" onSubmit={createParent}><label>Veli adı<input name="parentName" required placeholder="Ahmet Kurt" /></label><label>Öğrenci adı<input name="studentName" required placeholder="Ece Kurt" /></label><label>Sayfa adresi<input name="slug" required placeholder="ahmetkurt" /></label><label>Veli şifresi<input name="password" required minLength={6} placeholder="En az 6 karakter" /></label><button className="adminPrimary">Hesabı oluştur →</button></form></div>
        <div className="adminCard"><div className="cardHead"><div><small>AKTİF HESAPLAR</small><h2>Veliler</h2></div></div><div className="accountList">{parents.length===0?<p>Henüz veli hesabı yok.</p>:parents.map(p=><article key={p.id}><div><b>{p.student_name}</b><span>{p.parent_name} · /veli/{p.slug}</span></div><button onClick={()=>remove("parent",p.id)}>Sil</button></article>)}</div></div>
      </section>
      <section className="adminCard"><div className="cardHead"><div><small>KAYITLAR</small><h2>Son denemeler</h2></div></div><div className="examAdminList">{exams.map(e=><article key={e.id}><div><b>{e.title}</b><span>{parents.find(p=>p.id===e.parent_id)?.student_name} · {new Date(e.exam_date).toLocaleDateString("tr-TR")}</span></div><strong>{e.score}</strong><button onClick={()=>remove("exam",e.id)}>Sil</button></article>)}</div></section>
    </div>
  </main>;
}
