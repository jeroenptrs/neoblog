import { u } from '@cityofzion/neon-js';
import getFromStorage from './getFromStorage';
import { getAddressFromScriptHash } from './blockchain/conversion';

(async function execute() {
  try {
    const userHash = 'AQH5ezqtD7VRHBMrLaeBeSTW22vZEREMoL';
    const postHash = 'QmQK9ucWGFjbo2hnJGK2C7nTJY5jF4QXnm131p2gq2u7sK';
    
    const getLatestArticle = parseInt(await getFromStorage(u.str2hexstring('post.latest')));
    console.log(`Latest article is at index ${getLatestArticle}`);
    
    const getArticle = await getFromStorage(u.str2hexstring('post.') + u.int2hex(getLatestArticle));
    const formattedArticle = u.hexstring2str(getArticle);
    console.log(`That article hash is ${formattedArticle}`);
    
    const getArticleData = await getFromStorage(u.str2hexstring('post.data.' + formattedArticle));
    const formattedArticleData = getAddressFromScriptHash(getArticleData); // !!! muy importante
    console.log(`It's written by a user with address ${formattedArticleData}`);
    
    const getUserData = await getFromStorage(u.str2hexstring('user.') + getArticleData);
    console.log(`And this user also has a fancy userid: ${u.hexstring2str(getUserData)}`);
  } catch(e) {
    console.log(e);
  }
})();
