import { api } from 'src/utils/env-var';

const createQuestion = () => {
    return `${api}/question/`;
};

export { createQuestion };
