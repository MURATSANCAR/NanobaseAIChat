import { useEffect, memo } from 'react';
import { usePanelRef } from 'react-resizable-panels';
import { ResizableHandleAlt, ResizablePanel } from '@librechat/client';

interface OperationRightPanelProps {
  operationPanel: React.ReactNode | null;
  minSizeMain: string;
  shouldRender: boolean;
  onRenderChange: (shouldRender: boolean) => void;
}

const OperationRightPanel = memo(function OperationRightPanel({
  operationPanel,
  minSizeMain,
  shouldRender,
  onRenderChange,
}: OperationRightPanelProps) {
  const panelRef = usePanelRef();

  useEffect(() => {
    if (operationPanel != null) {
      onRenderChange(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panelRef.current?.expand();
        });
      });
    } else if (shouldRender) {
      onRenderChange(false);
    }
  }, [operationPanel, shouldRender, onRenderChange, panelRef]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {operationPanel != null && (
        <ResizableHandleAlt withHandle className="bg-border-medium text-text-primary" />
      )}
      <ResizablePanel
        defaultSize="45"
        maxSize="70"
        collapsedSize="0"
        collapsible={true}
        minSize={minSizeMain}
        panelRef={panelRef}
        id="operation-panel"
      >
        <div className="h-full min-w-[380px] overflow-hidden">{operationPanel}</div>
      </ResizablePanel>
    </>
  );
});

OperationRightPanel.displayName = 'OperationRightPanel';

export default OperationRightPanel;
