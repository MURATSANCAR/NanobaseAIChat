/**
 * Agent Marketplace is hidden from NanobaseAI navigation.
 * Routes under `/agents` remain for direct links; the sidebar menu entry is not shown.
 */
export default function useShowMarketplace(): boolean {
  return false;
}
