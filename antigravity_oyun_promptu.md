# Görev: 5. Sınıf "Ay'ın Evreleri" Etkileşimli Web Oyunu (`index.html`)

Türkiye MEB 5. Sınıf Fen Bilimleri müfredatına %100 uyumlu, "Ay'ın Evreleri" konusunu öğreten, **GitHub üzerinden Vercel'de doğrudan statik olarak yayınlanacak**, telefon, tablet ve akıllı tahtalarla tam uyumlu, **sadece tek bir `index.html` dosyasından oluşan** (HTML5, CSS/Tailwind CDN ve Vanilla JavaScript bir arada) eğlenceli bir web oyunu kodla.

---

## 1. Mimari ve Yayınlama Kuralları (Sıfır Bağımlılık)
- **Tek Dosya (`index.html`):** Tüm HTML yapısı, CSS stilleri ve JavaScript oyun motoru tek bir `index.html` dosyası içinde yer almalıdır. Herhangi bir build işlemine (`npm`, `webpack` vb.) veya harici veritabanına ihtiyaç duymadan doğrudan tarayıcıda ve Vercel'de çalışmalıdır.
- **Sıfır Dış Görsel/Ses Linki:** Kırık link oluşmaması için dışarıdan PNG/JPG veya MP3 dosyası **KULLANMA**. Tüm gezegen/Ay çizimleri **SVG** ile, ses efektleri ise **Web Audio API** ile kod içinde üretilmelidir.

---

## 2. Mobil ve Tablet Uyumluluk Kuralları (Çok Önemli)
- **Mobile-First & Tam Ekran:** Oyun ekranı telefon ve tabletlerde kaydırma (scroll) gerektirmeyecek şekilde `100dvh` yüksekliğe duyarlı ve esnek (responsive) olmalıdır.
- **Dokunmatik Optimizasyonu:** Mobil cihazlarda sürükle-bırak (drag & drop) ekran kaymasına yol açtığı için tüm etkileşimler **"Tıkla-Seç / Tıkla-Yerleştir"** veya büyük dokunmatik kart butonları (en az `48x48px` dokunma alanı) ile yapılmalıdır.
- **Zoom Engelleme:** Butonlarda ve oyun alanında hızlı tıklamalarda ekranın yakınlaşmasını önlemek için `touch-action: manipulation` ve `user-select: none` kullanılmalıdır.

---

## 3. Görsel ve Bilimsel Doğruluk (5. Sınıf MEB Müfredatı)
Ay'ın 8 evresini (4 ana, 4 ara evre), Dünya'yı ve Güneş'i **SVG** kullanarak 5. sınıf öğrencisinin net anlayacağı şekilde %100 doğru çiz:
1. **Yeni Ay (Ana Evre):** Güneş ile Dünya arasındadır. Dünya'dan bakıldığında tamamen karanlık (koyu gri/siyah silüet) görünür.
2. **İlk Dördün (Ana Evre):** Ay'ın **SAĞ yarısı** aydınlık, sol yarısı karanlıktır (**D** harfi görünümü).
3. **Dolunay (Ana Evre):** Dünya, Güneş ile Ay arasındadır. Ay tamamen parlak ve aydınlık görünür.
4. **Son Dördün (Ana Evre):** Ay'ın **SOL yarısı** aydınlık, sağ yarısı karanlıktır (**Ters D** harfi görünümü).
5. **Hilal (Ara Evreler):** Ters C ve normal **C** harfi şeklinde ince aydınlık görünümler.
6. **Şişkin Ay (Ara Evreler):** İlk Dördün ile Dolunay arasında (sağ tarafı büyük oranda aydınlık) ve Dolunay ile Son Dördün arasında (sol tarafı büyük oranda aydınlık) görünümler.

---

