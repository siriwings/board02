import React, {PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
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
const BoardPostForm = ({
    onSubmit,
    onChecked,
    onTitle,
    title
}) => (
    <div>
        <Card className="post">
            <CardTitle>
                <TextField id="ttt"
                           value={title}
                           onChange={onTitle}
                           hintText="Title"
                           hintStyle={styles.textStyle}
                           fullWidth={true}
                />
            </CardTitle>
            <CardText>
                <TextField
                    id="contents"
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
                <FlatButton onClick={onSubmit} label="POST"/>
            </CardActions>
        </Card>
    </div>
);

BoardPostForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onTitle: PropTypes.func.isRequired,
    onChecked: PropTypes.func.isRequired
};

export default BoardPostForm;