import { api } from 'src/utils/env-var';

const userLogin = () => {
    return `${api}/login/`;
};

const validateToken = () => {
    return `${api}/user/validate-token/`;
};

export { userLogin, validateToken };
