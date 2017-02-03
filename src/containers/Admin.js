import React, {Component} from 'react';
import {ArticleList} from 'components';
import {connect} from 'react-redux';
import Auth from '../modules/Auth';
import {selectedArticle,articleListRequest, articleRemoveRequest, articlePublishRequest} from 'actions/article';

class Admin extends Component {
    constructor(props) {
        super(props);

        //프로미스를 쓰려고 하면 아래 처럼 함수를 만들어서 리듀스의 함수를 부르면 됨...
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {

        this.props.articleListRequest().then(
            () => {
                console.log("Admin articleListRequest Success!222");
            }
        );
    };

    //인수 id는 서버에서 쓰고, index는 redux에서 씀.
    handleRemove() {
        const index =this.props.selectdItem.index;
        const id = this.props.selectdItem.id;
        console.log('id = '+id);
        console.log(index);
        return this.props.articleRemoveRequest(id, index).then(() => {
            if (this.props.removeStatus.status === "SUCCESS") {
                console.log("remove success!");
            } else {
                // ERROR
                /*
                 DELETE MEMO: DELETE /api/memo/:id
                 ERROR CODES
                 1: INVALID ID
                 2: NOT LOGGED IN
                 3: NO RESOURCE
                 4: PERMISSION FAILURE
                 */
                let errorMessage = [
                    'Something broke',
                    'You are not logged in',
                    'That memo does not exist',
                    'You do not have permission'
                ];

                // NOTIFY ERROR
                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.removeStatus.error - 1] + '</span>');
                Materialize.toast($toastContent, 2000);

            }
        });
    }


    render() {
        console.log("렌더파트");
        return (
            <div className="wrapper">
                <ArticleList data={this.props.articleData}
                             onRemove={this.handleRemove}
                             onSelect={this.props.selectedArticle}
                             onPublish={this.props.articlePublishRequest}


                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        postStatus: state.article.post,
        user: state.authentication.login,
        articleData: state.article.list.data,
        listStatus: state.article.list.status,
        // isLast: state.article.list.isLast,
        publishStatus: state.article.publish,
        flag:state.article.flag,
        selectdItem:state.article.item,
        removeStatus: state.article.remove
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        articleListRequest: () => {
            return dispatch(articleListRequest());
        },
        articleRemoveRequest: (id, index) => {
            return dispatch(articleRemoveRequest(id, index));
        },
        selectedArticle:(id,index)=>{
            return dispatch(selectedArticle(id, index));
        },
        articlePublishRequest:(id,index,flag) => {
            return dispatch(articlePublishRequest(id,index,flag));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
