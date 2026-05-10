import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Back from '../../components/Back';
import styles from './QuizPage.module.scss';

interface Question {
  id: number;
  questionKey: string;
  subtitleKey: string;
  options: {
    id: string;
    textKey: string;
    icon: string;
    value: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    questionKey: 'nonMember.quiz.q1.question',
    subtitleKey: 'nonMember.quiz.q1.subtitle',
    options: [
      { id: 'a', textKey: 'nonMember.quiz.q1.a', icon: 'lni lni-bolt-2', value: 'weight_loss' },
      { id: 'b', textKey: 'nonMember.quiz.q1.b', icon: 'lni lni-dumbbell-1', value: 'muscle_gain' },
      { id: 'c', textKey: 'nonMember.quiz.q1.c', icon: 'lni lni-bolt-3', value: 'endurance' },
      { id: 'd', textKey: 'nonMember.quiz.q1.d', icon: 'lni lni-leaf-1', value: 'recovery' },
    ],
  },
  {
    id: 2,
    questionKey: 'nonMember.quiz.q2.question',
    subtitleKey: 'nonMember.quiz.q2.subtitle',
    options: [
      { id: 'a', textKey: 'nonMember.quiz.q2.a', icon: 'lni lni-calendar-days', value: 'rare' },
      { id: 'b', textKey: 'nonMember.quiz.q2.b', icon: 'lni lni-star-fat', value: 'regular' },
      { id: 'c', textKey: 'nonMember.quiz.q2.c', icon: 'lni lni-trophy-1', value: 'intensive' },
      { id: 'd', textKey: 'nonMember.quiz.q2.d', icon: 'lni lni-question-mark-circle', value: 'unsure' },
    ],
  },
  {
    id: 3,
    questionKey: 'nonMember.quiz.q3.question',
    subtitleKey: 'nonMember.quiz.q3.subtitle',
    options: [
      { id: 'a', textKey: 'nonMember.quiz.q3.a', icon: 'lni lni-user-4', value: 'personal' },
      { id: 'b', textKey: 'nonMember.quiz.q3.b', icon: 'lni lni-user-multiple-4', value: 'group' },
      { id: 'c', textKey: 'nonMember.quiz.q3.c', icon: 'lni lni-target-user', value: 'solo' },
      { id: 'd', textKey: 'nonMember.quiz.q3.d', icon: 'lni lni-layers-1', value: 'mixed' },
    ],
  },
  {
    id: 4,
    questionKey: 'nonMember.quiz.q4.question',
    subtitleKey: 'nonMember.quiz.q4.subtitle',
    options: [
      { id: 'a', textKey: 'nonMember.quiz.q4.a', icon: 'lni lni-water-drop-1', value: 'spa' },
      { id: 'b', textKey: 'nonMember.quiz.q4.b', icon: 'lni lni-heart', value: 'nutrition' },
      { id: 'c', textKey: 'nonMember.quiz.q4.c', icon: 'lni lni-user-multiple-4', value: 'community' },
      { id: 'd', textKey: 'nonMember.quiz.q4.d', icon: 'lni lni-diamonds-1', value: 'all' },
    ],
  },
  {
    id: 5,
    questionKey: 'nonMember.quiz.q5.question',
    subtitleKey: 'nonMember.quiz.q5.subtitle',
    options: [
      { id: 'a', textKey: 'nonMember.quiz.q5.a', icon: 'lni lni-leaf-6', value: 'beginner' },
      { id: 'b', textKey: 'nonMember.quiz.q5.b', icon: 'lni lni-check-circle-1', value: 'intermediate' },
      { id: 'c', textKey: 'nonMember.quiz.q5.c', icon: 'lni lni-trophy-1', value: 'advanced' },
      { id: 'd', textKey: 'nonMember.quiz.q5.d', icon: 'lni lni-refresh-circle-1-clockwise', value: 'returning' },
    ],
  },
];

export const QuizPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleSelect = (optionId: string, value: string) => {
    setSelectedOption(optionId);
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (isLastQuestion) {
      navigate('/non-member/result', { state: { answers } });
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(currentQuestion - 1);
        setSelectedOption(null);
        setIsAnimating(false);
      }, 300);
    } else {
      navigate('/non-member');
    }
  };

  return (
    <div className={styles.page}>
      <Back onBack={handleBack} />
      <div className={styles.backgroundOrb} />
      
      <header className={styles.header}>
        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className={styles.counter}>
          {currentQuestion + 1}/{questions.length}
        </span>
      </header>

      <div className={`${styles.content} ${isAnimating ? styles.contentAnimating : ''}`}>
        <div className={styles.questionSection}>
          <span className={styles.questionNumber}>
            {t('nonMember.quiz.questionLabel', { n: currentQuestion + 1 })}
          </span>
          <h1 className={styles.question}>{t(question.questionKey)}</h1>
          <p className={styles.subtitle}>{t(question.subtitleKey)}</p>
        </div>

        <div className={styles.options}>
          {question.options.map((option, index) => (
            <button
              key={option.id}
              className={`${styles.option} ${selectedOption === option.id ? styles.optionSelected : ''}`}
              onClick={() => handleSelect(option.id, option.value)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={styles.optionIcon}>
                <i className={option.icon} />
              </span>
              <span className={styles.optionText}>{t(option.textKey)}</span>
              <span className={styles.optionCheck}>
                {selectedOption === option.id && <i className="lni lni-check" />}
              </span>
            </button>
          ))}
        </div>

        <button 
          className={`${styles.nextButton} ${!selectedOption ? styles.nextButtonDisabled : ''}`}
          onClick={handleNext}
          disabled={!selectedOption}
        >
          <span>
            {isLastQuestion ? t('nonMember.quiz.getResult') : t('nonMember.quiz.continue')}
          </span>
          <i className={`lni lni-arrow-right ${styles.nextArrow}`} />
        </button>
      </div>
    </div>
  );
};
