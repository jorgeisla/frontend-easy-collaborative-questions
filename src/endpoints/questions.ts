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

const listQuestionsCreatedByUserNoMoreThanCertainTimeAgo = (
    videoId: string | number,
) => {
    return `${api}/question/list-questions-created-by-user-no-more-than-certain-time-ago?video=${videoId}`;
};

export {
    createQuestion,
    listQuestionsFromVideo,
    listQuestionsCreatedByUserNoMoreThanCertainTimeAgo,
    editQuestion,
};
