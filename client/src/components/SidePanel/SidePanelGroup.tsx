import { useState, memo } from 'react';
import { useDefaultLayout } from 'react-resizable-panels';
import { ResizablePanel, ResizablePanelGroup, useMediaQuery } from '@librechat/client';
import ArtifactsPanel from './ArtifactsPanel';
import { OperationRightPanel } from './NanobaseOperation';

const PANEL_IDS_SINGLE = ['messages-view'];
const PANEL_IDS_ARTIFACTS = ['messages-view', 'artifacts-panel'];
const PANEL_IDS_OPERATION = ['messages-view', 'operation-panel'];

interface SidePanelProps {
  artifacts?: React.ReactNode;
  operationPanel?: React.ReactNode;
  children: React.ReactNode;
}

const SidePanelGroup = memo(({ artifacts, operationPanel, children }: SidePanelProps) => {
  const rightPanel = operationPanel ?? artifacts;
  const [shouldRenderRight, setShouldRenderRight] = useState(rightPanel != null);
  const isSmallScreen = useMediaQuery('(max-width: 767px)');

  const panelIds =
    operationPanel != null
      ? PANEL_IDS_OPERATION
      : artifacts != null
        ? PANEL_IDS_ARTIFACTS
        : PANEL_IDS_SINGLE;

  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: 'side-panel-layout',
    panelIds,
    storage: localStorage,
  });

  const minSizeMain = rightPanel != null ? '15' : '30';

  return (
    <>
      <ResizablePanelGroup
        orientation="horizontal"
        defaultLayout={defaultLayout}
        onLayoutChanged={onLayoutChanged}
        className="relative flex-1 bg-transparent"
      >
        <ResizablePanel defaultSize="50" minSize={minSizeMain} id="messages-view">
          {children}
        </ResizablePanel>

        {!isSmallScreen && operationPanel != null && (
          <OperationRightPanel
            operationPanel={operationPanel}
            minSizeMain={minSizeMain}
            shouldRender={shouldRenderRight}
            onRenderChange={setShouldRenderRight}
          />
        )}

        {!isSmallScreen && operationPanel == null && (
          <ArtifactsPanel
            artifacts={artifacts}
            minSizeMain={minSizeMain}
            shouldRender={shouldRenderRight}
            onRenderChange={setShouldRenderRight}
          />
        )}
      </ResizablePanelGroup>
      {rightPanel != null && isSmallScreen && (
        <div className="fixed inset-0 z-[100]">{rightPanel}</div>
      )}
    </>
  );
});

SidePanelGroup.displayName = 'SidePanelGroup';

export default SidePanelGroup;
