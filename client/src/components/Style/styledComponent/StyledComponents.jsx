import styled from "styled-components";

export const Flex = styled.div`
  flex: 6;
  padding: 20px;
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  -webkit-box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0 0 15px -10px rgba(0, 0, 0, 0.75);
`;

export const Paginate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const SmallContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 16px;
`;
