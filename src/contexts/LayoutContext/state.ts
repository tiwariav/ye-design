export interface LayoutState {
  sideNav: {
    isToggled?: boolean;
  };
  topNav: {
    isHidden?: boolean;
    isToggled?: boolean;
  };
}

const INITIAL_LAYOUT_STATE: LayoutState = {
  sideNav: {},
  topNav: {},
};

export default INITIAL_LAYOUT_STATE;
