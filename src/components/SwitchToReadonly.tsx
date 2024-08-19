import { FormState as JsonSchemaFormState } from "@react-formgen/json-schema";
import { FormState as YupFormState } from "@react-formgen/yup";
import { FormState as ZodFormState } from "@react-formgen/zod";

// Generic hook that returns the readonly state and setter based on the context hook provided
function useFormReadonly<
  T extends JsonSchemaFormState | YupFormState | ZodFormState,
>(contextHook: <U>(selector: (state: T) => U) => U) {
  const readonly = contextHook((state) => state.readonly);
  const setReadonly = contextHook((state) => state.setReadonly);
  return { readonly, setReadonly };
}

// Generic SwitchToReadonly component that accepts a context hook and uses it to access the form state
export const SwitchToReadonly = <
  T extends JsonSchemaFormState | YupFormState | ZodFormState,
>({
  contextHook,
}: {
  contextHook: <U>(selector: (state: T) => U) => U;
}) => {
  const { readonly, setReadonly } = useFormReadonly(contextHook);

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="switch-to-readonly"
        className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600

  before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        onChange={(e) => setReadonly(e.target.checked)}
        checked={readonly}
      />
      <label
        htmlFor="switch-to-readonly"
        className="text-sm text-gray-500 ms-3 dark:text-gray-400"
      >
        Read-only {readonly ? "true" : "false"}
      </label>
    </div>
  );
};
