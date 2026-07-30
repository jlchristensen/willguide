"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  emptyDraft,
  type EstatePlanDraft,
} from "@/lib/schema";
import { loadDraft, saveDraft } from "@/lib/storage";

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

const BASE_STEPS: WizardStepId[] = [
  "personal",
  "complexity",
  "beneficiaries",
  "executor",
  "guardians",
  "assets",
  "bequests",
  "wishes",
  "review",
];

type WizardContextValue = {
  draft: EstatePlanDraft;
  setDraft: (updater: (prev: EstatePlanDraft) => EstatePlanDraft) => void;
  stepIndex: number;
  stepId: WizardStepId;
  steps: WizardStepId[];
  next: () => void;
  back: () => void;
  goTo: (id: WizardStepId) => void;
  progress: number;
};

const WizardContext = createContext<WizardContextValue | null>(null);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [draft, setDraftState] = useState<EstatePlanDraft>(emptyDraft);
  const [stepIndex, setStepIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadDraft();
    if (saved) setDraftState(saved);
    setHydrated(true);
  }, []);

  const setDraft = useCallback(
    (updater: (prev: EstatePlanDraft) => EstatePlanDraft) => {
      setDraftState((prev) => {
        const next = updater(prev);
        saveDraft(next);
        return next;
      });
    },
    []
  );

  const steps = useMemo(() => {
    if (draft.personal.hasMinorChildren) return BASE_STEPS;
    return BASE_STEPS.filter((s) => s !== "guardians");
  }, [draft.personal.hasMinorChildren]);

  // Keep index valid when guardians step disappears
  useEffect(() => {
    if (stepIndex > steps.length - 1) {
      setStepIndex(steps.length - 1);
    }
  }, [steps, stepIndex]);

  const stepId = steps[Math.min(stepIndex, steps.length - 1)];

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));
  const goTo = (id: WizardStepId) => {
    const idx = steps.indexOf(id);
    if (idx >= 0) setStepIndex(idx);
  };

  const progress = ((stepIndex + 1) / steps.length) * 100;

  const value: WizardContextValue = {
    draft,
    setDraft,
    stepIndex,
    stepId,
    steps,
    next,
    back,
    goTo,
    progress,
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-ink-soft">
        Loading your guide…
      </div>
    );
  }

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used within WizardProvider");
  return ctx;
}
