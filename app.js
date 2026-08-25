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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mock client database (Cleaned & Streamlined)
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
    stats: {
      reach: '124.5k',
      impressions: '1.2M',
      ctr: '4.2%',
      spend: '$2,850'
    },
    financialTargets: {
      targetBudget: '$5,000',
      targetCPA: '$15.00',
      targetROAS: '4.25'
    },
    metaStats: {
      totalSpend: '$2,850',
      cpa: '$14.20',
      cpaTrend: { value: '8%', direction: 'down' },
      resultsValue: '201 Leads'
    },
    googleStats: {
      totalSpend: '$550',
      cpa: '$18.33',
      cpaTrend: { value: '2%', direction: 'up' },
      resultsValue: '30 Leads'
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
    stats: {
      reach: '89.2k',
      impressions: '840k',
      ctr: '5.1%',
      spend: '$4,120'
    },
    financialTargets: {
      targetBudget: '$5,000',
      targetCPA: '$12.00',
      targetROAS: '4.10'
    },
    metaStats: {
      totalSpend: '$1,750',
      cpa: '$8.50',
      cpaTrend: { value: '12%', direction: 'down' },
      resultsValue: '3.8x ROAS'
    },
    googleStats: {
      totalSpend: '$350',
      cpa: '$12.06',
      cpaTrend: { value: '5%', direction: 'down' },
      resultsValue: '4.1x ROAS'
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
    stats: {
      reach: '210.1k',
      impressions: '2.5M',
      ctr: '3.8%',
      spend: '$3,250'
    },
    financialTargets: {
      targetBudget: '$5,000',
      targetCPA: '$22.00',
      targetROAS: '3.50'
    },
    metaStats: {
      totalSpend: '$4,900',
      cpa: '$22.00',
      cpaTrend: { value: '15%', direction: 'up' },
      resultsValue: '4.5x ROAS'
    },
    googleStats: {
      totalSpend: '$1,000',
      cpa: '$26.31',
      cpaTrend: { value: '9%', direction: 'up' },
      resultsValue: '3.9x ROAS'
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
    stats: {
      reach: '45.0k',
      impressions: '310k',
      ctr: '2.9%',
      spend: '$2,850'
    },
    financialTargets: {
      targetBudget: '$5,000',
      targetCPA: '$14.00',
      targetROAS: '4.00'
    },
    metaStats: {
      totalSpend: '$500',
      cpa: '$10.50',
      cpaTrend: { value: '4%', direction: 'down' },
      resultsValue: '48 Leads'
    },
    googleStats: {
      totalSpend: '$350',
      cpa: '$14.00',
      cpaTrend: { value: '1%', direction: 'down' },
      resultsValue: '25 Leads'
    }
  }
];

// Main Dashboard Route
app.get('/', (req, res) => {
  res.render('index', { clients });
});

// Client Detailed Route
app.get('/client/:id', (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).send('Client not found');
  }
  res.render('client', { client, clients });
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

  // Derive slug ID from name
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
    financialTargets: {
      targetBudget: '$' + spendNum,
      targetCPA: '$' + (targetCPA || '15.00'),
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
      spend: '$' + spendNum
    },
    metaStats: {
      totalSpend: '$' + spendNum,
      cpa: '$' + (targetCPA || '14.20'),
      cpaTrend: { value: '6%', direction: 'down' },
      resultsValue: '240 Leads'
    },
    googleStats: {
      totalSpend: '$550',
      monthlyBudgetLimit: '$' + spendNum,
      budgetPercent: 55,
      preostaliBudzet: '$450',
      cpa: '$18.33',
      cpaTarget: '$' + (targetCPA || '15.00'),
      cpaTrend: { value: '2%', direction: 'up' },
      resultsValue: '30 Leads'
    }
  };

  clients.push(newClient);
  
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    return res.json({ success: true, client: newClient });
  }
  res.redirect('/client/' + slugId);
});

