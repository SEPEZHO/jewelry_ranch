import React from 'react';

import SrcInst from 'src/Static/Img/Icons/Sidebar/Inst.png';
import s from './Style/Footer.module.sass';

const Footer: React.FC = () => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div>
          <div>
            <img src={SrcInst} alt="" />
            <span>
              Все данные берутся с <a href="https://www.instagram.com/just_jewelry_krd">instagram</a>,
              при загрузке страницы.
            </span>
          </div>
          <span>
            А вот и мой <a href="https://sepezho.com">сайт</a>. Заходи, пиши. Всегда рад новым знакомствам :)
          </span>
        </div>
        <span>
          Created by Sepezho 2021
        </span>
      </div>
    </div>
  );
};

export default Footer;
