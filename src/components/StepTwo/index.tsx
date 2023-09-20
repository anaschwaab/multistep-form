import { Formik, Form, Field, ErrorMessage } from "formik";
import { StepForm } from "../StepForm";
import { StepProps } from "../../types/StepProps";
import { FormDados } from "../../types/FormDados";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import {
  StyledCheckbox,
  StyledCheckboxGroup,
  StyledContainer,
  StyledSectionTitle,
  StyledWrapper,
} from "./styles";
import {
  StyledButton,
  StyledButtonBack,
  StyledErrorContainer,
  StyledInputContainer,
  StyledLabel,
  StyledSelect,
} from "../MultiStepForm/styles";
import * as Yup from "yup";

export const StepTwo = ({ next, data, prev }: StepProps) => {
  const [techs, setTechs] = useState<{ id: string; name: string }[]>([]);
  const [softSkills, setSoftSkills] = useState<{ id: number; name: string }[]>(
    []
  );
  const [abilities, setAbilities] = useState<{ id: number; name: string }[]>(
    []
  );

  const dataSchema = Yup.object().shape({
    role: Yup.string()
      .required("Por favor, selecione um papel"),
    tech_ids: Yup.array()
      .required("Por favor, selecione pelo menos uma stack"),
    ability_ids: Yup.array()
      .required("Por favor, selecione as competências"),
    softskill_ids: Yup.array()
      .min(3, "Por favor, selecione 3 soft-skills")
      .max(3),
  });

  const handleSubmit = (values: FormDados) => {
    next(values);
  };

  const requestTechs = async () => {
    try {
      const response = await api.get("/techs");
      const techsData = response.data;
      setTechs(techsData);
    } catch (error) {
      console.error("Erro ao buscar tecnologias: ", error);
    }
  };

  const requestSoftSkills = async () => {
    try {
      const response = await api.get("/softskills");
      const softSkillsData = response.data;
      setSoftSkills(softSkillsData);
    } catch (error) {
      console.error("Erro ao buscar tecnologias: ", error);
    }
  };

  useEffect(() => {
    requestTechs();
    requestSoftSkills();
  }, []);

  const handleSelectedRole = (e: string) => {
    const role = e;
    buscaAbilities(role);
  };

  const buscaAbilities = async (role: string) => {
    try {
      const response = await api.get(`/abilities?role=${role}`);
      setAbilities(response.data);
    } catch (error) {
      console.log("Erro ao buscar cidades: ", error);
    }
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={dataSchema}
    >
      {({ setFieldValue, values, touched, errors }) => (
        <Form>
          <div>
            STEP 1 - <strong>STEP 2</strong> - STEP 3
          </div>
          <StepForm title="Informe seus dados técnicos">
            <StyledWrapper>
              <StyledContainer>
                <StyledInputContainer>
                  <StyledLabel htmlFor="role">Papel:</StyledLabel>
                  <StyledSelect
                    name="role"
                    as="select"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handleSelectedRole(e.target.value);
                      setFieldValue("role", e.target.value);
                    }}
                    errors={touched.role && errors.role ? errors.role : ''}
                  >
                    <option value="">Selecione um papel</option>
                    <option value="frontend">Front-End</option>
                    <option value="backend">Back-End</option>
                    <option value="fullstack">Full-Stack</option>
                    <option value="mobile">Mobile</option>
                    <option value="designer">Designer</option>
                    <option value="qa">QA</option>
                  </StyledSelect>
                </StyledInputContainer>

                <StyledErrorContainer>
                  <ErrorMessage name="role" />
                </StyledErrorContainer>

                {abilities.length > 0 && (
                  <>
                    <StyledSectionTitle>
                      Selecione suas competências:
                    </StyledSectionTitle>
                    <StyledCheckboxGroup>
                      {abilities?.map((ability) => (
                        <StyledCheckbox key={ability.id}>
                          <Field
                            type="checkbox"
                            name="ability_ids"
                            value={ability.id}
                            checked={values.ability_ids.includes(
                              String(ability.id)
                            )}
                          />
                          {ability.name}
                        </StyledCheckbox>
                      ))}
                    </StyledCheckboxGroup>

                    <StyledErrorContainer>
                      <ErrorMessage name="ability_ids" />
                    </StyledErrorContainer>
                  </>
                )}
              </StyledContainer>

              <StyledContainer>
                <StyledInputContainer>
                  <StyledLabel htmlFor="tech_ids">
                    Tecnologia/Stack:
                  </StyledLabel>
                  <StyledSelect
                    as="select"
                    name="tech_ids"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("tech_ids", [e.target.value]);
                    }}
                  >
                    <option value="">Selecione uma Tecnologia/Stack</option>
                    {techs?.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledInputContainer>

                <StyledErrorContainer>
                  <ErrorMessage name="tech_ids" />
                </StyledErrorContainer>

                <StyledSectionTitle>
                  Selecione 3 soft-skills:
                </StyledSectionTitle>
                <StyledCheckboxGroup>
                  {softSkills?.map((softskill) => (
                    <StyledCheckbox key={softskill.id}>
                      <Field
                        type="checkbox"
                        name="softskill_ids"
                        value={softskill.id}
                        checked={values.softskill_ids.includes(
                          String(softskill.id)
                        )}
                      />
                      {softskill.name}
                    </StyledCheckbox>
                  ))}
                </StyledCheckboxGroup>

                <StyledErrorContainer>
                  <ErrorMessage name="softskill_ids" />
                </StyledErrorContainer>
              </StyledContainer>
            </StyledWrapper>

            <StyledButtonBack type="button" onClick={() => prev && prev(data)}>
              Voltar
            </StyledButtonBack>

            <StyledButton type="submit">Próximo</StyledButton>
          </StepForm>
        </Form>
      )}
    </Formik>
  );
};
