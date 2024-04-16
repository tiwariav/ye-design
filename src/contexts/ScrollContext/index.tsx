import type {
  OverlayScrollbarsComponentProps,
  OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import type { ContextDispatch } from "wo-library/contexts/utils.js";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useMemo, useRef } from "react";
import { useEffectOnce } from "react-use";
import { createAndUseContext } from "wo-library/contexts/utils.js";
import useMethods from "wo-library/hooks/useMethods.js";

import type { ScrollState } from "./state.js";

import createScrollMethods from "./methods.js";
import "./scrollContext.module.css";
import INITIAL_SCROLL_STATE from "./state.js";

interface ScrollProviderProps extends OverlayScrollbarsComponentProps {
  data?: object;
}

const { Context, DispatchContext, useContextDispatch, useContextState } =
  createAndUseContext<
    ScrollState,
    ContextDispatch<ReturnType<typeof createScrollMethods>>
  >();

function ScrollProvider({ children, data, ...props }: ScrollProviderProps) {
  const overlayRef = useRef<OverlayScrollbarsComponentRef>(null);

  const [state, dispatch] = useMethods(createScrollMethods, {
    ...INITIAL_SCROLL_STATE,
    ...data,
  });
  useEffectOnce(() => {
    dispatch.updateState({ overlayScrollbars: overlayRef.current });
  });

  const memoDispatch = useMemo(() => ({ dispatch }), [dispatch]);

  return (
    <OverlayScrollbarsComponent ref={overlayRef} {...props}>
      <DispatchContext.Provider value={memoDispatch}>
        <Context.Provider value={state}>{children}</Context.Provider>
      </DispatchContext.Provider>
    </OverlayScrollbarsComponent>
  );
}

const ScrollContext = {
  ScrollProvider,
  useContextDispatch,
  useContextState,
};

export default ScrollContext;
