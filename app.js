const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse json requests & URL-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Generate mock daily arrays
const generateDaysList = () => {
  const days = [];
  for (let i = 1; i <= 25; i++) {
    days.push(`${i < 10 ? '0' + i : i}.08.`);
  }
  return days;
};

const daysList = generateDaysList();

// Mock client database (Tenants) with detailed ECharts datasets and Package details
const clients = [
  {
    id: 'acme-corp',
    name: 'Acme Corp',
    logo: 'AC',
    package: 'Start',
    publishedPosts: 5,
    maxPosts: 8,
    accentColor: '#DAF4AA',
    accentClass: 'border-[#DAF4AA] text-[#DAF4AA]',
    bgAccentClass: 'bg-[#DAF4AA]/10',
    stats: {
      reach: '124.5k',
      impressions: '1.2M',
      ctr: '4.2%',
      spend: '$3,400'
    },
    metaStats: {
      totalSpend: '$2,850',
      cpa: '$14.20',
      cpaTrend: { value: '8%', direction: 'down' },
      resultsType: 'Ostvareni Leads',
      resultsValue: '201 Leads',
      organicReach: '45,200'
    },
    googleStats: {
      totalSpend: '$550',
      monthlyBudgetLimit: '$1,000',
      budgetPercent: 55,
      preostaliBudzet: '$450',
      cpa: '$18.33',
      cpaTarget: '$15.00',
      cpaTrend: { value: '2%', direction: 'up' },
      resultsType: 'Ostvareni upiti',
      resultsValue: '30 Leads',
      cvr: '2.5%',
      ctr: '3.8%',
      avgCpc: '$0.85',
      impressionShare: '72%',
      lostToBudget: '18%',
      lostToRank: '10%'
    },
    chartData: {
      days: daysList,
      spendDaily: [95, 110, 105, 120, 135, 115, 100, 105, 125, 130, 140, 120, 110, 115, 120, 105, 95, 115, 120, 110, 100, 115, 125, 130, 115],
      conversionsDaily: [6, 8, 7, 9, 10, 8, 7, 8, 9, 10, 11, 8, 7, 8, 9, 7, 6, 8, 9, 8, 7, 8, 9, 10, 8],
      platforms: [
        { name: 'Facebook', value: 1710 },
        { name: 'Instagram', value: 998 },
        { name: 'Audience Network', value: 142 }
      ],
      audienceCategories: ['Ž 18-24', 'M 18-24', 'Ž 25-34', 'M 25-34', 'Ž 35-44', 'M 35-44', 'Ž 45+', 'M 45+'],
      audienceValues: [22, 11, 58, 28, 42, 18, 14, 8],
      topPostsTitles: ['Ljetni popust 20%', 'Vodič za marketing', 'Iskustva klijenata', 'Predstavljanje tima', 'Nagradni natječaj'],
      topPostsLikes: [340, 280, 210, 190, 480],
      topPostsComments: [82, 45, 93, 22, 164],
      topPostsShares: [41, 19, 32, 11, 88],
      organicReachDaily: [1200, 1400, 1350, 1800, 2100, 1950, 1600, 1750, 2200, 2300, 2500, 2100, 1900, 2050, 2200, 1800, 1650, 1900, 2100, 1950, 1800, 2050, 2200, 2350, 2100]
    },
    googleChartData: {
      days: daysList,
      spendDaily: [18, 22, 25, 20, 18, 15, 22, 24, 25, 28, 22, 19, 20, 24, 18, 15, 22, 25, 20, 18, 22, 24, 26, 22, 21],
      conversionsDaily: [1, 1, 2, 2, 1, 1, 1, 2, 2, 2, 3, 1, 1, 1, 2, 1, 0, 1, 2, 1, 1, 1, 2, 2, 1],
      pacingTargetLinear: [40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520, 560, 600, 640, 680, 720, 760, 800, 840, 880, 920, 960, 1000],
      pacingActualCumulative: [18, 40, 65, 85, 103, 118, 140, 164, 189, 217, 239, 258, 278, 302, 320, 335, 357, 382, 402, 420, 442, 466, 492, 514, 535],
      networks: [
        { name: 'Search', value: 16 },
        { name: 'PMax', value: 9 },
        { name: 'YouTube', value: 4 },
        { name: 'Display', value: 1 }
      ],
      top10CampaignsNames: ['Search - Brand', 'PMax - Core', 'Search - Generic', 'YouTube - Intent', 'Search - Competitors', 'Display - Remarketing', 'PMax - Promo', 'Search - Local', 'YouTube - Bumper', 'Display - Native'],
      top10CampaignsValues: [4.8, 4.2, 3.8, 3.1, 2.9, 2.5, 2.1, 1.8, 1.2, 0.9],
      devicesCategories: ['Mobitel', 'Računalo', 'Tablet'],
      devicesValues: [18, 10, 2],
      locationsCategories: ['Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar'],
      locationsValues: [16, 8, 3, 2, 1],
      keywords: [
        { term: 'najbolji marketing agency', clicks: 142, convs: 12, cost: '$120.70' },
        { term: 'digitalne kampanje cijena', clicks: 98, convs: 8, cost: '$88.20' },
        { term: 'meta i google oglasi', clicks: 64, convs: 5, cost: '$54.40' },
        { term: 'agencija za facebook reklame', clicks: 45, convs: 3, cost: '$38.25' },
        { term: 'pmax optimizacija', clicks: 22, convs: 2, cost: '$18.70' }
      ],
      funnelStages: ['Klik na oglas', 'Dolazak na web', 'Dodavanje u košaricu', 'Kupnja'],
      funnelValues: [1200, 980, 210, 30],
      alerts: [
        { campaign: 'Search - Competitors', status: 'Ograničeno budžetom', alert: 'Izgubljeno 22% prikaza', type: 'warning' },
        { campaign: 'PMax - Core', status: 'Učenje (Learning)', alert: 'Završava za 1 dan', type: 'info' },
        { campaign: 'Display - Remarketing', status: 'ROAS u padu', alert: 'Pad od 15% ovaj tjedan', type: 'danger' }
      ]
    },
    status: 'Active'
  },
  {
    id: 'nova-media',
    name: 'Nova Media',
    logo: 'NM',
    package: 'Pro',
    publishedPosts: 10,
    maxPosts: 12,
    accentColor: '#96D8D0',
    accentClass: 'border-[#96D8D0] text-[#96D8D0]',
    bgAccentClass: 'bg-[#96D8D0]/10',
    stats: {
      reach: '89.2k',
      impressions: '840k',
      ctr: '5.1%',
      spend: '$2,100'
    },
    metaStats: {
      totalSpend: '$1,750',
      cpa: '$8.50',
      cpaTrend: { value: '12%', direction: 'up' },
      resultsType: 'Povrat na uloženo (ROAS)',
      resultsValue: '3.8x ROAS',
      organicReach: '31,800'
    },
    googleStats: {
      totalSpend: '$350',
      monthlyBudgetLimit: '$500',
      budgetPercent: 70,
      preostaliBudzet: '$150',
      cpa: '$12.06',
      cpaTarget: '$14.00',
      cpaTrend: { value: '5%', direction: 'down' },
      resultsType: 'Povrat na uloženo (ROAS)',
      resultsValue: '4.1x ROAS',
      cvr: '4.2%',
      ctr: '4.9%',
      avgCpc: '$0.62',
      impressionShare: '81%',
      lostToBudget: '8%',
      lostToRank: '11%'
    },
    chartData: {
      days: daysList,
      spendDaily: [65, 70, 75, 80, 85, 75, 60, 65, 70, 75, 80, 70, 65, 70, 75, 60, 55, 65, 70, 75, 60, 65, 70, 75, 70],
      conversionsDaily: [8, 9, 8, 10, 11, 9, 7, 8, 9, 10, 11, 9, 8, 9, 10, 8, 7, 9, 10, 11, 8, 9, 10, 11, 10],
      platforms: [
        { name: 'Facebook', value: 525 },
        { name: 'Instagram', value: 1138 },
        { name: 'Audience Network', value: 87 }
      ],
      audienceCategories: ['Ž 18-24', 'M 18-24', 'Ž 25-34', 'M 25-34', 'Ž 35-44', 'M 35-44', 'Ž 45+', 'M 45+'],
      audienceValues: [38, 14, 45, 20, 22, 10, 8, 4],
      topPostsTitles: ['Novi kupaći kostimi', 'Outfit tjedna', 'Summer sale is LIVE!', 'Influencer preporuka', 'Giveaway darivanje'],
      topPostsLikes: [520, 410, 680, 310, 890],
      topPostsComments: [112, 65, 142, 38, 410],
      topPostsShares: [58, 22, 94, 18, 224],
      organicReachDaily: [800, 950, 900, 1100, 1300, 1200, 950, 1000, 1400, 1500, 1600, 1300, 1200, 1250, 1300, 1100, 1000, 1150, 1300, 1200, 1100, 1250, 1400, 1500, 1350]
    },
    googleChartData: {
      days: daysList,
      spendDaily: [12, 14, 15, 18, 16, 12, 10, 15, 14, 16, 18, 15, 12, 14, 15, 10, 9, 12, 14, 16, 12, 14, 15, 18, 14],
      conversionsDaily: [1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2, 1, 0, 1, 2, 2, 1, 2, 2, 2, 1],
      pacingTargetLinear: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500],
      pacingActualCumulative: [12, 26, 41, 59, 75, 87, 97, 112, 126, 142, 160, 175, 187, 201, 216, 226, 235, 247, 261, 277, 289, 303, 318, 336, 350],
      networks: [
        { name: 'PMax', value: 16 },
        { name: 'Search', value: 13 },
        { name: 'YouTube', value: 7 },
        { name: 'Display', value: 3 }
      ],
      top10CampaignsNames: ['PMax - Outfits', 'Search - Clothes', 'Search - Brand', 'Display - Dynamic', 'YouTube - Shorts', 'Search - Sale', 'PMax - Swimwear', 'Display - Smart', 'YouTube - Action', 'PMax - Accessories'],
      top10CampaignsValues: [5.2, 4.4, 3.8, 3.1, 2.8, 2.4, 2.1, 1.8, 1.5, 1.1],
      devicesCategories: ['Mobitel', 'Računalo', 'Tablet'],
      devicesValues: [26, 11, 2],
      locationsCategories: ['Zagreb', 'Split', 'Zadar', 'Dubrovnik', 'Rijeka'],
      locationsValues: [18, 11, 6, 3, 1],
      keywords: [
        { term: 'modni kupaći kostimi 2026', clicks: 220, convs: 18, cost: '$136.40' },
        { term: 'ljetne haljine prodaja', clicks: 178, convs: 12, cost: '$110.36' },
        { term: 'brand odjeća nova kolekcija', clicks: 90, convs: 6, cost: '$55.80' },
        { term: 'brza dostava haljine', clicks: 52, convs: 2, cost: '$32.24' },
        { term: 'modernioutfit.hr', clicks: 24, convs: 1, cost: '$14.88' }
      ],
      funnelStages: ['Klik na oglas', 'Dolazak na web', 'Dodavanje u košaricu', 'Kupnja'],
      funnelValues: [2200, 1850, 480, 39],
      alerts: [
        { campaign: 'PMax - Outfits', status: 'Aktivno', alert: 'Nema poteškoća', type: 'normal' },
        { campaign: 'Display - Dynamic', status: 'Ograničeno budžetom', alert: 'Izgubljeno 14% prikaza', type: 'warning' },
        { campaign: 'YouTube - Shorts', status: 'Učenje (Learning)', alert: 'Završava za 2 dana', type: 'info' }
      ]
    },
    status: 'Active'
  },
  {
    id: 'lumina-group',
    name: 'Lumina Group',
    logo: 'LG',
    package: 'Ultra',
    publishedPosts: 15,
    maxPosts: 16,
    accentColor: '#F1B4B9',
    accentClass: 'border-[#F1B4B9] text-[#F1B4B9]',
    bgAccentClass: 'bg-[#F1B4B9]/10',
    stats: {
      reach: '210.1k',
      impressions: '2.5M',
      ctr: '3.8%',
      spend: '$5,900'
    },
    metaStats: {
      totalSpend: '$4,900',
      cpa: '$22.00',
      cpaTrend: { value: '15%', direction: 'down' },
      resultsType: 'Povrat na uloženo (ROAS)',
      resultsValue: '4.5x ROAS',
      organicReach: '92,400'
    },
    googleStats: {
      totalSpend: '$1,000',
      monthlyBudgetLimit: '$2,000',
      budgetPercent: 50,
      preostaliBudzet: '$1,000',
      cpa: '$26.31',
      cpaTarget: '$25.00',
      cpaTrend: { value: '9%', direction: 'up' },
      resultsType: 'Povrat na uloženo (ROAS)',
      resultsValue: '3.9x ROAS',
      cvr: '2.1%',
      ctr: '4.1%',
      avgCpc: '$1.15',
      impressionShare: '68%',
      lostToBudget: '22%',
      lostToRank: '10%'
    },
    chartData: {
      days: daysList,
      spendDaily: [160, 180, 175, 200, 220, 210, 180, 190, 210, 220, 230, 210, 195, 200, 210, 185, 170, 190, 210, 200, 185, 200, 210, 220, 205],
      conversionsDaily: [18, 21, 20, 23, 25, 24, 20, 22, 24, 25, 26, 23, 21, 22, 23, 20, 18, 22, 24, 22, 20, 22, 23, 25, 23],
      platforms: [
        { name: 'Facebook', value: 2450 },
        { name: 'Instagram', value: 2107 },
        { name: 'Audience Network', value: 343 }
      ],
      audienceCategories: ['Ž 18-24', 'M 18-24', 'Ž 25-34', 'M 25-34', 'Ž 35-44', 'M 35-44', 'Ž 45+', 'M 45+'],
      audienceValues: [18, 8, 48, 24, 52, 28, 34, 18],
      topPostsTitles: ['Nova kolekcija namještaja', 'Uređenje dnevnog boravka', 'Home decor ideje', 'Black edition fotelja', 'Vodič za rasvjetu'],
      topPostsLikes: [290, 340, 180, 420, 250],
      topPostsComments: [38, 54, 22, 98, 41],
      topPostsShares: [15, 28, 9, 39, 12],
      organicReachDaily: [3200, 3500, 3400, 3900, 4300, 4100, 3700, 3800, 4200, 4400, 4600, 4100, 3900, 4050, 4200, 3800, 3600, 3900, 4100, 3950, 3800, 4050, 4200, 4400, 4150]
    },
    googleChartData: {
      days: daysList,
      spendDaily: [35, 42, 45, 38, 40, 36, 32, 40, 44, 45, 48, 42, 38, 40, 44, 38, 32, 40, 44, 42, 38, 40, 44, 45, 40],
      conversionsDaily: [3, 4, 4, 3, 4, 3, 2, 4, 4, 4, 5, 4, 3, 3, 4, 3, 2, 4, 4, 4, 3, 4, 4, 4, 3],
      pacingTargetLinear: [80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960, 1040, 1120, 1200, 1280, 1360, 1440, 1520, 1600, 1680, 1760, 1840, 1920, 2000],
      pacingActualCumulative: [35, 77, 122, 160, 200, 236, 268, 308, 352, 397, 445, 487, 525, 565, 609, 647, 679, 719, 763, 805, 843, 883, 927, 972, 1012],
      networks: [
        { name: 'Search', value: 38 },
        { name: 'PMax', value: 29 },
        { name: 'YouTube', value: 12 },
        { name: 'Display', value: 6 }
      ],
      top10CampaignsNames: ['Search - Furniture', 'PMax - Best Sellers', 'Search - Brand', 'Display - Showcase', 'YouTube - Bumper', 'Search - Kitchens', 'PMax - Office', 'Display - Smart', 'YouTube - Action', 'PMax - Promo'],
      top10CampaignsValues: [6.1, 5.2, 4.8, 3.5, 2.9, 2.5, 2.2, 1.8, 1.2, 0.9],
      devicesCategories: ['Mobitel', 'Računalo', 'Tablet'],
      devicesValues: [48, 38, 12],
      locationsCategories: ['Zagreb', 'Split', 'Rijeka', 'Zadar', 'Pula'],
      locationsValues: [42, 18, 11, 8, 6],
      keywords: [
        { term: 'luksuzni drveni namještaj', clicks: 310, convs: 24, cost: '$356.50' },
        { term: 'moderni namještaj za dnevni boravak', clicks: 245, convs: 18, cost: '$281.75' },
        { term: 'stolice i stolovi rasprodaja', clicks: 150, convs: 10, cost: '$172.50' },
        { term: 'oprema za kuhinje po mjeri', clicks: 80, convs: 5, cost: '$92.00' },
        { term: 'lumina home dizajneri', clicks: 42, convs: 3, cost: '$48.30' }
      ],
      funnelStages: ['Klik na oglas', 'Dolazak na web', 'Dodavanje u košaricu', 'Kupnja'],
      funnelValues: [4800, 3950, 890, 85],
      alerts: [
        { campaign: 'Search - Kitchens', status: 'Ograničeno budžetom', alert: 'Izgubljeno 25% prikaza', type: 'warning' },
        { campaign: 'PMax - Best Sellers', status: 'Aktivno', alert: 'Nema poteškoća', type: 'normal' },
        { campaign: 'Display - Showcase', status: 'ROAS u padu', alert: 'Pad od 22% ovaj tjedan', type: 'danger' }
      ]
    },
    status: 'Active'
  },
  {
    id: 'vortex-ltd',
    name: 'Vortex Ltd',
    logo: 'VX',
    package: 'Start',
    publishedPosts: 3,
    maxPosts: 8,
    accentColor: '#64748B',
    accentClass: 'border-[#64748B]/30 text-[#64748B]',
    bgAccentClass: 'bg-[#64748B]/10',
    stats: {
      reach: '45.0k',
      impressions: '310k',
      ctr: '2.9%',
      spend: '$850'
    },
    metaStats: {
      totalSpend: '$500',
      cpa: '$10.50',
      cpaTrend: { value: '4%', direction: 'up' },
      resultsType: 'Upiti (Leads)',
      resultsValue: '48 Leads',
      organicReach: '12,100'
    },
    googleStats: {
      totalSpend: '$350',
      monthlyBudgetLimit: '$500',
      budgetPercent: 70,
      preostaliBudzet: '$150',
      cpa: '$14.00',
      cpaTarget: '$12.00',
      cpaTrend: { value: '1%', direction: 'down' },
      resultsType: 'Ostvareni leads',
      resultsValue: '25 Leads',
      cvr: '1.9%',
      ctr: '3.1%',
      avgCpc: '$0.75',
      impressionShare: '69%',
      lostToBudget: '21%',
      lostToRank: '10%'
    },
    chartData: {
      days: daysList,
      spendDaily: [15, 20, 18, 22, 25, 21, 17, 18, 22, 23, 25, 21, 19, 20, 21, 18, 16, 19, 21, 20, 18, 20, 21, 22, 20],
      conversionsDaily: [1, 2, 1, 2, 3, 2, 1, 2, 2, 3, 3, 2, 1, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 3, 2],
      platforms: [
        { name: 'Facebook', value: 300 },
        { name: 'Instagram', value: 175 },
        { name: 'Audience Network', value: 25 }
      ],
      audienceCategories: ['Ž 18-24', 'M 18-24', 'Ž 25-34', 'M 25-34', 'Ž 35-44', 'M 35-44', 'Ž 45+', 'M 45+'],
      audienceValues: [12, 6, 32, 18, 24, 14, 10, 4],
      topPostsTitles: ['B2B rješenja za firme', 'Kako povećati prodaju', 'Analiza tržišta 2026', 'Poziv na konzultacije', 'Izvještaj o trendovima'],
      topPostsLikes: [85, 110, 95, 130, 75],
      topPostsComments: [14, 23, 19, 41, 12],
      topPostsShares: [8, 14, 11, 28, 5],
      organicReachDaily: [350, 420, 390, 480, 520, 490, 410, 430, 490, 510, 540, 480, 450, 470, 490, 420, 390, 430, 470, 450, 420, 460, 490, 520, 480]
    },
    googleChartData: {
      days: daysList,
      spendDaily: [10, 15, 12, 14, 15, 12, 10, 12, 14, 15, 16, 12, 11, 12, 14, 12, 10, 12, 14, 15, 12, 14, 15, 16, 14],
      conversionsDaily: [0, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 2, 2, 1],
      pacingTargetLinear: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500],
      pacingActualCumulative: [10, 25, 37, 51, 66, 78, 88, 100, 114, 129, 145, 157, 168, 180, 194, 206, 216, 228, 242, 257, 269, 283, 298, 314, 328],
      networks: [
        { name: 'Search', value: 14 },
        { name: 'PMax', value: 7 },
        { name: 'YouTube', value: 3 },
        { name: 'Display', value: 1 }
      ],
      top10CampaignsNames: ['Search - B2B Services', 'PMax - Corporate', 'Search - Leads', 'Display - B2B', 'YouTube - Video', 'Search - Consulting', 'PMax - Local', 'Display - Banner', 'YouTube - Shorts', 'PMax - Promo'],
      top10CampaignsValues: [5.8, 4.9, 4.1, 3.2, 2.9, 2.5, 2.1, 1.8, 1.2, 0.9],
      devicesCategories: ['Mobitel', 'Računalo', 'Tablet'],
      devicesValues: [14, 9, 2],
      locationsCategories: ['Zagreb', 'Rijeka', 'Split', 'Varaždin', 'Karlovac'],
      locationsValues: [12, 6, 4, 2, 1],
      keywords: [
        { term: 'b2b rješenja za male firme', clicks: 90, convs: 8, cost: '$67.50' },
        { term: 'agencija za digitalni marketing', clicks: 75, convs: 6, cost: '$56.25' },
        { term: 'optimizacija google oglasa', clicks: 54, convs: 4, cost: '$40.50' },
        { term: 'poslovno savjetovanje zagreb', clicks: 32, convs: 2, cost: '$24.00' },
        { term: 'vortex marketing cijena', clicks: 12, convs: 1, cost: '$9.00' }
      ],
      funnelStages: ['Klik na oglas', 'Dolazak na web', 'Dodavanje u košaricu', 'Kupnja'],
      funnelValues: [850, 680, 120, 25],
      alerts: [
        { campaign: 'Search - B2B Services', status: 'Aktivno', alert: 'Nema poteškoća', type: 'normal' },
        { campaign: 'Display - B2B', status: 'Ograničeno budžetom', alert: 'Izgubljeno 21% prikaza', type: 'warning' },
        { campaign: 'YouTube - Video', status: 'ROAS u padu', alert: 'Pad od 12% ovaj tjedan', type: 'danger' }
      ]
    },
    status: 'Active'
  }
];

