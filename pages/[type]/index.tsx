import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

import { firstLevelMenu } from '../../helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout';

function Courses({ firstCategory }: HomeProps): JSX.Element {
  return <div>Courses index page {firstCategory}</div>;
}

export default withLayout(Courses);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map((item) => `/${item.route}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
      firstCategory: firstCategoryItem.id,
    });

    if (!menu?.length) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
