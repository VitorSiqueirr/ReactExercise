import PropTypes from "prop-types";
import seasons from "./seasonsColors";
import "../style/Form.css";

const MAX_CHARACTERS_DESCRIPTION = 100;
const MAX_CHARACTERS_NAME_SURNAME = 30;

export const Forms = ({ formState, setFormState, initialState }) => {
  const { colors, names } = seasons;
  const resetForm = () => {
    setFormState(initialState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Informações enviadas");
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value === "yes" });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormState({ ...formState, [name]: checked });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`form color-border ${colors[formState.seasons]}`}>
        <label>
          Nome:
          <input
            type="text"
            name="name"
            placeholder="Seu Nome..."
            required
            maxLength={MAX_CHARACTERS_NAME_SURNAME}
            value={formState.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sobrenome:
          <input
            type="text"
            name="surname"
            placeholder="Seu Sobrenome..."
            required
            maxLength={MAX_CHARACTERS_NAME_SURNAME}
            value={formState.surname}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Descreva sua cidade:
          <textarea
            name="cityDescription"
            cols="25"
            rows="4"
            placeholder="A Descrição Da Sua Cidade..."
            required
            maxLength={MAX_CHARACTERS_DESCRIPTION}
            value={formState.cityDescription}
            onChange={handleInputChange}></textarea>
        </label>
        <label>
          Estação do ano favorita:
          <select
            name="seasons"
            value={formState.seasons}
            onChange={handleInputChange}>
            {Object.keys(names).map((season) => (
              <option key={season} value={season}>
                {names[season]}
              </option>
            ))}
          </select>
        </label>

        <div className="soup-is-dinner">
          Sopa é janta?
          <div>
            <label>
              Sim
              <input
                type="radio"
                name="soupIsDinner"
                value="yes"
                checked={formState.soupIsDinner}
                onChange={handleRadioChange}
              />
            </label>
            <label>
              Não
              <input
                type="radio"
                name="soupIsDinner"
                value="no"
                checked={!formState.soupIsDinner}
                onChange={handleRadioChange}
              />
            </label>
          </div>
        </div>

        <label className="terms">
          Você aceita os termos do formulário?
          <input
            type="checkbox"
            name="acceptsTerms"
            required
            checked={formState.acceptsTerms}
            onChange={handleCheckboxChange}
          />
        </label>

        <button
          className="reset"
          type="reset"
          onClick={(e) => {
            e.preventDefault();
            resetForm();
          }}>
          Reiniciar Formulário
        </button>
        <button className="success" type="submit">
          Enviar Informações
        </button>
      </form>
    </>
  );
};

Forms.propTypes = {
  formState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
};

export default Forms;