// Helper to enrich clients with advanced analytics data
const enrichClientWithAdvancedAnalytics = (client) => {
  if (client.advancedAnalytics) return client;

  const days = client.chartData ? client.chartData.days : generateDaysList();
  
  // Calculate blended stats
  const metaSpend = parseFloat((client.metaStats?.totalSpend || '$0').replace(/[^0-9.]/g, '')) || 2850;
  const googleSpend = parseFloat((client.googleStats?.totalSpend || '$0').replace(/[^0-9.]/g, '')) || 550;
  const tiktokSpend = client.package === 'Ultra' ? 300 : 0;
  const totalSpendVal = metaSpend + googleSpend + tiktokSpend;
  const totalRevenueVal = Math.round(totalSpendVal * 4.4);
  const blendedMerVal = (totalRevenueVal / totalSpendVal).toFixed(2);
  const totalConvsVal = Math.round(totalSpendVal / 14.5);

  const spendDaily = days.map((_, i) => Math.round(totalSpendVal / days.length + (Math.sin(i * 0.8) * 18)));
  const revenueDaily = spendDaily.map((s, i) => Math.round(s * (3.9 + Math.cos(i * 0.5) * 0.7)));
  const merDaily = spendDaily.map((s, i) => (revenueDaily[i] / s).toFixed(2));

  client.advancedAnalytics = {
    blended: {
      totalSpend: `$${totalSpendVal.toLocaleString()}`,
      totalRevenue: `$${totalRevenueVal.toLocaleString()}`,
      blendedMer: `${blendedMerVal}x`,
      totalConversions: totalConvsVal,
      days,
      spendDaily,
      revenueDaily,
      merDaily
    },
    creativeFatigue: {
      adNames: ['Kreativa 1 - Popust 20%', 'Kreativa 2 - Video Demo', 'Kreativa 3 - UGC Recenzija', 'Kreativa 4 - Karusel Banner', 'Kreativa 5 - Static Promo'],
      frequency: [1.2, 2.1, 3.4, 4.8, 6.2],
      ctr: [5.2, 4.4, 3.1, 1.8, 0.9],
      cpa: [11.5, 13.8, 18.2, 26.5, 38.0],
      statuses: ['Optimalno', 'Dobro', 'Blagi zamor', 'Visok zamor', 'Zamijeni vizual']
    },
    dayparting: {
      days: ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'],
      hours: ['00-03h', '03-06h', '06-09h', '09-12h', '12-15h', '15-18h', '18-21h', '21-24h'],
      data: [
        [0,0,2],[0,1,1],[0,2,4],[0,3,8],[0,4,9],[0,5,12],[0,6,15],[0,7,8],
        [1,0,1],[1,1,1],[1,2,5],[1,3,10],[1,4,12],[1,5,16],[1,6,22],[1,7,12],
        [2,0,2],[2,1,0],[2,2,4],[2,3,9],[2,4,11],[2,5,14],[2,6,18],[2,7,10],
        [3,0,1],[3,1,1],[3,2,6],[3,3,11],[3,4,13],[3,5,18],[3,6,24],[3,7,14],
        [4,0,3],[4,1,2],[4,2,5],[4,3,8],[4,4,10],[4,5,15],[4,6,19],[4,7,11],
        [5,0,4],[5,1,2],[5,2,3],[5,3,6],[5,4,8],[5,5,11],[5,6,14],[5,7,9],
        [6,0,3],[6,1,1],[6,2,4],[6,3,7],[6,4,9],[6,5,13],[6,6,20],[6,7,15]
      ],
      peakPeriod: 'Četvrtak & Utorak (18:00 - 21:00h)'
    },
    ltvCac: {
      cac: `$${(totalSpendVal / totalConvsVal).toFixed(2)}`,
      ltv3m: '$38.50',
      ltv6m: '$54.00',
      ltv12m: '$72.50',
      ltvCacRatio: `${(72.50 / (totalSpendVal / totalConvsVal)).toFixed(2)}x`,
      paybackDays: '38 dana',
      retentionMonths: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'],
      retentionRates: [100, 45, 36, 32, 29, 27]
    }
  };

  const publishedCount = client.publishedPosts !== undefined ? client.publishedPosts : 5;
  const maxCount = client.maxPosts || 8;
  const remainingCount = Math.max(0, maxCount - publishedCount);

  client.socialMediaStats = {
    monthlyPublished: publishedCount,
    monthlyTarget: maxCount,
    monthlyRemaining: remainingCount,
    progressPercent: Math.min(Math.round((publishedCount / maxCount) * 100), 100),
    totalImpressions: '124,500',
    totalReach: '98,200',
    totalEngagements: '1,840',
    avgEngagementRate: '5.2%',
    platformViews: [
      { name: 'Instagram', value: 68400, color: '#E1306C' },
      { name: 'Facebook', value: 34100, color: '#1877F2' },
      { name: 'TikTok', value: 22000, color: '#000000' }
    ],
    formatPerformanceNames: ['Reels / Video', 'Karusel objave', 'Jednostruke slike'],
    formatPerformanceValues: [34200, 24800, 14500],
    creatives: [
      {
        id: 1,
        title: 'Nagradni natječaj - Osvoji ljetni paket',
        date: '18. Kolovoza 2026.',
        platform: 'Instagram & Facebook',
        platformIcon: 'fa-brands fa-instagram text-pink-600',
        type: 'Reel / Karusel',
        imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
        impressions: '42,100',
        reach: '36,500',
        likes: 480,
        comments: 164,
        shares: 88,
        engagementRate: '8.4%',
        rank: 'top',
        badge: 'Najbolja objava 🏆',
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        note: 'Vrhunska udica u prvih 3 sekunde i nagradni mehanizam donijeli su rekordnih 164 komentara i viralan doseg.'
      },
      {
        id: 2,
        title: 'Ljetni popust 20% na sve usluge',
        date: '12. Kolovoza 2026.',
        platform: 'Instagram & TikTok',
        platformIcon: 'fa-brands fa-tiktok text-black',
        type: 'Promo Slika / Video',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
        impressions: '31,400',
        reach: '28,200',
        likes: 340,
        comments: 82,
        shares: 41,
        engagementRate: '6.1%',
        rank: 'top',
        badge: 'Visoka konverzija ⭐',
        badgeClass: 'bg-cyan-100 text-cyan-900 border-cyan-300',
        note: 'Najveći broj spremanja objava i klikova na link u bio profilu.'
      },
      {
        id: 3,
        title: 'Vodič za napredni digitalni marketing',
        date: '08. Kolovoza 2026.',
        platform: 'Facebook & Instagram',
        platformIcon: 'fa-brands fa-facebook text-blue-600',
        type: 'Edukativni Karusel',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        impressions: '22,800',
        reach: '19,500',
        likes: 280,
        comments: 45,
        shares: 19,
        engagementRate: '4.5%',
        rank: 'normal',
        badge: 'Stabilan doseg',
        badgeClass: 'bg-brand-dark/10 text-brand-dark border-brand-dark/20',
        note: 'Dobro zadržavanje korisnika (swiping kroz svih 7 slajdova karusela).'
      },
      {
        id: 4,
        title: 'Trending Reel - Outfit tjedna',
        date: '04. Kolovoza 2026.',
        platform: 'TikTok & Reels',
        platformIcon: 'fa-brands fa-tiktok text-black',
        type: 'Short Video / Reel',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
        impressions: '18,500',
        reach: '15,200',
        likes: 210,
        comments: 93,
        shares: 32,
        engagementRate: '3.9%',
        rank: 'normal',
        badge: 'Trending Zvuk 🎵',
        badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
        note: 'Dobar prijem kod mlađe publike uz korištenje popularnog zvučnog zapisa.'
      },
      {
        id: 5,
        title: 'Obavijest o novom radnom vremenu',
        date: '01. Kolovoza 2026.',
        platform: 'Facebook',
        platformIcon: 'fa-brands fa-facebook text-blue-600',
        type: 'Informativna Statika',
        imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80',
        impressions: '9,700',
        reach: '8,100',
        likes: 42,
        comments: 6,
        shares: 2,
        engagementRate: '1.2%',
        rank: 'bottom',
        badge: 'Najlošija objava ⚠️',
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        note: 'Nizak organski doseg i niska interakcija. Savjet: Informativne objave kombinirati s dinamikom u Storyjima ili kratkim videozapisom.'
      }
    ]
  };

  client.executiveHealthCheck = {
    overallHealth: 'Vrlo dobro (88/100)',
    goodHighlights: [
      { title: 'Google Performance Max izvrsnost', desc: 'PMax kampanja ostvaruje visoki ROAS od 4.8x uz stabilan trošak po konverziji.' },
      { title: 'Instagram Reels viralan doseg', desc: 'Organski doseg je porastao za +28%, a nagradni Reels ima natprosječnu stopu angažmana od 8.4%.' },
      { title: 'Zdrav LTV : CAC omjer', desc: 'Dugoročni povrat na korisnika iznosi 4.97x, što je znatno iznad targeta od 3.0x.' }
    ],
    criticalIssues: [
      { title: 'Zamor Meta Ads Kreative #4', type: 'rose', desc: 'Frekvencija prikaza dosegnula je 4.8x, uzrokujući pad CTR-a s 5.2% na 1.8% i porast CPA.' },
      { title: 'Google Search - Ograničeno budžetom', type: 'amber', desc: 'Izgubljeno je 21% potencijalnih konverzija zbog dosizanja dnevnog limita proračuna.' }
    ],
    actionFixes: [
      { title: 'Zamijeni Meta Kreativu #4 s novim video Reel vizualom', impact: 'Trenutačni pad CPA-a za ~20% i osvježenje publike.' },
      { title: 'Preusmjeri $150 iz neaktivnih oglasa u PMax Asset Grupu B', impact: '+15% više konverzija uz isti ukupni trošak.' }
    ]
  };

  return client;
};

