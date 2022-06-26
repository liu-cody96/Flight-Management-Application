import styled from 'styled-components';

// Create a new component called Center
export const Center = styled.div`
    display: flex;
    justify-content: center;
`;


export const StyledComponents = () => {
    return (
        <Center>
             <div id="box" style={{backgroundColor: 'blue', height: '50px', width: '50px'}}></div>
        </Center>
    );
}
