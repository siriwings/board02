import React, {Component} from 'react';
import {HomeList} from 'components';
import {connect} from 'react-redux';
import {
    homeListRequest,
    selectedArticle,
    articleListRequest,
    articleRemoveRequest,
    articlePublishRequest
} from 'actions/article';

class Home extends Component {

    constructor(props) {
        super(props);

       // this.loadNewMemo = this.loadNewMemo.bind(this);
       // this.loadOldMemo = this.loadOldMemo.bind(this);

        this.state = {
            loadingState: false,
            initiallyLoaded: false
        };
    }

    componentDidMount() {
        //componentDidMount직후 최초 한번 실행
        this.props.homeListRequest().then(
            () => {
                console.log("homeListRequest Success!111111111");
            }
        );

        //이후 언마운트되기전까지 2초마다 ajax요청
    /*    this.interval = setInterval(() => {
            this.props.homeListRequest().then(
                () => {
                    console.log("homeListRequest Success!222");
                }
            );
        }, 2000);*/

    };

    componentWillUnmount() {
        console.log("componentWillUnmount");
        clearInterval(this.interval);

        //$(window).unbind();
    }

    render() {
        console.log("렌더파트");
        return (
            <div className="wrapper">
                <HomeList className="homelist" data={this.props.articleData}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        postStatus: state.article.post,
        user: state.authentication.login,
        articleData: state.article.home.data,
        isLast: state.article.list.isLast,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        homeListRequest: () => {
            return dispatch(homeListRequest());
        },
        articleRemoveRequest: (id, index) => {
            return dispatch(articleRemoveRequest(id, index));
        },
        selectedArticle: (id, index) => {
            return dispatch(selectedArticle(id, index));
        },
        articlePublishRequest: (id, index) => {
            return dispatch(articlePublishRequest(id, index));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

