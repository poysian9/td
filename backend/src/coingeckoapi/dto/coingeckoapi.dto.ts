export class CoingeckoCryptoDataDto {
  name: string;
  tickers: tickers[];
}

export interface tickers {
  base: string;
  target: string;
  volume: number;
  cost_to_move_up_usd: number;
  cost_to_move_down_usd: number;
  coin_id: string;
  target_coin_id: string;
  bid_ask_spread_percentage: number;
}

