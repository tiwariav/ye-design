import { isFunction, isObject } from "lodash-es";
import { MutableRefObject, useCallback, useRef } from "react";

export default function usePropRef<T = Node>(
  propRef: React.ForwardedRef<T> | undefined,
) {
  const innerRef: MutableRefObject<T | null> = useRef<T>(null);
  const setInnerRef = useCallback(
    (node: T) => {
      if (propRef) {
        if (isFunction(propRef)) {
          propRef(node);
        } else if (isObject(propRef)) {
          propRef.current = node;
        }
      }
      innerRef.current = node;
    },
    [propRef],
  );

  return { innerRef, setInnerRef };
}
