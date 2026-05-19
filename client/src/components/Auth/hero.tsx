import { DEFAULT_APP_TITLE } from 'librechat-data-provider';
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
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
          {DEFAULT_APP_TITLE}
        </p>
        <h2 className="mt-4 text-4xl font-bold leading-tight text-white">
          {localize('com_auth_hero_title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          {localize('com_auth_hero_subtitle')}
        </p>
      </div>
      <AuthHeroPartners />
    </aside>
  );
}

export default AuthHero;
