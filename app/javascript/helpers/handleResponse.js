import axios from 'axios'
import RouterPath from 'navigations/router-path'
import Storage from 'utils/storage'

const handleAxiosApi = () => {
  axios.interceptors.response.use((response) => {
    if ((response && response.data && response.data.status === 90) || response.data.status === 34) {
      Storage.remove('USER_ACCESS_TOKEN')
      Storage.remove('USER_ID_SGP_EXCHANGE')
      Storage.remove('TWO_FACTOR_SGP_EXCHANGE')
      Storage.remove('USER_ROLE')
      Storage.remove('USER_PHONE_NUMBER')
      Storage.remove('USER_COUNTRY')
      Storage.remove('LIST_CARD_USER_SGP')
      Storage.remove('CARD_DETAIL_SGP')
      window.location = `${RouterPath.LOGIN.path}?token-expired=${response.data.message}`
      return false
    }

    // Check account is locked or disabled
    if (((response && response.data && response.data.status === 17) || response.data.status === 16)
      && window.location.pathname !== RouterPath.LOGIN.path) {
      Storage.remove('USER_ACCESS_TOKEN')
      Storage.remove('USER_ID_SGP_EXCHANGE')
      Storage.remove('TWO_FACTOR_SGP_EXCHANGE')
      Storage.remove('USER_ROLE')
      Storage.remove('USER_PHONE_NUMBER')
      Storage.remove('USER_COUNTRY')
      window.location = `${RouterPath.LOGIN.path}?message=locked&variant=danger`
      return false
    }
    return response;
  }, function (error) {
    return Promise.reject(error.response);
  });
}

export default {
  handleAxiosApi
}
