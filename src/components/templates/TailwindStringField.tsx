import React from "react";
import {
  StringSchema,
  useFormDataAtPath,
  useErrorsAtPath,
  useFormContext,
  FormState,
} from "@react-formgen/json-schema";

const ReadonlyPrimitiveTemplate: React.FC<{
  title?: string;
  value: string | number | boolean | null;
  description?: string;
}> = ({ title, value, description }) => {
  return (
    <div className="mb-4">
      {title && <strong>{title}: </strong>}
      <span>{value ?? "N/A"}</span>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
};

/**
 * Tailwind String Template
 * Handles switching between input, textarea, select, and date fields based on the uiSchema and schema format, if applicable.
 * @param {StringSchema} schema - The schema for the string property.
 * @param {string[]} path - The path to the string property in the form data.
 * @returns {JSX.Element} - The string template component.
 * @example
 * <TailwindStringField schema={schema} path={path} />
 *
 */
export const TailwindStringField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if the schema has oneOf or enum options.
  if (schema.enum || schema.oneOf) {
    return <TailwindSelectField schema={schema} path={path} />;
  } // Check if the schema has a format of date, datetime, or date-time. If so, return the TailwindDateField component.
  else if (
    schema.format &&
    ["date", "datetime", "date-time"].includes(schema.format)
  ) {
    return <TailwindDateField schema={schema} path={path} />;
  } // Check if the schema has a uiSchema of textarea. If so, return the TailwindTextareaField component.
  else if (schema.uiSchema?.component === "textarea") {
    return <TailwindTextareaField schema={schema} path={path} />;
  }
  return <TailwindInputField schema={schema} path={path} />;
};

/**
 * Input Field Component Template
 * @param {StringSchema} schema - The schema for the input field.
 * @param {string[]} path - The path to the input field in the form data.
 * @returns {JSX.Element} - The input field component.
 * @example
 * <TailwindInputField schema={schema} path={path} />
 */
const TailwindInputField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path);
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath}
        description={schema.description ?? undefined}
      />
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value);
  };

  const inputType =
    schema.format && ["password", "email", "url"].includes(schema.format)
      ? schema.format
      : schema.uiSchema?.component === "tel"
        ? "tel"
        : "text";

  return (
    <div className="flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      <input
        type={inputType}
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        list={
          Array.isArray(schema.examples)
            ? `${path.join("-")}-datalist`
            : undefined
        }
        className="w-48 p-2 border border-gray-300 rounded dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
      />
      {schema.description && (
        <small className="text-gray-500 dark:text-gray-400">
          {schema.description}
        </small>
      )}
      {Array.isArray(schema.examples) && (
        <datalist id={`${path.join("-")}-datalist`}>
          {schema.examples.map((example, index) => (
            <option key={index} value={example as string} />
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

/**
 * Textarea Field Component Template
 * @param {StringSchema} schema - The schema for the textarea field.
 * @param {string[]} path - The path to the textarea field in the form data.
 * @returns {JSX.Element} - The textarea field component.
 * @example
 * <TailwindTextareaField schema={schema} path={path} />
 */
const TailwindTextareaField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path);
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath}
        description={schema.description ?? undefined}
      />
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValueAtPath(event.target.value);
  };

  return (
    <div className="flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      <textarea
        value={valueAtPath ?? ""}
        onChange={handleChange}
        placeholder={schema.title || ""}
        className="w-48 p-2 border border-gray-300 rounded dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
      />
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
    </div>
  );
};

/**
 * Select Field Component Template
 * @param {StringSchema} schema - The schema for the select field.
 * @param {string[]} path - The path to the select field in the form data.
 * @returns {JSX.Element} - The select field component.
 * @example
 * <TailwindSelectField schema={schema} path={path} />
 */
const TailwindSelectField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, "");
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath}
        description={schema.description ?? undefined}
      />
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValueAtPath(event.target.value);
  };

  return (
    <div className="flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      <select
        value={valueAtPath}
        onChange={handleChange}
        className="w-48 p-2 border border-gray-300 rounded dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
      >
        <option value=""></option>
        {schema.enum
          ? schema.enum.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          : schema.oneOf?.map((option) => (
              <option key={option.const} value={option.const}>
                {option.title}
              </option>
            ))}
      </select>
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
    </div>
  );
};

/**
 * Date Field Component Template
 * @param {StringSchema} schema - The schema for the date field.
 * @param {string[]} path - The path to the date field in the form data.
 * @returns {JSX.Element} - The date field component.
 * @example
 * <TailwindDateField schema={schema} path={path} />
 */
const TailwindDateField: React.FC<{
  schema: StringSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, "");
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath}
        description={schema.description ?? undefined}
      />
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAtPath(event.target.value);
  };

  const inputType =
    schema.format === "datetime" ? "datetime-local" : schema.format;

  return (
    <div className="flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      <input
        type={inputType}
        value={valueAtPath}
        onChange={handleChange}
        placeholder={schema.title || ""}
        className="w-48 p-2 border border-gray-300 rounded dark:border-gray-600 text-gray-900 dark:text-gray-200 bg-white dark:bg-gray-800"
      />
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
    </div>
  );
};
