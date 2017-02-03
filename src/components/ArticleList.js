import React, {PropTypes} from 'react';
import {Article} from 'components';

const ArticleList = ({
    data
    ,onSelect
    , onRemove
    , onPublish
    ,currentUser
}) => {

    const node = data.map((article, i) => {
        return (

            <Article data={article}
                     key={article._id}
                     index={i}
                     onRemove={onRemove}
                     onPublish={onPublish}
                     onSelect={onSelect}
                     currentUser={currentUser}

            />
        )
    });
    return (<div>{node}</div>);
};


/*
 ArticleList.propTypes = {
 data: PropTypes.array,
 currentUser: PropTypes.string,
 onRemove: PropTypes.func,
 onPublish: PropTypes.func
 };

 ArticleList.defaultProps = {
 data: [],
 currentUser: ''
 };
 */

export default ArticleList;