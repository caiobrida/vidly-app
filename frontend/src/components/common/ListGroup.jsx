import React from 'react';

const ListGroup = ({ onItemChange, selectedItem, items, textProperty, valueProperty }) => {

    const item = items.map(i => {
        return(
            <li 
                onClick={() => onItemChange(i)} 
                key={i[valueProperty]} 
                className={i === selectedItem ? 'list-group-item active' 
                                              : 'list-group-item'}>
                                              {i[textProperty]}
            </li>
        );
    });

    return(
        <ul className="list-group">
            {item}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};  

export default ListGroup;