import { DEFAULT_APP_TITLE } from 'librechat-data-provider';
import { NanobaseLogo } from '~/components/Branding';
import { useLocalize } from '~/hooks';
import NeuralBackground from './background';
import { AuthHeroPartners } from './partners';

function AuthHero() {
  const localize = useLocalize();

  return (
    <aside
      className="relative hidden min-h-screen w-[55%] flex-col justify-between overflow-hidden bg-[#070b14] p-12 lg:flex"
      aria-hidden="true"
    >
      <NeuralBackground />
      <div className="relative z-10 max-w-lg pt-4">
        <NanobaseLogo variant="hero" alt={DEFAULT_APP_TITLE} />
        <h2 className="mt-8 text-4xl font-bold leading-tight text-white">
          {localize('com_auth_welcome')}
        </h2>
      </div>
      <AuthHeroPartners />
    </aside>
  );
}

export default AuthHero;
