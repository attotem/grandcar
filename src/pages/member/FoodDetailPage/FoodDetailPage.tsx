import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Back from '../../../components/Back';
import styles from './FoodDetailPage.module.scss';

import proteinBowlImg from '../../../assets/restaurant/protein-bowl.png';
import omeletImg from '../../../assets/restaurant/omelet.png';
import greekSaladImg from '../../../assets/restaurant/greek-salad.png';
import steakImg from '../../../assets/restaurant/steak.png';
import smoothieEnergyImg from '../../../assets/restaurant/smoothie-energy.png';
import greenDetoxImg from '../../../assets/restaurant/green-detox.png';
import proteinBarImg from '../../../assets/restaurant/protein-bar.png';
import nutsMixImg from '../../../assets/restaurant/nuts-mix.png';

const menuItems = [
  { 
    id: 1, 
    itemKey: 'proteinBowl',
    price: 320, 
    categoryKey: 'breakfasts',
    calories: 450,
    protein: 42,
    fats: 18,
    carbs: 35,
    fiber: 8,
    weight: 350,
    image: proteinBowlImg,
  },
  { 
    id: 2, 
    itemKey: 'veggieOmelet',
    price: 220, 
    categoryKey: 'breakfasts',
    calories: 380,
    protein: 28,
    fats: 26,
    carbs: 8,
    fiber: 2,
    weight: 280,
    image: omeletImg,
  },
  { 
    id: 3, 
    itemKey: 'greekSalad',
    price: 280, 
    categoryKey: 'lunches',
    calories: 320,
    protein: 12,
    fats: 24,
    carbs: 15,
    fiber: 4,
    weight: 300,
    image: greekSaladImg,
  },
  { 
    id: 4, 
    itemKey: 'steakVeggies',
    price: 520, 
    categoryKey: 'lunches',
    calories: 550,
    protein: 48,
    fats: 32,
    carbs: 18,
    fiber: 5,
    weight: 400,
    image: steakImg,
  },
  { 
    id: 5, 
    itemKey: 'smoothieEnergy',
    price: 150, 
    categoryKey: 'drinks',
    calories: 280,
    protein: 25,
    fats: 4,
    carbs: 38,
    fiber: 5,
    weight: 400,
    image: smoothieEnergyImg,
  },
  { 
    id: 6, 
    itemKey: 'greenDetox',
    price: 130, 
    categoryKey: 'drinks',
    calories: 120,
    protein: 3,
    fats: 1,
    carbs: 26,
    fiber: 4,
    weight: 350,
    image: greenDetoxImg,
  },
  { 
    id: 7, 
    itemKey: 'proteinBar',
    price: 90, 
    categoryKey: 'snacks',
    calories: 200,
    protein: 20,
    fats: 8,
    carbs: 12,
    fiber: 3,
    weight: 60,
    image: proteinBarImg,
  },
  { 
    id: 8, 
    itemKey: 'nutsMix',
    price: 80, 
    categoryKey: 'snacks',
    calories: 180,
    protein: 5,
    fats: 16,
    carbs: 6,
    fiber: 2,
    weight: 50,
    image: nutsMixImg,
  },
] as const;

export const FoodDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  
  const item = menuItems.find((i) => i.id === Number(id));

  if (!item) {
    return (
      <div className={styles.page}>
        <Back />
        <div className={styles.notFound}>
          <i className="lni lni-warning" />
          <p>{t('foodDetail.notFound')}</p>
        </div>
      </div>
    );
  }

  const macros = [
    { label: t('foodDetail.macros.protein'), value: item.protein, unit: t('foodDetail.units.g'), color: '#4ECDC4' },
    { label: t('foodDetail.macros.fats'), value: item.fats, unit: t('foodDetail.units.g'), color: '#FFE66D' },
    { label: t('foodDetail.macros.carbs'), value: item.carbs, unit: t('foodDetail.units.g'), color: '#FF6B6B' },
    { label: t('foodDetail.macros.fiber'), value: item.fiber, unit: t('foodDetail.units.g'), color: '#95E1A3' },
  ];

  const totalMacros = item.protein + item.fats + item.carbs;
  const ingredientKeys = t(`foodDetail.items.${item.itemKey}.ingredients`, { returnObjects: true }) as string[];

  return (
    <div className={styles.page}>
      <Back />
      

      {/* Hero Image */}
      <div className={styles.heroImage}>
        <img src={item.image} alt={t(`restaurant.items.${item.itemKey}.name`)} />
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.content}>
        {/* Main Info */}
        <div className={styles.mainInfo}>
          <span className={styles.category}>{t(`restaurant.categories.${item.categoryKey}`)}</span>
          <h2 className={styles.name}>{t(`restaurant.items.${item.itemKey}.name`)}</h2>
          <p className={styles.description}>{t(`foodDetail.items.${item.itemKey}.descriptionLong`)}</p>
          <div className={styles.meta}>
            <span className={styles.weight}><i className="lni lni-weight-machine-1" /> {item.weight} {t('foodDetail.units.g')}</span>
            <span className={styles.price}>{item.price} ₴</span>
          </div>
        </div>

        {/* Calories Card */}
        <div className={styles.caloriesCard}>
          <div className={styles.caloriesMain}>
            <span className={styles.caloriesValue}>{item.calories}</span>
            <span className={styles.caloriesLabel}>{t('foodDetail.units.kcal')}</span>
          </div>
          <div className={styles.caloriesInfo}>
            <p>{t('foodDetail.energyPerServing')}</p>
          </div>
        </div>

        {/* Macros */}
        <div className={styles.macrosSection}>
          <h3 className={styles.sectionTitle}>{t('foodDetail.nutritionFacts')}</h3>
          
          {/* Macros Bar */}
          <div className={styles.macrosBar}>
            {macros.slice(0, 3).map((macro) => (
              <div
                key={macro.label}
                className={styles.macroSegment}
                style={{
                  width: `${(macro.value / totalMacros) * 100}%`,
                  backgroundColor: macro.color,
                }}
              />
            ))}
          </div>

          {/* Macros Grid */}
          <div className={styles.macrosGrid}>
            {macros.map((macro) => (
              <div key={macro.label} className={styles.macroCard}>
                <div className={styles.macroIndicator} style={{ backgroundColor: macro.color }} />
                <div className={styles.macroInfo}>
                  <span className={styles.macroLabel}>{macro.label}</span>
                  <span className={styles.macroValue}>{macro.value}{macro.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <div className={styles.ingredientsSection}>
          <h3 className={styles.sectionTitle}>{t('foodDetail.ingredients')}</h3>
          <div className={styles.ingredientsList}>
            {ingredientKeys.map((ingredientKey, index) => (
              <span key={index} className={styles.ingredientTag}>
                {t(`foodDetail.ingredientsDict.${ingredientKey}`)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className={styles.footer}>
        <button className={styles.addButton}>
          <span>{t('foodDetail.addToOrder')}</span>
          <span className={styles.addPrice}>{item.price} ₴</span>
        </button>
      </div>
    </div>
  );
};
