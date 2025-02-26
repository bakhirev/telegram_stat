import React from 'react';

import style from '../styles/desktop.module.scss';

interface DesktopButtonsProps {
  value: number;
  count: number;
  onClick: (value: number) => void;
}

function DesktopButtons({
  value,
  count,
  onClick,
}: DesktopButtonsProps) {
  const buttons = (new Array(count))
    .fill(1)
    .map((a: number, index: number) => (
      <button
        key={`${a}${index}`}
        className={value === index
          ? style.welcome_desktop_button_selected
          : style.welcome_desktop_button}
        onClick={() => {
          onClick(index);
        }}
      />
    ));

  return (
    <div className={style.welcome_desktop_buttons}>
      {buttons}
    </div>
  );
}

export default DesktopButtons;
