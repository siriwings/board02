import React, {PropTypes} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Link} from 'react-router';

import Auth from '../modules/Auth';

import TimeAgo from 'react-timeago';

const Article = ({
    data
    , index
    , onPublish
    , onRemove
    , onSelect
    , currentUser
    , flag
}) => (
    <div>
        <Card className="post">
            <CardHeader
                title={data.writer}/>
            <TimeAgo date={data.date.created}/>

            <div>
                <IconMenu onTouchTap={
                    () => {
                        onSelect(data._id, index);
                    }}
                          iconButtonElement={
                              <IconButton touch={true}>
                                  <NavigationExpandMoreIcon />
                              </IconButton>
                          }
                >
                    {data.publish ? <MenuItem primaryText="Disabled"
                                              onTouchTap={() => {
                                                  onPublish(data._id, index);
                                              }}/> :
                        <MenuItem primaryText="Published"
                                  onTouchTap={() => {
                                      onPublish(data._id, index);
                                  }}/>}
                    <Link to={'/edit'}><MenuItem primaryText="Edit"/></Link>
                    <MenuItem primaryText="REMOVE"
                              onTouchTap={() => {
                                  onRemove();
                              }}/>
                </IconMenu>
            </div>

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


export default Article;