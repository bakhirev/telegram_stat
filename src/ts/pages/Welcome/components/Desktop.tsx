import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DesktopButtons from './DesktopButtons';

import style from '../styles/desktop.module.scss';

interface ScreenProps {
  src: string;
  className: string;
}

function Screen({ src, className }: ScreenProps) {
  return (
    <div className={style.welcome_desktop_screen}>
      <img
        src={src}
        className={className}
      />
    </div>
  );
}

const SLIDES = [
  {
    src: './assets/welcome/1.png',
    title: ['page.welcome.step1', 'page.welcome.step2'],
    className: style.welcome_desktop_screen_1,
  },
  {
    src: './assets/welcome/2.png',
    title: ['page.welcome.step3', 'page.welcome.step4'],
    className: style.welcome_desktop_screen_2,
  },
  {
    src: './assets/welcome/3.png',
    title: ['page.welcome.step5'],
    className: style.welcome_desktop_screen_3,
  },
  {
    src: './assets/welcome/4.png',
    title: ['page.welcome.step6'],
    className: style.welcome_desktop_screen_4,
  },
];

function Desktop() {
  const ref = useRef(null);
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const slideCount = SLIDES.length + 1;

  useEffect(() => {
    const element = ref?.current as any;
    if (!element) return;
    const scroll = element.getBoundingClientRect()?.width || 1000;
    element.scrollTo(activeSlide * scroll, 0);
  }, [ref, ref?.current, activeSlide]);

  const showNextSlide = useCallback(() => {
    let next = activeSlide + 1;
    if (next >= slideCount) next = 0;
    setActiveSlide(next);
  }, [activeSlide]);

  const slideElements = SLIDES.map((item: any) => (
    <Screen
      key={item.src}
      src={item.src}
      className={item.className}
    />
  ));

  const title = useMemo(() => (
    (SLIDES[activeSlide - 1]?.title || ['page.welcome.steps'])
      .map((key) => t(key))
      .join(' ')
  ), [activeSlide]);

  return (
    <div className={style.welcome_desktop_wrapper}>
      <p className={style.welcome_desktop_title}>
        {title}
      </p>

      <div
        ref={ref}
        className={`${style.welcome_desktop} scroll_x`}
        style={{
          backgroundImage: 'url(./assets/welcome/desktop.png)',
        }}
        onClick={() => {
          showNextSlide();
        }}
      >
        {slideElements}
      </div>

      <DesktopButtons
        value={activeSlide}
        count={slideCount}
        onClick={setActiveSlide}
      />
    </div>
  );
}

export default Desktop;
