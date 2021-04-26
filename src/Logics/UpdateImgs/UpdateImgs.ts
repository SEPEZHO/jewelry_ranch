// import React from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { UpdateImgs } from 'src/Store/Actions/UpdateImgsAction';

// const jsonp = (url, callback) => {
//   var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
//   window[callbackName] = function(data) {
//     delete window[callbackName];
//     document.body.removeChild(script);
//     callback(data);
//   };

//   var script = document.createElement('script');
//   script.src =
//     url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
//   document.body.appendChild(script);
// };

// const UpdateImgsFunc: React.FC = (props) => {
//   // axios.jsonp('https://www.instagram.com/just_jewelry_krd/?__a=1', {
//   //   method: 'jsonp',
//   //   responseType: 'jsonp',
//   // })
//   //   .then((response) => console.log(response))
//   //   .then((response) => {
//   //     // props.UpdateImgs(response);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //     alert('error: ' + err)
//   //     // props.UpdateImgs(err);
//   //   });

//   axios.get('https://www.instagram.com/just_jewelry_krd/?__a=1', {
//     headers: {
//       'Access-Control-Allow-Origin': '*n
//     }
//   })
//   .then(res => {
//       console.log(res.data.data[0].images);
//           this.setState({ images: res.data.data });
//   })
//   .catch(err => {
//       console.log(err)
//   })


//   // jsonp('https://www.instagram.com/just_jewelry_krd/?__a=1', (d, e)=>{console.log(d, e)})
//   // jsonp({
//   //   method: 'jsonp',

//   //   responseType: 'json',
//   //   url: 'https://www.instagram.com/just_jewelry_krd/?__a=1',
//   // }).then((response) => console.log(response))
//   return null;
// };




// const mapDispatchToProps = (dispatch) => {
//   return {
//     UpdateImgs: (imgs) => dispatch(UpdateImgs(imgs)),
//   };
// };

// export default connect(null, mapDispatchToProps)(UpdateImgsFunc);



import React from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { UpdateImgs } from 'src/Store/Actions/UpdateImgsAction';
// let _reprojection_url = 'https://www.instagram.com/explore/tags/italy/?__a=1'

// async function get_ajax_data(){
//   var _reprojected_lat_lng = await 
// })
// console.log(_reprojected_lat_lng)
                       

// }


const UpdateImgsFunc: React.FC = (props) => {
  // let a =  $.ajax({
  //   type: 'GET',
  //   dataType: 'jsonp',
  //   url: _reprojection_url,
  //   error: function (jqXHR, textStatus, errorThrown) {
  //       console.log(jqXHR)
  //   },
  //   success: function (data) {
  //       console.log(data);

  //       // note: data is already json type, you
  //       //       just specify dataType: jsonp
  //       return data;
  //   }
  // })
  // console.log(
  //  a
  // )


  const url = () => {
    let userName = 'sepezho'
    return (
      "https://images" +
      ~~(Math.random() * 3333) +
      "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/" +
      userName +
      "/"
    );
  };

  const getJSON = (body) => {
    try {
      const data = body
        .split("window._sharedData = ")[1]
        .split("</script>")[0];
      return JSON.parse(data.substr(0, data.length - 1));
    } catch (err) {
      throw Error("cannot parse response body");
    }
  };

  const mapMedia = (json) => {
    try {
      const thumbnailIndex = (node) => {
        node.thumbnail_resources.forEach((item, index) => {
          if (item.config_width === 640) {
            return index;
          }
        });

        return 4; // MAGIC
      };

      const url = (node) => {
        return "https://www.instagram.com/p/" + node.shortcode;
      };

      const src = (node) => {
        switch (node.__typename) {
          case "GraphVideo":
            return node.thumbnail_src;
          case "GraphSidecar":
          default:
            return node.thumbnail_resources[thumbnailIndex(node)].src;
        }
      };

      const alt = (node) => {
        if (
          node.edge_media_to_caption.edges[0] &&
          node.edge_media_to_caption.edges[0].node
        ) {
          return node.edge_media_to_caption.edges[0].node.text;
        } else if (node.accessibility_caption) {
          return node.accessibility_caption;
        } else {
          return "";
        }
      };

      const edges =
        json.entry_data.ProfilePage[0].graphql.user
          .edge_owner_to_timeline_media.edges;

      // return edges.map((edge) => {
      //   return {
      //     alt: alt(edge.node),
      //     url: url(edge.node),
      //     src: src(edge.node),
      //   };
      // });
      // console.log('------')
      // console.log(edges)
      props.UpdateImgs(edges)

    } catch (err) {
      throw Error("cannot map media array");
    }
  };


  // fetch(url())
  // .then((resp) => resp.text())
  // .then((body) => getJSON(body))
  // .then((json) => (mapMedia(json)))


  const fetchWithRetry = (n, err) => {
    if (n <= 1) throw err;

    return fetch(url())
      .then((resp) => resp.text())
      .then((body) => getJSON(body))
      .then((json) => mapMedia(json))
      .catch((err) => fetchWithRetry(n - 1, err));
  };
  fetchWithRetry(5)
  // props.UpdateImgs(fetchWithRetry(5))

  return null;
};
  // const Instagram = require('instagram-web-api')

  // const client = new Instagram({ username: '', password: '' }, { language: 'es-CL' })
  // // const instagram = async () => await client.getUserByUsername({ username: 'sepezho' })
  // console.log(client.getUserByUsername({ username: 'sepezho' }).json())



  // $.ajax({
  //   url: 'https://www.instagram.com/sepezho/?__a=1&callback=?',
  //   type: "GET",
  //   // crossDomain: true,
  //   dataType: "jsonp",
  //   Headers: {
  //     'X-Content-Type-Options': 'nosniff'
  //   }
  //   success: data => console.log(data)
    // {
    //     ;
    //     // _.each(data, function(look){
        //     console.log(look);

            //var $look = template(look);
            //$("#looks-container").append($look);
        // }
    // );
    // }
// // });

//   fetch('https://www.instagram.com/explore/tags/italy/?__a=1', {
//     method: 'GET',
//   })
//     .then((response) => console.log(response.json()))
//     .then((response) => {
//       props.UpdateImgs(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       // props.UpdateImgs(err);
//     });
  

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateImgs: (imgs) => dispatch(UpdateImgs(imgs)),
  };
};

export default connect(null, mapDispatchToProps)(UpdateImgsFunc);
