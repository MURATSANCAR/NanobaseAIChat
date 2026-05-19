import { useMemo, useCallback, useState, useRef } from 'react';
import { easings } from '@react-spring/web';
import { EModelEndpoint } from 'librechat-data-provider';
import { BirthdayIcon, TooltipAnchor, SplitText } from '@librechat/client';
import { useChatContext, useAgentsMapContext, useAssistantsMapContext } from '~/Providers';
import { useGetEndpointsQuery, useGetStartupConfig } from '~/data-provider';
import ConvoIcon from '~/components/Endpoints/ConvoIcon';
import { useLocalize, useAuthContext } from '~/hooks';
import { getIconEndpoint, getEntity, cn } from '~/utils';
import { nbLandingPanel, nbRainbowText } from '~/components/Theme/styles';
import LandingAgentVisual from './LandingAgentVisual';

const containerClassName =
  'shadow-stroke relative flex h-full items-center justify-center rounded-full bg-surface-primary text-text-primary dark:after:shadow-none';

function getTextSizeClass(text: string | undefined | null) {
  if (!text) {
    return 'text-lg sm:text-xl';
  }

  if (text.length < 40) {
    return 'text-xl sm:text-2xl';
  }

  if (text.length < 70) {
    return 'text-lg sm:text-xl';
  }

  return 'text-base sm:text-lg';
}

export default function Landing({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  const { conversation } = useChatContext();
  const agentsMap = useAgentsMapContext();
  const assistantMap = useAssistantsMapContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { user } = useAuthContext();
  const localize = useLocalize();

  const [lineCount, setLineCount] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  const endpointType = useMemo(() => {
    let ep = conversation?.endpoint ?? '';
    if (ep === EModelEndpoint.azureOpenAI) {
      ep = EModelEndpoint.openAI;
    }
    return getIconEndpoint({
      endpointsConfig,
      iconURL: conversation?.iconURL,
      endpoint: ep,
    });
  }, [conversation?.endpoint, conversation?.iconURL, endpointsConfig]);

  const { entity, isAgent, isAssistant } = getEntity({
    endpoint: endpointType,
    agentsMap,
    assistantMap,
    agent_id: conversation?.agent_id,
    assistant_id: conversation?.assistant_id,
  });

  const name = entity?.name ?? '';
  const description = (entity?.description || conversation?.greeting) ?? '';

  const getGreeting = useCallback(() => {
    if (typeof startupConfig?.interface?.customWelcome === 'string') {
      const customWelcome = startupConfig.interface.customWelcome;
      if (user?.name && customWelcome.includes('{{user.name}}')) {
        return customWelcome.replace(/{{user.name}}/g, user.name);
      }
      return customWelcome;
    }

    const now = new Date();
    const hours = now.getHours();
    const dayOfWeek = now.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (hours >= 0 && hours < 5) {
      return localize('com_ui_late_night');
    }
    if (hours < 12) {
      if (isWeekend) {
        return localize('com_ui_weekend_morning');
      }
      return localize('com_ui_good_morning');
    }
    if (hours < 17) {
      return localize('com_ui_good_afternoon');
    }
    return localize('com_ui_good_evening');
  }, [localize, startupConfig?.interface?.customWelcome, user?.name]);

  const handleLineCountChange = useCallback((count: number) => {
    setLineCount(count);
  }, []);

  const greetingText =
    typeof startupConfig?.interface?.customWelcome === 'string'
      ? getGreeting()
      : getGreeting() + (user?.name ? ', ' + user.name : '');

  const showColorfulOrb = !((isAgent || isAssistant) && name) && !name;
  const greetingClassName = cn(
    getTextSizeClass(greetingText),
    'font-medium leading-snug',
    showColorfulOrb ? nbRainbowText : 'text-text-primary',
  );

  const showAgentStatus = showColorfulOrb && lineCount <= 2;

  return (
    <div
      className={cn(
        'flex w-full shrink-0 flex-col items-center justify-center px-3 pt-2 pb-1 sm:px-4',
        centerFormOnLanding ? 'sm:pt-3' : 'sm:pb-2',
      )}
    >
      <div ref={contentRef} className={nbLandingPanel}>
        <div className="flex w-full flex-col items-center gap-2">
          {showColorfulOrb ? (
            <LandingAgentVisual>
              <div className="nb-landing-orb">
                <div className="nb-landing-orb-inner">
                  <ConvoIcon
                    agentsMap={agentsMap}
                    assistantMap={assistantMap}
                    conversation={conversation}
                    endpointsConfig={endpointsConfig}
                    containerClassName={containerClassName}
                    context="landing"
                    className="h-2/3 w-2/3 text-text-primary"
                    size={24}
                  />
                </div>
              </div>
            </LandingAgentVisual>
          ) : (
            <div className="relative flex size-10 items-center justify-center sm:size-11">
              <ConvoIcon
                agentsMap={agentsMap}
                assistantMap={assistantMap}
                conversation={conversation}
                endpointsConfig={endpointsConfig}
                containerClassName={containerClassName}
                context="landing"
                className="h-2/3 w-2/3 text-text-primary"
                size={32}
              />
              {startupConfig?.showBirthdayIcon && (
                <TooltipAnchor
                  className="absolute bottom-[27px] right-2"
                  description={localize('com_ui_happy_birthday')}
                  aria-label={localize('com_ui_happy_birthday')}
                >
                  <BirthdayIcon />
                </TooltipAnchor>
              )}
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-1 px-0.5">
            {showAgentStatus && (
              <p className="nb-landing-agent-status text-[10px] font-medium tracking-wide text-slate-400 sm:text-xs">
                <span className="auth-ai-status-dot mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 align-middle" />
                {localize('com_ui_landing_agent_status')}
              </p>
            )}

            {((isAgent || isAssistant) && name) || name ? (
              <SplitText
                key={`split-text-${name}`}
                text={name}
                className={cn(getTextSizeClass(name), 'font-medium text-text-primary')}
                delay={50}
                textAlign="center"
                animationFrom={{ opacity: 0, transform: 'translate3d(0,24px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing={easings.easeOutCubic}
                threshold={0}
                rootMargin="0px"
                onLineCountChange={handleLineCountChange}
              />
            ) : (
              <SplitText
                key={`split-text-${greetingText}${user?.name ? '-user' : ''}`}
                text={greetingText}
                className={greetingClassName}
                delay={50}
                textAlign="center"
                animationFrom={{ opacity: 0, transform: 'translate3d(0,24px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing={easings.easeOutCubic}
                threshold={0}
                rootMargin="0px"
                onLineCountChange={handleLineCountChange}
              />
            )}
          </div>
        </div>

        {description && (
          <p className="animate-fadeIn max-w-xs text-xs font-normal leading-snug text-text-secondary sm:max-w-sm sm:text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
