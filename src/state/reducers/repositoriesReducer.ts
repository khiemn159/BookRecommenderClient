import { ActionType } from "../action-types";
import { Action } from "../actions";

export interface BookType {
  id: number,
  title: string,
  authors: string,
  publishedYear: number,
  imageURL: string,
  rating: number,
  userRating: null | number,
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  age: number;
  avatar: string;
  isAdmin: boolean;
}

export interface MenuItemType {
  menuItemId: string;
  name: string;
  isDeleted: boolean;
  categories: CategoryType[];
}

export interface CategoryType {
  categoryId: string;
  menuItemId: string;
  name: string;
  isDeleted: boolean;
  products: ProductType[];
  Promotion: string[];
}

export interface CommentType {
  id: string;
  userId: string;
  userAvatar: string;
  idProduct: string;
  userName: string;
  date: string;
  content: string;
}

export interface ProductType {
  id: number,
  title: string,
  authors: string,
  publishedYear: number,
  ProductID: string;
  CategoryID: string;
  Name: string;
  Price: number;
  Discount: number;
  Description: string;
  image: string;
  Producer: string;
  Source: string;
  Star: number;
  comments: CommentType[];
  isDeleted: boolean;
  quantityRemaining: number;
  Sold: number;
  imageURL: string,
  rating: number,
  userRating: null | number,
}


export interface ItemOrderType {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalAmount: number;
}

export interface OrderHistoryType {
  userId: string;
  name: string;
  phone: string;
  address: string;
  order: ItemOrderType[];
  date: string;
  accept: boolean;
  id: string;
}

interface RepositoriesState {
  isLoggedIn: boolean;
  products: ProductType[];
  categories: CategoryType[];
  menuItems: MenuItemType[];
  token: string;
  user: UserType;
  popularBook: BookType[];
  recommendationBook: BookType[];
}

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  products: [],
  categories: [],
  menuItems: [],
  token: localStorage.getItem("token") ?? "",
  user: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    phoneNumber: "",
    country: "",
    age: 0,
    isAdmin: false,
  },
  popularBook: [],
  recommendationBook: [],
};

const reducer = (
  state: RepositoriesState = initialState,
  action: Action
): RepositoriesState => {
  switch (action.type) {
    case ActionType.LOGIN:

      return {
        ...state,
        isLoggedIn: true,
        token: action.payload[0],
        user: action.payload[1],
      };

    case ActionType.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...initialState,
        isLoggedIn: false,
        products: state.products,
        categories: state.categories,
        menuItems: state.menuItems,
      };

    case ActionType.LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionType.LOAD_POPULAR_BOOK:
      return {
        ...state,
        popularBook: action.payload[0],
      };

    case ActionType.LOAD_RECOMMENDATION_BOOK:
      return {
        ...state,
        recommendationBook: action.payload[0],
      };

    case ActionType.LOAD_PRODUCT:
      return {
        ...state,
        products: action.payload[0],
        categories: action.payload[1],
        menuItems: action.payload[2],
      };


    default:
      return state;
  }
};

export default reducer;
