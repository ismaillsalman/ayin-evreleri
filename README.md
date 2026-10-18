# 🌔 Ay'ın Evreleri - 5. Sınıf Fen Bilimleri Web Oyunu

MEB 5. Sınıf müfredatına %100 uyumlu, 15 soruluk etkileşimli "Ay'ın Evreleri" oyunu ve Vercel Postgres + Prisma tabanlı canlı İlk 20 Liderlik Tablosu.

---

## 🚀 Vercel & Veritabanı Kurulum Kılavuzu

### 1. Projeyi GitHub'a Yükleyin
```bash
git init
git add .
git commit -m "Ay'ın Evreleri Oyunu ve Prisma API"
git branch -M main
git remote add origin <GITHUB_REPO_LINKINIZ>
git push -u origin main
```

### 2. Vercel'e Dağıtın (Deploy)
1. [Vercel](https://vercel.com) hesabınıza giriş yapın.
2. **"Add New..." ➔ "Project"** butonuna tıklayın ve GitHub deponuzu seçip **Deploy** deyin.

### 3. Vercel Postgres Veritabanını Oluşturun (1 Dakika)
1. Vercel Dashboard'da projenizin içine girin.
2. Üst menüden **Storage** sekmesine tıklayın.
3. **"Create Database" ➔ "Postgres" (Neon)** seçeneğini seçin ve oluşturun.
4. Açılan sayfada **.env.local** sekmesindeki değişkenleri kopyalayabilir veya projenize doğrudan bağlayabilirsiniz (Vercel `POSTGRES_PRISMA_URL` ve `POSTGRES_URL_NON_POOLING` değişkenlerini projenize otomatik ekler).

### 4. Veritabanı Tablosunu Oluşturun
Bilgisayarınızda projenin olduğu terminalde veritabanı şemasını senkronize etmek için şu komutu çalıştırın:
```bash
npx prisma db push
```
*(Eğer yerelde çalıştırmak isterseniz Vercel'den aldığınız bağlantı linkini `.env` dosyası oluşturup içine yapıştırarak `npx prisma db push` yapabilirsiniz).*

---

## 🎮 Özellikler
- **15 Soru (4 Yörünge, 6 Ana Evre / Kazanım, 4 Ara Evre, 1 Genel Kazanım)**
- **Prisma & Vercel Serverless API (`/api/scores`):** En yüksek puanlı ve en kısa süreli ilk 20 öğrenciyi anlık gösterir.
- **Offline Fallback:** İnternet veya veritabanı bağlantısı olmasa bile `localStorage` üzerinden oyun kesintisiz çalışmaya devam eder.
- **Süre Muafiyeti:** Yanlış cevap verildiğinde 7 saniyelik öğretici ipucu okunurken oyun sayacı duraklatılır ve öğrencinin süresine eklenmez.
