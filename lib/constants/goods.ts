import type { Gender, Size } from '@/types/good';

export const SIZES: readonly Size[] = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const GENDERS: readonly Gender[] = ['women', 'man', 'unisex'];

export const GENDER_OPTIONS: ReadonlyArray<{ value: Gender | null; label: string }> = [
  { value: null, label: 'Всі' },
  { value: 'women', label: 'Жіночий' },
  { value: 'man', label: 'Чоловічий' },
  { value: 'unisex', label: 'Унісекс' },
];

// label: текст чипа з макета; value: те, що йде в URL і в запит GET /goods?color=...
// Бекенд із фільтром за кольором ще не змерджений, тому значення value треба звірити з його swagger
export const COLOR_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'білий', label: 'Білий' },
  { value: 'чорний', label: 'чорний' },
  { value: 'сірий', label: 'сірий' },
  { value: 'синій', label: 'синій' },
  { value: 'зелений', label: 'зелений' },
  { value: 'червоний', label: 'червоний' },
  { value: 'пастельні відтінки', label: 'пастельні відтінки' },
];

export const PER_PAGE_DESKTOP = 12;
export const PER_PAGE_COMPACT = 8;
export const DESKTOP_MEDIA_QUERY = '(min-width: 1440px)';

export const PRICE_DEBOUNCE_MS = 600;

// Межі слайдера ціни. Зараз найдорожчий товар у каталозі коштує 5299 грн.
// Правий край слайдера означає "без верхньої межі", тому дорожчі товари теж потраплять у вибірку.
export const PRICE_MIN = 0;
export const PRICE_MAX = 6000;
export const PRICE_STEP = 100;

// Максимум, який дозволяє бекенд для GET /api/categories
export const CATEGORIES_PER_PAGE = 20;
