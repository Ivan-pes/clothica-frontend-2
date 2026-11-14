import Image from "next/image";
import Link from "next/link";

import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.hero} aria-labelledby="hero-title">
      <div className={`container ${css.heroContent}`}>
        <div className={css.heroInfo}>
          <h1 id="hero-title" className={css.heroTitle}>
            Знайди свій стиль з Clothica вже сьогодні!
          </h1>

          <p className={css.heroDescription}>
            Clothica — це місце, де комфорт поєднується зі стилем. Ми створюємо
            базовий одяг, який легко комбінується та підходить для будь-якої
            нагоди. Обирай речі, що підкреслять твою індивідуальність і завжди
            будуть актуальними.
          </p>

          <div className={css.heroActions}>
            <Link href="/goods" className={css.primaryButton}>
              До товарів
            </Link>

            <Link href="/categories" className={css.secondaryButton}>
              Дослідити категорії
            </Link>
          </div>
        </div>

        <div className={css.heroImage}>
          <Image
            src="/images/hero.webp"
            alt="Моделі в повсякденному одязі Clothica"
            width={1200}
            height={800}
            sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1439px) 45vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
