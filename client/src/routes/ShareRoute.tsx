import ShareView from '~/components/Share/ShareView';
import { PartnerCornerBadge } from '~/components/Branding';
import { AppChromeFooter, StandaloneThemeShell } from '~/components/Theme';

export default function ShareRoute() {
  return (
    <StandaloneThemeShell>
      <PartnerCornerBadge />
      <div className="flex min-h-screen flex-1 flex-col">
        <ShareView />
        <AppChromeFooter />
      </div>
    </StandaloneThemeShell>
  );
}
