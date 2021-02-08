import React, {useEffect, useState} from 'react';

import SrcTelegram from 'src/Static/Img/Icons/Sidebar/Telegram.png';
import SrcVk from 'src/Static/Img/Icons/Sidebar/Vk.png';
import SrcInst from 'src/Static/Img/Icons/Sidebar/Inst.png';
import WhatsApp from 'src/Static/Img/Icons/Sidebar/WhatsApp.png';
import SrcGmail from 'src/Static/Img/Icons/Sidebar/Gmail.png';

import s from './Style/Links.module.sass';

const items = [
  {href: 'https://www.instagram.com/just_jewelry_krd', src: SrcInst, isActive: false},
  {href: 'mailto:just.jewelry.krd@gmail.com', src: SrcGmail, isActive: false},
  {href: 'https://t.me/sepezho', src: SrcTelegram, isActive: false},
  {href: 'https://wa.me/89384087858', src: WhatsApp, isActive: false},
  {href: 'https://vk.com/sepezho', src: SrcVk, isActive: false},
];

const Links = () => {
  const [itemsState, setItemsState] = useState(items);

  useEffect(() => {
    let oldElement = 0;
    const interval = setInterval(() => {
      const newItems = [...items];
      newItems[oldElement].isActive = false;
      let newElement = Math.floor(Math.random() * items.length);
      while (oldElement === newElement) {
        newElement = Math.floor(Math.random() * items.length);
      }
      oldElement = newElement;
      newItems[newElement].isActive = true;
      setItemsState(newItems);
    }, 6000);
    return () => {
      clearInterval(interval);
    };
  }, [items]);

  return (
    <div className={s.LinksContainer}>
      {itemsState.map((item) => (
        <a href={item.href} key={item.href}>
          <img src={item.src} className={item.isActive ? s.activeImg : ''} alt="" />
        </a>
      ))}
    </div>
  );
};

export default Links;
