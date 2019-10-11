import "./scss/index.scss";

import * as React from "react";

import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
  ProductsList
} from "../../components";
import { Filters } from "../../components/ProductFilters";

import { ProductListHeader } from "../../@next/components/molecules";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { maybe } from "../../core/utils";
import { Category_category, Category_products } from "./types/Category";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

export interface Attribute {
  id: string;
  name: string | null;
  slug: string | null;
}
export interface AttributeList {
  id: string;
  name: string | null;
  slug: string | null;
  values: Array<Attribute | null> | null;
}

interface PageProps {
  activeFilters: number;
  attributes: AttributeList[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: Filters;
  hasNextPage: boolean;
  products: Category_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  category,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="category">
      <div className="container">
        <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
        <FilterSidebar
          show={showFilters}
          hide={() => setShowFilters(false)}
          onAttributeFiltersChange={onAttributeFiltersChange}
          attributes={attributes}
          filters={filters}
        />
        <ProductListHeader
          activeSortOption={activeSortOption}
          openFiltersMenu={() => setShowFilters(true)}
          numberOfProducts={products ? products.totalCount : 0}
          activeFilters={activeFilters}
          clearFilters={clearFilters}
          sortOptions={sortOptions}
          onChange={onOrder}
        />
      </div>

      {canDisplayProducts && (
        <>
          <ProductsList
            displayLoader={displayLoader}
            hasNextPage={hasNextPage}
            onLoadMore={onLoadMore}
            onOrder={onOrder}
            products={products.edges.map(edge => edge.node)}
            totalCount={products.totalCount}
            filters={filters}
          />
        </>
      )}
      {!hasProducts && <ProductsFeatured title="You might like" />}
    </div>
  );
};

export default Page;
