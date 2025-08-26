import { api } from 'src/utils/env-var';

const userLogin = () => {
    return `${api}/login/`;
};

const validateToken = () => {
    return `${api}/user/validate-token/`;
};

const changePassword = () => {
    return `${api}/user/change-password/`;
};

export { userLogin, validateToken, changePassword };
