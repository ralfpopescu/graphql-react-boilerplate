import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
display: flex;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
`

const AppContent = () => {
    return (
        <Container>
            Hello!
        </Container>
    )
}

export default AppContent;