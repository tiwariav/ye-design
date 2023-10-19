import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentProps,
  OverlayScrollbarsComponentRef,
} from "overlayscrollbars-react";
import { useRef } from "react";
import { useEffectOnce } from "react-use";
import {
  ContextDispatch,
  createAndUseContext,
} from "wo-library/contexts/utils.js";
import useMethods from "wo-library/hooks/useMethods.js";

import createScrollMethods from "./methods.js";
import "./scrollContext.module.css";
import INITIAL_SCROLL_STATE, { ScrollState } from "./state.js";

interface ScrollProviderProps extends OverlayScrollbarsComponentProps {
  data?: Record<any, any>;
}

const { Context, DispatchContext, useContextDispatch, useContextState } =
  createAndUseContext<
    ScrollState,
    ContextDispatch<ReturnType<typeof createScrollMethods>>
  >();

function ScrollProvider({
  children,
  data = {},
  ...props
}: ScrollProviderProps) {
  const overlayRef = useRef<OverlayScrollbarsComponentRef>(null);

  const [state, dispatch] = useMethods(createScrollMethods, {
    ...INITIAL_SCROLL_STATE,
    ...data,
  });
  useEffectOnce(() => {
    dispatch.updateState({ overlayScrollbars: overlayRef.current });
  });

  return (
    <OverlayScrollbarsComponent ref={overlayRef} {...props}>
      <DispatchContext.Provider value={{ dispatch }}>
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
