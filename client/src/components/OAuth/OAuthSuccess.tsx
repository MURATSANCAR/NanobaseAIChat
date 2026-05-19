import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalize } from '~/hooks';
import { StandaloneThemeShell } from '~/components/Theme';
import { nbGlassCard, nbStandaloneCenter } from '~/components/Theme/styles';

export default function OAuthSuccess() {
  const localize = useLocalize();
  const [searchParams] = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(3);
  const serverName = searchParams.get('serverName');

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          window.close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <StandaloneThemeShell>
      <div className={nbStandaloneCenter}>
        <div className={`w-full max-w-md ${nbGlassCard}`}>
          <h1 className="mb-4 text-3xl font-bold text-text-primary">
            {localize('com_ui_oauth_success_title') || 'Authentication Successful'}
          </h1>
          <p className="mb-2 text-sm text-text-secondary">
            {localize('com_ui_oauth_success_description') ||
              'Your authentication was successful. This window will close in'}{' '}
            <span className="font-medium text-sky-400">{secondsLeft}</span>{' '}
            {localize('com_ui_seconds') || 'seconds'}.
          </p>
          {serverName && (
            <p className="mt-4 text-xs text-text-secondary">
              {localize('com_ui_oauth_connected_to') || 'Connected to'}:{' '}
              <span className="font-medium text-text-primary">{serverName}</span>
            </p>
          )}
        </div>
      </div>
    </StandaloneThemeShell>
  );
}
