// mock-data.js — MailIntel
// Reference spec. Copy into index.html — do not import directly.
// Rule: NEVER hardcode Shopify data outside of this file.

const MOCK_SHOPIFY_DATA = {
  store_name: 'Verdant Supply Co.',
  period:     'Last 7 days',
  currency:   'USD',

  summary: {
    total_revenue:       4820,
    orders:              67,
    avg_order_value:     71.94,
    revenue_change_pct:  12.4,
  },

  top_products: [
    {
      id:          'prod_001',
      title:       'Canvas Tote — Natural',
      sku:         'CT-NAT-001',
      units_sold:  43,
      revenue:     1548,
      inventory:   12,
      trend:       'rising',
      change_pct:  34.2,
      insight:     'High velocity, low stock — reorder risk within 4 days',
    },
    {
      id:          'prod_002',
      title:       'Eco-Pins Bundle (5pk)',
      sku:         'EP-BND-005',
      units_sold:  8,
      revenue:     216,
      inventory:   340,
      trend:       'declining',
      change_pct:  -18.5,
      insight:     'High stock, slowing sales — strong upsell candidate with tote purchases',
    },
    {
      id:          'prod_003',
      title:       'Beeswax Wrap Set',
      sku:         'BW-SET-003',
      units_sold:  16,
      revenue:     528,
      inventory:   89,
      trend:       'stable',
      change_pct:  2.1,
      insight:     'Steady performer — seasonal opportunity in summer picnic category',
    },
  ],

  alerts: [
    { type: 'reorder',     product: 'Canvas Tote — Natural', urgency: 'high'   },
    { type: 'opportunity', product: 'Eco-Pins Bundle',       urgency: 'medium' },
  ],

  customer_segments: {
    repeat_buyers: 142,
    lapsed_30d:    89,
    new_this_week: 23,
  },
};

// Email audience picker — maps to customer_segments above
const AUDIENCE_SEGMENTS = {
  all:    { label: 'All contacts',  count: 142 + 89 + 23 }, // 254
  repeat: { label: 'Repeat buyers', count: 142 },
  lapsed: { label: 'Lapsed 30d',   count: 89  },
  new:    { label: 'New this week', count: 23  },
};

// Shopify Live Mode — fetchShopifyData() returns the same shape as MOCK_SHOPIFY_DATA
// so agents work identically in both modes. See index.html → fetchShopify().