// AI Assistant Streaming Chat Endpoint (SSE)
app.post('/api/chat', (req, res) => {
  const { message, clientId } = req.body;

  // Initialize SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const client = clients.find(c => c.id === clientId) || clients[0];
  const query = (message || '').toLowerCase();

  // Mapped thoughts
  const thoughts = [
    `Učitavam bazu podataka za klijenta: ${client.name}...`,
    `Dohvaćam aktivne statistike (potrošnja: ${client.metaStats.totalSpend}, CPA: ${client.metaStats.cpa})...`,
    `Analiziram demografske grafove i učinkovitost oglasa na Meta platformi...`
  ];

  let responseText = '';
  let suggestions = [];

  if (query.includes('cpa') || query.includes('cijen') || query.includes('troš')) {
    responseText = `### Analiza CPA (Cijene po rezultatu) za **${client.name}**\n\n` +
      `Trenutna cijena po rezultatu na Meta platformi iznosi **${client.metaStats.cpa}**.\n\n` +
      `**Ključni uvidi:**\n` +
      `- Kretanje cijene je **${client.metaStats.cpaTrend.direction === 'down' ? 'u padu' : 'u porastu'}** za **${client.metaStats.cpaTrend.value}**.\n` +
      `- ${client.metaStats.cpaTrend.direction === 'down' ? 'Pad troškova je izvrstan rezultat. To nam govori da su kreativni materijali i dalje visoko relevantni publici i da algoritam uspješno pronalazi kupce.' : 'Blagi porast cijene sugerira da je došlo do zasićenja trenutne publike ili povećane konkurencije na aukcijama.'}\n\n` +
      `**Savjeti za optimizaciju:**\n` +
      `1. **Optimizirajte Instagram kanale:** Instagram nam donosi najveći povrat. Preusmjerite 10% budžeta sa slabo učinkovitog Audience Networka direktno na Reels i Stories plasmane.\n` +
      `2. **Lansiranje novih kreativa:** Osvježite slike u oglasima s novim tekstovima kako biste održali nizak CPA.`;
    suggestions = ['Usporedi Meta i Google', 'Analiziraj publiku'];
  } else if (query.includes('google') || query.includes('uspored') || query.includes('platform')) {
    responseText = `### Usporedba Meta Ads vs. Google Ads za **${client.name}**\n\n` +
      `Evo usporednog pregleda ključnih kanala:\n\n` +
      `| Platforma | Potrošnja | CPA | Tip rezultata |\n` +
      `| :--- | :---: | :---: | :---: |\n` +
      `| **Meta Ads** | ${client.metaStats.totalSpend} | ${client.metaStats.cpa} | ${client.metaStats.resultsValue} |\n` +
      `| **Google Ads** | ${client.googleStats.totalSpend} | ${client.googleStats.cpa} | ${client.googleStats.resultsValue} |\n\n` +
      `**Strategijska preporuka:**\n` +
      `- **Meta Ads** ostaje naš primarni pokretač volumena i prodaje s budžetom od ${client.metaStats.totalSpend} te donosi izvrstan organski doseg.\n` +
      `- **Google Ads** ima znatno manji budžet (${client.googleStats.totalSpend}), ali služi kao stabilan kanal za hvatanje točne potražnje (search). Zadržite trenutne budžete na Google-u, a agresivnije skalirajte uspješne Meta kampanje.`;
    suggestions = ['Kako smanjiti CPA?', 'Analiziraj publiku'];
  } else if (query.includes('publik') || query.includes('dob') || query.includes('spol') || query.includes('demograf')) {
    responseText = `### Demografska analiza publike za **${client.name}**\n\n` +
      `Pregledom grafikona raspodjele publike vidimo sljedeće:\n\n` +
      `- **Najjače skupine:** Najviše klikova i kupnji ostvaruju skupine **Ž 25-34** i **M 25-34**.\n` +
      `- **Omjer spolova:** Ženska publika generira oko **62%** svih konverzija, dok muška publika generira **38%**.\n\n` +
      `**Akcijska preporuka:**\n` +
      `Kreirajte posebne oglase s komunikacijom usmjerenom na dobnu skupinu 25-34 godine kako biste povećali stopu konverzije i dodatno smanjili troškove.`;
    suggestions = ['Kako smanjiti CPA?', 'Usporedi Meta i Google'];
  } else {
    responseText = `Pozdrav Vinko! Ja sam tvoj AI asistent za klijenta **${client.name}**.\n\n` +
      `Analizirao sam ključne statistike klijenta za platformu **Meta**:\n` +
      `- **Potrošnja:** ${client.metaStats.totalSpend}\n` +
      `- **Rezultati:** ${client.metaStats.resultsValue}\n` +
      `- **CPA:** ${client.metaStats.cpa} (${client.metaStats.cpaTrend.direction === 'down' ? '↓ pad' : '↑ rast'} od ${client.metaStats.cpaTrend.value})\n\n` +
      `Kako ti mogu pomoći danas? Možemo raspraviti o smanjenju CPA-a, usporedbi kanala ili analizi publike.`;
    suggestions = ['Kako smanjiti CPA?', 'Usporedi Meta i Google', 'Analiziraj publiku'];
  }

  // Stream thoughts first
  let currentThoughtIndex = 0;
  
  function sendThought() {
    if (currentThoughtIndex < thoughts.length) {
      res.write(`data: ${JSON.stringify({ type: 'THOUGHT', content: thoughts[currentThoughtIndex] })}\n\n`);
      currentThoughtIndex++;
      setTimeout(sendThought, 300);
    } else {
      sendResponseChunks();
    }
  }

  let chunkIndex = 0;
  const chunkSize = 25;
  
  function sendResponseChunks() {
    if (chunkIndex < responseText.length) {
      const chunk = responseText.slice(chunkIndex, chunkIndex + chunkSize);
      res.write(`data: ${JSON.stringify({ type: 'FINAL_RESPONSE', content: chunk })}\n\n`);
      chunkIndex += chunkSize;
      setTimeout(sendResponseChunks, 30);
    } else {
      sendSuggestions();
    }
  }

  function sendSuggestions() {
    suggestions.forEach(sug => {
      res.write(`data: ${JSON.stringify({ type: 'SUGGESTION', content: sug })}\n\n`);
    });
    res.write('data: [DONE]\n\n');
    res.end();
  }

  sendThought();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