## 4. Oyuncu Girişi ve Yerel Liderlik Tablosu (`localStorage`)
- **Giriş Ekranı:** Uzay temalı canlı bir karşılama ekranı olsun. Öğrenci **Adını/Takma Adını** metin kutusuna yazmadan "Oyuna Başla" butonu aktif olmasın.
- **Liderlik Tablosu (En İyi Astronotlar):** 
  - Hem giriş ekranında hem de oyun sonu ekranında yer alsın.
  - Veritabanı kullanmadan doğrudan tarayıcının `localStorage` hafızasına kaydedilsin (`oyuncuAdi`, `puan`, `sure`).
  - Sıralama önce **en yüksek puana**, puanlar eşitse **en kısa bitirme süresine** göre yapılsın.
  - İlk 3 sıradaki öğrencinin yanında 🥇, 🥈, 🥉 madalya ikonları görünsün ve son oynayan öğrencinin satırı parlak bir renkle vurgulansın.
  - Öğretmenin/kullanıcının yeni bir sınıfa veya gruba geçerken listeyi temizleyebilmesi için onay sorulu küçük bir **"Tabloyu Sıfırla"** butonu bulunsun.

---

## 5. Oyun Akışı ve Mekanikleri (Toplam 10 Soru)
Üst bilgi çubuğunda (HUD): **Oyuncu Adı**, **Puan**, **Kalan Can (3 Kalp ❤️❤️🤍)**, **Soru Sayacı (1/10)** ve **Geçen Süre (Saniye)** gösterilsin.

### Aşama 1: Yörünge Görevi (İlk 4 Soru)
- Ekranda Güneş ışınlarının geliş yönü, ortada Dünya ve Dünya etrafındaki yörüngede 1'den 8'e kadar numaralandırılmış Ay konumları SVG ile gösterilsin.
- Üstte görev belirtsin (Örn: *"Ay hangi konumdayken Dünya'dan İLK DÖRDÜN (D harfi) evresinde görünür? Yörüngedeki doğru numaraya dokun!"*).
- Öğrenci yörüngedeki doğru noktaya tıkladığında Ay o noktada parlasın.

### Aşama 2: Hızlı Evre ve Kazanım Avı (Son 6 Soru)
4 büyük dokunmatik şıklı (görselli veya metinli) sorular sorulsun:
- Dünya'dan görünümü SVG ile verilen evrenin adını bulma.
- *"Güneş ile Dünya arasına giren ve Dünya'dan karanlık görünen ana evre hangisidir?"* (Yeni Ay)
- *"Ay'ın iki ana evresi arasında geçen süre yaklaşık ne kadardır?"* (1 Hafta / 7 Gün)
- *"Yeni Ay evresinden yaklaşık 2 hafta sonra hangi ana evre görülür?"* (Dolunay)
- *"Dünya'dan bakıldığında 'Ters D' harfi gibi sol yarısı aydınlık görünen ana evre hangisidir?"* (Son Dördün)
- *"Ay'ın tüm evrelerinin tamamlanması (tam bir döngü) yaklaşık kaç gün sürer?"* (29,5 gün / 1 Ay)

### Puanlama ve Geri Bildirim
- **Doğru Cevap:** +100 temel puan + hız bonusu (soruyu ne kadar hızlı çözerse 1 ile 25 arası ekstra puan eklensin ki liderlik tablosunda eşitlik olmasın). Yeşil parlama efekti ve Web Audio API ile neşeli bir başarı sesi çalsın.
- **Yanlış Cevap:** 1 Kalp (❤️) eksilsin, hata sesi çalsın ve ekranda 2.5 saniyeliğine **öğretici kısa bir ipucu kutusu** belirdikten sonra (Örn: *"Unutma! İlk Dördün evresinde Ay'ın SAĞ tarafı aydınlıktır ve D harfine benzer."*) sıradaki soruya geçilsin.
- **Oyun Sonu:** 10 soru tamamlandığında veya 3 kalp bittiğinde sonuç ekranı açılsın, öğrencinin kazandığı unvan (*"Ay Uzmanı"*, *"Uzay Kaşifi"* vb.) gösterilsin, puanı otomatik olarak `localStorage` tablosuna işlensin ve **"Yeni Oyuncu ile Başla"** / **"Tekrar Oyna"** butonları sunulsun.

---

## 6. Çıktı Kuralı
Kodu hiçbir şekilde yarıda bırakma, `// ... diğer sorular` veya `// kodun devamı` gibi kısaltmalar **ASLA** yapma. Doğrudan kopyalayıp `index.html` olarak kaydettiğimde tüm SVG çizimleriyle, 10 sorusuyla ve skor tablosuyla eksiksiz çalışan tek parça kodu üret.