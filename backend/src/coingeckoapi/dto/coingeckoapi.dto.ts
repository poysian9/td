import { ApiTooManyRequestsResponse } from '@nestjs/swagger';

export class CoingeckoCryptoDataDto {
  name: string;
  tickers: tickers[];
}

export class tickers {
  base: string;
  target: string;
  market: market;
  last: number;
  volume: number;
  cost_to_move_up_usd: number;
  cost_to_move_down_usd: number;
  converted_last: converted_last;
  converted_volume: converted_volume;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string;
  coin_id: string;
  target_coin_id: string;
}

export class market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

export class converted_last {
  btc: number;
  eth: number;
  usd: number;
}

export class converted_volume {
  btc: number;
  eth: number;
  usd: number;
}

export class coinid {
  coinid: string;
}
