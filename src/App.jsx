import { useState } from "react";
import { Forms } from "./components/forms";
import seasons from "./components/seasonsColors";
import FormInfos from "./components/viewFormInfos";
import "./style/App.css";

function App() {
  const initialState = {
    name: "",
    surname: "",
    cityDescription: "",
    seasons: "spring",
    soupIsDinner: true,
    acceptsTerms: false,
  };

  const [formState, setFormState] = useState(initialState);
  const { colors } = seasons;
  const isFormChanged = () => {
    const filteredKeys = Object.keys(initialState).filter(
      (key) => key in formState && key in initialState
    );
    return filteredKeys.some((key) => formState[key] !== initialState[key]);
  };

  const containerClass = isFormChanged()
    ? "container-info"
    : "container-without-info";

  return (
    <>
      <h1 className={`title ${colors[formState.seasons]}-title`}>
        Forms - About You
      </h1>
      <div className={containerClass}>
        <Forms
          formState={formState}
          setFormState={setFormState}
          initialState={initialState}
        />
        {isFormChanged() && <FormInfos formState={formState} />}
      </div>
    </>
  );
}

export default App;
