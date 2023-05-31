import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NomicsDocument = Nomics & Document;

@Schema({ collection: 'nomics' })
export class Nomics {
  @Prop({ required: true, type: Number })
  circulating_supply: number;

  @Prop({ unique: true, required: true, type: String })
  currency: string;

  @Prop({ required: true, type: Number })
  high: number;

  @Prop({ required: true, type: String })
  high_timestamp: string;

  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  logo_url: string;

  @Prop({ required: true, type: Number })
  market_cap: number;

  @Prop({ required: true, type: Number })
  market_cap_dominance: number;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  rank: number;

  @Prop({ required: true, type: String })
  symbol: string;

  @Prop({ required: true, type: String })
  price_date: string;

  // @Prop({ required: true, type: Number })
  // '1h': {
  //   market_cap_change: number;
  //   market_cap_change_pct: number;
  //   price_change: number;
  //   price_change_pct: number;
  //   volume: number;
  //   volume_change: number;
  //   volume_change_pct: number;
  // };

  // @Prop({ required: true, type: Number })
  // '1d': {
  //   market_cap_change: number;
  //   market_cap_change_pct: number;
  //   price_change: number;
  //   price_change_pct: number;
  //   volume: number;
  //   volume_change: number;
  //   volume_change_pct: number;
  // };

  // @Prop({ required: true, type: Number })
  // '7d': {
  //   market_cap_change: number;
  //   market_cap_change_pct: number;
  //   price_change: number;
  //   price_change_pct: number;
  //   volume: number;
  //   volume_change: number;
  //   volume_change_pct: number;
  // };
}

export const NomicsSchema = SchemaFactory.createForClass(Nomics);
