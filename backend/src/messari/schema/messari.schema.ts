import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessariSchemaDocument = MessariSchema & Document;

@Schema({ collection: 'messari' })
export class MessariSchema {
  @Prop({ type: String })
  symbol: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  tagline: string;

  @Prop({ type: String })
  category: string;

  @Prop({ type: String })
  sector: string;

  @Prop({ type: String })
  project_details: string;

  @Prop({ type: String })
  regulatory_details: string;

  @Prop({ type: String })
  sfar_score: number;

  @Prop({ type: String })
  sfar_summary: string;

  @Prop({ type: String })
  token_type: string;

  @Prop({ type: String })
  token_usage: string;

  @Prop({ type: String })
  token_usage_details: string;

  @Prop({ type: String })
  general_emission_type: string;

  @Prop({ type: String })
  precise_emission_type: string;

  @Prop({ type: String })
  is_capped_supply: boolean;

  @Prop({ type: String })
  max_supply: number;

  @Prop({ type: String })
  general_consensus_mechanism: string;

  @Prop({ type: String })
  technology_details: string;

  @Prop({ type: String })
  governance_details: string;
}

export const MessariDataSchema = SchemaFactory.createForClass(MessariSchema);
