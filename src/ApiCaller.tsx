import axios from "axios";
export function ApiCaller(route: string, secRoute?: string, path?: string) {
  const Url = `https://fakestoreapi.com/${route}/${secRoute || ""}`;
  const config = {
    url: path ? `${Url}/category/${path}` : Url,
  };
  return axios(config);
}
