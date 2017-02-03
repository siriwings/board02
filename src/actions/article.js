import {
    SELECTED_ARTICLE,
    ARTICLE_POST,
    ARTICLE_POST_SUCCESS,
    ARTICLE_POST_FAILURE,
    ARTICLE_LIST,
    ARTICLE_LIST_SUCCESS,
    ARTICLE_LIST_FAILURE,
    ARTICLE_EDIT,
    ARTICLE_EDIT_SUCCESS,
    ARTICLE_EDIT_FAILURE,
    ARTICLE_REMOVE,
    ARTICLE_REMOVE_SUCCESS,
    ARTICLE_REMOVE_FAILURE,
    ARTICLE_PUBLISH,
    ARTICLE_PUBLISH_SUCCESS,
    ARTICLE_PUBLISH_FAILURE,
    HOME_LIST,
    HOME_LIST_SUCCESS,
    HOME_LIST_FAILURE

} from './ActionTypes';
import Auth from '../modules/Auth';
import axios from 'axios';

/*SELECTED ARTICLE*/
export function selectedArticle(id,index) {
    return {
        type: SELECTED_ARTICLE,
        index: index,
        id:id
    };
}

/* ARTICLE POST */
export function articlePostRequest(contents, publish) {
    return (dispatch) => {
        // inform MEMO POST API is starting
        dispatch(articlePost());

        return axios.post('/api/article/', {contents, publish}, {
            headers: {'Authorization': `bearer ${Auth.getToken('session')}`}
        })
            .then((response) => {
                console.log("articlePostRequest Response");
                console.log(response.data);
                dispatch(articlePostSuccess());
            }).catch((error) => {
                dispatch(articlePostFailure(error.response.data.code));
            });
    };
}


export function articlePost() {
    return {
        type: ARTICLE_POST
    };
}

export function articlePostSuccess() {
    return {
        type: ARTICLE_POST_SUCCESS
    };
}

export function articlePostFailure(error) {
    return {
        type: ARTICLE_POST_FAILURE
        , error

    };
}

/*ARTICLE EDIT*/
export function articleEditRequest(id, index, contents, publish) {
    return (dispatch) => {
        // inform MEMO POST API is starting
        dispatch(articleEdit());

        return axios.put('/api/article', {id, contents, publish}, {
            headers: {'Authorization': `bearer ${Auth.getToken('session')}`}
        })
            .then((response) => {
                console.log("edit:response.data");
                console.log(response.data);
                dispatch(articleEditSuccess(index, response.data.article));
            }).catch((error) => {
                dispatch(articleEditFailure(error.response.data.code));
            });
    };
}


export function articleEdit() {
    return {
        type: ARTICLE_EDIT
    };
}

export function articleEditSuccess(index, article) {
    return {
        type: ARTICLE_EDIT_SUCCESS
        , index
        , article
    };
}

export function articleEditFailure(error) {
    return {
        type: ARTICLE_EDIT_FAILURE
        , error

    };
}

/* Home Ariticle List */
//url이 /로 들어왔을 때
export function homeListRequest() {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(homeList());

        return axios.get('/home')
            .then((response) => {
                console.log('article response.data : ');
                console.log(response.data);
                dispatch(homeListSuccess(response.data));
            }).catch((error) => {
                dispatch(homeListFailure());
            });

    };
}

export function homeList() {
    return {
        type: HOME_LIST
    };
}

export function homeListSuccess(data) {
    return {
        type: HOME_LIST_SUCCESS,
        data
    };
}

export function homeListFailure() {
    return {
        type: HOME_LIST_FAILURE
    };
}

/* MEMO LIST */

/*
 Parameter:
 - isInitial: whether it is for initial loading
 - listType:  OPTIONAL; loading 'old' memo or 'new' memo
 - id:        OPTIONAL; memo id (one at the bottom or one at the top)
 - username:  OPTIONAL; find memos of following user
 */
export function articleListRequest() {
    return (dispatch) => {
        // inform memo list API is starting
        dispatch(articleList());

        return axios.get('/api/article',{
            headers: {'Authorization': `bearer ${Auth.getToken('session')}`}
        })
            .then((response) => {
                console.log('article response.data : ');
                console.log(response.data);
                dispatch(articleListSuccess(response.data));
            }).catch((error) => {
                dispatch(articleListFailure());
            });

    };
}

export function articleList() {
    return {
        type: ARTICLE_LIST
    };
}

export function articleListSuccess(data) {
    return {
        type: ARTICLE_LIST_SUCCESS,
        data
    };
}

export function articleListFailure() {
    return {
        type: ARTICLE_LIST_FAILURE
    };
}


/* ARTICLE REMOVE */
export function articleRemoveRequest(id, index) {
    return (dispatch) => {
        dispatch(articleRemove());

        return axios.delete('/api/article/' + id, {
            headers: {'Authorization': `bearer ${Auth.getToken('session')}`}
        })
            .then((response) => {
                dispatch(articleRemoveSuccess(index));
            }).catch((error) => {
                dispatch(articleRemoveFailure(error.response.data.code));
            });
    };

}

export function articleRemove() {
    return {
        type: ARTICLE_REMOVE
    };
}

export function articleRemoveSuccess(index) {
    return {
        type: ARTICLE_REMOVE_SUCCESS,
        index
    };
}

export function articleRemoveFailure(error) {
    return {
        type: ARTICLE_REMOVE_FAILURE,
        error
    };
}

/*Article Publish*/
export function articlePublishRequest(id,index) {
    return (dispatch) => {
        dispatch(articlePublish());

        return axios.put('/api/article/' + id, {id}, {
            headers: {'Authorization': `bearer ${Auth.getToken('session')}`}
        })
            .then((response) => {
                dispatch(articlePublishSuccess(index, response.data.article));
            }).catch((error) => {
                dispatch(articlePublishFailure(error.response.data.code));
            });
    };

}

export function articlePublish() {
    return {
        type: ARTICLE_PUBLISH
    };
}

export function articlePublishSuccess(index,article) {
    return {
        type: ARTICLE_PUBLISH_SUCCESS
        ,index
        ,article
    };
}

export function articlePublishFailure(error) {
    return {
        type: ARTICLE_PUBLISH_FAILURE,
        error
    };
}
