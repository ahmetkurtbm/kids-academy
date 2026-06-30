"use client";

import { FormEvent } from "react";

const WhatsAppIcon = () => <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a12.7 12.7 0 0 0-11 19l-2 7 7.2-1.9A12.8 12.8 0 1 0 16 3Zm0 22.8c-2 0-3.8-.5-5.4-1.5l-.4-.2-4.2 1.1 1.1-4.1-.3-.4A9.8 9.8 0 1 1 16 25.8Zm5.4-7.3c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.7-4-3.7-.3-.5.3-.5.9-1.7.1-.2.1-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.5c.2.2 2.4 3.7 5.9 5.2 2.2 1 3.1 1 4.2.8 1.3-.2 2.3-1 2.6-2 .3-.9.3-1.7.2-1.9-.1-.1-.3-.2-.6-.3Z"/></svg>;

export default function ContactWhatsAppForm() {
  function sendDetailedMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Merhaba Kids Academy, web sitenizden bilgi almak istiyorum.",
      "",
      `Veli: ${form.get("parentName")}`,
      `Çocuğun adı: ${form.get("childName")}`,
      `Çocuğun yaşı: ${form.get("childAge")}`,
      `Sınıfı: ${form.get("schoolClass") || "Belirtilmedi"}`,
      `İlgilenilen program: ${form.get("program")}`,
      `Not: ${form.get("note") || "Yok"}`,
    ].join("\n");
    window.open(`https://wa.me/905524150166?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <form className="contactForm" onSubmit={sendDetailedMessage}>
    <label>Veli adı soyadı<input name="parentName" required placeholder="Adınız ve soyadınız"/></label>
    <div className="two"><label>Çocuğun adı<input name="childName" required placeholder="Çocuğunuzun adı"/></label><label>Çocuğun yaşı<input name="childAge" required type="number" min="4" max="18" placeholder="Yaşı"/></label></div>
    <div className="two"><label>Sınıfı<input name="schoolClass" placeholder="Örn. 3. sınıf"/></label><label>İlgilenilen program<select name="program" required defaultValue=""><option value="" disabled>Program seçin</option><option>Ödev Takip</option><option>Konu Anlatımı</option><option>Jimnastik</option><option>Yaz Okulu</option><option>Atölye & Etkinlikler</option></select></label></div>
    <label>Eklemek istediğiniz not<textarea name="note" rows={3} placeholder="İhtiyacınızı kısaca yazabilirsiniz"/></label>
    <button type="submit"><WhatsAppIcon/> WhatsApp&apos;tan iletişime geç</button>
  </form>;
}
