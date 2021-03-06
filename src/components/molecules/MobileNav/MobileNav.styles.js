import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.black};
  height: 220px;
  transition: transform 0.3s;
  position: absolute;
  top: 120px;
  right: 0;
  transform-origin: top;
  transform: ${({ isOpen }) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
  @media (min-width: 768px) {
    display: none;
  }
  z-index: 1;
`;

export const StyledLink = styled(NavLink)`
  text-transform: uppercase;
  text-decoration: none;
  margin: 25px 0;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 5px;

  &::after,
  &::before {
    position: absolute;
    content: "";
    left: 0;
    width: 100%;
    bottom: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.white};
    transform: scale(0);
    transition: transform 0.25s;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;
