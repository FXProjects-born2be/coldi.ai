export const TRADING_PLATFORMS_FAQ_IDS = [
  'forex-cfd-broker',
  'call-spikes-volatility',
  'mt4-mt5-crm',
  'trading-terminology',
  'verify-identity',
] as const;

export type TradingPlatformsFaqId = (typeof TRADING_PLATFORMS_FAQ_IDS)[number];
