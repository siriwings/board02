import React, {PropTypes} from 'react';
import {HomeForm} from 'components';

const HomeList = ({
    data
}) => {
    const mapToComponents = data => {
        return data.map((article, i) => {
            return (<HomeForm
                data={article}
                key={article._id}
                index={i}
            />);
        });
    };

    return (<div>{mapToComponents(data)}</div>);
}
HomeList.propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};

HomeList.defaultProps = {
    data: [],
    currentUser: ''
};


export default HomeList;