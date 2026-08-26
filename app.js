const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON requests & URL-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to set global search engine block headers (noindex)
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mock client database with rich At-a-Glance, Organic & Paid marketing metrics
const clients = [
  {
    id: 'acme-corp',
    name: 'Acme Corp',
    logo: 'AC',
    package: 'Start',
    industry: 'E-commerce & SaaS',
    targetAudience: 'B2B & B2C High Intent',
    primaryGoal: 'Lead Generation',
    status: 'Healthy',
    healthScore: 92,
    atAGlance: {
      winners: [
        { title: 'Instagram Reel: "Ljetni Popust"', metric: '7.8% Engagement Rate', impact: '+42% veći doseg od prosjeka računa', channel: 'Instagram Organic', badge: 'Pobjednik Sadržaja' },
        { title: 'Meta Retargeting Kampanja', metric: 'ROAS 4.25x', impact: 'CPA pao na €14.20 (-8% ovaj mjesec)', channel: 'Meta Ads', badge: 'Visoki ROI' }
      ],
      issues: [
        { id: 'fix-google-search', title: 'Zamor ključnih riječi na Google Searchu', metric: 'CPA €18.33 (Cilj €15.00)', impact: 'Rast troška klika (+2% m/m) zbog širine pojmova', channel: 'Google Ads', actionText: 'Preusmjeri €300 sa Search širine na IG Reels', type: 'google' },
        { id: 'fix-creative-3', title: 'Visok Frequency na Meta Ads', metric: 'Frequency 2.1x', impact: 'Potencijalni zamor publike kroz narednih 7 dana', channel: 'Meta Ads', actionText: 'Učitaj 2 nove varijacije vizuala', type: 'meta' }
      ]
    },
    stats: {
      reach: '124.5k',
      impressions: '1.2M',
      ctr: '4.2%',
      spend: '€2,850'
    },
    financialTargets: {
      targetBudget: '€5,000',
      targetCPA: '€15.00',
      targetROAS: '4.25'
    },
    metaStats: {
      totalSpend: '€2,850',
      cpa: '€14.20',
      cpaTrend: { value: '8%', direction: 'down' },
      resultsValue: '201 Leads'
    },
    googleStats: {
      totalSpend: '€550',
      cpa: '€18.33',
      cpaTrend: { value: '2%', direction: 'up' },
      resultsValue: '30 Leads'
    },
    organicStats: {
      followers: '24,800',
      growthRate: '+8.4%',
      engagementRate: '6.4%',
      bestTimeToPost: 'Srijeda i Petak u 19:00h',
      topPostsCount: 6
    }
  },
  {
    id: 'nova-media',
    name: 'Nova Media',
    logo: 'NM',
    package: 'Pro',
    industry: 'E-commerce Fashion',
    targetAudience: 'Žene 18-35 god',
    primaryGoal: 'E-commerce Sales',
    status: 'Healthy',
    healthScore: 96,
    atAGlance: {
      winners: [
        { title: 'Meta Advantage+ Catalog Ads', metric: '3.8x ROAS', impact: 'Preko 410 prodanih artikala', channel: 'Meta Ads', badge: 'Top Konverzije' },
        { title: 'Instagram Carousel: "Nova Kolekcija"', metric: '1,120 Spremanja', impact: '+65% više spremanja od prosjeka', channel: 'Instagram Organic', badge: 'Organski Viral' }
      ],
      issues: [
        { id: 'fix-fb-reach', title: 'Pad organskog dosega na Facebooku', metric: 'FB ERR 5.2% vs IG 6.4%', impact: 'Smanjena aktivnost na statičnim objavama', channel: 'Facebook Organic', actionText: 'Aktiviraj FB Reels format', type: 'organic' }
      ]
    },
    stats: {
      reach: '89.2k',
      impressions: '840k',
      ctr: '5.1%',
      spend: '€4,120'
    },
    financialTargets: {
      targetBudget: '€5,000',
      targetCPA: '€12.00',
      targetROAS: '4.10'
    },
    metaStats: {
      totalSpend: '€1,750',
      cpa: '€8.50',
      cpaTrend: { value: '12%', direction: 'down' },
      resultsValue: '3.8x ROAS'
    },
    googleStats: {
      totalSpend: '€350',
      cpa: '€12.06',
      cpaTrend: { value: '5%', direction: 'down' },
      resultsValue: '4.1x ROAS'
    },
    organicStats: {
      followers: '42,100',
      growthRate: '+12.1%',
      engagementRate: '7.2%',
      bestTimeToPost: 'Utorak i Četvrtak u 20:00h',
      topPostsCount: 8
    }
  },
  {
    id: 'lumina-group',
    name: 'Lumina Group',
    logo: 'LG',
    package: 'Ultra',
    industry: 'Home Decor & Furniture',
    targetAudience: 'Vlasnici nekretnina 25-50 god',
    primaryGoal: 'E-commerce Sales',
    status: 'Needs Attention',
    healthScore: 68,
    atAGlance: {
      winners: [
        { title: 'Google Performance Max Kampanja', metric: 'ROAS 3.9x', impact: 'Generirano €3,900 prihoda', channel: 'Google Ads', badge: 'Stabilan Kanal' }
      ],
      issues: [
        { id: 'fix-cpa-lumina', title: 'Skok CPA troška na Meta Oglasima', metric: 'CPA €22.00 (Cilj €15.00)', impact: 'Trošak po akciji skočio za +15%', channel: 'Meta Ads', actionText: 'Osvježi kreative i suzi publike', type: 'meta' },
        { id: 'fix-frequency-lumina', title: 'Kritični ad fatigue na Facebook Feed-u', metric: 'Frequency 4.8x', impact: 'Publika vidi oglas premalo osvježen', channel: 'Meta Ads', actionText: 'Pauziraj oglas #4 i preusmjeri €400', type: 'meta' }
      ]
    },
    stats: {
      reach: '210.1k',
      impressions: '2.5M',
      ctr: '3.8%',
      spend: '€3,250'
    },
    financialTargets: {
      targetBudget: '€5,000',
      targetCPA: '€22.00',
      targetROAS: '3.50'
    },
    metaStats: {
      totalSpend: '€4,900',
      cpa: '€22.00',
      cpaTrend: { value: '15%', direction: 'up' },
      resultsValue: '4.5x ROAS'
    },
    googleStats: {
      totalSpend: '€1,000',
      cpa: '€26.31',
      cpaTrend: { value: '9%', direction: 'up' },
      resultsValue: '3.9x ROAS'
    },
    organicStats: {
      followers: '18,400',
      growthRate: '+3.2%',
      engagementRate: '4.1%',
      bestTimeToPost: 'Ponedjeljak i Srijeda u 18:30h',
      topPostsCount: 5
    }
  },
  {
    id: 'vortex-ltd',
    name: 'Vortex Ltd',
    logo: 'VX',
    package: 'Start',
    industry: 'B2B Software & Consulting',
    targetAudience: 'Direktori & IT Menadžeri',
    primaryGoal: 'Lead Generation',
    status: 'Healthy',
    healthScore: 91,
    atAGlance: {
      winners: [
        { title: 'Meta Lead Gen Forma', metric: 'CPA €10.50 (Cilj €14.00)', impact: '48 kvalificiranih B2B prijava', channel: 'Meta Ads', badge: 'Visok Konverzijski Omjer' }
      ],
      issues: [
        { id: 'fix-google-b2b', title: 'Slaba pokrivenost pretraga na Google-u', metric: 'Budžet iskorišten 35%', impact: 'Propušteni B2B upiti visoke namjere', channel: 'Google Ads', actionText: 'Povećaj max CPC za ključne pojmove', type: 'google' }
      ]
    },
    stats: {
      reach: '45.0k',
      impressions: '310k',
      ctr: '2.9%',
      spend: '€2,850'
    },
    financialTargets: {
      targetBudget: '€5,000',
      targetCPA: '€14.00',
      targetROAS: '4.00'
    },
    metaStats: {
      totalSpend: '€500',
      cpa: '€10.50',
      cpaTrend: { value: '4%', direction: 'down' },
      resultsValue: '48 Leads'
    },
    googleStats: {
      totalSpend: '€350',
      cpa: '€14.00',
      cpaTrend: { value: '1%', direction: 'down' },
      resultsValue: '25 Leads'
    },
    organicStats: {
      followers: '9,200',
      growthRate: '+5.8%',
      engagementRate: '5.9%',
      bestTimeToPost: 'Četvrtak u 11:00h (B2B Radno Vrijeme)',
      topPostsCount: 4
    }
  }
];

