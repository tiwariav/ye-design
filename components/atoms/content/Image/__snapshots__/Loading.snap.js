// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Storyshots ye-ui/atoms/content/Image Loading 1`] = `
<div
  class="default"
>
  <div
    style="width: 160px;"
  >
    <div
      class=""
    >
      <svg
        aria-labelledby="test-aria"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        viewBox="0 0 10 10"
      >
        <title
          id="test-aria"
        >
          Loading...
        </title>
        <rect
          clip-path="url(#test-diff)"
          height="100%"
          role="presentation"
          style="fill: url(#test-animated-diff);"
          width="100%"
          x="0"
          y="0"
        />
        <defs>
          <clippath
            id="test-diff"
          >
            <rect
              height="10"
              width="10"
              x="0"
              y="0"
            />
          </clippath>
          <lineargradient
            id="test-animated-diff"
          >
            <stop
              offset="0%"
              stop-color="#f5f6f7"
              stop-opacity="1"
            >
              <animate
                attributeName="offset"
                dur="1.2s"
                keyTimes="0; 0.25; 1"
                repeatCount="indefinite"
                values="-2; -2; 1"
              />
            </stop>
            <stop
              offset="50%"
              stop-color="#eee"
              stop-opacity="1"
            >
              <animate
                attributeName="offset"
                dur="1.2s"
                keyTimes="0; 0.25; 1"
                repeatCount="indefinite"
                values="-1; -1; 2"
              />
            </stop>
            <stop
              offset="100%"
              stop-color="#f5f6f7"
              stop-opacity="1"
            >
              <animate
                attributeName="offset"
                dur="1.2s"
                keyTimes="0; 0.25; 1"
                repeatCount="indefinite"
                values="0; 0; 3"
              />
            </stop>
          </lineargradient>
        </defs>
      </svg>
    </div>
  </div>
</div>
`;
