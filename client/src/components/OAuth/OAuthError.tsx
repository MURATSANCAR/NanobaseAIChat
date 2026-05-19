import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalize } from '~/hooks';
import { StandaloneThemeShell } from '~/components/Theme';
import { nbGlassCard, nbRainbowBtn, nbStandaloneCenter } from '~/components/Theme/styles';

export default function OAuthError() {
  const localize = useLocalize();
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error') || 'unknown_error';

  const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'missing_code':
        return (
          localize('com_ui_oauth_error_missing_code') ||
          'Authorization code is missing. Please try again.'
        );
      case 'missing_state':
        return (
          localize('com_ui_oauth_error_missing_state') ||
          'State parameter is missing. Please try again.'
        );
      case 'invalid_state':
        return (
          localize('com_ui_oauth_error_invalid_state') ||
          'Invalid state parameter. Please try again.'
        );
      case 'callback_failed':
        return (
          localize('com_ui_oauth_error_callback_failed') ||
          'Authentication callback failed. Please try again.'
        );
      default:
        return localize('com_ui_oauth_error_generic') || errorCode.replace(/_/g, ' ');
    }
  };

  return (
    <StandaloneThemeShell>
      <div className={nbStandaloneCenter}>
        <div className={`w-full max-w-md ${nbGlassCard}`}>
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <svg
                className="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-text-primary">
            {localize('com_ui_oauth_error_title') || 'Authentication Failed'}
          </h1>
          <p className="mb-6 text-sm text-text-secondary">{getErrorMessage(error)}</p>
          <button
            type="button"
            onClick={() => window.close()}
            className={`rounded-xl px-4 py-2 text-sm font-medium ${nbRainbowBtn}`}
            aria-label={localize('com_ui_close_window') || 'Close Window'}
          >
            {localize('com_ui_close_window') || 'Close Window'}
          </button>
        </div>
      </div>
    </StandaloneThemeShell>
  );
}
