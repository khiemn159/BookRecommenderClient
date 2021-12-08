import { User, Products } from "../../firebase";
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
  productsOrder: ItemOrderType[];
  orderHistory: OrderHistoryType[];
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
    age: 0
  },
  productsOrder: [],
  orderHistory: [],
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

    case ActionType.LOAD_PRODUCT:
      return {
        ...state,
        products: action.payload[0],
        categories: action.payload[1],
        menuItems: action.payload[2],
      };

    case ActionType.UPDATE_USER_ACCOUNT:
      User.doc(state.user.id).update(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    case ActionType.ADMIN_DELETE_PRODUCT:
      const newProducts = state.products.filter(
        (p) => p.ProductID !== action.payload
      );

      Products.doc(action.payload).update({
        isDeleted: true,
      });

      const newCategory = state.categories.find((el) => {
        const newProducts = el.products.filter(
          (p) => p.ProductID !== action.payload
        );
        if (newProducts.length === el.products.length) {
          return false;
        } else {
          el.products = newProducts;
          return true;
        }
      });

      if (newCategory) {
        const newMenuItem = state.menuItems.find((el) => {
          const newCat = el.categories.find(
            (cat) => cat.categoryId === newCategory.categoryId
          );
          if (newCat) {
            newCat.products = newCategory.products;
            return true;
          } else {
            return false;
          }
        });

        if (newMenuItem) {
          return {
            ...state,
            products: newProducts,
            categories: state.categories,
            menuItems: state.menuItems,
          };
        }
      }

      return {
        ...state,
        products: newProducts,
        categories: [],
        menuItems: [],
      };

    default:
      return state;
  }
};

export default reducer;
