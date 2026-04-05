import { useEffect, useState } from "react";

interface TelegramState {
  webApp: TelegramWebApp | null;
  user: TelegramWebAppUser | null;
  accentColor: string;
  isTelegram: boolean;
}

const defaultAccent = "#2de0a7";

export function useTelegramWebApp(): TelegramState {
  const [state, setState] = useState<TelegramState>({
    webApp: null,
    user: null,
    accentColor: defaultAccent,
    isTelegram: false
  });

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;

    if (!telegram) {
      return;
    }

    telegram.ready();
    telegram.expand();
    telegram.setHeaderColor?.("#06131b");
    telegram.setBackgroundColor?.("#041018");

    const accentColor = telegram.themeParams.button_color ?? defaultAccent;
    const backgroundColor = telegram.themeParams.bg_color ?? "#041018";
    const textColor = telegram.themeParams.text_color ?? "#f4f8fb";
    const hintColor = telegram.themeParams.hint_color ?? "#8ca9bc";

    document.documentElement.style.setProperty("--tg-accent", accentColor);
    document.documentElement.style.setProperty("--tg-bg", backgroundColor);
    document.documentElement.style.setProperty("--tg-text", textColor);
    document.documentElement.style.setProperty("--tg-hint", hintColor);

    setState({
      webApp: telegram,
      user: telegram.initDataUnsafe?.user ?? null,
      accentColor,
      isTelegram: true
    });
  }, []);

  return state;
}
