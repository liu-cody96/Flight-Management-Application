import styled from "styled-components";

export const NavSection = styled.section`
    display: flex;
    justify-content: ${({jc}) => jc ?? 'baseline'};
    width: 100%;
`;
