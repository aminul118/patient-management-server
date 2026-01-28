import { model, Schema } from 'mongoose';
import { IGdm } from './grm.interface';

export const GdmSchema = new Schema<IGdm>(
  {
    // Step 1
    patientId: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ['married', 'unmarried'],
      required: true,
    },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    occupation: { type: String, required: true },
    familyIncome: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    emergencyContact: { type: String, required: true },

    // Step 2
    diabetesKnownSince: {
      type: String,
      enum: ['before_pregnancy', 'during_pregnancy', 'custom'],
    },
    diabetesDuration: { type: String },
    insulin: {
      type: String,
      enum: ['yes', 'no'],
    },
    comorbidity: { type: String },

    deliveryTimeInWeek: { type: String },
    deliveryType: {
      type: String,
      enum: ['normal', 'c-section'],
    },
    babyWeight: { type: String },
    BabyNICUNeed: {
      type: String,
      enum: ['yes', 'no'],
    },
    sugarLevel2to3DayAfterDelivery: { type: String },

    // OGTT at 6 weeks
    ogttDoneAt6Weeks: {
      type: String,
      enum: ['yes', 'no'],
    },
    ogttFastingValue: { type: String },
    ogtt2HourValue: { type: String },
  },
  { timestamps: true, versionKey: false },
);

const Gdm = model<IGdm>('Gdm', GdmSchema);

export { Gdm };