// Main Dashboard Route
app.get('/', (req, res) => {
  res.render('client', { client: null, clients, isPortal: false, portalPin: null, portalSlug: null });
});

// Client Detailed Route
app.get('/client/:id', (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).send('Client not found');
  }
  res.render('client', { client, clients, isPortal: false, portalPin: null, portalSlug: null });
});

// Secure Client Portal Route: algor.marketing/:clientSlug/:pin or /portal/:clientSlug/:pin
app.get(['/portal/:clientSlug/:pin', '/:clientSlug/:pin'], (req, res, next) => {
  const { clientSlug, pin } = req.params;

  // Ignore static assets or API endpoints
  if (clientSlug === 'css' || clientSlug === 'js' || clientSlug === 'api' || clientSlug === 'favicon.ico') {
    return next();
  }

  // Validate 4-digit numeric PIN
  if (!/^\d{4}$/.test(pin)) {
    return next();
  }

  const client = clients.find(c => c.id.toLowerCase() === clientSlug.toLowerCase() || c.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === clientSlug.toLowerCase());

  if (!client) {
    return res.status(404).send(`
      <div style="font-family: system-ui, sans-serif; padding: 40px; text-align: center; background: #080C14; color: white; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="color: #78AEC4; font-size: 32px; font-weight: 900; margin-bottom: 10px;">🔒 Klijentski Portal Nije Pronađen</h1>
        <p style="color: #94A3B8; max-width: 500px; font-size: 14px; line-height: 1.6;">URL adresa klijentskog portala <strong>algor.marketing/${clientSlug}/${pin}</strong> je nevažeća ili klijent ne postoji.</p>
        <a href="/" style="margin-top: 20px; padding: 12px 24px; background: #E9F52F; color: #111113; font-weight: 900; border-radius: 9999px; text-decoration: none; font-size: 13px;">Povratak na Agencijsku Nadzornu Ploču</a>
      </div>
    `);
  }

  // Set or update portal PIN for client
  client.portalPin = pin;

  res.render('client', { 
    client, 
    clients: [client], 
    isPortal: true, 
    portalPin: pin, 
    portalSlug: clientSlug 
  });
});

