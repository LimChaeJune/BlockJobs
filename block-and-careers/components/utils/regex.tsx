import { ChangeEvent } from "react";

export const autoHyphen = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/(\-{1,2})$/g, "");
};

export const autoHyphen_birth = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1.$2.$3")
    .replace(/(\.{1,2})$/g, "");
};

export const numberonly = (e: ChangeEvent<HTMLInputElement>) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};
