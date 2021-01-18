import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useCallback, useMemo, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useClickAway, useWindowSize } from "react-use";
import styles from "./dropdown.module.css";
import DropdownMenu from "./DropdownMenu";

function Dropdown({
  button,
  menu,
  menuItems,
  size,
  className,
  hideArrow,
  hoverable,
  parentMenuNode,
  ...props
}) {
  const menuRef = useRef(null);
  const containerRef = useRef(null);
  const [containerNode, setContainerNode] = useState();
  const [menuContainerNode, setMenuContainerNode] = useState();

  const { width: windowWidth } = useWindowSize();

  const setContainerRef = useCallback((node) => {
    containerRef.current = node;
    if (node !== null) {
      setContainerNode(node);
    }
  }, []);
  const setMenuContainerRef = useCallback((node) => {
    if (node !== null) {
      setMenuContainerNode(node);
    }
  }, []);

  const [open, setOpen] = useState(false);
  // const [subMenuCascade, setSubMenuCascade] = useState(false);

  useClickAway(containerRef, (e) => {
    if (open) {
      if (
        !parentMenuNode ||
        !((menuRef || {}).current || {}).contains(e.target)
      ) {
        setOpen(false);
      }
    }
  });

  const handleButtonClick = () => setOpen((open) => !open);
  const handleMouseEnter = () => {
    setOpen(true);
  };
  const handleMouseLeave = (e) => {
    setOpen(false);
  };

  const containerBounds = containerNode
    ? containerNode.getBoundingClientRect()
    : {};

  const renderedMenu = useMemo(() => {
    return (
      <div
        ref={menuRef}
        className={clsx(styles.menu, {
          [styles.isOpen]: open,
        })}
        onMouseLeave={hoverable ? handleMouseLeave : undefined}
        style={
          parentMenuNode
            ? {
                marginTop:
                  containerBounds.y - parentMenuNode.getBoundingClientRect().y,
              }
            : undefined
        }
      >
        {menu ? (
          React.cloneElement(menu, {
            parentMenuNode: parentMenuNode || menuContainerNode,
          })
        ) : menuItems ? (
          <DropdownMenu parentMenuNode={parentMenuNode || menuContainerNode}>
            {menuItems}
          </DropdownMenu>
        ) : null}
      </div>
    );
  }, [
    menu,
    menuItems,
    menuContainerNode,
    parentMenuNode,
    hoverable,
    open,
    containerBounds,
  ]);

  return (
    <div
      ref={setContainerRef}
      className={clsx(styles.container, className)}
      onMouseEnter={hoverable ? handleMouseEnter : undefined}
      onMouseLeave={hoverable ? handleMouseLeave : undefined}
      {...props}
    >
      {typeof button === "function"
        ? button(open, handleButtonClick)
        : React.cloneElement(button, {
            className: clsx(
              button.props.className,
              open ? styles.buttonOpen : ""
            ),
            onClick: handleButtonClick,
            iconAfter: !hideArrow ? (
              open ? (
                <AiOutlineCaretUp />
              ) : (
                <AiOutlineCaretDown />
              )
            ) : null,
          })}

      {parentMenuNode ? (
        ReactDOM.createPortal(renderedMenu, parentMenuNode)
      ) : (
        <div
          className={clsx(styles.menuContainer, styles[`is-${size}`], {
            [styles.positionRight]: containerBounds.x > windowWidth / 2,
          })}
          ref={setMenuContainerRef}
        >
          {renderedMenu}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  /**
   * Dropdown font size
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  button: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  menu: PropTypes.element,
  menuItems: PropTypes.array,
};

export default Dropdown;
