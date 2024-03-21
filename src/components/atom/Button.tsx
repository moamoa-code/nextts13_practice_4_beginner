import React from "react";
import styled from "styled-components";

type ButtonTypes = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps extends ButtonTypes {
  color?: string;
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <ButtonLayout {...props}>{children}</ButtonLayout>;
}

const ButtonLayout = styled.button<{ color?: string }>`
  background-color: #1259de;
  color: ${(props) => props.color || "white"};
  border: none;
  border-radius: 0.3rem;
  padding: 0.4rem 0.6rem;
  &:hover {
    opacity: 0.9;
  }
`;
