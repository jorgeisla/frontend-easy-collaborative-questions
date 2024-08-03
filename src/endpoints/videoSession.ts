import { api } from 'src/utils/env-var';

const videoSessionCRUD = (id?: number | string) => {
    if (id) {
        return `${api}/video-session/${id}/`;
    }
    return `${api}/video-session/`;
};

const closeVideoSessionAPI = (id: number | string) => {
    return `${api}/video-session/${id}/close-session`;
};
export { videoSessionCRUD, closeVideoSessionAPI };
