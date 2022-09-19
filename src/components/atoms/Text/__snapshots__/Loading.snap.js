// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`Storyshots ye-design/atoms/content/Text Loading 1`] = `
<div
  class="default"
>
  <div
    style="width: 800px;"
  >
    <div
      class=""
      style="max-height: 7.5em; min-height: 4.5em;"
    >
      <svg
        aria-labelledby="test-aria"
        preserveAspectRatio="none"
        role="img"
        style="height: 4.5em;"
        viewBox="0 0 100 72"
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
              height="20"
              width="100"
              x="0"
              y="2"
            />
            <rect
              height="20"
              width="92"
              x="0"
              y="26"
            />
            <rect
              height="20"
              width="36"
              x="0"
              y="50"
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
