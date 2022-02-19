import { HTag, Button, P, Tag } from '../components';

export default function Home(): JSX.Element {
  return (
    <div>
      <HTag tag="h1">Body</HTag>
      <Button appearance="primary" className="test">
        Primary
      </Button>
      <Button appearance="ghost" arrow="down">
        Ghost
      </Button>
      <P size="S">Paragraph</P>
      <P>Paragraph</P>
      <P size="L">Paragraph</P>
      <Tag size="S" color="ghost">
        Tag
      </Tag>
      <Tag size="S" color="red" href="/">
        Tag
      </Tag>
      <Tag size="M" color="light">
        Tag
      </Tag>
      <Tag size="S" color="green">
        Tag
      </Tag>
      <Tag size="S" color="primary">
        Tag
      </Tag>
    </div>
  );
}
