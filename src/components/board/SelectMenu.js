import React, {PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectMenu = ({
    value,
    onChangepage
}) => (
    <div className="select-menu">
        <SelectField
            className="select-menu"
            floatingLabelText="Show Count"
            value={value}
        >
            <MenuItem name="pretty" onTouchTap={()=>{onChangepage(1,10)}} value={10} primaryText="Show 10"/>
            <MenuItem name="pretty" onTouchTap={()=>{onChangepage(1,20)}} value={20} primaryText="Show 20"/>
            <MenuItem name="pretty" onTouchTap={()=>{onChangepage(1,30)}} value={30} primaryText="Show 30"/>
            <MenuItem name="pretty" onTouchTap={()=>{onChangepage(1,50)}} value={50} primaryText="Show 50"/>
            <MenuItem name="pretty" onTouchTap={()=>{onChangepage(1,100)}} value={100} primaryText="Show 100"/>

        </SelectField>
    </div>
);

/*

 BoardList.propTypes = {
 onSubmit: PropTypes.func.isRequired,
 onTitle: PropTypes.func.isRequired,
 onChecked: PropTypes.func.isRequired
 };
 */
export default SelectMenu;
