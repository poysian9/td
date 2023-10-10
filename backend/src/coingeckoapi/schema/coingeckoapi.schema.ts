import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type coingeckoDocument = coingecko & Document;

@Schema({ collection: 'coingecko' })
export class coingecko {
  @Prop({ required: true, type: String })
  exchange: string;

  @Prop({ required: true, type: String })
  base: string;

  @Prop({ required: true, type: String })
  target: string;

  @Prop({ required: true, type: Number })
  volume: number;

  @Prop({ required: true, type: Number })
  cost_to_move_up_usd: number;

  @Prop({ required: true, type: Number })
  cost_to_move_down_usd: number;

  @Prop({ required: true, type: String })
  coin_id: string;

  @Prop({ required: true, type: String })
  target_coin_id: string;
  
  @Prop({ required: true, type: Number })
  spread: number;
}

export const coingeckoSchema = SchemaFactory.createForClass(coingecko);
coingeckoSchema.index({ exchange: 1, base: 1, target: 1 }, { unique: true });
