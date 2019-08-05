import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => createStyles({
  card: {
    width: 345,
    display: 'inline-block',
    margin: '20px',
    verticalAlign: 'top',
  },
  movieImage: {
    width: '100%',
  },
  expandClose: {
    transform: 'rotate(0deg)',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    width: '82px',
    marginRight: '-75px',
  },
  header: {
    paddingBottom: '0',
  },
  svgImage: {
    width: '36px',
  },
}));

const TitleDisplayCards = ({ titles, handleExpandClick }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {titles.map((item, idx) => (
        <Card className={classes.card} key={item.TitleId}>
          <CardHeader
            avatar={
            (
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img alt="popcorm" className={classes.svgImage} src="images/popcorn.svg" />
              </Avatar>
            )
            }
            title={item.TitleName}
            subheader={item.ReleaseYear}
            className={classes.header}
          />
          <CardActions disableSpacing>
            <IconButton
              className={titles[idx].expanded ? classes.expandClose : classes.expandOpen}
              onClick={() => handleExpandClick(idx)}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={!titles[idx].expanded} timeout="auto" unmountOnExit>
            <img
              alt="movieimage"
              className={classes.movieImage}
              src={titles[idx].imageUrl ? `https://image.tmdb.org/t/p/w300/${titles[idx].imageUrl}` : 'images/cinema.jpg'}
            />
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

TitleDisplayCards.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.object,
    ]),
  ).isRequired,
  handleExpandClick: PropTypes.func.isRequired,
};

export default TitleDisplayCards;
