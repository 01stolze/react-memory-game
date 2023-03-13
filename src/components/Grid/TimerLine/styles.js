import styled from 'styled-components'

export const TimerLine = styled.div`
    background: rgba(22,160,133,255);
    height: 1vh;
    transition: width 0.5s;
    animation: loading ${({ levelTime }) =>
      levelTime}s forwards cubic-bezier(0,0,0,0);

    @keyframes loading {
        0% {
            width: 100%;
        }
        100% {
            width: 0%;
        }
    }

`
