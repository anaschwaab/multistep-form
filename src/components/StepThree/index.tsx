import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { StepForm } from "../StepForm";
import { StepProps } from "../../types/StepProps";
import { FormDados } from "../../types/FormDados";
import React, { useState } from "react";
import {
  StyledButton,
  StyledButtonBack,
  StyledErrorContainer,
  StyledInputContainer,
} from "../MultiStepForm/styles";
import {
  StyledButtonAdd,
  StyledDateInput,
  StyledRadioContainer,
  StyledTextInput,
} from "./styles";
import * as Yup from "yup";

export const StepThree = ({ next, data, prev }: StepProps) => {
  const [hasExperience, setHasExperience] = useState(false);

  const handleSubmit = (values: FormDados) => {
    next(values, true);
  };

  const dataSchema = Yup.object().shape({
    experiences_attributes: Yup.array().of(
      Yup.object({
        title: Yup.string().required("O cargo é obrigatório!"),
        start_date: Yup.string()
          .required("Data de início é obrigatória")
          .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Formato de data inválido (YYYY-MM-DD)"
          ),
        end_date: Yup.string()
          .test(
            "maior que",
            "A data de término deve ser maior que a data de início",
            function (end_date) {
              const { start_date } = this.parent;
              if (!start_date || !end_date) {
                return true;
              }

              const startDate = new Date(start_date);
              const endDate = new Date(end_date);
              return endDate > startDate;
            }
          )
          .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Formato de data inválido (YYYY-MM-DD)"
          ),
        function_performed: Yup.string().required("Função é obrigatória!"),
      })
    ),
    studies_attributes: Yup.array().of(
      Yup.object({
        title: Yup.string().required("O curso é obrigatório!"),
        start_date: Yup.string()
          .required("Data de início é obrigatória!")
          .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Formato de data inválido (YYYY-MM-DD)"
          ),
        end_date: Yup.string()
          .test(
            "maior que",
            "A data de término deve ser maior que a data de início",
            function (end_date) {
              const { start_date } = this.parent;
              if (!start_date || !end_date) {
                return true;
              }

              const startDate = new Date(start_date);
              const endDate = new Date(end_date);
              return endDate > startDate;
            }
          )
          .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            "Formato de data inválido (YYYY-MM-DD)"
          ),
        institution: Yup.string().required("A instituição é obrigatória!"),
      })
    ),
  });

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      arrayHelpers
      validationSchema={dataSchema}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div>
            STEP 1 - STEP 2 - <strong>STEP 3</strong>
          </div>
          <StepForm title="Informe seus dados técnicos">
            <StyledRadioContainer>
              <label htmlFor="has_experience">Você tem experiência?</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="has_experience"
                    value="true"
                    checked={hasExperience === true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setHasExperience(true);
                      setFieldValue("has_experience", e.target.value);
                    }}
                  />
                  Sim
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="has_experience"
                    value="false"
                    checked={hasExperience === false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setHasExperience(false);
                      setFieldValue("has_experience", e.target.value);
                    }}
                  />
                  Não
                </label>
              </div>
            </StyledRadioContainer>

            {hasExperience && (
              <FieldArray
                name="experiences_attributes"
                render={(arrayHelpers) => (
                  <div>
                    {values.experiences_attributes.map((_, index) => (
                      <div key={index}>
                        <StyledInputContainer>
                          <label htmlFor="title">Cargo:</label>
                          <StyledTextInput
                            name={`experiences_attributes[${index}].title`}
                            type="text"
                          />
                        </StyledInputContainer>

                        <StyledErrorContainer>
                          <ErrorMessage
                            name={`experiences_attributes[${index}].title`}
                          />
                        </StyledErrorContainer>

                        <StyledInputContainer>
                          <label htmlFor="company_name">Empresa:</label>
                          <StyledTextInput
                            name={`experiences_attributes[${index}].company_name`}
                            type="text"
                          />
                        </StyledInputContainer>

                        <StyledErrorContainer>
                          <ErrorMessage
                            name={`experiences_attributes[${index}].company_name`}
                          />
                        </StyledErrorContainer>

                        <StyledInputContainer>
                          <label htmlFor="start_date">Data de início:</label>
                          <StyledDateInput
                            name={`experiences_attributes[${index}].start_date`}
                            type="date"
                          />
                        </StyledInputContainer>

                        <StyledErrorContainer>
                          <ErrorMessage
                            name={`experiences_attributes[${index}].start_date`}
                          />
                        </StyledErrorContainer>

                        <StyledInputContainer>
                          <label htmlFor="end_date">Data de término:</label>
                          <StyledDateInput
                            name={`experiences_attributes[${index}].end_date`}
                            type="date"
                          />
                        </StyledInputContainer>

                        <StyledErrorContainer>
                          <ErrorMessage
                            name={`experiences_attributes[${index}].end_date`}
                          />
                        </StyledErrorContainer>

                        <StyledInputContainer>
                          <label htmlFor="function_performed">
                            Cargo/Função:
                          </label>
                          <StyledTextInput
                            name={`experiences_attributes[${index}].function_performed`}
                            type="text"
                          />
                        </StyledInputContainer>

                        <StyledErrorContainer>
                          <ErrorMessage
                            name={`experiences_attributes[${index}].function_performed`}
                          />
                        </StyledErrorContainer>

                        <StyledInputContainer>
                          <label htmlFor="link">Links:</label>
                          <StyledTextInput
                            name={`experiences_attributes[${index}].link`}
                            type="text"
                          />
                        </StyledInputContainer>

                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remover Experiência
                        </button>
                      </div>
                    ))}
                    <StyledButtonAdd
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          title: "",
                          company_name: "",
                          start_date: "",
                          end_date: "",
                          function_performed: "",
                          link: "",
                        })
                      }
                    >
                      Adicione Experiência
                    </StyledButtonAdd>
                  </div>
                )}
              />
            )}

            <FieldArray
              name="studies_attributes"
              render={(arrayHelpers) => (
                <div>
                  {values.studies_attributes.map((_, index) => (
                    <div key={index}>
                      <StyledInputContainer>
                        <label htmlFor="title">Curso:</label>
                        <StyledTextInput
                          name={`studies_attributes[${index}].title`}
                          type="text"
                        />
                      </StyledInputContainer>
                      <ErrorMessage
                        name={`studies_attributes[${index}].title`}
                      />

                      <StyledInputContainer>
                        <label htmlFor="institution">Instituição:</label>
                        <StyledTextInput
                          name={`studies_attributes[${index}].institution`}
                          type="text"
                        />
                      </StyledInputContainer>
                      <ErrorMessage
                        name={`studies_attributes[${index}].institution`}
                      />

                      <StyledInputContainer>
                        <label htmlFor="start_date">Data de início:</label>
                        <StyledDateInput
                          name={`studies_attributes[${index}].start_date`}
                          type="date"
                        />
                      </StyledInputContainer>
                      <ErrorMessage
                        name={`studies_attributes[${index}].start_date`}
                      />

                      <StyledInputContainer>
                        <label htmlFor="end_date">Data de término:</label>
                        <StyledDateInput
                          name={`studies_attributes[${index}].end_date`}
                          type="date"
                        />
                      </StyledInputContainer>
                      <ErrorMessage
                        name={`studies_attributes[${index}].end_date`}
                      />

                      <StyledInputContainer>
                        <label htmlFor="link">Links:</label>
                        <StyledTextInput
                          name={`studies_attributes[${index}].link`}
                          type="text"
                        />
                      </StyledInputContainer>

                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        Remover Estudo
                      </button>
                    </div>
                  ))}
                  <StyledButtonAdd
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        title: "",
                        institution: "",
                        start_date: "",
                        end_date: "",
                        link: "",
                      })
                    }
                  >
                    Adicione Estudo
                  </StyledButtonAdd>
                </div>
              )}
            />

            <StyledButtonBack type="button" onClick={() => prev && prev(data)}>
              Voltar
            </StyledButtonBack>

            <StyledButton type="submit">Enviar</StyledButton>
          </StepForm>
        </Form>
      )}
    </Formik>
  );
};
