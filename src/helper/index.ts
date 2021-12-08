import {
  CategoryType,
  ProductType,
} from "../state/reducers/repositoriesReducer";

const PROFILE_LINK = "http://localhost:8080/api/v1/user/profile";
export const LOGIN_LINK = `http://localhost:8080/api/v1/auth/login`;
export const BOOK_LINK = `http://localhost:8080/api/v1/books/`; //+ id
export const SIGNUP_LINK = `http://localhost:8080/api/v1/user/signup`;
export const UPDATE_PROFILE_LINK = `http://localhost:8080/api/v1/user/profile/update`;
export const POPULAR_LINK = `http://localhost:8080/api/v1/books/popular`;
export const RECOMMENDATION_LINK = `http://localhost:8080/api/v1/books/recommendation`;
export const SEARCH_LINK = `http://localhost:8080/api/v1/books/search`;

const userconversion = (user: any) => {
  return {
    id: user.username,
    name: user.name,
    email: user.mail,
    country: user.country,
    age: user.age,
    avatar: user.avatar
  }
}

export const getUserWhenReload = async (token: any) => {
  let user = await fetch(
    PROFILE_LINK,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null;
      }
    });

  return userconversion(user);
}


export const getAllProducts = (categories: CategoryType[]) => {
  const result: ProductType[] = [];
  categories
    .filter((el) => el && el.products)
    .map((el) => result.push(...el.products));
  return result;
};

export const FormatDate = (x: number) => {
  const date = new Date(x);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `Ngày ${day > 9 ? day : `0${day}`}/${
    month > 9 ? month : `0${month}`
  }/${year}`;
};

export const getProductsOfCategory = (products: ProductType[]) => {
  let result: { [key: string]: ProductType[] } = {};
  products.forEach((product) => {
    if (!result[product.CategoryID]) {
      result[product.CategoryID] = [product];
    } else {
      result[product.CategoryID].push(product);
    }
  });

  return result;
};

export const getCategoriesOfMenuItem = (categories: CategoryType[]) => {
  let result: { [key: string]: CategoryType[] } = {};
  categories.forEach((category) => {
    if (!result[category.menuItemId]) {
      result[category.menuItemId] = [category];
    } else {
      result[category.menuItemId].push(category);
    }
  });

  return result;
};

