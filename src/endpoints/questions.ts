import { api } from 'src/utils/env-var';

const createQuestion = () => {
    return `${api}/question/`;
};

const listQuestionsFromVideo = (videoId: string) => {
    return `${api}/video/${videoId}/list-questions`;
};

export { createQuestion, listQuestionsFromVideo };
