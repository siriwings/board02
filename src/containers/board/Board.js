//LIST의 컨테이너가 될 예정.
import IndexValue from '../../modules/IndexValue';
import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import {BoardList, Pagination} from 'components';
import {SelectMenu} from 'components';
import {connect} from 'react-redux';

import {articleListRequest} from 'actions/board';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fixedHeader: true,
            stripedRows: false,
            showRowHover: false,
            selectable: true,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: true,
            height: '400px',    //고민해볼.... height....ㅠㅠ
            totalPaging: 1, //페이지네이션의 총 번호이자 끝 번호
            renderPaging: 1,
            pagingValue: [], ////ex)[[1,2,3],[4,5,6],[7,8,9]]
            indexValue: 0,
            curPaging: []
        };

        this.onGenerator = this.onGenerator.bind(this);   //제네레이터
        this.changPage = this.changPage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDownPaging = this.handleDownPaging.bind(this);   //<
        this.handleUpPaging = this.handleUpPaging.bind(this); //>
    }


    componentDidMount() {
        //console.log("***********");
        //console.log(this.state.curPaging);

        //초기 BoardList 세팅-파라미터 : 페이지넘버, 렌더링할 게시글 수
        this.props.articleListRequest(1, 10).then(
            () => {
                console.log("Board articleListRequest Success!222");
                let num = parseInt(this.props.totalCount / this.props.articleCount);
                // console.log(num);
                if (0 != this.props.totalCount % this.props.articleCount) {
                    this.setState({
                        totalPaging: num + 1,
                    });
                } else {
                    this.setState({
                        totalPaging: num
                    });
                }

                let renderNum = parseInt(this.state.totalPaging / 10);

                if (0 != this.state.totalPaging % 10) {
                    this.setState({
                        renderPaging: renderNum + 1,
                    });
                } else {
                    this.setState({
                        renderPaging: renderNum
                    });
                }

                const generator = this.onGenerator(this.state.totalPaging);

                let arr = [];  //ex)[[1,2,3],[4,5,6],[7,8,9]]

                for (let i = 0; i < this.state.renderPaging; i++) {
                    arr[i] = generator.next().value;   //ex)[[1,2,3],[4,5,6],[7,8,9]]
                    //console.log(arr[i]);
                }
                //console.log("-----------------");
                //console.log(arr);
                let indexValue = IndexValue.indexValue(arr, this.props.pageNum);
                //console.log(indexValue);    //0
                this.setState({
                    pagingValue: arr,//ex)[[1,2,3],[4,5,6],[7,8,9]]
                    indexValue: indexValue,
                    curPaging: arr[indexValue] //ex)arr[0]
                });
            }
        );
    };

    onGenerator(totalPaging) {

        const generator = function*(totalPaging) {

            let arg = [];
            for (let i = 0; i < totalPaging; i++) {
                arg[i] = i + 1;
            }
            while (arg.length > 0) {
                yield arg.splice(0, 10);
            }
        };

        return generator(totalPaging);
    }

    handleUpPaging(pageNum, articleCount) {
// event.preventDefault();
        let last = IndexValue.indexValue(this.state.pagingValue, pageNum);
        if (last == undefined) {
            Materialize.toast(`This page is last page.`, 2000);
            return;
        }

        this.setState({
            indexValue: this.state.indexValue + 1,
            curPaging: this.state.pagingValue[this.state.indexValue + 1]
        });

        this.props.articleListRequest(pageNum, articleCount);
    }

    handleDownPaging(pageNum, articleCount) {
        let first = IndexValue.indexValue(this.state.pagingValue, pageNum);
        if (first == undefined) {
            Materialize.toast(`This page is first page.`, 2000);
            return;
        }
        // event.preventDefault();
        this.setState({
            indexValue: this.state.indexValue - 1,
            curPaging: this.state.pagingValue[this.state.indexValue - 1]
        });

        this.props.articleListRequest(pageNum, articleCount);
    }

    //SelectMenu에 대한 페이지(번호)메뉴 처리.
    handleChange(pageNum, articleCount) {
        this.props.articleListRequest(pageNum, articleCount).then(
            () => {
                console.log("Board articleListRequest Success!222");
                let num = parseInt(this.props.totalCount / this.props.articleCount);
                console.log(num);
                if (0 != this.props.totalCount % this.props.articleCount) {
                    this.setState({
                        totalPaging: num + 1,
                    });
                } else {
                    this.setState({
                        totalPaging: num
                    });
                }

                let renderNum = parseInt(this.state.totalPaging / 10);

                if (0 != this.state.totalPaging % 10) {
                    this.setState({
                        renderPaging: renderNum + 1,
                    });
                } else {
                    this.setState({
                        renderPaging: renderNum
                    });
                }

                const generator = this.onGenerator(this.state.totalPaging);

                let arr = [];  //ex)[[1,2,3],[4,5,6],[7,8,9]]

                for (let i = 0; i < this.state.renderPaging; i++) {
                    arr[i] = generator.next().value;   //ex)[[1,2,3],[4,5,6],[7,8,9]]
                }

                let indexValue = IndexValue.indexValue(arr, this.props.pageNum);

                this.setState({
                    pagingValue: arr,//ex)[[1,2,3],[4,5,6],[7,8,9]]
                    indexValue: indexValue,
                    curPaging: arr[indexValue] //ex)arr[0]
                });
            }
        );
    }


    //파라미터 : 현재페이지, 페이지당 보여질 게시글 수
    changPage(pageNum, articleCount) {

        this.props.articleListRequest(pageNum, articleCount).then(
            () => {
                let num = parseInt(this.props.totalCount / this.props.articleCount);
                console.log(num);
                if (0 != this.props.totalCount % this.props.articleCount) {
                    this.setState({
                        totalPaging: num + 1,
                    });
                } else {
                    this.setState({
                        totalPaging: num
                    });
                }
            }
        );
    }

    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                <div className="list-header">
                    <Link className="link-post" to="/board/post">POST</Link>
                    <SelectMenu onChangepage={this.handleChange} value={this.props.articleCount}/>
                </div>

                <BoardList handleChange={this.handleChange}
                           fixedHeader={this.state.fixedHeader}
                           stripedRows={this.state.stripedRows}
                           showRowHover={this.state.showRowHover}
                           selectable={this.state.selectable}
                           multiSelectable={this.state.multiSelectable}
                           enableSelectAll={this.state.enableSelectAll}
                           deselectOnClickaway={this.state.deselectOnClickaway}
                           showCheckboxes={this.state.showCheckboxes}
                           height={this.state.height}
                           tableData={this.props.tableData}

                />
                <Pagination onChangepage={this.changPage}
                            articleCount={this.props.articleCount}
                            curPaging={this.state.curPaging}
                            handleUpPaging={this.handleUpPaging}
                            handleDownPaging={this.handleDownPaging}
                />
            </div>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        totalCount: state.board.list.totalCount,
        tableData: state.board.list.data,
        pageNum: state.board.list.pageNum,
        articleCount: state.board.list.articleCount
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        articleListRequest: (pageNumber, articleCount) => {
            return dispatch(articleListRequest(pageNumber, articleCount));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);