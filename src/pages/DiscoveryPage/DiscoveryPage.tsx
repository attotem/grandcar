import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Back from '../../components/Back';
import styles from './DiscoveryPage.module.scss';

const slides = [
  { id: 'about', image: '/1.jpg' as const },
  { id: 'coworking', image: '/2.jpg' as const },
  { id: 'events', image: '/3.jpg' as const },
  { id: 'contact', image: '/4.jpg' as const },
] as const;

export const DiscoveryPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      setCurrentSlide((prev) => {
        if (prev < slides.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }

    if (touchStart - touchEnd < -75) {
      setCurrentSlide((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    }
  };

  const handleNext = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setCurrentSlide((prev) => {
      if (prev < slides.length - 1) {
        return prev + 1;
      }

      navigate('/');
      return prev;
    });
  };

  const handleButtonTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  const handleButtonTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleNext(e);
  };

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className={styles.page}>
      <Back />
      
      <div
        className={styles.slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.slideImage}>
          <img 
            src={slide.image} 
            alt={t(`nonMember.discovery.slides.${slide.id}.title`)} 
            className={styles.image}
            key={slide.id}
          />
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.slideContent}>
          <div className={styles.dots}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          <span className={styles.slideSubtitle}>
            {t(`nonMember.discovery.slides.${slide.id}.subtitle`)}
          </span>
          <h2 className={styles.slideTitle}>
            {t(`nonMember.discovery.slides.${slide.id}.title`)}
          </h2>
          <p className={styles.slideDescription}>
            {t(`nonMember.discovery.slides.${slide.id}.description`)}
          </p>

          <button 
            type="button"
            className={styles.nextButton} 
            onClick={handleNext}
            onTouchStart={handleButtonTouchStart}
            onTouchEnd={handleButtonTouchEnd}
          >
            {isLastSlide ? t('nonMember.discovery.start') : t('nonMember.discovery.next')}
          </button>
        </div>
      </div>
    </div>
  );
};
