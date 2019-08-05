import React from 'react';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

const TitleDisplay = props => { 

    console.log(props)
    return (
       <React.Fragment>
            <GridList cellHeight={'auto'} cols={3} spacing={10}>
                {props.titles.map((item, idx) => (
                    <GridListTile cols={1} style={{ height: 200}} key={idx}>
                    {<img src={'https://image.tmdb.org/t/p/w500/' + item.imageUrl} />}
                    <GridListTileBar
                        title={item.TitleName}
                        subtitle={item.Storylines ? item.Storylines[0].Description : 'none'}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </React.Fragment>
    );
};

export default TitleDisplay;