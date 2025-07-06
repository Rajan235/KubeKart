// import Ajv from "ajv";
// import schema from "../../../shared-schemas/product/product-created.schema.json"; // your shared schema
// const ajv = new Ajv({allErrors: true});

// try {
//   const validate = ajv.compile(schema);
//   const productData: any = /* assume productData is defined somewhere */;
//   if (!validate(productData)) {
//     throw new Error("Invalid product data");
//   }
// } catch (error) {
//   console.error("Error compiling schema or validating data:", error);
// }
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export const validateWithSchema = (schema: object, payload: any) => {
  const validate = ajv.compile(schema);
  const valid = validate(payload);
  if (!valid) {
    throw new Error(
      "Event payload validation failed: " + JSON.stringify(validate.errors)
    );
  }
};
