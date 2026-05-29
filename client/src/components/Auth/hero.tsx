import NeuralBackground from './background';
import { AuthHeroPartners } from './partners';
import AuthAiVisual from './visual';

function AuthHero() {
  return (
    <aside
      className="relative hidden min-h-screen w-[55%] flex-col overflow-hidden bg-[#0a1628] lg:flex"
      aria-hidden="true"
    >
      <NeuralBackground />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-10 pb-8 pt-6 xl:px-12">
        <AuthAiVisual />
        <AuthHeroPartners className="w-full max-w-lg shrink-0 border-t border-white/10 pt-6" />
      </div>
    </aside>
  );
}

export default AuthHero;
