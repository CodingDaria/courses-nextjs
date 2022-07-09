import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { HTag, Button, P, Tag, Rating, Input, Textarea } from '../components';
import { withLayout } from '../layout';
import { MenuItem } from '../interfaces/menu.interface';

function Home({ menu }: HomeProps): JSX.Element {
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
      <Textarea placeholder="textarea" />
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
      <Input placeholder="test" />
      <Rating rating={rating} setRating={setRating} isEditable />
      {JSON.stringify(menu)}
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
