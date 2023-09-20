import { Field } from "formik";
import styled from "styled-components";

export const StyledSelect = styled(Field)`
  margin-bottom: 10px;
  padding: 10px;
  width: 550px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;


export const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledButtonBack = styled.button`
  background-color: #8a8a8a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  width: 100px;
  margin-right: 5px;

  &:hover {
    background-color: #a3a3a3;
  }
`;

export const SeiLa = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StepCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: 'lightgray';
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 'normal';
  margin: 0 5px;
`;

export const StyledErrorContainer = styled.div`
  color: red;
`;

export const StyledLabel = styled.label`
  font-weight: bold;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  margin-bottom: 15px;
  margin-top: 30px;
`;