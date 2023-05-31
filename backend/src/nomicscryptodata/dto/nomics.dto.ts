export class NomicsCryptoDataDto {
  id: string;
  currency: string;
  symbol: string;
  name: string;
  logo_url: string;
  status: string;
  price: string;
  price_date: string;
  price_timestamp: string;
  circulating_supply: string;
  max_supply: string;
  market_cap: string;
  market_cap_dominance: string;
  num_exchanges: string;
  num_pairs: string;
  num_pairs_unmapped: string;
  first_candle: string;
  first_trade: string;
  first_order_book: string;
  rank: string;
  rank_delta: string;
  high: string;
  high_timestamp: string;
  '1h': oneHourDto;
  '1d': oneHourDto;
  '7d': oneHourDto;
  '30d': oneHourDto;
  '365d': oneHourDto;
  'ytd': oneHourDto;
}

export class oneHourDto {
  market_cap_change: string;
  market_cap_change_pct: string;
  price_change: string;
  price_change_pct: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export class oneDayDto {
  market_cap_change: string;
  market_cap_change_pct: string;
  price_change: string;
  price_change_pct: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export class SevenDayDto {
  market_cap_change: string;
  market_cap_change_pct: string;
  price_change: string;
  price_change_pct: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export class ThirtyDayDto {
  market_cap_change: string;
  market_cap_change_pct: string;
  price_change: string;
  price_change_pct: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export class oneYearDto {
  market_cap_change: string;
  market_cap_change_pct: string;
  price_change: string;
  price_change_pct: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}

export class YeartoDateDto {
  market_cap_change: string;
  market_cap_change_pct: string;
  price_change: string;
  price_change_pct: string;
  volume: string;
  volume_change: string;
  volume_change_pct: string;
}
