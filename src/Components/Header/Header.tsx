import React from 'react';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import Waiting from 'src/Static/Img/Icons/Slider/Waiting.svg';
import s from './Style/Header.module.sass';

const Header: React.FC = (props) => {
  return (
    <Link to="/">
      <div className={s.root}>
        <div className={s.container}>
          <div className="rotateContainer">
            {props.profile_pic_url ? <div><img src={props.profile_pic_url} className={`${s.avatar} rotateItem`} alt="" /></div> : <img src={Waiting} className={s.waiting} alt="" />}
          </div>
          <p>
            <span className={s.title}>
              JUST_JEWELRY_KRD
              {/* {props.full_name ? props.full_name : 'Бижутерия♟Айтемы♟Стиль'} */}
            </span>
            <span className={s.subTitle}>
              🔥 Качественные айтемы...
              {/* {props.biography.slice(0, 45) + '...'} */}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

const UpdateCatch = (state) => {
  return {
    // biography: state.imgs.graphql.user.biography,
    profile_pic_url: state.imgs.graphql.user.profile_pic_url,
    // full_name: state.imgs.graphql.user.full_name,
  };
};

export default connect(UpdateCatch)(Header);
