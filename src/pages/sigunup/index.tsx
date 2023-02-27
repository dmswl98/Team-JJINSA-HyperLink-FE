import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Text } from '@/components/common';
import { BasicInfo, CategoryInfo, WorkInfo } from '@/components/signup';
import useInput from '@/hooks/useInput';

import * as variants from '@/styles/variants.css';
import * as style from './style.css';

const STEPS = ['기본 정보', '직군 / 경력', '관심 카테고리'];

const SignupPage = () => {
  const {
    state: { email },
  } = useLocation();
  const [step, setStep] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>(
    'right'
  );

  const { value: nickname, onChange: setNickname } = useInput();
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');

  const [job, setJob] = useState('');
  const [career, setCareer] = useState('');

  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoryClick = (clickedCategory: string) => {
    setCategories(
      categories.find((category: string) => category === clickedCategory)
        ? categories.filter((category: string) => category !== clickedCategory)
        : [...categories, clickedCategory]
    );
  };

  const handlePrevClick = () => {
    setSlideDirection('left');
    setStep(step - 1);
  };

  const handleNextClick = () => {
    if (step === STEPS.length) {
      handleSubmit();
    } else {
      setSlideDirection('right');
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    console.log('submit');
    // TODO: signup api call
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.stepContainer}>
          {STEPS.map((item, index) => {
            return (
              <div key={item} className={style.step}>
                <div
                  className={style.stepNumber({
                    type: step === index + 1 ? 'current' : undefined,
                  })}
                >
                  {step > index + 1 ? '✔' : index + 1}
                </div>
                <Text
                  color={
                    step === index + 1
                      ? variants.color.font.primary
                      : variants.color.font.secondary
                  }
                  weight={step === index + 1 ? 700 : 500}
                >
                  {item}
                </Text>
              </div>
            );
          })}
        </div>

        {step === 1 && (
          <BasicInfo
            email={email}
            inputs={{
              nickname,
              birthYear,
              gender,
              setNickname: (nickname: string) => setNickname(nickname),
              setBirthYear,
              setGender,
            }}
            slideDirection={slideDirection}
            onNextClick={handleNextClick}
          />
        )}
        {step === 2 && (
          <WorkInfo
            nickname={nickname}
            inputs={{
              job,
              career,
              setJob,
              setCareer,
            }}
            slideDirection={slideDirection}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        )}
        {step === 3 && (
          <CategoryInfo
            selectedCategories={categories}
            onCategoryClick={handleCategoryClick}
            slideDirection={slideDirection}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
