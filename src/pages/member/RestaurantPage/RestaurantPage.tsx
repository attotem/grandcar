import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './RestaurantPage.module.scss';

import proteinBowlImg from '../../../assets/restaurant/protein-bowl.png';
import omeletImg from '../../../assets/restaurant/omelet.png';
import greekSaladImg from '../../../assets/restaurant/greek-salad.png';
import steakImg from '../../../assets/restaurant/steak.png';
import smoothieEnergyImg from '../../../assets/restaurant/smoothie-energy.png';
import greenDetoxImg from '../../../assets/restaurant/green-detox.png';
import proteinBarImg from '../../../assets/restaurant/protein-bar.png';
import nutsMixImg from '../../../assets/restaurant/nuts-mix.png';

const menuCategories = ['breakfasts', 'lunches', 'drinks', 'snacks'] as const;

const menuItems = [
  { id: 1, nameKey: 'restaurant.items.proteinBowl.name', descriptionKey: 'restaurant.items.proteinBowl.description', price: 320, category: 'breakfasts', calories: 450, image: proteinBowlImg },
  { id: 2, nameKey: 'restaurant.items.veggieOmelet.name', descriptionKey: 'restaurant.items.veggieOmelet.description', price: 220, category: 'breakfasts', calories: 380, image: omeletImg },
  { id: 3, nameKey: 'restaurant.items.greekSalad.name', descriptionKey: 'restaurant.items.greekSalad.description', price: 280, category: 'lunches', calories: 320, image: greekSaladImg },
  { id: 4, nameKey: 'restaurant.items.steakVeggies.name', descriptionKey: 'restaurant.items.steakVeggies.description', price: 520, category: 'lunches', calories: 550, image: steakImg },
  { id: 5, nameKey: 'restaurant.items.smoothieEnergy.name', descriptionKey: 'restaurant.items.smoothieEnergy.description', price: 150, category: 'drinks', calories: 280, image: smoothieEnergyImg },
  { id: 6, nameKey: 'restaurant.items.greenDetox.name', descriptionKey: 'restaurant.items.greenDetox.description', price: 130, category: 'drinks', calories: 120, image: greenDetoxImg },
  { id: 7, nameKey: 'restaurant.items.proteinBar.name', descriptionKey: 'restaurant.items.proteinBar.description', price: 90, category: 'snacks', calories: 200, image: proteinBarImg },
  { id: 8, nameKey: 'restaurant.items.nutsMix.name', descriptionKey: 'restaurant.items.nutsMix.description', price: 80, category: 'snacks', calories: 180, image: nutsMixImg },
];

export const RestaurantPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<(typeof menuCategories)[number]>('breakfasts');
  const [cart, setCart] = useState<number[]>([]);

  const filteredMenu = menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  const cartTotal = cart.reduce((sum, id) => {
    const item = menuItems.find((i) => i.id === id);
    return sum + (item?.price || 0);
  }, 0);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('restaurant.title')}</h1>
        <button className={styles.tableBtn}>
          <i className="lni lni-calendar-days" />
          <span>{t('restaurant.reserveTable')}</span>
        </button>
      </header>

      {/* Categories */}
      <div className={styles.categories}>
        {menuCategories.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {t(`restaurant.categories.${cat}`)}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className={styles.menuList}>
        {filteredMenu.map((item) => (
          <div key={item.id} className={styles.menuCard} onClick={() => navigate(`/member/restaurant/${item.id}`)}>
            <div className={styles.menuImage}>
              <img src={item.image} alt={t(item.nameKey)} />
            </div>
            <div className={styles.menuInfo}>
              <h3 className={styles.menuName}>{t(item.nameKey)}</h3>
              <p className={styles.menuDescription}>{t(item.descriptionKey)}</p>
              <span className={styles.calories}>{item.calories} kcal</span>
            </div>
            <div className={styles.menuAction}>
              <span className={styles.price}>{item.price} ₴</span>
              <button className={styles.addBtn} onClick={(e) => { e.stopPropagation(); addToCart(item.id); }}>
                <i className="lni lni-plus" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className={styles.cartBar}>
          <div className={styles.cartInfo}>
            <span className={styles.cartCount}>{t('restaurant.cart.itemsCount', { count: cart.length })}</span>
            <span className={styles.cartTotal}>{cartTotal} ₴</span>
          </div>
          <button className={styles.orderBtn}>
            {t('restaurant.cart.order')}
            <i className="lni lni-arrow-right" />
          </button>
        </div>
      )}
    </div>
  );
};
