import React, {Component, PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {articlePostRequest} from 'actions/board';
import {BoardPostForm} from 'components';

class BoardPost extends Component {
    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        // set the initial component state
        this.state = {
            title: '',
            publish: false,
        };

        this.handlePost = this.handlePost.bind(this);
        // this.changeArticle = this.changeArticle.bind(this);
        this.changePublish = this.changePublish.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
    }

    componentDidMount() {

        CKEDITOR.replace('contents',{ toolbar: "Basic", height: 150 });
    }

    componentWillUnmount() {
        CKEDITOR.instances.contents.destroy();
        //CKEDITOR=null;
        console.log("componentWillUnmount");
    }

    /**
     * Change the user object.
     *
     * @param {object} event - the JavaScript event object
     */


    changePublish(event) {
        this.setState({
            publish: event.target.checked
        });
    }

    changeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    /**
     * Process the form.
     *
     * @param {object} event - the JavaScript event object
     */
    handlePost(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        const title = this.state.title;
        const contents = CKEDITOR.instances.contents.getData();
        const publish = this.state.publish;
        const count=this.props.count;
        return this.props.articlePostRequest(title, contents, publish,count).then(
            () => {
                if (this.props.postStatus.status === "SUCCESS") {

                    Materialize.toast('Success!', 2000);

                    this.setState({
                        contents: '',
                        publish: false,
                    });

                    browserHistory.push('/board');

                } else {
                    /*
                     ERROR CODES
                     1: NOT LOGGED IN
                     2: EMPTY CONTENTS
                     */
                    let $toastContent;
                    switch (this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(() => {
                                location.reload(false);
                            }, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    render() {
        return (
            <BoardPostForm
                onSubmit={this.handlePost}
                onTitle={this.changeTitle}
                onChecked={this.changePublish}
                title={this.state.title}
            />
        );

    }
}

const mapStateToProps = (state) => {
    return {
        //isLoggedIn: state.authentication.status.isLoggedIn,
        count:state.board.post.count,
        postStatus: state.article.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        articlePostRequest: (title, contents, publish,count) => {
            return dispatch(articlePostRequest(title, contents, publish,count));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardPost);