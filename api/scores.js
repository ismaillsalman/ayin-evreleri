const { PrismaClient } = require('@prisma/client');

// Serverless ortamda bağlantı havuzunu optimize etmek için singleton prisma örneği
let prisma;

function getPrismaClient() {
  if (!prisma) {
    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!global.__prisma) {
        global.__prisma = new PrismaClient();
      }
      prisma = global.__prisma;
    }
  }
  return prisma;
}

module.exports = async function handler(req, res) {
  // CORS başlıkları
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Veritabanı bağlantı adresi kontrolü
  if (!process.env.POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
    return res.status(503).json({
      success: false,
      error: 'Veritabanı bağlantı değişkeni (POSTGRES_PRISMA_URL) tanımlanmamış.',
      useFallback: true
    });
  }

  const db = getPrismaClient();

  try {
    // 1. GET: En yüksek puanlı ve en kısa süreli İLK 20 öğrenciyi getir
    if (req.method === 'GET') {
      const scores = await db.score.findMany({
        take: 20,
        orderBy: [
          { score: 'desc' },
          { time: 'asc' }
        ],
        select: {
          id: true,
          name: true,
          score: true,
          time: true,
          createdAt: true
        }
      });

      return res.status(200).json({
        success: true,
        count: scores.length,
        scores
      });
    }

    // 2. POST: Yeni öğrenci skorunu kaydet
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({ success: false, error: 'Geçersiz JSON verisi.' });
        }
      }

      const { name, score, time } = body || {};

      if (!name || typeof score !== 'number' || typeof time !== 'number') {
        return res.status(400).json({
          success: false,
          error: 'Eksik parametre. name, score ve time zorunludur.'
        });
      }

      // Veri temizliği ve sınırlandırma
      const cleanName = String(name).trim().slice(0, 30) || 'Anonim Astronot';
      const cleanScore = Math.max(0, Math.min(3000, Math.floor(score)));
      const cleanTime = Math.max(0, Math.floor(time));

      const newRecord = await db.score.create({
        data: {
          name: cleanName,
          score: cleanScore,
          time: cleanTime
        }
      });

      return res.status(201).json({
        success: true,
        score: newRecord
      });
    }

    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Prisma API Hatası:', error);
    return res.status(500).json({
      success: false,
      error: 'Veritabanı işleminde hata oluştu: ' + error.message,
      useFallback: true
    });
  }
};
