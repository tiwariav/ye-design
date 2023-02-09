import { isFunction, isObject } from "lodash-es";
import { useCallback, useRef } from "react";

const usePropRef = (propRef: React.ForwardedRef<Node>) => {
  const innerRef = useRef(null);
  const setInnerRef = useCallback(
    (node: Node) => {
      if (propRef) {
        if (isFunction(propRef)) {
          propRef(node);
        } else if (isObject(propRef)) {
          propRef.current = node;
        }
      }
      innerRef.current = node;
    },
    [propRef]
  );

  return { innerRef, setInnerRef };
};

export default usePropRef;
