'use client';

import { useCartStore } from '@/lib/store/cartStore';
import css from './GoodsOrderList.module.css';
import { useEffect, useState } from 'react';

export default function GoodsOrderList() {
  const{ items,updateQuantity,removeItem } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

const subtotal = items.reduce((sum, item) => sum + item.price.value * item.quantity, 0);

  const isFreeDelivery = subtotal >= 10000;

  const total = subtotal; 
const formatPrice = (value: number, currency = 'грн') =>
    `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${currency}`;
  return <section className={css.container}>
<ul className={css.list}>
  {items.map((item) => (
    <li key={`${item._id}-${item.size || 'default'}`} className={css.item}>
      <img src={item.image} alt={item.name} className={css.image} />

      <div className={css.info}>
        <h3 className={css.title}>{item.name} Clothica</h3>
        <div className={css.meta}>
          <span className={css.rating}> {item.rating ?? 0}</span>
          <span className={css.reviews}>({item.feedbackCount ?? 0})</span>
        </div>
        </div>
        <p className={css.price}>
          {formatPrice(item.price.value * item.quantity, item.price.currency)}
        </p>

        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => updateQuantity(item._id, Number(e.target.value) || 1, item.size)}
          className={css.quantityInput}
        />
        <button
        type="button"
          onClick={() => removeItem(item._id, item.size)}>
            <svg></svg>
          </button>
        </li>

  ))}
</ul>

<div className={css.summary}>
  <div className={css.summaryRow}>
    <span>Проміжний підсумок</span>
    <span className={css.summaryValue}>{formatPrice(subtotal)}</span>
    </div>

    <div className={css.summaryRow}>
      <span>Доставка</span>
      <span className={css.summaryValue}>{isFreeDelivery ? 'Безкоштовна' : 'За тарифами перевізника'}</span>
    </div>

<div className={css.totalRow}>
      <span>Всього</span>
      <span>{formatPrice(total)}</span>
    </div>
</div>
  </section> 
}