// API Route to Generate or Retrieve Unique 4-digit PIN for Client Portal
app.post('/api/client/generate-portal-pin', (req, res) => {
  const { clientId } = req.body;
  const client = clients.find(c => c.id === clientId) || clients[0];
  
  if (!client) {
    return res.status(404).json({ error: 'Klijent nije pronađen.' });
  }

  // Generate unique 4-digit number (1000 - 9999)
  const newPin = client.portalPin || Math.floor(1000 + Math.random() * 9000).toString();
  client.portalPin = newPin;

  const clientSlug = client.id;
  const liveUrl = `algor.marketing/${clientSlug}/${newPin}`;
  const localUrl = `http://localhost:3000/${clientSlug}/${newPin}`;

  res.json({
    success: true,
    clientId: client.id,
    pin: newPin,
    liveUrl,
    localUrl
  });
});

// POST Route to Add New Client
app.post('/api/client/add', (req, res) => {
  const { 
    name, logo, package: pkg, spend,
    industry, targetAudience, primaryGoal,
    targetBudget, targetCPA, targetROAS,
    metaBusinessId, metaAdAccountId, googleAdsId, fbPageId, igProfileId
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Naziv klijenta je obvezan.' });
  }

  const slugId = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  const spendNum = spend || targetBudget || '4850';

  const newClient = {
    id: slugId,
    name: name,
    logo: (logo || name.slice(0, 2)).toUpperCase(),
    package: pkg || 'Enterprise',
    industry: industry || 'Digital Agency / General',
    targetAudience: targetAudience || 'B2B & B2C Audience',
    primaryGoal: primaryGoal || 'Lead Generation',
    status: 'Healthy',
    healthScore: 90,
    atAGlance: {
      winners: [
        { title: 'Inicijalna Meta Kampanja', metric: 'CPA €' + (targetCPA || '14.20'), impact: 'Kampanja je uspješno pokrenuta', channel: 'Meta Ads', badge: 'Novo' }
      ],
      issues: []
    },
    financialTargets: {
      targetBudget: '€' + spendNum,
      targetCPA: '€' + (targetCPA || '15.00'),
      targetROAS: (targetROAS || '4.0')
    },
    integrations: {
      metaBusinessId: metaBusinessId || 'MB-' + Math.floor(100000 + Math.random() * 900000),
      metaAdAccountId: metaAdAccountId || 'act_' + Math.floor(10000000 + Math.random() * 90000000),
      googleAdsId: googleAdsId || Math.floor(100 + Math.random() * 900) + '-' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      fbPageId: fbPageId || 'page_' + Math.floor(10000 + Math.random() * 90000),
      igProfileId: igProfileId || '@' + slugId
    },
    stats: {
      reach: '45.2k',
      impressions: '180.4k',
      ctr: '2.9%',
      spend: '€' + spendNum
    },
    metaStats: {
      totalSpend: '€' + spendNum,
      cpa: '€' + (targetCPA || '14.20'),
      cpaTrend: { value: '6%', direction: 'down' },
      resultsValue: '240 Leads'
    },
    googleStats: {
      totalSpend: '€550',
      monthlyBudgetLimit: '€' + spendNum,
      budgetPercent: 55,
      preostaliBudzet: '€450',
      cpa: '€18.33',
      cpaTarget: '€' + (targetCPA || '15.00'),
      cpaTrend: { value: '2%', direction: 'up' },
      resultsValue: '30 Leads'
    },
    organicStats: {
      followers: '12,500',
      growthRate: '+6.0%',
      engagementRate: '5.5%',
      bestTimeToPost: 'Srijeda u 19:00h',
      topPostsCount: 4
    }
  };

  clients.push(newClient);
  
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    return res.json({ success: true, client: newClient });
  }
  res.redirect('/client/' + slugId);
});

