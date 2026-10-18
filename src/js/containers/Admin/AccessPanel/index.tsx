import React, { useCallback } from "react";
import Button from "@/components/Button";
import Panel from "@/components/Panel";
import { useToast } from "@/components/Toast/ToastContext";
import { useStore } from "@/store/StoreContext";

const AccessPanel: React.FunctionComponent = () => {
  const { resetAll } = useStore();
  const toast = useToast();

  const handleReset = useCallback(() => {
    if (
      !confirm(
        "Reset availability, projects and inbox to their seeded values?",
      )
    ) {
      return;
    }

    resetAll();
    toast("Prototype data reset");
  }, [resetAll, toast]);

  return (
    <Panel title="Prototype data">
      <Button variant="danger" size="sm" onClick={handleReset}>
        Reset prototype data
      </Button>
    </Panel>
  );
};

export default AccessPanel;
