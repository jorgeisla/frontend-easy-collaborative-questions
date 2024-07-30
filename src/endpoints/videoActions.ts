import { api } from 'src/utils/env-var';

const createVideoAction = () => {
    return `${api}/video-action/`;
};

export { createVideoAction };
