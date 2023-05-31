import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NomicsCryptoDataDocument = NomicsCryptoData & Document;

@Schema()
export class oneHourData {
  @Prop({ type: String })
  market_cap_change: String;
  @Prop({ type: String })
  market_cap_change_pct: String;
  @Prop({ type: String })
  price_change: String;
  @Prop({ type: String })
  price_change_pct: String;
  @Prop({ type: String })
  volume: String;
  @Prop({ type: String })
  volume_change: String;
  @Prop({ type: String })
  volume_change_pct: String;
}
@Schema()
export class oneDayData {
  @Prop({ type: String })
  market_cap_change: String;
  @Prop({ type: String })
  market_cap_change_pct: String;
  @Prop({ type: String })
  price_change: String;
  @Prop({ type: String })
  price_change_pct: String;
  @Prop({ type: String })
  volume: String;
  @Prop({ type: String })
  volume_change: String;
  @Prop({ type: String })
  volume_change_pct: String;
}
@Schema()
export class sevenDayData {
  @Prop({ type: String })
  market_cap_change: String;
  @Prop({ type: String })
  market_cap_change_pct: String;
  @Prop({ type: String })
  price_change: String;
  @Prop({ type: String })
  price_change_pct: String;
  @Prop({ type: String })
  volume: String;
  @Prop({ type: String })
  volume_change: String;
  @Prop({ type: String })
  volume_change_pct: String;
}
@Schema()
export class thirtyDayData {
  @Prop({ type: String })
  market_cap_change: String;
  @Prop({ type: String })
  market_cap_change_pct: String;
  @Prop({ type: String })
  price_change: String;
  @Prop({ type: String })
  price_change_pct: String;
  @Prop({ type: String })
  volume: String;
  @Prop({ type: String })
  volume_change: String;
  @Prop({ type: String })
  volume_change_pct: String;
}
@Schema()
export class oneYearData {
  @Prop({ type: String })
  market_cap_change: String;
  @Prop({ type: String })
  market_cap_change_pct: String;
  @Prop({ type: String })
  price_change: String;
  @Prop({ type: String })
  price_change_pct: String;
  @Prop({ type: String })
  volume: String;
  @Prop({ type: String })
  volume_change: String;
  @Prop({ type: String })
  volume_change_pct: String;
}
@Schema()
export class yearToDateData {
  @Prop({ type: String })
  market_cap_change: String;
  @Prop({ type: String })
  market_cap_change_pct: String;
  @Prop({ type: String })
  price_change: String;
  @Prop({ type: String })
  price_change_pct: String;
  @Prop({ type: String })
  volume: String;
  @Prop({ type: String })
  volume_change: String;
  @Prop({ type: String })
  volume_change_pct: String;
}

@Schema({ collection: 'nomics' })
export class NomicsCryptoData {
  @Prop({ type: String })
  circulating_supply: string;

  @Prop({ type: String })
  max_supply: string;

  @Prop({ type: String })
  currency: string;

  @Prop({ type: String })
  high: string;

  @Prop({ type: String })
  high_timestamp: string;

  @Prop({ unique: true, required: true, type: String })
  id: string;

  @Prop({ type: String })
  logo_url: string;

  @Prop({ type: String })
  market_cap: string;

  @Prop({ type: String })
  market_cap_dominance: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  price: string;

  @Prop({ type: String })
  rank: string;

  @Prop({ type: String })
  symbol: string;

  @Prop({ type: String })
  price_date: string;

  @Prop({ type: oneHourData })
  onehour: oneHourData;

  @Prop({ type: oneDayData })
  oneday: oneDayData;

  @Prop({ type: sevenDayData })
  sevenday: sevenDayData;

  @Prop({ type: thirtyDayData })
  thirtyday: thirtyDayData;

  @Prop({ type: oneYearData })
  oneyear: oneYearData;

  @Prop({ type: yearToDateData })
  ytd: yearToDateData;
}

export const NomicsCryptoDataSchema =
  SchemaFactory.createForClass(NomicsCryptoData);
