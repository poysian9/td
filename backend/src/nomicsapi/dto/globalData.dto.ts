// Define the GlobalDataDto interface
export class GlobalDataDto {
    data: {
        total_market_cap: USD;
        market_cap_percentage: BTC
        market_cap_change_percentage_24h_usd: number;
  }
};
export interface USD {
    usd: number;
}
export interface BTC {
    btc: number;
}