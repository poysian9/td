import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CSVDocument = CSV & Document;

@Schema({ collection: 'database' })
export class CSV {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ unique: true, required: true, type: String })
  ticker: string;

  @Prop({ required: true, type: String })
  nomicsid: string;

  @Prop({ required: true, type: String })
  coingeckoid: string;

  @Prop({ required: true, type: String })
  statuses: string;

  @Prop({ required: true, type: String })
  statusreasoning: string;

  @Prop({ required: true, type: String })
  primarysector: string;

  @Prop({ required: true, type: String })
  secondarysector: string;

  @Prop({ required: true, type: String })
  factsdata: string;

  @Prop({ required: true, type: String })
  opinions: string;

  @Prop({ required: true, type: String })
  rmtr: string;

  @Prop({ required: true, type: String })
  format: string;

  @Prop({ required: true, type: String })
  coingeckolink: string;

  @Prop({ required: true, type: String })
  assetdescription: string;

  @Prop({ required: true, type: String })
  tokendescription: string;

  @Prop({ required: true, type: String })
  watchlist: string;

  @Prop({ required: true, type: String })
  messari: string;
}

export const CSVSchema = SchemaFactory.createForClass(CSV);
