/* grid */

import styled from 'styled-components'

export const GridDiv = styled.div`
    display: grid;
    grid-template-columns: ${({ level }) => {
      switch (level) {
        case 'easy': {
          return 'repeat(4, 1fr)'
        }
        case 'medium': {
          return 'repeat(8, 1fr)'
        }
        case 'hard': {
          return 'repeat(8, 1fr)'
        }
      }
    }};
    height: 99vh;
    gap: 0.2rem;
`