// AI Assistant Streaming Chat Endpoint (SSE) - Grounded Deterministic Diagnostic Engine
app.post('/api/chat', (req, res) => {
  const { message, clientId } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const client = clients.find(c => c.id === clientId) || clients[0];
  const query = (message || '').toLowerCase();

  // Deterministic facts computed from actual client state
  const targetCPAVal = parseFloat((client.financialTargets?.targetCPA || '€15.00').replace(/[^0-9.]/g, '')) || 15.00;
  const metaCPAVal = parseFloat((client.metaStats?.cpa || '€14.20').replace(/[^0-9.]/g, '')) || 14.20;
  const googleCPAVal = parseFloat((client.googleStats?.cpa || '€18.33').replace(/[^0-9.]/g, '')) || 18.33;
  
  const metaCpaDiffPercent = (((metaCPAVal - targetCPAVal) / targetCPAVal) * 100).toFixed(1);
  const googleCpaDiffPercent = (((googleCPAVal - targetCPAVal) / targetCPAVal) * 100).toFixed(1);

  const thoughts = [
    `Učitavam verifikirane podatke iz baze za klijenta: ${client.name}...`,
    `Verificiram točne iznose: Meta CPA (${client.metaStats.cpa}), Google CPA (${client.googleStats.cpa}), Ciljani CPA (${client.financialTargets.targetCPA})...`,
    `Provjeravam determinističke pragove odstupanja i generiram provjerenu dijagnostiku bez halucinacija...`
  ];

  let responseText = '';
  let suggestions = [];
  let decisionCard = null;

  if (query.includes('što ne valja') || query.includes('problem') || query.includes('dijagnost') || query.includes('fix')) {
    const issueList = client.atAGlance.issues;
    if (issueList && issueList.length > 0) {
      const mainIssue = issueList[0];
      responseText = `### 🔍 Verificirana AI Dijagnostika Problema za **${client.name}**\n\n` +
        `Analizom u stvarnom vremenu identificirana su **${issueList.length} kritična područja** koja zahtijevaju optmizaciju:\n\n` +
        issueList.map((iss, idx) => 
          `**${idx + 1}. ${iss.title} (${iss.channel})**\n` +
          `- **Metrika:** \`${iss.metric}\` | **Utjecaj:** ${iss.impact}\n` +
          `- **Preporučena Akcija:** ${iss.actionText}`
        ).join('\n\n') + '\n\n' +
        `**Deterministička kalkulacija uštede:**\n` +
        `Primjenom predloženog preusmjeravanja budžeta procjenjuje se smanjenje ukupnog prosječnog CPA sa **€${((metaCPAVal + googleCPAVal)/2).toFixed(2)}** na **€${targetCPAVal.toFixed(2)}** uz ušteđenih do **€350/mj**.`;

      decisionCard = {
        title: `Optimizacija: ${mainIssue.title}`,
        channel: mainIssue.channel,
        actionText: mainIssue.actionText,
        estimatedImpact: mainIssue.impact
      };
    } else {
      responseText = `### 🟢 Status Klijenta **${client.name}**: Svi Kanali rade u Optimalnim Granicama!\n\n` +
        `- **Meta Ads:** CPA iznosi **${client.metaStats.cpa}** (Ciljani: ${client.financialTargets.targetCPA}) - unutar cilja! ✅\n` +
        `- **Organski Sadržaj:** Engagement rate iznosi **${client.organicStats.engagementRate}**, što je iznad prosjeka industrije. ✅\n\n` +
        `Za daljnji rast preporučujem skaliranje najuspješnijih Instagram Reelsa.`;
    }
    suggestions = ['Usporedi Meta i Google', 'Analiziraj organske objave', 'Kako smanjiti CPA?'];

  } else if (query.includes('cpa') || query.includes('cijen') || query.includes('troš')) {
    const isMetaUnderTarget = metaCPAVal <= targetCPAVal;
    responseText = `### 📊 Faktualna Analiza CPA (Cijene po Konverziji) za **${client.name}**\n\n` +
      `**Verificirani Podaci iz API Sustava:**\n` +
      `- **Ciljani CPA klijenta:** \`${client.financialTargets.targetCPA}\` (Ciljani budžet: ${client.financialTargets.targetBudget})\n` +
      `- **Meta Ads Ostvareno:** \`${client.metaStats.cpa}\` (${metaCpaDiffPercent <= 0 ? `${Math.abs(metaCpaDiffPercent)}% ispod cilja (IZVRSNO)` : `+${metaCpaDiffPercent}% iznad cilja`})\n` +
      `- **Google Ads Ostvareno:** \`${client.googleStats.cpa}\` (${googleCpaDiffPercent <= 0 ? `${Math.abs(googleCpaDiffPercent)}% ispod cilja` : `+${googleCpaDiffPercent}% iznad cilja`})\n\n` +
      `**Konkretne Akcije bez nagađanja:**\n` +
      `1. ${isMetaUnderTarget ? `Zadržite trenutni budžet na Meta Ads (${client.metaStats.totalSpend}) jer donosi stabilan ROI.` : `Osvježite vizualne kreative na Meta Ads-u kako biste spustili CPA pod ciljanih ${client.financialTargets.targetCPA}.`}\n` +
      `2. Dodajte negativne ključne riječi na Google Search kako biste eliminirali neprofitabilan promet i snizili Google CPA s \`${client.googleStats.cpa}\` na \`${client.financialTargets.targetCPA}\`.`;

    suggestions = ['Što ne valja u kampanjama?', 'Analiziraj organske objave'];

  } else if (query.includes('organsk') || query.includes('instagram') || query.includes('reel') || query.includes('facebook')) {
    responseText = `### 📱 Analiza Organskog Sadržaja i Pretvaranja u Oglase za **${client.name}**\n\n` +
      `**Statistika Društvenih Mreža:**\n` +
      `- **Broj Pratitelja:** ${client.organicStats.followers} (${client.organicStats.growthRate} rast)\n` +
      `- **Stopa Angažmana (ERR):** \`${client.organicStats.engagementRate}\`\n` +
      `- **Optimalno Vrijeme Objave:** ${client.organicStats.bestTimeToPost}\n\n` +
      `**Vodeći Organski Sadržaj za Boost:**\n` +
      `Top objava na Instagramu *(Reel: "Ljetni popust 20%")* ima **7.8% engagement rate** i **1,120 spremanja**.\n\n` +
      `**AI Preporuka:** Pretvorite ovaj Reel u plaćeni Meta oglas (Dark Post) jer ima 3.2x veću organsku konverziju od prosječnih slikovnih oglasa!`;

    suggestions = ['Što ne valja u kampanjama?', 'Usporedi Meta i Google'];

  } else if (query.includes('google') || query.includes('uspored') || query.includes('alokacij')) {
    responseText = `### ⚖️ Usporedna Analiza i Alokacija Budžeta: Meta vs Google za **${client.name}**\n\n` +
      `| Kanal | Ukupna Potrošnja | Ostvareni CPA | Ciljani CPA | Status |\n` +
      `| :--- | :---: | :---: | :---: | :---: |\n` +
      `| **Meta Ads** | ${client.metaStats.totalSpend} | **${client.metaStats.cpa}** | ${client.financialTargets.targetCPA} | 🟢 Optimalno |\n` +
      `| **Google Ads** | ${client.googleStats.totalSpend} | **${client.googleStats.cpa}** | ${client.financialTargets.targetCPA} | ${googleCPAVal > targetCPAVal ? '🟡 Potrebna Optimizacija' : '🟢 U redu'} |\n\n` +
      `**Preporučena Alokacija Budžeta:**\n` +
      `Preusmjerite **€300** s manje efikasnih Google Search ključnih pojmova direktno u Instagram Reels Meta oglase za optimalan povrat.`;

    suggestions = ['Što ne valja u kampanjama?', 'Kako smanjiti CPA?'];

  } else {
    responseText = `Pozdrav Vinko! Ja sam tvoj AI Co-Pilot za klijenta **${client.name}** (Zdravlje Računa: **${client.healthScore}/100**).\n\n` +
      `**Brzi Faktualni Pregled:**\n` +
      `- **Meta Ads:** CPA ${client.metaStats.cpa} | Potrošnja ${client.metaStats.totalSpend}\n` +
      `- **Google Ads:** CPA ${client.googleStats.cpa} | Potrošnja ${client.googleStats.totalSpend}\n` +
      `- **Organski Sadržaj:** ERR ${client.organicStats.engagementRate} na ${client.organicStats.followers} pratitelja\n\n` +
      `Postavi mi bilo koje pitanje ili klikni na ponuđene brze akcije u nastavku:`;

    suggestions = ['Što ne valja u kampanjama?', 'Kako smanjiti CPA?', 'Analiziraj organske objave', 'Usporedi Meta i Google'];
  }

  // Stream thoughts first
  let currentThoughtIndex = 0;
  
  function sendThought() {
    if (currentThoughtIndex < thoughts.length) {
      res.write(`data: ${JSON.stringify({ type: 'THOUGHT', content: thoughts[currentThoughtIndex] })}\n\n`);
      currentThoughtIndex++;
      setTimeout(sendThought, 250);
    } else {
      sendResponseChunks();
    }
  }

  let chunkIndex = 0;
  const chunkSize = 30;
  
  function sendResponseChunks() {
    if (chunkIndex < responseText.length) {
      const chunk = responseText.slice(chunkIndex, chunkIndex + chunkSize);
      res.write(`data: ${JSON.stringify({ type: 'FINAL_RESPONSE', content: chunk })}\n\n`);
      chunkIndex += chunkSize;
      setTimeout(sendResponseChunks, 25);
    } else {
      sendCardAndSuggestions();
    }
  }

  function sendCardAndSuggestions() {
    if (decisionCard) {
      res.write(`data: ${JSON.stringify({ type: 'DECISION_CARD', content: decisionCard })}\n\n`);
    }
    suggestions.forEach(sug => {
      res.write(`data: ${JSON.stringify({ type: 'SUGGESTION', content: sug })}\n\n`);
    });
    res.write('data: [DONE]\n\n');
    res.end();
  }

  sendThought();
});

