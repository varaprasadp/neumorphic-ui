import React, { useState } from "react";
import dat from "../static/data.json";
import Appbar from "../components/Appbar";
import BookCard from "../components/BookCard";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const useStyles = makeStyles((theme) => ({
  Home: {
    //boxSizing: "borderBox"
  },
  body: {
    padding: "32px 0%",
    paddingLeft: "32px",
  },
  GridItem: {
    width: "100%",
  },
}));
function Home() {
  const data = dat;
  const classes = useStyles();
  const [cartItems, setCartItems] = useState({});
  const [NoOfItems, setNoOfItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const handleAddToCart = (bookID) => {
    setCartItems({
      ...cartItems,
      [bookID]: isNaN(cartItems[bookID]) ? 1 : cartItems[bookID] + 1,
    });
    setNoOfItems(NoOfItems + 1);
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleRating = (value, bookID) => {};
  const handleCartMenuOpen = () => {
    let cart = [];
    data.map((item) => {
      if (cartItems[item.bookID]) {
        cart.push({
          Title: item.title,
          Author: item.author,
          Price: item.price,
          "No.Of.Items": cartItems[item.bookID],
        });
      }
    });

    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(cart);
    const wb = { Sheets: { cart: ws }, SheetNames: ["cart"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const cartdata = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(cartdata, "Book-Cart" + fileExtension);
  };
  var books = data.filter((item) => item.title.includes(searchValue));
  return (
    <div className={classes.Home}>
      <Appbar
        count={NoOfItems}
        searchVal={searchValue}
        handleCartMenuOpen={() => handleCartMenuOpen}
        handleSearch={(e) => handleSearch(e)}
      />

      <div className={classes.body}>
        <Grid className={classes.GridItem} container spacing={4}>
          {books.map((book) => (
            <Grid key={book.bookID} item xs={12} sm={6} md={4} lg={3}>
              <BookCard
                key={book.bookID}
                {...book}
                handleRating={(e) => handleRating(e.target.value, book.bookID)}
                addToCart={() => handleAddToCart(book.bookID)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
