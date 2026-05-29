import { memo } from 'react';
import TypingPlaceholder from './TypingPlaceholder';

/** Shown while waiting for the first model token — typewriter placeholder + pulse. */
const EmptyText = memo(function EmptyText() {
  return <TypingPlaceholder />;
});

EmptyText.displayName = 'EmptyText';

export default EmptyText;
