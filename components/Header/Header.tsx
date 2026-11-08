'use client';

import Link from 'next/link';
import css from './Header.module.css';
import { useAuthStore } from '@/lib/store/authStore';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  return (
    <header className={css.header}>
      <div className={`container ${css.content}`}>
        <Link href="/" className={css.logo}>
          Clothica
        </Link>

        <nav className={css.nav}>
          <Link href="/">Головна</Link>
          <Link href="/goods">Товари</Link>
          <Link href="/categories">Категорії</Link>
        </nav>

        <div className={css.actions}>
          {user ? (
            <>
              <span className={css.pill}>
                Вітаємо, {user.name}!
              </span>
              <Link href="/profile" className={css.pill}>
                Кабінет
              </Link>
              <button
                type="button"
                className={css.pill}
                onClick={clearUser}
              >
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={css.pill}>
                Вхід
              </Link>
              <Link href="/auth/register" className={css.pill}>
                Реєстрація
              </Link>
            </>
          )}

          <Link href="/basket" className={css.pill}>
            Кошик
          </Link>
        </div>
      </div>
    </header>
  );
}
