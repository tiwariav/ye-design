import { MutableRefObject, ReactNode, useRef } from "react";
import { useEffectOnce } from "react-use";

import { Card } from "../../atoms/index.js";

interface CardLinkProps {
  children: ReactNode;
  linkRef: MutableRefObject<HTMLAnchorElement>;
}

export default function CardLink({
  children,
  linkRef,
  ...props
}: CardLinkProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (window === undefined) return;
    const noTextSelected = !window.getSelection()?.toString();

    if (noTextSelected) {
      linkRef.current.click();
    }
  };

  useEffectOnce(() => {
    if (ref.current) {
      for (const element of ref.current.querySelectorAll("a, button"))
        element.addEventListener("click", (event) => event.stopPropagation());
    }
  });

  return (
    <Card onClick={handleClick} ref={ref} {...props}>
      {children}
    </Card>
  );
}
