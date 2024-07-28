import { api } from 'src/utils/env-var';

const createQuestionAnswer = () => {
    return `${api}/question-answer/`;
};

export { createQuestionAnswer };
