import { Document } from 'mongoose';

export interface IGdm extends Document {
  // Step 1
  patientId: string;
  name: string;
  age: string;
  maritalStatus: 'married' | 'unmarried';
  height: string;
  weight: string;
  occupation: string;
  familyIncome: string;
  address: string;
  phone: string;
  emergencyContact: string;

  // Step 2
  diabetesKnownSince?: 'before_pregnancy' | 'during_pregnancy' | 'custom';
  diabetesDuration?: string;
  insulin?: 'yes' | 'no';
  comorbidity?: string;

  deliveryTimeInWeek?: string;
  deliveryType?: 'normal' | 'c-section';
  babyWeight?: string;
  BabyNICUNeed?: 'yes' | 'no';
  sugarLevel2to3DayAfterDelivery?: string;

  // OGTT at 6 weeks
  ogttDoneAt6Weeks?: 'yes' | 'no';
  ogttFastingValue?: string;
  ogtt2HourValue?: string;

  createdAt?: Date;
  updatedAt?: Date;
}
