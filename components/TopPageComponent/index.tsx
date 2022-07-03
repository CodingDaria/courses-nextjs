import React from 'react';

import styles from './TopPage.module.css';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { HTag, Tag, HhData, Advantages } from '..';

interface TopPageProps extends Record<string, unknown> {
  page: PageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}

const TopPageComponent = ({ page, products, firstCategory }: TopPageProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag="h1">{page?.title}</HTag>
        {products && (
          <Tag color="ghost" size="M">
            {products.length}
          </Tag>
        )}
        <span>Sort</span>
      </div>
      <div>{products && products.map((product) => <div key={product._id}>{product.title}</div>)}</div>
      <div className={styles.hhTitle}>
        <HTag tag="h2">Vacancies - {page?.category}</HTag>
        <Tag color="red" size="M">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && Boolean(page.hh) && <HhData {...page.hh} />}
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
