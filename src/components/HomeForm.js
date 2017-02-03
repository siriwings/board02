import React, {PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Link} from 'react-router';

import Auth from '../modules/Auth';

import TimeAgo from 'react-timeago';

const HomeForm = ({
    data
   }) => (
    <div>
        <Card className="post">
            <CardHeader
                title={data.writer}/>
            <TimeAgo date={data.date.created}/>
            <CardText>
                {data.contents}
            </CardText>
        </Card>
    </div>
);
/*
 Article.propTypes = {
 data: PropTypes.object,
 //ownership prop  은 해당 메모가 자신의 메모인지 아닌지 여부를 확인하는 값
 ownership: PropTypes.bool
 };
 Article.defaultProps = {
 data: {
 _id: 'id1234567890',
 writer: 'Writer',
 contents: 'Contents',
 is_edited: false,
 date: {
 edited: new Date(),
 created: new Date()
 },
 starred: []
 },
 ownership: true
 }
 */


export default HomeForm;