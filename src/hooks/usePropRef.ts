import { isArray, isFunction, isObject } from "lodash-es";
import { MutableRefObject, useCallback, useRef } from "react";

export default function usePropRef<T = Node>(
  propRef: React.ForwardedRef<T> | React.ForwardedRef<T>[] | undefined,
) {
  const innerRef: MutableRefObject<T | null> = useRef<T>(null);
  const setInnerRef = useCallback(
    (node: T) => {
      const refs = isArray(propRef) ? propRef : [propRef];
      for (const ref of refs) {
        if (ref) {
          if (isFunction(ref)) {
            ref(node);
          } else if (isObject(ref)) {
            ref.current = node;
          }
        }
      }
      innerRef.current = node;
    },
    [propRef],
  );

  return { innerRef, setInnerRef };
}
