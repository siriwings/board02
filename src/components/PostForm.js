/**
 * Created by siri on 2017-01-11.
 */
import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {orange500} from 'material-ui/styles/colors';

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    textStyle: {
        color: orange500,
    }
};

const PostForm = ({
    onPost,
    onChange,
    contents,
    onChecked
}) => (
    <div>
        <Card className="post">
            <CardText>
                <TextField
                    value={contents}
                    onChange={onChange}
                    hintText="Write down your memo"
                    hintStyle={styles.textStyle}
                    multiLine={true}
                    rows={1}
                    fullWidth={true}
                />
            </CardText>
            <div style={styles.block}>
                <Checkbox
                    id="publish"
                    label="Publish"
                    onClick={onChecked}
                    style={styles.checkbox}
                />
            </div>
            <CardActions>
                <FlatButton onClick={onPost} label="POST"/>
            </CardActions>
        </Card>
    </div>
);
PostForm.propTypes = {
    onPost: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    //errors: PropTypes.object.isRequired,
    contents: PropTypes.string.isRequired
};

export default PostForm;