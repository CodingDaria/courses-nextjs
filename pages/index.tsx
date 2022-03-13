import { useState } from 'react';
import { HTag, Button, P, Tag, Rating } from '../components';
import { withLayout } from '../layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState(0);

  return (
    <>
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
      <Rating rating={rating} setRating={setRating} isEditable />
    </>
  );
}

export default withLayout(Home);
