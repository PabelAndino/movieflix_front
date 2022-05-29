import axios from "axios";
import {
  ADD_INVOICE_ITEMS,
  APP_CUSTOMER_LIST,
  DELETE_INVOICE,
  EDIT_INVOICE,
  EDIT_POST,
  EMAIL_INBOX,
  EMAIL_READ,
  GET_POSTS,
  HEADER_IMG,
  INTEREST,
  INVOICE,
  INVOICE_ITEMS,
  INVOICE_ITEMS_EDIT,
  POSTS,
  PRODUCTS,
  PRODUCTS_ORDER,
  PROFILE,
} from "./type";

export const allProducts = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://api.npoint.io/fbc14eee7441f3b8877b/apps/shop/products"
    );
    dispatch({
      type: PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const allOrder = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://api.npoint.io/fbc14eee7441f3b8877b/apps/shop/orders"
    );
    dispatch({
      type: PRODUCTS_ORDER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const invoiceData = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://api.npoint.io/fbc14eee7441f3b8877b/apps/shop/invoice"
    );
    dispatch({
      type: INVOICE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const editInvoiceItem = (data) => (dispatch) => {
  dispatch({
    type: INVOICE_ITEMS_EDIT,
    payload: data,
  });
};
export const addInvoiceItem = (data) => (dispatch) => {
  dispatch({
    type: ADD_INVOICE_ITEMS,
    payload: data,
  });
};

