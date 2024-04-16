import type { ReactNode, RefObject } from "react";
import type { ContextDispatch } from "wo-library/contexts/utils.js";

import { useMemo, useRef } from "react";
import { createAndUseContext } from "wo-library/contexts/utils.js";
import useMethods from "wo-library/hooks/useMethods.js";

import type { LayoutMethods } from "./methods.js";
import type { LayoutState } from "./state.js";

import createLayoutMethods from "./methods.js";
import INITIAL_LAYOUT_STATE from "./state.js";

interface LayoutProviderProps {
  children: ReactNode;
  initialState?: Partial<LayoutState>;
}

type LayoutContextState = LayoutState & {
  refs: {
    sideNav: RefObject<HTMLDivElement | null>;
    topNav: RefObject<HTMLDivElement | null>;
  };
};

const { Context, DispatchContext, useContextDispatch, useContextState } =
  createAndUseContext<LayoutContextState, ContextDispatch<LayoutMethods>>();

export function LayoutProvider({
  children,
  initialState,
}: LayoutProviderProps) {
  const memoizedInitialState = useMemo(
    () => ({ ...INITIAL_LAYOUT_STATE, ...initialState }),
    [initialState],
  );
  const [state, dispatch] = useMethods(
    createLayoutMethods,
    memoizedInitialState,
  );

  const topNavRef = useRef<HTMLDivElement>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);

  const finalState = useMemo(
    () => ({
      ...state,
      refs: {
        sideNav: sideNavRef,
        topNav: topNavRef,
      },
    }),
    [state],
  );

  const memoDispatch = useMemo(() => ({ dispatch }), [dispatch]);

  return (
    <DispatchContext.Provider value={memoDispatch}>
      <Context.Provider value={finalState}>{children}</Context.Provider>
    </DispatchContext.Provider>
  );
}

const LayoutContext = { LayoutProvider, useContextDispatch, useContextState };
export default LayoutContext;
