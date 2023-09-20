import { Formik, Form, ErrorMessage, FieldArray } from "formik";
import { StepForm } from "../StepForm";
import { StepProps } from "../../types/StepProps";
import { FormDados } from "../../types/FormDados";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { StyledField } from "./styles";
import {
  StyledButton,
  StyledErrorContainer,
  StyledInputContainer,
  StyledSelect,
} from "../MultiStepForm/styles";
import * as Yup from "yup";
import { StyledButtonAdd } from "../StepThree/styles";

export const StepOne = ({ next, data }: StepProps) => {
  const [estados, setEstados] = useState<{ id: number; name: string }[]>([]);
  const [cidades, setCidades] = useState<{ id: string; name: string }[]>([]);

  const dataSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "O nome deve ter no mínimo 4 caracteres")
      .required("Nome é um campo obrigatório"),
    email: Yup.string()
      .email("Por favor, digite um e-mail válido")
      .required("E-mail é um campo obrigatório"),
    birthdate: Yup.string()
      .required("Data de nascimento é obrigatória")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Formato de data inválido (YYYY-MM-DD)"),
    phone: Yup.string()
      .required("O campo telefone é obrigatório")
      .matches(/^\d{11}$/, "Telefone deve conter exatamente 11 dígitos")
      .matches(/^\d+$/, "Telefone deve conter apenas números"),
    bio: Yup.string()
      .required("Biografia é obrigatória")
      .min(50, "Biografia deve ter pelo menos 50 caracteres"),
    city_id: Yup.string()
      .required("Por favor, selecione uma cidade"),
    links: Yup.array().of(
      Yup.string().url("Por favor, envie um link válido"),
    )
  });

  const handleSubmit = (values: FormDados) => {
    next(values);
  };

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await api.get("/states");
        const estadosData = response.data;
        setEstados(estadosData);
      } catch (error) {
        console.error("Erro ao buscar estados: ", error);
      }
    };

    requestAPI();
  }, []);

  const handleSelectedEstado = (e: string) => {
    const estadoId = e;
    requestCidades(estadoId);
  };

  const requestCidades = async (estadoId: string) => {
    try {
      const response = await api.get(`/states/${estadoId}/cities`);
      setCidades(response.data);
    } catch (error) {
      console.log("Erro ao buscar cidades: ", error);
    }
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      arrayHelpers
      validationSchema={dataSchema}
    >
      {({ setFieldValue, errors, touched, values }) => (
        <Form>
          <div>
            <strong>STEP 1</strong> - STEP 2 - STEP 3
          </div>
          <StepForm title="Informe seus dados pessoais">
            <StyledInputContainer>
              <label htmlFor="name">Nome:</label>
              <StyledField
                name="name"
                type="text"
                errors={touched.name && errors.name}
              />
            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="name" />
            </StyledErrorContainer>

            <StyledInputContainer>
              <label htmlFor="email">E-mail:</label>
              <StyledField
                name="email"
                type="text"
                errors={touched.email && errors.email}
              />
            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="email" />
            </StyledErrorContainer>

            <StyledInputContainer>
              <label htmlFor="birthdate">Data de Nascimento:</label>
              <StyledField
                name="birthdate"
                type="date"
                errors={touched.birthdate && errors.birthdate}
              />
            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="birthdate" />
            </StyledErrorContainer>

            <StyledInputContainer>
              <label htmlFor="phone">Telefone:</label>
              <StyledField
                name="phone"
                type="text"
                errors={touched.phone && errors.phone}
              />
            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="phone" />
            </StyledErrorContainer>

            <StyledInputContainer>
              <label htmlFor="bio">Biografia:</label>
              <StyledField
                name="bio"
                type="text"
                errors={touched.bio && errors.bio}
              />
            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="bio" />
            </StyledErrorContainer>

            <StyledInputContainer>
              <label htmlFor="links">Links:</label>
              <FieldArray
                name="links"
                render={(arrayHelpers) => (
                  <div>
                    {values.links.map((_, index) => (
                      <div key={index}>
                        <StyledField name={`links[${index}]`} type="text" />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remover Link
                        </button>
                        <StyledButtonAdd
                      type="button"
                      onClick={() =>
                        arrayHelpers.push('')
                      }
                    >
                      Adicione Link
                    </StyledButtonAdd>
                      </div>
                    ))}
                    
                  </div>
                )}
              />

            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="links" />
            </StyledErrorContainer>

            <StyledInputContainer>
              <label htmlFor="state">Estado:</label>
              <StyledSelect
                as="select"
                name="state"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleSelectedEstado(e.target.value);
                  setFieldValue("state", e.target.value);
                }}
              >
                <option value="">Selecione um estado</option>
                {estados?.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.name}
                  </option>
                ))}
              </StyledSelect>
            </StyledInputContainer>

            <StyledInputContainer>
              <label htmlFor="city_id">Cidade:</label>
              <StyledSelect
                as="select"
                name="city_id"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("city_id", e.target.value);
                }}
              >
                <option value="">Selecione uma cidade</option>
                {cidades?.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.name}
                  </option>
                ))}
                {touched.city_id && errors.city_id}
              </StyledSelect>
            </StyledInputContainer>

            <StyledErrorContainer>
              <ErrorMessage name="city_id" />
            </StyledErrorContainer>

            <div>
              <StyledButton type="submit">Próximo</StyledButton>
            </div>
          </StepForm>
        </Form>
      )}
    </Formik>
  );
};
