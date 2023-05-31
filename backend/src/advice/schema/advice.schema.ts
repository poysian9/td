import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type adviceCSVDocument = adviceCSV & Document;

@Schema({ collection: 'research' })
export class adviceCSV {
  @Prop({ required: true, type: String })
  Market_or_Asset: string;

  @Prop({ required: true, type: String })
  Specificity: string;

  @Prop({ required: true, type: String })
  CB_Listed: string;

  @Prop({ required: true, type: String })
  Regulatory_Req: string;

  @Prop({ required: true, type: String })
  Facts_Data: string;

  @Prop({ required: true, type: String })
  Opinions: string;

  @Prop({ required: true, type: String })
  Risk_Mitigation_Trade_Recommendations: string;

  @Prop({ required: true, type: String })
  General_Advice_RG244: string;

  @Prop({ required: true, type: String })
  Personal_Advice_RG244: string;
}

export const adviceCSVSchema = SchemaFactory.createForClass(adviceCSV);
