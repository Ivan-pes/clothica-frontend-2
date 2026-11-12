'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { getCategories } from '@/lib/api/categories';
import { Category, CategoriesResponse } from '@/types/category';
import CategoriesList from '@/components/CategoriesList/CategoriesList';
import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import css from './CategoriesPage.module.css';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<Omit<CategoriesResponse, 'categories'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCategories = useCallback(async (page: number, append = false) => {
    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    setError(null);

    try {
      const data = await getCategories(page, 6);
      if (append) {
        setCategories((prev) => [...prev, ...data.categories]);
      } else {
        setCategories(data.categories);
      }
      setPagination({
        page: data.page,
        perPage: data.perPage,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Не вдалося завантажити категорії';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  const filteredCategories = useMemo(() => {
    if (!filter.trim()) return categories;
    const lowerFilter = filter.toLowerCase();
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(lowerFilter)
    );
  }, [categories, filter]);

  const handleLoadMore = () => {
    if (pagination && currentPage < pagination.totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCategories(nextPage, true);
    }
  };

  const handleRetry = () => {
    setCurrentPage(1);
    setFilter('');
    fetchCategories(1);
  };

  const hasMore = pagination ? currentPage < pagination.totalPages : false;

  return (
    <section className={`container ${css.categoriesPage}`}>
      <h1 className="pageTitle">Категорії</h1>

      <CategoriesFilter value={filter} onChange={setFilter} />

      {isLoading && <p className={css.status}>Завантаження...</p>}

      {!isLoading && error && (
        <MessageNoInfo
          message={error}
          buttonText="Спробувати знову"
          onClick={handleRetry}
        />
      )}

      {!isLoading && !error && filteredCategories.length === 0 && (
        <MessageNoInfo
          message={
            filter
              ? 'Категорій за вашим запитом не знайдено'
              : 'Категорії відсутні'
          }
          buttonText={filter ? 'Скинути фільтр' : 'Оновити'}
          onClick={filter ? () => setFilter('') : handleRetry}
        />
      )}

      {!isLoading && !error && filteredCategories.length > 0 && (
        <>
          <CategoriesList categories={filteredCategories} />

          {hasMore && !filter && (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className={css.loadMore}
            >
              {isLoadingMore ? 'Завантаження...' : 'Завантажити ще'}
            </button>
          )}
        </>
      )}
    </section>
  );
}
