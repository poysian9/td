// Define the NomicsCryptoDataDto interface
export class NomicsCryptoDataDto {
  id: string;
  symbol: string;
  name: string;
  image: string; 
  current_price: number;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number;
  max_supply: number;
  circulating_supply: number;
  ath: number;
  ath_date: string;
  ath_change_percentage: number;
  atl: number;
  atl_date: string;
  atl_change_percentage: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_14d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  last_updated: string;
};

