"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Subject={subject_name:string;correct_count:number;wrong_count:number;blank_count:number;review_topics?:string};
type Exam={id:string;title:string;exam_date:string;score:number;note?:string;exam_subjects:Subject[]};

function ProgressChart({ exams }: { exams: Exam[] }) {
  if (!exams.length) return <div className="emptyChart">Grafik için henüz sonuç bulunmuyor.</div>;
  const width=700,height=210,pad=30;
  const step=exams.length>1?(width-pad*2)/(exams.length-1):0;
  const points=exams.map((e,i)=>`${pad+i*step},${height-pad-(e.score/100)*(height-pad*2)}`).join(" ");
  return <div className="chartWrap"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Deneme puanlarının zaman içindeki gelişimi"><line x1={pad} y1={height-pad} x2={width-pad} y2={height-pad}/><line x1={pad} y1={pad} x2={pad} y2={height-pad}/>{[0,25,50,75,100].map(v=><g key={v}><line className="grid" x1={pad} y1={height-pad-(v/100)*(height-pad*2)} x2={width-pad} y2={height-pad-(v/100)*(height-pad*2)}/><text x="2" y={height-pad-(v/100)*(height-pad*2)+4}>{v}</text></g>)}<polyline points={points}/>{exams.map((e,i)=><g key={e.id}><circle cx={pad+i*step} cy={height-pad-(e.score/100)*(height-pad*2)} r="6"/><text className="scoreLabel" x={pad+i*step} y={height-pad-(e.score/100)*(height-pad*2)-12} textAnchor="middle">{e.score}</text></g>)}</svg><div className="chartDates">{exams.map(e=><span key={e.id}>{new Date(`${e.exam_date}T12:00:00`).toLocaleDateString("tr-TR",{day:"2-digit",month:"short"})}</span>)}</div></div>;
}

export default function ParentResults({ slug }: { slug:string }) {
  const [data,setData]=useState<{parent:{parent_name:string;student_name:string};exams:Exam[]}|null>(null);
  const [ready,setReady]=useState(false);
  const [error,setError]=useState("");
  const load=useCallback(async()=>{const r=await fetch(`/api/veli/results?slug=${encodeURIComponent(slug)}`,{cache:"no-store"});if(r.status===401){setData(null);setReady(true);return}const j=await r.json();if(!r.ok)setError(j.error);else setData(j);setReady(true)},[slug]);
  useEffect(()=>{load()},[load]);
  async function login(e:FormEvent<HTMLFormElement>){e.preventDefault();setError("");const f=new FormData(e.currentTarget);const r=await fetch("/api/veli/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({slug,password:f.get("password")})});const j=await r.json();if(!r.ok)return setError(j.error);await load()}

  if(!ready)return <main className="portalCenter">Yükleniyor…</main>;
  if(!data)return <main className="portalCenter parentWelcome"><form className="loginCard" onSubmit={login}><a className="portalLogo" href="/">KA <b>Kids Academy</b></a><span>VELİ SONUÇ SİSTEMİ</span><h1>Sonuçlarınız güvende.</h1><p><b>{slug}</b> hesabı için kurumumuzun verdiği şifreyi girin.</p><label>Şifre<input name="password" type="password" required autoFocus /></label><button>Sonuçları görüntüle →</button>{error&&<div className="formMessage error">{error}</div>}<a className="backHome" href="/veli">← Kullanıcı adını değiştir</a></form></main>;

  const exams=[...data.exams].sort((a,b)=>a.exam_date.localeCompare(b.exam_date));
  const latest=exams[exams.length-1];
  const previous=exams[exams.length-2];
  const average=exams.length?exams.reduce((sum,e)=>sum+Number(e.score),0)/exams.length:0;
  const highest=exams.length?Math.max(...exams.map(e=>Number(e.score))):0;
  const change=latest&&previous?Number(latest.score)-Number(previous.score):null;

  return <main className="resultsPage"><header className="resultsNav"><a className="portalLogo" href="/">KA <b>Kids Academy</b></a><div><span>{data.parent.student_name}</span><button onClick={async()=>{await fetch("/api/veli/logout",{method:"POST"});location.reload()}}>Çıkış</button></div></header><div className="resultsShell">
    <section className="resultHero"><div><small>VELİ SONUÇ SİSTEMİ</small><h1>Merhaba, {data.parent.parent_name}.</h1><p>{data.parent.student_name}&apos;ın deneme gelişimini, ders performansını ve çalışılması gereken konuları burada görebilirsiniz.</p></div></section>

    <section className="resultMetrics"><article><small>SON PUAN</small><b>{latest?.score??"—"}</b><span>{latest?latest.title:"Sonuç bekleniyor"}</span></article><article><small>EN YÜKSEK</small><b>{exams.length?highest.toFixed(0):"—"}</b><span>Kişisel en iyi puan</span></article><article><small>ORTALAMA</small><b>{exams.length?average.toFixed(1):"—"}</b><span>{exams.length} deneme ortalaması</span></article><article className={change!==null&&change>=0?"positiveMetric":""}><small>SON DEĞİŞİM</small><b>{change===null?"—":`${change>=0?"+":""}${change.toFixed(1)}`}</b><span>{change===null?"İki sonuç sonrası hesaplanır":change>=0?"Yükseliş devam ediyor":"Birlikte toparlayabiliriz"}</span></article></section>

    {latest&&latest.exam_subjects.length>0&&<section className="subjectOverview"><div className="resultSectionHead"><div><small>SON DENEME ANALİZİ</small><h2>Derslere göre görünüm</h2></div><span>{latest.title}</span></div><div className="subjectOverviewGrid">{latest.exam_subjects.map(subject=>{const total=subject.correct_count+subject.wrong_count+subject.blank_count;const rate=total?Math.round(subject.correct_count/total*100):0;return <article key={subject.subject_name}><div><b>{subject.subject_name}</b><strong>%{rate}</strong></div><div className="subjectProgress"><i style={{width:`${rate}%`}}/></div><p><span>{subject.correct_count} doğru</span><span>{subject.wrong_count} yanlış</span><span>{subject.blank_count} boş</span></p>{subject.review_topics&&<small><b>Çalışılacak:</b> {subject.review_topics}</small>}</article>})}</div></section>}

    <section className="progressCard"><div className="resultSectionHead"><div><small>GELİŞİM</small><h2>Zaman içindeki ilerleme</h2></div><span>{exams.length} deneme</span></div><ProgressChart exams={exams}/></section>

    <section className="examResults"><div className="resultSectionHead"><div><small>DENEMELER</small><h2>Tüm sonuçlar</h2></div></div>{[...exams].reverse().map(exam=><article className="examCard" key={exam.id}><div className="examTop"><div><time>{new Date(`${exam.exam_date}T12:00:00`).toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"})}</time><h3>{exam.title}</h3></div><strong>{exam.score}<small>/100</small></strong></div><div className="subjectTable"><div className="subjectResultHeader"><span>Ders</span><span>Doğru</span><span>Yanlış</span><span>Boş</span><span>Çalışılacak konular</span></div>{exam.exam_subjects.map(s=><div className="subjectResultRow" key={s.subject_name}><b>{s.subject_name}</b><span className="correct">{s.correct_count}D</span><span className="wrong">{s.wrong_count}Y</span><span>{s.blank_count}B</span><p>{s.review_topics||"—"}</p></div>)}</div>{exam.note&&<div className="teacherNote"><b>Öğretmen notu</b><p>{exam.note}</p></div>}</article>)}{!exams.length&&<div className="noResults">Henüz yayınlanmış bir deneme sonucu yok.</div>}</section>
  </div></main>;
}
