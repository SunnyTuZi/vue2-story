/**
 * Create by Zwl on 2019/4/18
 * @Description:
 */

'use strict';

let imgBaseUrl = ''
if (process.env.NODE_ENV == 'development') {
  imgBaseUrl = '//localhost:3000/';

}else if(process.env.NODE_ENV == 'production'){
  imgBaseUrl = '//localhost:3000/img';
}

export {
  imgBaseUrl
}
