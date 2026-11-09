'use client';

import css from './Pagination.module.css';

type PaginationProps = {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export default function Pagination({ hasMore, isLoading, onLoadMore }: PaginationProps) {
  if (!hasMore) return null;

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={css.button}
        onClick={onLoadMore}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <span className={css.spinner} aria-hidden="true" />
            Завантаження...
          </>
        ) : (
          'Показати більше'
        )}
      </button>
    </div>
  );
}
