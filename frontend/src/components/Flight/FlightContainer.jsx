import styled from 'styled-components';

export const FlightContainer = styled.div`
    display: grid;
    grid-template-rows: 15% 70%;
    border-radius: 3px;
    padding: 15px;
    margin: ${({margin}) => margin ?? 'none'};
    background-color: lightgray;
`;
