import {
  ProductType,
  CategoryType,
  MenuItemType,
  UserType,
  ItemOrderType,
  OrderHistoryType,
  CommentType,
} from "../reducers/repositoriesReducer";
import { ActionType } from "../action-types";

export type Action =
  | {
      type: ActionType.LOGIN;
      payload: [string, UserType];
    }
  | {
      type: ActionType.LOGOUT;
    }
  | {
      type: ActionType.LOAD_USER;
      payload: UserType;
    }
  | {
      type: ActionType.LOAD_PRODUCT;
      payload: [ProductType[], CategoryType[], MenuItemType[]];
    }
  | {
      type: ActionType.UPDATE_USER_ACCOUNT;
      payload: {
        name: string;
        phoneNumber: string;
        avatar: string;
      };
    }
  | {
      type: ActionType.ADMIN_DELETE_PRODUCT;
      payload: string;
    };
