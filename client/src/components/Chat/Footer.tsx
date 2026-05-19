import React, { memo } from 'react';
import { useGetStartupConfig } from '~/data-provider';
import { useLocalize } from '~/hooks';

function Footer({ className }: { className?: string }) {
  const { data: config } = useGetStartupConfig();
  const localize = useLocalize();

  const privacyPolicy = config?.interface?.privacyPolicy;
  const termsOfService = config?.interface?.termsOfService;

  const privacyPolicyRender = privacyPolicy?.externalUrl != null && (
    <a className="text-text-secondary underline hover:text-text-primary" href={privacyPolicy.externalUrl} rel="noreferrer">
      {localize('com_ui_privacy_policy')}
    </a>
  );

  const termsOfServiceRender = termsOfService?.externalUrl != null && (
    <a className="text-text-secondary underline hover:text-text-primary" href={termsOfService.externalUrl} rel="noreferrer">
      {localize('com_ui_terms_of_service')}
    </a>
  );

  const footerElements = [privacyPolicyRender, termsOfServiceRender].filter(Boolean);

  if (footerElements.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <div
        className={
          className ??
          'absolute bottom-0 left-0 right-0 hidden flex-col items-center gap-1 px-2 py-2 text-center text-xs sm:flex md:px-[60px]'
        }
        role="contentinfo"
      >
        <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg border border-white/10 bg-[rgba(15,29,50,0.85)] px-3 py-1.5 text-text-secondary backdrop-blur-md">
          {footerElements.map((contentRender, index) => {
            const isLastElement = index === footerElements.length - 1;
            return (
              <React.Fragment key={`footer-element-${index}`}>
                {contentRender}
                {!isLastElement && (
                  <div
                    key={`separator-${index}`}
                    className="h-2 border-r border-border-medium"
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MemoizedFooter = memo(Footer);
MemoizedFooter.displayName = 'Footer';

export default MemoizedFooter;
