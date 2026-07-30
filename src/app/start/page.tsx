"use client";

import { WizardProvider } from "@/components/wizard/WizardContext";
import { WizardShell } from "@/components/wizard/WizardShell";

export default function StartPage() {
  return (
    <WizardProvider>
      <WizardShell />
    </WizardProvider>
  );
}
