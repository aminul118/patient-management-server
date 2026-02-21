import { z } from 'zod';

const createInfertilityValidationSchema = z.object({
  patientId: z.string({
    required_error: 'Patient ID is required',
  }),
  name: z.string({
    required_error: 'Name is required',
  }),
  age: z.string({
    required_error: 'Age is required',
  }),
  maritalStatus: z.enum(['married', 'unmarried'], {
    required_error: 'Marital Status is required',
  }),
  height: z.string({
    required_error: 'Height is required',
  }),
  weight: z.string({
    required_error: 'Weight is required',
  }),
  occupation: z.string({
    required_error: 'Occupation is required',
  }),
  familyIncome: z.string({
    required_error: 'Family Income is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
  phone: z.string({
    required_error: 'Phone Number is required',
  }),
  emergencyContact: z.string().optional(),
  diabetesKnownSince: z
    .enum(['before_pregnancy', 'during_pregnancy', 'custom'])
    .optional(),
  diabetesDuration: z.string().optional(),
  insulin: z.enum(['yes', 'no']).optional(),
  comorbidity: z.string().optional(),
  complication: z.string().optional(),
  counselingDate: z
    .string()
    .or(z.date())
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  deliveryTimeInWeek: z.string().optional(),
  deliveryType: z.enum(['normal', 'c-section']).optional(),
  babyWeight: z.string().optional(),
  BabyNICUNeed: z.enum(['yes', 'no']).optional(),
  sugarLevel2to3DayAfterDelivery: z.string().optional(),

  // OGTT at 6 weeks
  ogttDoneAt6Weeks: z.enum(['yes', 'no']).optional(),
  ogttFastingValue: z.string().optional(),
  ogtt2HourValue: z.string().optional(),
});

const updateInfertilityValidationSchema = z.object({
  patientId: z.string().optional(),
  name: z.string().optional(),
  age: z.string().optional(),
  maritalStatus: z.enum(['married', 'unmarried']).optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  occupation: z.string().optional(),
  familyIncome: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  emergencyContact: z.string().optional(),
  diabetesKnownSince: z
    .enum(['before_pregnancy', 'during_pregnancy', 'custom'])
    .optional(),
  diabetesDuration: z.string().optional(),
  insulin: z.enum(['yes', 'no']).optional(),
  comorbidity: z.string().optional(),
  complication: z.string().optional(),
  counselingDate: z
    .string()
    .or(z.date())
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),

  deliveryTimeInWeek: z.string().optional(),
  deliveryType: z.enum(['normal', 'c-section']).optional(),
  babyWeight: z.string().optional(),
  BabyNICUNeed: z.enum(['yes', 'no']).optional(),
  sugarLevel2to3DayAfterDelivery: z.string().optional(),

  // OGTT at 6 weeks
  ogttDoneAt6Weeks: z.enum(['yes', 'no']).optional(),
  ogttFastingValue: z.string().optional(),
  ogtt2HourValue: z.string().optional(),
});

export const InfertilityValidation = {
  createInfertilityValidationSchema,
  updateInfertilityValidationSchema,
};
