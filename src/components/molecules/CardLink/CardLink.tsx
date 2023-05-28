import { MutableRefObject, ReactNode, useRef } from "react";
import { useEffectOnce } from "react-use";
import { Card } from "../../atoms/index.js";
import styles from "./cardLink.module.css";

interface CardLinkProps {
  children: ReactNode;
  linkRef: MutableRefObject<HTMLAnchorElement>;
}

export default function CardLink({ children, linkRef }: CardLinkProps) {
  const ref = useRef<HTMLDivElement>();

  const handleClick = () => {
    const noTextSelected = !window.getSelection().toString();

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
    <Card className={styles.root} ref={ref} onClick={handleClick}>
      {children}
    </Card>
  );
}
