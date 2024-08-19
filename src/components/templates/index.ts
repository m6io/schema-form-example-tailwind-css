import { Templates } from "@react-formgen/json-schema";
import { TailwindArrayField } from "./TailwindArrayField";
import { TailwindBooleanField } from "./TailwindBooleanField";
import { TailwindNumberField } from "./TailwindNumberField";
import { TailwindObjectField } from "./TailwindObjectField";
import { TailwindStringField } from "./TailwindStringField";
import { TailwindFormComponent } from "./TailwindFormComponent";

/**
 * Custom Fields Object
 */
export const TailwindTemplates: Templates = {
  StringTemplate: TailwindStringField,
  NumberTemplate: TailwindNumberField,
  BooleanTemplate: TailwindBooleanField,
  ObjectTemplate: TailwindObjectField,
  ArrayTemplate: TailwindArrayField,
};

export { TailwindFormComponent };
