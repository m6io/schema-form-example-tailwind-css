import React from "react";
import {
  BooleanSchema,
  useFormDataAtPath,
  useErrorsAtPath,
  useFormContext,
  FormState,
} from "@react-formgen/json-schema";

/**
 * Tailwind Boolean Template
 * Handles switching between different boolean components based on `uiSchema`.
 * @param {BooleanSchema} schema - The schema for the boolean property.
 * @param {string[]} path - The path to the boolean property in the form data.
 * @returns {JSX.Element} - The boolean template component.
 * @example
 * <TailwindBooleanField schema={schema} path={path} />
 *
 */
export const TailwindBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  // Early return if no oneOf options. This is the default boolean template.
  if (!schema.oneOf) {
    return <TailwindCheckboxBooleanField schema={schema} path={path} />;
  }

  // Return the appropriate boolean template based on the uiSchema.
  switch (schema.uiSchema?.component) {
    case "radio":
      return <TailwindRadioBooleanField schema={schema} path={path} />;
    case "switch":
      return <TailwindSwitchBooleanField schema={schema} path={path} />;
    default:
      return <TailwindCheckboxBooleanField schema={schema} path={path} />;
  }
};

/**
 * Tailwind Radio Boolean Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": "radio",
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "Yes"
 *        },
 *        {
 *          "const": false,
 *          "title": "No"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the radio boolean field.
 * @param {string[]} path - The path to the radio boolean field in the form data.
 * @returns {JSX.Element} - The radio boolean field component.
 * @example
 * <TailwindRadioBooleanField schema={schema} path={path} />
 *
 */
export const TailwindRadioBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, false);
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath ? "Yes" : "No"}
        description={schema.description ?? undefined}
      />
    );
  }

  return (
    <div className="flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      {schema.oneOf?.map((option) => (
        <label
          key={option.title}
          className="flex items-center space-x-2 dark:text-gray-400"
        >
          <input
            type="radio"
            checked={valueAtPath === option.const}
            onChange={() => setValueAtPath(option.const)}
            className="form-radio h-4 w-4 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-800 bg-white border-gray-200 rounded dark:checked:bg-gray-600 dark:checked:border-gray-600 dark:checked:text-gray-100"
          />
          <span>{option.title}</span>
        </label>
      ))}
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
 * Tailwind Switch Boolean Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean",
 *      "uiSchema": "switch",
 *      "oneOf": [
 *        {
 *          "const": true,
 *          "title": "On"
 *        },
 *        {
 *          "const": false,
 *          "title": "Off"
 *        }
 *      ]
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the switch boolean field.
 * @param {string[]} path - The path to the switch boolean field in the form data.
 * @returns {JSX.Element} - The switch boolean field component.
 * @example
 * <TailwindSwitchBooleanField schema={schema} path={path} />
 *
 */
export const TailwindSwitchBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, false);
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath ? "On" : "Off"}
        description={schema.description ?? undefined}
      />
    );
  }

  return (
    <div className="flex flex-col">
      {schema.title && (
        <label className="font-semibold dark:text-gray-200">
          {schema.title}
        </label>
      )}
      <div className="flex items-center">
        <label className="text-sm text-gray-500 me-3 dark:text-gray-400">
          {schema.oneOf?.find((option) => option.const === false)?.title}
        </label>
        <input
          type="checkbox"
          checked={valueAtPath}
          onChange={(event) => setValueAtPath(event.target.checked)}
          className="relative w-[35px] h-[21px] bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-4 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        />
        <label className="text-sm text-gray-500 ms-3 dark:text-gray-400">
          {schema.oneOf?.find((option) => option.const === true)?.title}
        </label>
      </div>
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
 * Tailwind Checkbox Boolean Template.
 *
 * For schemas defined like this:
 * ```json
 *    {
 *      "type": "boolean"
 *    }
 * ```
 * @param {BooleanSchema} schema - The schema for the checkbox boolean field.
 * @param {string[]} path - The path to the checkbox boolean field in the form data.
 * @returns {JSX.Element} - The checkbox boolean field component.
 * @example
 * <TailwindCheckboxBooleanField schema={schema} path={path} />
 *
 */
export const TailwindCheckboxBooleanField: React.FC<{
  schema: BooleanSchema;
  path: string[];
}> = ({ schema, path }) => {
  const [valueAtPath, setValueAtPath] = useFormDataAtPath(path, false);
  const errorsAtPath = useErrorsAtPath(path);
  const readonly = useFormContext((state: FormState) => state.readonly);

  if (readonly) {
    return (
      <ReadonlyPrimitiveTemplate
        title={schema.title ?? undefined}
        value={valueAtPath ? "true" : "false"}
        description={schema.description ?? undefined}
      />
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          type="checkbox"
          checked={valueAtPath}
          onChange={(event) => setValueAtPath(event.target.checked)}
          className="shrink-0 mt-0.5 border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700 dark:focus:ring-offset-gray-800"
        />
        {schema.title && (
          <label className="text-sm text-gray-500 ms-3 dark:text-gray-400">
            {schema.title}
          </label>
        )}
      </div>
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
 * ReadonlyPrimitiveTemplate to render readonly values with Tailwind styling.
 */
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
