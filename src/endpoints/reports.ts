import { api } from 'src/utils/env-var';

const createReport = () => {
    return `${api}/question-report/`;
};

export { createReport };
