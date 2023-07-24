import {
  IconBallBowling,
  IconDogBowl,
  IconSquareRoundedChevronLeftFilled,
  IconSquareRoundedChevronRightFilled,
} from "@tabler/icons-react";

export const storyIconMap = {
  IconBallBowling: <IconBallBowling />,
  IconDogBowl: <IconDogBowl />,
  IconSquareRoundedChevronLeftFilled: <IconSquareRoundedChevronLeftFilled />,
  IconSquareRoundedChevronRightFilled: <IconSquareRoundedChevronRightFilled />,
  None: null,
};

export const storyIconControl = {
  mapping: storyIconMap,
  options: Object.keys(storyIconMap),
};
