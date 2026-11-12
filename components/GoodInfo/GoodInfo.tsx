import Link from 'next/link';
import Image from 'next/image';
import { Good } from '@/types/good';
import css from './GoodInfo.module.css';

interface GoodInfoProps {
  good: Good;
}

export default function GoodInfo({ good }: GoodInfoProps) {
  const rating = good.rating ?? 0;
  const reviewsCount = good.reviewsCount ?? good.feedbacks?.length ?? 0;

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image
          src={good.image}
          alt={good.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
          className={css.image}
        />
      </div>
      <div className={css.info}>
        <h3 className={css.name}>{good.name}</h3>
        <p className={css.price}>
          {good.price.value} {good.price.currency}
        </p>
        <div className={css.meta}>
          <span className={css.rating}>Рейтинг: {rating.toFixed(1)}</span>
          <span className={css.reviews}>({reviewsCount} відгуків)</span>
        </div>
        <Link href={`/goods/${good._id}`} className={css.details}>
          Детальніше
        </Link>
      </div>
    </article>
  );
}
