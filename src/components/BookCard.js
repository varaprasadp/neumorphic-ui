import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CardHeader from "@material-ui/core/CardHeader";
import data from "../static/data.json";

const labels = {
  0: "No Rating",
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    minWidth: "300px",
    borderRadius: "5px 15px 15px 5px",
    backgroundColor: "grey",
    boxShadow: "-3px -3px 5px #ffffff70, 3px 3px 15px #00000070",
  },
  media: {},
  icon: {},
  actionarea: {
    textAlign: "left",
  },
  grow: {
    flexGrow: 1,
    display: "flex",
  },
  expand: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));

export default function BookCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [cartIconClick, setCartIconClick] = useState(false);
  const [bookState, setBookState] = useState({
    bookID: props.bookID,
    title: props.title,
    author: props.author,
    price: props.price,
    rating: props.rating,
    reviewCount: props.reviewCount,
    paperBack: props.paperBack,
    languageCode: props.languageCode,
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMouseEnter = () => {
    setExpanded(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
  };
  const handleIconMouseDown = () => {
    setCartIconClick(true);
  };
  const handleIconMouseUp = () => {
    setCartIconClick(false);
  };
  const handleRating = () => {
    setBookState({ ...bookState, reviewCount: bookState.reviewCount + 1 });
  };

  return (
    <Card
      className={classes.root}
      onMouseEnter={() => {
        handleMouseEnter();
      }}
      onMouseLeave={() => {
        handleMouseLeave();
      }}
    >
      {/* <CardMedia
        className={classes.media}
        component="img"
        image="https://via.placeholder.com/150"
        title="image"
      /> */}
      <CardActionArea className={classes.expand}>
        <CardHeader
          title={bookState.title}
          subheader={`by ${bookState.author}`}
          style={{ textAlign: "left" }}
        />

        <CardContent>
          <Typography variant="body2" component="p">
            <b>Price :</b>
            {bookState.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <div>
          <Rating
            name={`${bookState.bookID}`}
            style={{ color: hoverState ? "#f5f5f5" : "black" }}
            value={bookState.rating}
            onChange={() => handleRating()} //(e) => props.handleRating(e)
            onMouseEnter={(event) => {
              setHoverState(!hoverState);
            }}
            onMouseLeave={(event) => {
              setHoverState(!hoverState);
            }}
          />

          <Box ml={2}>{labels[bookState.rating]}</Box>
        </div>
        <div className={classes.grow}>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? (
              <div className={classes.grow}>
                <ExpandLessIcon />
                <Typography>Less</Typography>
              </div>
            ) : (
              <div className={classes.grow}>
                <ExpandMoreIcon />
                <Typography>More</Typography>
              </div>
            )}
          </IconButton>
        </div>
        <div>
          <IconButton
            className={classes.icon}
            onClick={props.addToCart}
            onMouseDown={() => {
              handleIconMouseDown();
            }}
            disableRipple={true}
            onMouseUp={() => {
              handleIconMouseUp();
            }}
            style={{
              borderRadius: "50px",
              boxShadow: cartIconClick
                ? "inset -3px -3px 5px #ffffff70, inset 3px 3px 15px #00000070"
                : " -3px -3px 5px #ffffff70, 3px 3px 15px #00000070",
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.expand}>
          <Typography>{bookState.reviewCount} Ratings</Typography>
          {/* <Typography>
            <b>Paperback:</b> {bookState.paperBack}
          </Typography> */}
          <Typography>
            <b>Language:</b> {bookState.languageCode}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
