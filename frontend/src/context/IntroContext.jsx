import { createContext, useContext } from "react";

// true once the intro curtains start opening (and by default when no intro
// exists), so entrance animations can wait for the page to actually be visible.
const IntroContext = createContext(true);

export const IntroProvider = IntroContext.Provider;
export const useIntroRevealed = () => useContext(IntroContext);
