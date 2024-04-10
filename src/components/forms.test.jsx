import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import {} from "@testing-library/jest-dom";
import { useState } from "react";

import Forms from "./forms";

describe(".Forms", () => {
  const initialState = {
    name: "",
    surname: "",
    cityDescription: "",
    seasons: "spring",
    soupIsDinner: true,
    acceptsTerms: false,
  };

  describe("when the form is send with success", () => {
    test("present an alert with the text='Informações enviadas' and reset the form", async () => {
      const user = userEvent.setup();
      window.alert = vi.fn();

      function TestComponent() {
        const [formState, setFormState] = useState(initialState);

        return (
          <Forms
            formState={formState}
            setFormState={setFormState}
            initialState={initialState}
          />
        );
      }

      render(<TestComponent />);

      const nameInput = screen.getByRole("textbox", { name: "Nome:" });
      const surnameInput = screen.getByRole("textbox", { name: "Sobrenome:" });
      const cityDescriptionInput = screen.getByRole("textbox", {
        name: "Descreva sua cidade:",
      });
      const seasonsSelect = screen.getByRole("combobox", {
        name: "Estação do ano favorita:",
      });
      const soupIsDinnerYesRadio = screen.getByLabelText("Sim");
      const soupIsDinnerNoRadio = screen.getByLabelText("Não");
      const acceptsTermsCheckbox = screen.getByRole("checkbox", {
        name: "Você aceita os termos do formulário?",
      });
      const submitButton = screen.getByRole("button", { name: /enviar/i });

      await user.type(nameInput, "Vitor");
      await user.type(surnameInput, "Siqueira");
      await user.type(cityDescriptionInput, "Uma cidade linda!");
      await user.selectOptions(seasonsSelect, "summer");
      await user.click(soupIsDinnerNoRadio);
      await user.click(acceptsTermsCheckbox);

      await user.click(submitButton);
      expect(window.alert).toHaveBeenCalledWith("Informações enviadas");

      await waitFor(() => {
        expect(nameInput.getAttribute("value")).toEqual(initialState.name);
        expect(surnameInput.getAttribute("value")).toEqual(
          initialState.surname
        );
        expect(cityDescriptionInput.textContent).toBe(
          initialState.cityDescription
        );
        expect(seasonsSelect.value).toEqual(initialState.seasons);
        expect(soupIsDinnerNoRadio.checked).not.toBe(initialState.soupIsDinner);
        expect(soupIsDinnerYesRadio.checked).toBe(initialState.soupIsDinner);
        expect(soupIsDinnerNoRadio.checked).toBe(false);
        expect(acceptsTermsCheckbox.checked).toEqual(initialState.acceptsTerms);
      });
    });
  });

  test("", async () => {
    const user = userEvent.setup();

    function TestComponent() {
      const [formState, setFormState] = useState(initialState);

      return (
        <Forms
          formState={formState}
          setFormState={setFormState}
          initialState={initialState}
        />
      );
    }

    render(<TestComponent />);

    const soupIsDinnerYesRadio = screen.getByRole("radio", { name: "Sim" });
    const soupIsDinnerNoRadio = screen.getByRole("radio", { name: "Não" });

    await user.click(soupIsDinnerNoRadio);

    expect(soupIsDinnerYesRadio.checked).toBe(false);
    expect(soupIsDinnerNoRadio.checked).toBe(true);
  });

  describe("when button reset form is clicked", () => {
    test("reset form to its initial stage", async () => {
      const user = userEvent.setup();
      const nameTest = "Vitor";

      function TestComponent() {
        const [formState, setFormState] = useState({
          ...initialState,
          name: nameTest,
        });

        return (
          <Forms
            formState={formState}
            setFormState={setFormState}
            initialState={initialState}
          />
        );
      }

      render(<TestComponent />);

      await user.click(screen.getByRole("button", { name: /reiniciar/i }));

      await waitFor(() => {
        const input = screen.getByRole("textbox", { name: "Nome:" });
        expect(input.getAttribute("value")).toEqual("");
      });
    });
  });
});
