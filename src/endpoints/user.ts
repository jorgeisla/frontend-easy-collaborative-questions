import { api } from 'src/utils/env-var';

const userLogin = () => {
    return `${api}/login/`;
};

export { userLogin };
