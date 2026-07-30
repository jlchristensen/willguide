export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC",
] as const;

export type USState = (typeof US_STATES)[number];

export type MaritalStatus = "single" | "married" | "divorced" | "widowed" | "partnered";

export type PersonRef = {
  fullName: string;
  relationship: string;
  cityState?: string;
};

export type Beneficiary = PersonRef & {
  id: string;
  sharePercent?: number;
};

export type Asset = {
  id: string;
  category: "home" | "bank" | "investment" | "vehicle" | "personal" | "other";
  description: string;
  estimatedValue?: string;
};

export type Bequest = {
  id: string;
  description: string;
  recipientName: string;
};

export type ComplexityFlags = {
  ownsBusiness: boolean;
  foreignAssets: boolean;
  largeEstate: boolean;
  blendedFamilyConflict: boolean;
  specialNeedsDependent: boolean;
};

export type EstatePlanDraft = {
  personal: {
    fullName: string;
    city: string;
    state: USState | "";
    county?: string;
    maritalStatus: MaritalStatus | "";
    spouseName?: string;
    hasMinorChildren: boolean;
  };
  complexity: ComplexityFlags;
  beneficiaries: Beneficiary[];
  residueDistribution: "equal_beneficiaries" | "custom";
  executor: PersonRef;
  alternateExecutor: PersonRef;
  guardian?: PersonRef;
  alternateGuardian?: PersonRef;
  assets: Asset[];
  bequests: Bequest[];
  wishes: {
    pets?: string;
    funeral?: string;
    other?: string;
  };
  email?: string;
};

export const emptyDraft = (): EstatePlanDraft => ({
  personal: {
    fullName: "",
    city: "",
    state: "",
    county: "",
    maritalStatus: "",
    spouseName: "",
    hasMinorChildren: false,
  },
  complexity: {
    ownsBusiness: false,
    foreignAssets: false,
    largeEstate: false,
    blendedFamilyConflict: false,
    specialNeedsDependent: false,
  },
  beneficiaries: [],
  residueDistribution: "equal_beneficiaries",
  executor: { fullName: "", relationship: "" },
  alternateExecutor: { fullName: "", relationship: "" },
  guardian: { fullName: "", relationship: "" },
  alternateGuardian: { fullName: "", relationship: "" },
  assets: [],
  bequests: [],
  wishes: {},
});

export function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function hasComplexityFlags(flags: ComplexityFlags): boolean {
  return Object.values(flags).some(Boolean);
}

export function isDraftReadyForGenerate(draft: EstatePlanDraft): string[] {
  const errors: string[] = [];
  if (!draft.personal.fullName.trim()) errors.push("Your full name is required.");
  if (!draft.personal.city.trim()) errors.push("Your city is required.");
  if (!draft.personal.state) errors.push("Your state is required.");
  if (!draft.personal.maritalStatus) errors.push("Marital status is required.");
  if (draft.beneficiaries.length === 0) errors.push("Add at least one beneficiary.");
  if (!draft.executor.fullName.trim()) errors.push("An executor is required.");
  if (
    draft.personal.hasMinorChildren &&
    !draft.guardian?.fullName.trim()
  ) {
    errors.push("A guardian for minor children is required.");
  }
  return errors;
}
