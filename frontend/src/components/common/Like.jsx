import React from 'react';

const Like = ({liked, onLike}) => {
    return(
        liked ? <i style={{cursor: 'pointer'}} onClick={onLike} className="fa fa-heart"></i> 
                    : <i style={{cursor: 'pointer'}} onClick={onLike} className="fa fa-heart-o"></i>
    );
}

export default Like;