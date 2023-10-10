import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessariDocument = Messari & Document;

@Schema({ collection: 'messariData' })
export class Messari {
  @Prop({ type: String })
  symbol: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  sector: string;

  @Prop({ type: String })
  project_details: string;

  @Prop({ type: String })
  token_type: string;

  @Prop({ type: String })
  token_usage: string;

  @Prop({ type: String })
  token_usage_details: string;

  @Prop({ type: String })
  technology_details: string;

  @Prop({ type: String })
  general_consensus_mechanism: string;
}

export const MessariDataSchema = SchemaFactory.createForClass(Messari);
