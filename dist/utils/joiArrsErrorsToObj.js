"use strict";
// import Joi from "joi";
// interface Obj{
//     [key: string]: any;
//   }
//   interface ReduceReturnType {
//     [key as string]: string;
//   };
// export default (data:Joi.ValidationErrorItem[]) =>
//     data.reduce<ReduceReturnType>((a, c) => {
//         let {
//             message,
//             context: { key },
//         } = c;
//         // console.log(context);
//         a[key] = message?.replace?.(/"/g, "");
//         return a;
//     }, {});
