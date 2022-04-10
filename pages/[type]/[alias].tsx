import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

import { withLayout } from '../../layout';
import { MenuItem } from '../interfaces/menu.interface';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers';

function Course({ products }: CourseProps): JSX.Element {
  return <>{products && products.map((product) => <div key={product._id}>{product.title}</div>)}</>;
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  firstLevelMenu.forEach(async (m) => {
    const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
      firstCategory: m.id,
    });
    paths = [...paths, menu.flatMap((item) => item.pages.map((page) => `/${m.route}/${page.alias}`))];
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CourseProps> = async ({
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
    const { data: page } = await axios.get<PageModel>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${params.alias}`
    );
    const { data: products } = await axios.post<ProductModel[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`, {
      category: page.category,
      limit: 10,
    });

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface CourseProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: PageModel[];
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}
