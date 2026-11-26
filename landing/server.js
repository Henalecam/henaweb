import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security and basic middlewares
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(morgan('tiny'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limit for API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

// Serve static files
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir, { extensions: ['html'] }));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
fs.mkdirSync(dataDir, { recursive: true });
const leadsJsonPath = path.join(dataDir, 'leads.json');
const leadsCsvPath = path.join(dataDir, 'leads.csv');

function sanitizeString(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\n\r\t]/g, ' ').trim();
}

function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

function toCsvRow(obj, headers) {
  return headers.map((h) => {
    const raw = obj[h] ?? '';
    const str = String(raw).replaceAll('"', '""');
    return `"${str}"`;
  }).join(',');
}

app.post('/api/leads', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      website,
      budget,
      plan,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content
    } = req.body || {};

    const lead = {
      id: nanoid(12),
      name: sanitizeString(name),
      email: sanitizeString(email).toLowerCase(),
      phone: sanitizeString(phone),
      company: sanitizeString(company),
      website: sanitizeString(website),
      budget: sanitizeString(budget),
      plan: sanitizeString(plan),
      message: sanitizeString(message),
      utm_source: sanitizeString(utm_source),
      utm_medium: sanitizeString(utm_medium),
      utm_campaign: sanitizeString(utm_campaign),
      utm_term: sanitizeString(utm_term),
      utm_content: sanitizeString(utm_content),
      user_agent: sanitizeString(req.headers['user-agent'] || ''),
      ip: req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || '',
      created_at: new Date().toISOString()
    };

    if (!lead.name || !lead.email) {
      return res.status(400).json({ success: false, error: 'Nome e e-mail são obrigatórios.' });
    }
    if (!isValidEmail(lead.email)) {
      return res.status(400).json({ success: false, error: 'E-mail inválido.' });
    }

    // Persist JSON
    let list = [];
    try {
      if (fs.existsSync(leadsJsonPath)) {
        const existing = fs.readFileSync(leadsJsonPath, 'utf-8');
        list = existing ? JSON.parse(existing) : [];
      }
    } catch (_) {
      list = [];
    }
    list.push(lead);
    fs.writeFileSync(leadsJsonPath, JSON.stringify(list, null, 2));

    // Persist CSV
    const headers = [
      'id','created_at','name','email','phone','company','website','budget','plan','message','utm_source','utm_medium','utm_campaign','utm_term','utm_content','user_agent','ip'
    ];
    const headerLine = headers.join(',');
    const row = toCsvRow(lead, headers);
    if (!fs.existsSync(leadsCsvPath)) {
      fs.writeFileSync(leadsCsvPath, headerLine + '\n' + row + '\n');
    } else {
      fs.appendFileSync(leadsCsvPath, row + '\n');
    }

    return res.json({ success: true, id: lead.id });
  } catch (error) {
    console.error('Lead capture error:', error);
    return res.status(500).json({ success: false, error: 'Erro interno. Tente novamente.' });
  }
});

// Fallback to index.html for any non-API route (SPA-like)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});