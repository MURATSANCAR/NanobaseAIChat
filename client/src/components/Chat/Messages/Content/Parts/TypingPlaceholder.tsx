import { memo, useEffect, useState } from 'react';
import { useMessageContext } from '~/Providers';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

const CHAR_INTERVAL_MS = 28;

function useTypewriter(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active || !text) {
      setDisplayed('');
      return;
    }

    setDisplayed('');
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(timer);
      }
    }, CHAR_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [active, text]);

  return displayed;
}

const TypingPlaceholder = memo(function TypingPlaceholder({ className }: { className?: string }) {
  const localize = useLocalize();
  const { isSubmitting = false } = useMessageContext();
  const phrase = localize('com_ui_composing_placeholder');
  const displayed = useTypewriter(phrase, isSubmitting);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        'text-message flex min-h-[20px] flex-col items-start gap-3 overflow-visible',
        className,
      )}
    >
      <div className="markdown prose dark:prose-invert light w-full max-w-full break-words">
        <p className="submitting relative mb-0 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <span>{displayed}</span>
          {isSubmitting && <span className="nb-typing-cursor ml-0.5 inline-block" aria-hidden="true" />}
        </p>
      </div>
    </div>
  );
});

TypingPlaceholder.displayName = 'TypingPlaceholder';

export default TypingPlaceholder;
