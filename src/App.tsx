import formSchema from "./schema.json";
import { JSONSchema7 } from "json-schema";
import { FormProvider, useFormContext } from "@react-formgen/json-schema";
import { Layout } from "./components/site/Layout";
import {
  TailwindTemplates,
  TailwindFormComponent,
} from "./components/templates";
import { SwitchToReadonly } from "./components/SwitchToReadonly";
import React from "react";
import { roundedScrollbar } from "./components/Scrollbars";

const schema: JSONSchema7 = formSchema as JSONSchema7;

const initialData = {
  firstName: "John Doe",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  homepage: "https://example.com",
  birthday: "1990-01-01",
  is_active: true,
  address: {
    street_address: "123 Main St",
    city: "Somewhere",
    state: "CA",
  },
};

const App: React.FC = () => {
  return (
    <Layout>
      <FormProvider
        schema={schema}
        initialData={initialData}
        templates={TailwindTemplates}
      >
        <div className="flex flex-col gap-4">
          <SwitchToReadonly contextHook={useFormContext} />
          <hr />
          <div
            className={`h-[calc(100vh-22rem)] overflow-auto border shadow-lg rounded-lg p-4 ${roundedScrollbar}`}
          >
            <TailwindFormComponent
              onSubmit={(data) => console.log("Form submitted:", data)}
              onError={(errors) => console.error("Form errors:", errors)}
            />
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
};

export default App;
