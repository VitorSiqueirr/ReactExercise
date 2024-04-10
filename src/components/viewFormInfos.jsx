import PropTypes from "prop-types";
import seasons from "./seasonsColors";
import "../style/ViewFormInfos.css";

export const FormInfos = ({ formState }) => {
  const { colors, names } = seasons;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={`color-border info-view ${colors[formState.seasons]}`}>
      <div>
        <p>Nome e Sobrenome:</p>
        <p>
          {capitalizeFirstLetter(formState.name)}{" "}
          {capitalizeFirstLetter(formState.surname)}
        </p>
      </div>
      <div>
        <p>Descrição da cidade:</p>
        <p>{formState.cityDescription}</p>
      </div>
      <div>
        <p>Estação Favorita:</p>
        <p>{names[formState.seasons]}</p>
      </div>
      <div>
        <p>
          {formState.soupIsDinner
            ? "Acha que sopa é janta"
            : "Não acha que sopa é janta"}
        </p>
      </div>
      {formState.acceptsTerms ? (
        <div>
          <p>Termos aceitos</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

FormInfos.propTypes = {
  formState: PropTypes.object.isRequired,
};

export default FormInfos;
