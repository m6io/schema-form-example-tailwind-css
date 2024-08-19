import React from "react";
import { JSONSchema7 } from "json-schema";
import {
  BaseObjectSchema,
  useErrorsAtPath,
  useFormContext,
  FormState,
  RenderTemplate,
} from "@react-formgen/json-schema";

/**
 * Tailwind Object Template
 * @param {BaseObjectSchema} schema - The schema for the object property.
 * @param {string[]} path - The path to the object property in the form data.
 * @returns {JSX.Element} - The object template component.
 * @example
 * <TailwindObjectField schema={schema} path={path} />
 *
 */
export const TailwindObjectField: React.FC<{
  schema: BaseObjectSchema;
  path: string[];
}> = ({ schema, path }) => {
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <div className="mb-4 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
        {schema.title && (
          <strong className="font-semibold dark:text-gray-200">
            {schema.title}
          </strong>
        )}
        {schema.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {schema.description}
          </p>
        )}
        <div className="mt-2">
          {schema.properties && Object.keys(schema.properties).length > 0 ? (
            Object.keys(schema.properties).map((key) => (
              <RenderTemplate
                key={key}
                schema={schema.properties?.[key] as JSONSchema7}
                path={[...path, key]}
              />
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 dark:border-gray-600 p-4 my-4 flex flex-col">
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
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <div key={index} className="text-red-500 dark:text-red-400">
            {error.message}
          </div>
        ))}
      <br />
      {schema.properties &&
        Object.keys(schema.properties).map((key) => (
          <RenderTemplate
            key={key}
            schema={schema.properties?.[key] as JSONSchema7}
            path={[...path, key]}
          />
        ))}
    </div>
  );
};
