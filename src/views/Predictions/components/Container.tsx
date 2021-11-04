import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.gradients.violetAlt};
  height: calc(100vh - 80px);
  min-height: calc(100vh - 80px);
  overflow: hidden;
  position: relative;
`

export default Container