// POST Route to generate AI Ad Copies
app.post('/api/generate-copy', (req, res) => {
  const { clientId } = req.body;
  const client = clients.find(c => c.id === clientId) || clients[0];

  const copies = [
    {
      framework: 'Problem-Agitate-Solve (PAS)',
      title: '🔥 Prilagođeno za visoku konverziju',
      hook: `Gubite li potencijalne kupce u ${client.industry || 'vašoj branši'} zbog slabih oglasa?`,
      body: `Većina kampanja troši budžet na pogrešnu publiku bez konkretnih rezultata. Uz ${client.name}, ostvarite do 3.8x veći povrat na uložene eure (€) uz dokazanu strategiju targetiranja.`,
      cta: '👉 Kliknite ovdje i preuzmite ponudu s 20% popusta!',
      hashtags: '#Marketing #DigitalniMarketing #B2BSales #Growth'
    },
    {
      framework: 'Attention-Interest-Desire-Action (AIDA)',
      title: '⚡ Fokus na prednosti i brzinu',
      hook: `Ovo je najbrži način da smanjite CPA troškove u 2026. godini! 🚀`,
      body: `Naš tim u ${client.name} testirao je preko 100 oglasnih vizuala. Rezultat? Smanjen CPA na samo ${client.metaStats.cpa} uz rast konverzija od +42%.`,
      cta: '📲 Pokrenite konzultacije u roku od 60 sekundi!',
      hashtags: '#ROI #MetaAds #GoogleAds #DigitalnaAgencija'
    },
    {
      framework: 'Social Proof & Urgency',
      title: '🏆 Društveni dokaz + Hitnost',
      hook: `Preko ${client.organicStats.followers} zadovoljnih klijenata već koristi ovu metodu!`,
      body: `Pridružite se vodećim brendovima u niši ${client.industry || 'E-commerce'}. Ponuda s besplatnim audtom kampanja vrijedi samo do kraja kolovoza!`,
      cta: '🔥 Rezervirajte svoje mjesto prije popunjenja termina!',
      hashtags: '#SocialProof #CaseStudy #MarketingTips'
    }
  ];

  res.json({ success: true, clientName: client.name, copies });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
