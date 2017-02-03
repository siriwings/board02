import React, {PropTypes} from 'react';

const Pagination = ({
    articleCount
    ,onChangepage
    , curPaging
    , handleUpPaging
    , handleDownPaging
}) => (

    <div style={{textAlign: 'center'}}>
        {curPaging?
            (<ul className="pagination">

            <li onClick={() => {
                handleDownPaging(curPaging[0]-1, articleCount);
            }}><a href="#!"><i className="material-icons">chevron_left</i></a></li>

            {
                curPaging.map((row, index) => (
                    <li onClick={() => {
                        onChangepage(row, articleCount);
                    }} className="waves-effect" key={index}><a>{row}</a></li>
                ))
            }

            <li onClick={() => {
                handleUpPaging(curPaging[0] + 10, articleCount);
            }}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
        </ul>)
            :undefined}
    </div>
);

/*
 <li className="disabled">
 <li className="active"><a href="#!">1</a></li>
 <li className="waves-effect"><a href="#!">2</a></li>
 BoardList.propTypes = {
 onSubmit: PropTypes.func.isRequired,
 onTitle: PropTypes.func.isRequired,
 onChecked: PropTypes.func.isRequired
 };
 */
export default Pagination;