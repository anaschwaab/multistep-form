import styled from "styled-components";

export const StyledCheckboxGroup = styled.div`
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;

export const StyledContainer = styled.div`
  width: 750px;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledSectionTitle = styled.h4`
  padding: 20px;
`;