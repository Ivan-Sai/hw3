import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.books]: `${config.UI_URL_PREFIX}/${pages.books}`,
  [pages.profile]: `${config.UI_URL_PREFIX}/${pages.profile}`,
};

export default result;
