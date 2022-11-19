import styled from "styled-components";

export const TodoContainer = styled.div`
  width: 800px;
  background-color: #fcfcfc;
  display: flex;
  flex-direction: column;
`;
export const MakeTodo = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 28px;
  ::placeholder {
    color: #c8cec8;
    font-style: italic;
  }
  color: #706170;
  box-sizing: border-box;
  background-color: #fcfcfc;
  padding: 20px;
  border-bottom: 1px solid #c8cec8;
`;
export const Item = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 24px;
  border-bottom: 1px solid #d2d1d3;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  gap:10px;
  
  &:hover{
    background-color:#efffd6;
  }
`;
export const Footer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #969b96;
  padding: 0 15px;
  box-sizing: border-box;
`;
export const ButtonPageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
export const ButtonPage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 20px;
`;
export const TopBlock = styled.div`
  display: flex;
  width: 100%;
  align-items: left;
  box-sizing: border-box;
  border-bottom: 1px solid #d2d1d3;
  flex-direction: column;
`;
export const CheckFinish = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 2px solid black;
`;
export const StatusTodoText = styled.span`
  width: 80px;
`







export const Description_Info = styled.textarea`
  outline: none;
  width: 100%;
  border: 0;
  font-size: 16px;
  box-sizing: border-box;
  background-color: #fcfcfc;
  padding: 5px 20px;
  height: 70px;
  display: flex;
  resize: none;
  ::placeholder {
    color: #c8cec8;
    font-style: italic;
  }
`;
export const TitleTodo = styled.span`
  color: #0b2fa7;
`;
export const DeleteTodo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 2px solid #ad0808;
  margin-left: auto;
  &:hover {
    background-color: #ad0808;
    color: #ffffff;
  }
`;
export const DataBlock = styled.div`
  display: flex;
  gap: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  border-top: 1px dotted #b2b3b1;
  background-color: #eee4e4;
`;
export const SendTodo = styled.div`
  width: 100%;
  height: 50px;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #496bdb;
  color: #ffffff;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    transition: 200ms;
    background-color: #6385f7;
  }
`;
export const PROGRESS = styled.div`
  height: 10px;
  background-color: blue;
`;
export  const DownloadButton = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e7f8ff;
  margin: 0 auto;
  border: 1px solid #9e9e9d;
`;