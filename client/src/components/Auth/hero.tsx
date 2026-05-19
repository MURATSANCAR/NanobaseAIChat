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
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-12 pb-6">
        <AuthAiVisual />
        <AuthHeroPartners className="mt-2 w-full max-w-lg -translate-y-6 border-t-0 pt-4" />
      </div>
    </aside>
  );
}

export default AuthHero;