// Enrich existing clients
clients.forEach(c => enrichClientWithAdvancedAnalytics(c));

// Main Dashboard route
app.get('/', (req, res) => {
  res.render('index', {
    clients
  });
});

// Client detailed route
app.get('/client/:id', (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (!client) {
    return res.status(404).send('Client not found');
  }

  // Ensure advanced analytics data is attached
  enrichClientWithAdvancedAnalytics(client);

  res.render('client', {
    client,
    clients
  });
});

// POST Route to Add New Client
app.post('/api/client/add', (req, res) => {
  const { name, logo, package: pkg, spend } = req.body;

  if (!name) {
    return res.status(400).send('Naziv klijenta je obvezan.');
  }

  // Derive slug ID from name
  const slugId = name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .replace(/\s+/g, '-')         // replace spaces with dashes
    .replace(/-+/g, '-')          // replace multiple dashes with single dash
    .trim();

  // Determine max posts based on package type
  let maxPosts = 8;
  let accentColor = '#DAF4AA';
  let accentClass = 'border-[#DAF4AA] text-[#DAF4AA]';
  let bgAccentClass = 'bg-[#DAF4AA]/10';

  if (pkg === 'Pro') {
    maxPosts = 12;
    accentColor = '#96D8D0';
    accentClass = 'border-[#96D8D0] text-[#96D8D0]';
    bgAccentClass = 'bg-[#96D8D0]/10';
  } else if (pkg === 'Ultra') {
    maxPosts = 16;
    accentColor = '#F1B4B9';
    accentClass = 'border-[#F1B4B9] text-[#F1B4B9]';
    bgAccentClass = 'bg-[#F1B4B9]/10';
  }

  const spendNum = spend || '500';

  const newClient = {
    id: slugId,
    name: name,
    logo: (logo || name.slice(0, 2)).toUpperCase(),
    package: pkg || 'Start',
    publishedPosts: 0,
    maxPosts: maxPosts,
    accentColor: accentColor,
    accentClass: accentClass,
    bgAccentClass: bgAccentClass,
    stats: {
      reach: '0k',
      impressions: '0k',
      ctr: '0.0%',
      spend: '$' + spendNum
    },
    metaStats: {
      totalSpend: '$' + spendNum,
      cpa: '$0.00',
      cpaTrend: { value: '0%', direction: 'down' },
      resultsType: 'Ostvareni Leads',
      resultsValue: '0 Leads',
      organicReach: '0'
    },
    googleStats: {
      totalSpend: '$0',
      monthlyBudgetLimit: '$' + spendNum,
      budgetPercent: 0,
      preostaliBudzet: '$' + spendNum,
      cpa: '$0.00',
      cpaTarget: '$0.00',
      cpaTrend: { value: '0%', direction: 'down' },
      resultsType: 'Ostvareni upiti',
      resultsValue: '0 Leads',
      cvr: '0.0%',
      ctr: '0.0%',
      avgCpc: '$0.00',
      impressionShare: '0%',
      lostToBudget: '0%',
      lostToRank: '0%'
    },
    chartData: {
      days: daysList,
      spendDaily: Array(25).fill(0),
      conversionsDaily: Array(25).fill(0),
      platforms: [
        { name: 'Facebook', value: 0 },
        { name: 'Instagram', value: 0 },
        { name: 'Audience Network', value: 0 }
      ],
      audienceCategories: ['Ž 18-24', 'M 18-24', 'Ž 25-34', 'M 25-34', 'Ž 35-44', 'M 35-44', 'Ž 45+', 'M 45+'],
      audienceValues: Array(8).fill(0),
      topPostsTitles: ['Nema objava', 'Nema objava', 'Nema objava', 'Nema objava', 'Nema objava'],
      topPostsLikes: Array(5).fill(0),
      topPostsComments: Array(5).fill(0),
      topPostsShares: Array(5).fill(0),
      organicReachDaily: Array(25).fill(0)
    },
    googleChartData: {
      days: daysList,
      spendDaily: Array(25).fill(0),
      conversionsDaily: Array(25).fill(0),
      pacingTargetLinear: Array(25).fill(0),
      pacingActualCumulative: Array(25).fill(0),
      networks: [
        { name: 'Search', value: 0 },
        { name: 'PMax', value: 0 },
        { name: 'YouTube', value: 0 },
        { name: 'Display', value: 0 }
      ],
      top10CampaignsNames: ['Nema kampanja'],
      top10CampaignsValues: [0],
      devicesCategories: ['Mobitel', 'Računalo', 'Tablet'],
      devicesValues: [0, 0, 0],
      locationsCategories: ['Nema lokacija'],
      locationsValues: [0],
      keywords: [],
      funnelStages: ['Klik na oglas', 'Dolazak na web', 'Dodavanje u košaricu', 'Kupnja'],
      funnelValues: [0, 0, 0, 0],
      alerts: []
    },
    status: 'Active'
  };

  clients.push(newClient);
  res.redirect('/');
});

