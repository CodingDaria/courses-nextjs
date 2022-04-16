import React from 'react';
import cn from 'classnames';

import styles from './TopPageComponent.module.css';
import { PageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';

interface TopPageProps extends Record<string, unknown> {
  page: PageModel[];
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}

const TopPageComponent = ({ products }: TopPageProps): JSX.Element => {
  return <p>{products && products.length}</p>;
};

export default TopPageComponent;
