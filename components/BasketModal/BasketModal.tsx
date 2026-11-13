'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import Link from 'next/link';
import GoodsOrderList from '../GoodsOrderList/GoodsOrderList';
import MessageNoInfo from '../MessageNoInfo/MessageNoInfo';
import css from './BasketModal.module.css';

export default function BasketModal() {
   const router = useRouter();
  const  items  = useCartStore((state) =>state.items);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    router.back();
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isMounted) return null;
  
  return <div className={css.backdrop} onClick={handleOverlayClick}>
  <section className={css.backdropModal} role="dialog" aria-modal="true">
    <div className={css.header}>
        <button
        type="button"
        onClick={handleClose}
        className={css.closeBtn}
        aria-label="Закрити кошик"
      >
          <img src="vector.svg" alt="" width={13.5} height={13.5} />
        </button>

      </div>
        

        <h1 className={css.title}>Ваш кошик</h1>
      
        {items.length > 0 ? (
          <>
          <GoodsOrderList/> 
         
          <div className={css.buttons}>
           <Link href="/goods" className={css.continiueBtn}>
            Продовжити покупки
           </Link>
          <Link href="/order" className={css.orderBtn}>
            Оформити замовлення
          </Link>
          </div>
          </>
        ) : (
          <MessageNoInfo 
          message="Ваш кошик порожній"
          buttonText="Продовжити покупки"
          onClick={() => router.push('/goods')}
          />
        )}
      </section>
    </div>;
  }
    
 