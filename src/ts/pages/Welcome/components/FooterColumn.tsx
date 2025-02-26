import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import style from '../styles/footer.module.scss';

interface FooterColumnProps {
  title?: string,
  options: any,
}

function FooterColumn({
  title,
  options,
}: FooterColumnProps) {
  const { t } = useTranslation();
  const items = options.map((item: any) => {
    const content = typeof item === 'string'
      ? (
        <p className={style.welcome_footer_text}>
          {t(item)}
        </p>
      ) : (
        <Link
          to={item?.link}
          target="_blank"
          className={style.welcome_footer_link}
        >
          {t(item?.title)}
        </Link>
      );

    return (
      <li
        key={item?.title || item}
        className={style.welcome_footer_list_item}
      >
        {content}
      </li>
    );
  });

  return (
    <nav className={style.welcome_footer_nav}>
      <label className={style.welcome_footer_title}>
        {title ? t(title) : null}
      </label>
      <ul className={style.welcome_footer_list}>
        {items}
      </ul>
    </nav>
  );
}

export default FooterColumn;
