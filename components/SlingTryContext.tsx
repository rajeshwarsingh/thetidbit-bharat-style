import React, { createContext, useContext } from 'react';

type SlingTryCtx = {
  openSlingTry: () => void;
};

const SlingTryContext = createContext<SlingTryCtx | null>(null);

export function SlingTryProvider({
  value,
  children,
}: {
  value: SlingTryCtx;
  children: React.ReactNode;
}) {
  return <SlingTryContext.Provider value={value}>{children}</SlingTryContext.Provider>;
}

export function useSlingTry() {
  const ctx = useContext(SlingTryContext);
  if (!ctx) {
    throw new Error('useSlingTry must be used within SlingTryProvider');
  }
  return ctx;
}