// AI Assistant Streaming Chat Endpoint (SSE)
app.post('/api/chat', (req, res) => {
  const { message, history, clientId } = req.body;

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
      `- ${client.metaStats.cpaTrend.direction === 'down' ? 'Pad troškova je izvrstan rezultat. To nam govori da su kreativni materijali i dalje visoko relevantni publici i da algoritam uspješno pronalazi kupce.' : 'Blagi porast cijene sugerira da je došlo do zasićenja trenutne publike ili povećane konkurenciju na aukcijama.'}\n\n` +
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
      `- **CPA:** ${client.metaStats.cpa} (${client.metaStats.cpaTrend.direction === 'down' ? '↓ pad' : '↑ rast'} od ${client.metaStats.cpaTrend.value})\n` +
      `- **Organski doseg:** ${client.metaStats.organicReach}\n\n` +
      `Kako ti mogu pomoći danas? Možemo raspraviti o smanjenju CPA-a, usporedbi kanala ili analizi publike.`;
    suggestions = ['Kako smanjiti CPA?', 'Usporedi Meta i Google', 'Analiziraj publiku'];
  }

  // Stream thoughts first, with delays
  let currentThoughtIndex = 0;
  
  function sendThought() {
    if (currentThoughtIndex < thoughts.length) {
      res.write(`data: ${JSON.stringify({ type: 'THOUGHT', content: thoughts[currentThoughtIndex] })}\n\n`);
      currentThoughtIndex++;
      setTimeout(sendThought, 500); // 500ms delay between thoughts
    } else {
      sendResponseChunks();
    }
  }

  // Stream response in chunks
  let chunkIndex = 0;
  const chunkSize = 25; // characters per chunk
  
  function sendResponseChunks() {
    if (chunkIndex < responseText.length) {
      const chunk = responseText.slice(chunkIndex, chunkIndex + chunkSize);
      res.write(`data: ${JSON.stringify({ type: 'FINAL_RESPONSE', content: chunk })}\n\n`);
      chunkIndex += chunkSize;
      setTimeout(sendResponseChunks, 40); // 40ms typing delay
    } else {
      sendSuggestions();
    }
  }

  // Send suggestions and finish
  function sendSuggestions() {
    suggestions.forEach(sug => {
      res.write(`data: ${JSON.stringify({ type: 'SUGGESTION', content: sug })}\n\n`);
    });
    res.write('data: [DONE]\n\n');
    res.end();
  }

  // Start stream
  sendThought();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
