import React from 'react';

import UpdateImgs from 'src/Logics/UpdateImgs/UpdateImgs';
import Links from './Links/Links';
import Text from './Text/Text';
import Slider from './Slider/Slider';

import s from './Style/MainPage.module.sass';

// async function getInstagramPictures (profileName) {
//   const baseUrl = "https://www.instagram.com";
//   const profileUrl = `${baseUrl}/${profileName}`;
//   const jsonDataUrl = `${profileUrl}/?__a=1`;

//   const response = await fetch(jsonDataUrl);
//   const jsonData = await response.json();
//   // const pictures = jsonData.graphql.user.edge_owner_to_timeline_media.edges;

//   if (response.ok) {
//     return jsonData;
//   } else {
//     // throw new Error(pictures);
//   }
// }

// getInstagramPictures("nasa")
//   .then(pictures => console.log("Pictures:", pictures))
//   .catch(error => console.error("Error:", error));


const MainPage: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.mainPage}>
        <div className={s.CenterMain}>
          <Links />
          <Text />
          <Slider />
        </div>
      </div>
      <UpdateImgs />
    </div>
  );
};

export default MainPage;
