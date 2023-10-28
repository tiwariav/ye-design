import { loremIpsum } from "lorem-ipsum";

import { Card } from "../atoms/index.js";

export function LoremCard() {
  return (
    <Card layout="horizontal">
      <div
        dangerouslySetInnerHTML={{
          __html: loremIpsum({
            count: 1,
            format: "html",
            units: "paragraphs",
          }),
        }}
      />
    </Card>
  );
}
