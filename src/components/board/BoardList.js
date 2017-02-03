import React, {PropTypes} from 'react';

import {
    Table, TableBody, TableHeader, TableRow, TableRowColumn
}
    from 'material-ui/Table';


const BoardList = ({
    tableData,
    handleChange,
    handleToggle,
    fixedHeader,
    stripedRows,
    showRowHover,
    selectable,
    multiSelectable,
    enableSelectAll,
    deselectOnClickaway,
    showCheckboxes,
    height,
}) => (
    <div>
        <Table
            height={height}
            fixedHeader={fixedHeader}
            selectable={selectable}
            multiSelectable={multiSelectable}
        >
            <TableHeader
                displaySelectAll={showCheckboxes}
                adjustForCheckbox={showCheckboxes}
                enableSelectAll={enableSelectAll}
            >
                <TableRow>
                    <TableRowColumn>ID</TableRowColumn>
                    <TableRowColumn>TITLE</TableRowColumn>
                    <TableRowColumn>WRITER</TableRowColumn>
                    <TableRowColumn>DATE</TableRowColumn>
                </TableRow>
            </TableHeader>
            <TableBody
                displayRowCheckbox={showCheckboxes}
                deselectOnClickaway={deselectOnClickaway}
                showRowHover={showRowHover}
                stripedRows={stripedRows}
            >
                {tableData.map((row, index) => (
                    <TableRow key={index} selected={row.selected}>
                        <TableRowColumn>{row.count}</TableRowColumn>
                        <TableRowColumn>{row.title}</TableRowColumn>
                        <TableRowColumn>{row.writer}</TableRowColumn>
                        <TableRowColumn>{row.date.created}</TableRowColumn>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

//<TableRowColumn dangerouslySetInnerHTML={ {__html: row.contents}}></TableRowColumn>
/*

 BoardList.propTypes = {
 onSubmit: PropTypes.func.isRequired,
 onTitle: PropTypes.func.isRequired,
 onChecked: PropTypes.func.isRequired
 };
 */
export default BoardList;