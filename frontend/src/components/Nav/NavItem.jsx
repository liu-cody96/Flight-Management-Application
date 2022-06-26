import styled from "styled-components";

export const NavItem = styled.div`
    margin: ${({margin}) => margin ?? '0px 0.5em'};
    padding: ${({padding}) => padding ?? '0px'};
`;
