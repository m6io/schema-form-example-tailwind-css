import React from "react";
import { JSONSchema7 } from "json-schema";
import {
  BaseArraySchema,
  useFormContext,
  useArrayTemplate,
  FormState,
  generateInitialData,
  RenderTemplate,
} from "@react-formgen/json-schema";
import { HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";

/**
 * Tailwind Array Template
 * @param {BaseArraySchema} schema - The schema for the array property.
 * @param {string[]} path - The path to the array property in the form data.
 * @returns {JSX.Element} - The array template component.
 * @example
 * <TailwindArrayField schema={schema} path={path} />
 */
export const TailwindArrayField: React.FC<{
  schema: BaseArraySchema;
  path: string[];
}> = ({ schema, path }) => {
  const readonly = useFormContext((state: FormState) => state.readonly);
  const definitions = useFormContext(
    (state: FormState) => state.schema.definitions || {}
  );

  const { valueAtPath, errorsAtPath, moveItem, removeItem, addItem } =
    useArrayTemplate(path, () =>
      generateInitialData(schema.items as JSONSchema7, definitions)
    );

  if (readonly) {
    return (
      <div className="mb-4 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
        {schema.title && (
          <strong className="block text-gray-800 dark:text-gray-200">
            {schema.title}
          </strong>
        )}
        {schema.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {schema.description}
          </p>
        )}
        {Array.isArray(valueAtPath) && valueAtPath.length > 0 ? (
          valueAtPath.map((_, index: number) => (
            <div className="mt-2" key={index}>
              <RenderTemplate
                schema={schema.items as JSONSchema7}
                path={[...path, index.toString()]}
              />
            </div>
          ))
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            No items available
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border-dashed rounded-xl border-2 border-gray-400 dark:border-gray-600 p-4 my-4 flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      {schema.description && (
        <small className="text-gray-500 dark:text-gray-400">
          {schema.description}
        </small>
      )}
      <br />
      <div className="border-dashed rounded-xl border-2 border-gray-300 dark:border-gray-500 p-4 my-4 flex flex-col gap-4">
        {schema.items &&
          Array.isArray(valueAtPath) &&
          valueAtPath.map((_, index: number) => (
            <div className="relative p-4 my-2" key={index}>
              <button
                type="button"
                className="absolute top-4 right-0 bg-red-500 text-white size-10 flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-700"
                onClick={() => removeItem(index)}
              >
                <HiX />
              </button>
              <button
                type="button"
                className="absolute top-4 right-10 bg-blue-500 text-white size-10 flex items-center justify-center disabled:opacity-50 hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
              >
                <HiChevronUp />
              </button>
              <button
                type="button"
                className="absolute top-4 right-20 bg-blue-500 text-white size-10 flex items-center justify-center disabled:opacity-50 hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => moveItem(index, "down")}
                disabled={index === valueAtPath.length - 1}
              >
                <HiChevronDown />
              </button>

              <RenderTemplate
                schema={schema.items as JSONSchema7}
                path={[...path, index.toString()]}
              />
            </div>
          ))}
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded dark:bg-blue-600"
          type="button"
          onClick={addItem}
        >
          Add Item
        </button>
      </div>
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <div key={index} className="text-red-500 dark:text-red-400">
            {error.message}
          </div>
        ))}
    </div>
  );
};
