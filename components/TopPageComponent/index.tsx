import React, { useEffect, useReducer } from 'react';

import styles from './TopPage.module.css';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { HTag, Tag, HeadHuntData, Advantages, Sort, Product } from '..';
import { SortEnum } from '../Sort';
import { SortReducer } from './sort.reducer';

interface TopPageProps extends Record<string, unknown> {
  page: PageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}

const TopPageComponent = ({ page, products, firstCategory }: TopPageProps): JSX.Element => {
  const [{ products: sortedProducts, sort: currentSort }, dispatchSort] = useReducer(SortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag="h1">{page?.title}</HTag>
        {products && (
          <Tag color="ghost" size="M" aria-label={products.length + 'courses'}>
            {products.length}
          </Tag>
        )}
        <Sort sort={currentSort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts && sortedProducts.map((product) => <Product key={product._id} layout product={product} />)}
      </div>
      <div className={styles.hhTitle}>
        <HTag tag="h2">Vacancies - {page?.category}</HTag>
        <Tag color="red" size="M">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && Boolean(page.hh) && <HeadHuntData {...page.hh!} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <HTag tag="h2">Advantages</HTag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
      <HTag tag="h2">Skills</HTag>
      {page.tags.map((tag) => (
        <Tag key={tag} color="primary">
          {tag}
        </Tag>
      ))}
    </div>
  );
};

export default TopPageComponent;
