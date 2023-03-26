import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { ParsedUrlQuery } from 'querystring';

import { withLayout } from '../../layout';
import TopPageComponent from '../../components/TopPageComponent';
import { MenuItem } from '../../interfaces/menu.interface';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from '../../helpers';
import { API } from '../../helpers/api';

function Course({ page, products, menu, firstCategory }: CourseProps): JSX.Element {
  return page && products ? (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent page={page} products={products} menu={menu} firstCategory={firstCategory} />
    </>
  ) : (
    <></>
  );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: any[] = [];
  firstLevelMenu.forEach(async (m) => {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });
    if (!menu?.length) {
      return {
        notFound: true,
      };
    }

    const { data: page } = await axios.get<PageModel>(API.topPage.byAlias + params.alias);
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
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
  page: PageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}
