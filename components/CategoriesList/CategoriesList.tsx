import Link from 'next/link';
import { Category } from '@/types/category';
import css from './CategoriesList.module.css';

interface CategoriesListProps {
  categories: Category[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <ul className={css.list}>
      {categories.map((category) => (
        <li key={category._id} className={css.item}>
          <Link
            href={`/goods?category=${category._id}`}
            className={css.card}
          >
            <span className={css.name}>{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
