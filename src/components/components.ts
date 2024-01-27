import styled from "styled-components";

export const Input = styled.input`
  width: 400px;
  height: 50px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f2f2f2;
  margin-bottom: 20px;

  &:focus {
    border-color: #1890ff;
  }

  &::placeholder {
    color: #a6a6a6;
    font-size: 14px;
    transform-origin: left bottom;
    line-height: 40px;
    transform: translateX(8px);
    transition: transform 0.3s, font-size 0.3s, color 0.3s;
  }

  &:focus::placeholder {
    transform: scale(0.8) translate(10px, -20px);
    font-size: 12px;
    color: #1890ff;
  }
`;
