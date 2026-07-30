export type WizardStepId =
  | "personal"
  | "complexity"
  | "beneficiaries"
  | "executor"
  | "guardians"
  | "assets"
  | "bequests"
  | "wishes"
  | "review";

export const STEP_LABELS: Record<WizardStepId, string> = {
  personal: "You",
  complexity: "Fit check",
  beneficiaries: "People",
  executor: "Executor",
  guardians: "Guardians",
  assets: "Assets",
  bequests: "Gifts",
  wishes: "Wishes",
  review: "Finish",
};

/** Short phase for the current step — helps people feel the arc, not just a counter. */
export function phaseForStep(stepId: WizardStepId): string {
  switch (stepId) {
    case "personal":
    case "complexity":
      return "Getting oriented";
    case "beneficiaries":
    case "executor":
    case "guardians":
      return "Who you trust";
    case "assets":
    case "bequests":
    case "wishes":
      return "What you leave";
    case "review":
      return "Your packet";
    default:
      return "In progress";
  }
}
