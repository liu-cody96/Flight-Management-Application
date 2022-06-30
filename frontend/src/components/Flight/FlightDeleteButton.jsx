import styled from 'styled-components';

/**
 * styling for whole card flex grid
 *      holds button box and flight info div
 */
export const FlightDeleteButton = styled.div`
    display: grid;
    background-color: lightgray;

    gap: 10px;
    border: 1px solid black;
    border-radius: 3px;
    box-shadow: 5px 5px darkgray;
    margin: ${({margin}) => margin ?? 'none'};
`;
