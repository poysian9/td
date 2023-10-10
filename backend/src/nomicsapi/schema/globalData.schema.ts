import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GlobalDataDocument = GlobalData & Document;

@Schema({ collection: 'globalData' })
export class GlobalData {
  @Prop({ required: true, type: Number })
  total_market_cap: number;

  @Prop({ required: true, type: Number })
  market_cap_percentage: number;

  @Prop({ required: true, type: Number })
  market_cap_change_pct: number;
}

export const GlobalDataSchema = SchemaFactory.createForClass(GlobalData);