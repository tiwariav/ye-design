import { ReactNode, RefObject, useMemo, useRef } from "react";
import {
  ContextDispatch,
  createAndUseContext,
} from "wo-library/contexts/utils.js";
import useMethods from "wo-library/hooks/useMethods.js";

import createLayoutMethods, { LayoutMethods } from "./methods.js";
import INITIAL_LAYOUT_STATE, { LayoutState } from "./state.js";

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

  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <Context.Provider value={finalState}>{children}</Context.Provider>
    </DispatchContext.Provider>
  );
}

const LayoutContext = { LayoutProvider, useContextDispatch, useContextState };
export default LayoutContext;
