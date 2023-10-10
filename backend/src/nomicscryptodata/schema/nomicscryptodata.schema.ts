import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NomicsCryptoDataDocument = NomicsCryptoData & Document;

@Schema({ collection: 'cryptoData' })
export class NomicsCryptoData {
  @Prop({ unique: true, required: true, type: String })
  id: string;

  @Prop({ type: String })
  symbol: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  logo_url: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  volume_24h: number;

  @Prop({ type: Number })
  market_cap: number;

  @Prop({ type: Number })
  rank: number;

  @Prop({ type: Number })
  max_supply: number;

  @Prop({ type: Number })
  circulating_supply: number;

  @Prop({ type: Number })
  high: number;

  @Prop({ type: String })
  high_timestamp: string;

  @Prop({ type: Number })
  high_change_percentage: number;  

  @Prop({ type: Number })
  low: number;

  @Prop({ type: String })
  low_timestamp: string;

  @Prop({ type: Number })
  low_change_percentage: number;  

  @Prop({ type: Number })
  price_change_24h: number;

  @Prop({ type: Number })
  price_change_percentage_24h: number;

  @Prop({ type: Number })
  price_change_percentage_1h: number;

  @Prop({ type: Number })
  price_change_percentage_7d: number;
  
  @Prop({ type: Number })
  price_change_percentage_14d: number;
  
  @Prop({ type: Number })
  price_change_percentage_30d: number;
  
  @Prop({ type: Number })
  price_change_percentage_1y: number;

  @Prop({ type: Number })
  market_cap_change_24h: number;

  @Prop({ type: Number })
  market_cap_change_percentage_24h: number;
  
  @Prop({ type: String })
  price_date: string;
}

export const NomicsCryptoDataSchema =
  SchemaFactory.createForClass(NomicsCryptoData);
