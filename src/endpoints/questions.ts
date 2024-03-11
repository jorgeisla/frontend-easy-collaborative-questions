import { api } from 'src/utils/env-var';

const createQuestion = () => {
    return `${api}/question/`;
};

const editQuestion = (id: number) => {
    return `${api}/question/${id}/`;
};

const listQuestionsFromVideo = (videoId: string) => {
    return `${api}/video/${videoId}/list-questions`;
};

const listQuestionsCreatedByUserNoMoreThanCertainTimeAgo = () => {
    return `${api}/question/list-questions-created-by-user-no-more-than-certain-time-ago`;
};

export {
    createQuestion,
    listQuestionsFromVideo,
    listQuestionsCreatedByUserNoMoreThanCertainTimeAgo,
    editQuestion,
};
