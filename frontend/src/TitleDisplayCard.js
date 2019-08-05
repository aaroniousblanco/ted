import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    width: 345,
    display: 'inline-block',
    margin: '20px',
    verticalAlign: 'top'
  },
  movieImage: {
    width: '100%'
  },
  expandClose: {
    transform: 'rotate(0deg)'
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    width: '82px',
    marginRight: '-75px'
  },
  header: {
      paddingBottom: '0'
  },
  svgImage: {
    width: '36px'
  }
}));

const TitleDisplayCards = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {props.titles.map((item, idx) => (
        <Card className={classes.card} key={idx}>
          <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                <img className={classes.svgImage} src="images/popcorn.svg"/>
                </Avatar>
            }
            title={item.TitleName}
            subheader={item.ReleaseYear}
            className={classes.header}
          />
          <CardActions disableSpacing>
            <IconButton
              className={props.titles[idx].expanded ? classes.expandClose : classes.expandOpen}
              onClick={e => props.handleExpandClick(idx)}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={!props.titles[idx].expanded} timeout="auto" unmountOnExit>
          <img className={classes.movieImage} src={props.titles[idx].imageUrl ? 'https://image.tmdb.org/t/p/w300/' + props.titles[idx].imageUrl 
                    : "images/cinema.jpg"} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.Genres ? `Genre: ${item.Genres[0]}` : "This one's all over the place."}
            </Typography>
          </CardContent>
            <CardContent>
              <Typography paragraph>Synopsis:</Typography>
              <Typography paragraph>
                {item.Storylines ? item.Storylines[0].Description : 'We cannot locate the synopsis at the moment...'}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </React.Fragment>
  );
};

export default TitleDisplayCards;
