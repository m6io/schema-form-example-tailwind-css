import React from "react";
import {
  NumberSchema,
  useFormDataAtPath,
  useErrorsAtPath,
  useFormContext,
  FormState,
} from "@react-formgen/json-schema";

/**
 * Tailwind-styled Number Template
 * @param {NumberSchema} schema - The schema for the number property.
 * @param {string[]} path - The path to the number property in the form data.
 * @returns {JSX.Element} - The number template component.
 * @example
 * <TailwindNumberField schema={schema} path={path} />
 *
 */
export const TailwindNumberField: React.FC<{
  schema: NumberSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path);
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value ? Number(event.target.value) : null);
  };

  if (readonly) {
    return (
      <div className="flex flex-col mb-4">
        {schema.title && (
          <strong className="font-semibold dark:text-gray-200">
            {schema.title}:
          </strong>
        )}
        <span>{valueAtPath ?? "N/A"}</span>
        {schema.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {schema.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-4">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      <input
        type="number"
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        list={
          Array.isArray(schema.examples)
            ? `${path.join("-")}-datalist`
            : undefined
        }
        className="w-24 p-2 border border-gray-300 rounded dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
      />
      {schema.description && (
        <small className="text-gray-500 dark:text-gray-400">
          {schema.description}
        </small>
      )}
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as number} />
          ))}
        </datalist>
      )}
      {errorsAtPath &&
        errorsAtPath.map((error, index) => (
          <div key={index} className="text-red-500 dark:text-red-400">
            {error.message}
          </div>
        ))}
    </div>
  );
};
