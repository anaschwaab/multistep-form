import { Field } from "formik";
import styled from "styled-components";

export const StyledButtonAdd = styled.button`
  color: #007bff;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

export const StyledTextInput = styled(Field)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 10px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const StyledDateInput = styled(Field)`
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  width: 350px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const StyledRadioContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  margin-top: 20px;
`;

