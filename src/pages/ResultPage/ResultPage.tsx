import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Back from '../../components/Back';
import styles from './ResultPage.module.scss';

interface BookingOption {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: string;
  durationKey: string;
}

const bookingOptions: BookingOption[] = [
  {
    id: 'visit',
    titleKey: 'nonMember.result.booking.visit.title',
    descriptionKey: 'nonMember.result.booking.visit.description',
    icon: 'lni lni-map-marker-1',
    durationKey: 'nonMember.result.booking.visit.duration',
  },
  {
    id: 'assessment',
    titleKey: 'nonMember.result.booking.assessment.title',
    descriptionKey: 'nonMember.result.booking.assessment.description',
    icon: 'lni lni-user-4',
    durationKey: 'nonMember.result.booking.assessment.duration',
  },
  {
    id: 'spa',
    titleKey: 'nonMember.result.booking.spa.title',
    descriptionKey: 'nonMember.result.booking.spa.description',
    icon: 'lni lni-water-drop-1',
    durationKey: 'nonMember.result.booking.spa.duration',
  },
];

type RecommendationKey = 'recoverySpa' | 'intensive' | 'personal' | 'balanced';

const getRecommendationKey = (answers: Record<number, string>): RecommendationKey => {
  const values = Object.values(answers);
  
  if (values.includes('recovery') || values.includes('spa')) {
    return 'recoverySpa';
  }
  
  if (values.includes('weight_loss') || values.includes('intensive')) {
    return 'intensive';
  }
  
  if (values.includes('muscle_gain') || values.includes('personal')) {
    return 'personal';
  }
  
  return 'balanced';
};

export const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const answers = (location.state as { answers: Record<number, string> })?.answers || {};
  
  const recommendationKey = getRecommendationKey(answers);

  const recommendation = (() => {
    switch (recommendationKey) {
      case 'recoverySpa':
        return { icon: 'lni lni-water-drop-1', color: '#4ECDC4' };
      case 'intensive':
        return { icon: 'lni lni-bolt-2', color: '#FF6B6B' };
      case 'personal':
        return { icon: 'lni lni-dumbbell-1', color: '#C9A227' };
      default:
        return { icon: 'lni lni-layers-1', color: '#C9A227' };
    }
  })();
  
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSelect = (id: string) => {
    setSelectedBooking(id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to CRM
    console.log('Lead data:', { ...formData, selectedBooking, answers });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.page}>
        <div className={styles.successScreen}>
          <div className={styles.successIcon}>
            <i className="lni lni-check-circle-1" />
          </div>
          <h1 className={styles.successTitle}>{t('nonMember.result.successTitle')}</h1>
          <p className={styles.successText}>{t('nonMember.result.successText')}</p>
          
          <div className={styles.bonusCard}>
            <div className={styles.bonusIcon}>
              <i className="lni lni-box-gift-1" />
            </div>
            <div className={styles.bonusContent}>
              <span className={styles.bonusLabel}>{t('nonMember.result.bonusLabel')}</span>
              <h3 className={styles.bonusTitle}>{t('nonMember.result.bonusTitle')}</h3>
              <p className={styles.bonusText}>{t('nonMember.result.bonusText')}</p>
            </div>
          </div>
          
          <button className={styles.homeButton} onClick={() => navigate('/')}>
            {t('nonMember.result.toHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Back />
      <header className={styles.header}>
        <div className={styles.headerSpacer} />
        <span className={styles.headerTitle}>{t('nonMember.result.headerTitle')}</span>
        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.content}>
        {/* Recommendation Card */}
        <div className={styles.recommendationCard}>
          <div className={styles.recommendationHeader}>
            <span className={styles.recommendationLabel}>{t('nonMember.result.recommendationLabel')}</span>
          </div>
          <div 
            className={styles.recommendationIcon}
            style={{ background: `linear-gradient(135deg, ${recommendation.color}33 0%, ${recommendation.color}11 100%)` }}
          >
            <i className={recommendation.icon} style={{ color: recommendation.color }} />
          </div>
          <h2 className={styles.recommendationTitle}>
            {t(`nonMember.result.reco.${recommendationKey}.title`)}
          </h2>
          <p className={styles.recommendationDescription}>
            {t(`nonMember.result.reco.${recommendationKey}.description`)}
          </p>
        </div>

        {/* Booking Options */}
        {!showForm ? (
          <div className={styles.bookingSection}>
            <h3 className={styles.sectionTitle}>{t('nonMember.result.bookTitle')}</h3>
            <div className={styles.bookingOptions}>
              {bookingOptions.map((option) => (
                <button
                  key={option.id}
                  className={styles.bookingCard}
                  onClick={() => handleBookingSelect(option.id)}
                >
                  <div className={styles.bookingIcon}>
                    <i className={option.icon} />
                  </div>
                  <div className={styles.bookingInfo}>
                    <h4 className={styles.bookingTitle}>{t(option.titleKey)}</h4>
                    <p className={styles.bookingDescription}>{t(option.descriptionKey)}</p>
                  </div>
                  <div className={styles.bookingMeta}>
                    <span className={styles.bookingDuration}>{t(option.durationKey)}</span>
                    <i className="lni lni-chevron-right" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>{t('nonMember.result.contactTitle')}</h3>
            <p className={styles.formSubtitle}>
              {t('nonMember.result.contactSubtitle')}
            </p>
            
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('nonMember.result.nameLabel')}</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder={t('nonMember.result.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>{t('nonMember.result.phoneLabel')}</label>
                <input
                  type="tel"
                  className={styles.input}
                  placeholder="+380"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.backFormButton}
                  onClick={() => setShowForm(false)}
                >
                  {t('nonMember.result.back')}
                </button>
                <button type="submit" className={styles.submitButton}>
                  {t('nonMember.result.submit')}
                  <i className="lni lni-arrow-right" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bonus Banner */}
        {!showForm && (
          <div className={styles.bonusBanner}>
            <div className={styles.bonusBannerIcon}>
              <i className="lni lni-box-gift-1" />
            </div>
            <div className={styles.bonusBannerContent}>
              <span className={styles.bonusBannerLabel}>{t('nonMember.result.bonusBannerLabel')}</span>
              <p className={styles.bonusBannerText}>{t('nonMember.result.bonusBannerText')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
