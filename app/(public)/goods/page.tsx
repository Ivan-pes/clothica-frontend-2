import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import GoodsList from '@/components/GoodsList/GoodsList';

export default function GoodsPage() {
  return (
    <div className="container page">
      <h1 className="pageTitle">Всі товари</h1>
      <CategoriesFilter />
      <GoodsList />
    </div>
  );
}
