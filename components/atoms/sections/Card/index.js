export { default as Card } from "./Card";
export { CardStories };
import StoriesMeta, * as Stories from "./Card.stories";
const CardStories = Stories;
CardStories.metadata = StoriesMeta;
