import css from './CategoriesFilter.module.css';

interface CategoriesFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategoriesFilter({ value, onChange }: CategoriesFilterProps) {
  return (
    <div className={css.filter}>
      <input
        type="text"
        placeholder="Пошук категорії..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={css.input}
      />
    </div>
  );
}
