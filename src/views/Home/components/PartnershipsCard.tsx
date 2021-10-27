import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Flex, useMatchBreakpoints, Text} from '@duhd4h/global-uikit'
import { useTranslation } from 'contexts/Localization'



const StyledPredictionCard = styled(Card)`
  min-height: 200px;
  background: transparent;
  margin-top: 100px;
  text-aling: center;
  box-shadow:none;
  padding: 40px;
`

const textHeadingPartners = styled.div`
  color: black;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  text-align:center;
`

const BlockPartner1 = styled.div`
  width: 192px;
  height: 132px;
  background: #FFFFFF;
  box-shadow: 0px 4px 95px rgba(179, 165, 209, 0.31);
  border-radius: 8px;
  justify-content: space-between;
  margin-bottom:15px;
  padding:10px;
  background-image: url('/images/home/placeholder_cylinder.png');
  background-repeat: no-repeat;
  background-position: center;
`

const BlockPartnerCone = styled.div`
  position: absolute;
  left: 100%;
  right: -100%;
  top: 0%;
  bottom: 0%;
  background: linear-gradient(132.84deg, rgba(179, 165, 209, 0.31) 15.35%, #ABA1BE 87.95%);
  mix-blend-mode: hard-light;
  transform: matrix(-1, 0, 0, 1, 0, 0);
`

const BlockPartner2 = styled.div`
  width: 192px;
  height: 132px;
  background: #FFFFFF;
  box-shadow: 0px 4px 95px rgba(179, 165, 209, 0.31);
  border-radius: 8px;
  background-image: url('/images/home/placeholder_cube.png');
  background-repeat: no-repeat;
  background-position: center;
`
const BlockPartner3 = styled.div`
  width: 192px;
  height: 132px;
  background: #FFFFFF;
  box-shadow: 0px 4px 95px rgba(179, 165, 209, 0.31);
  border-radius: 8px;
  margin-bottom:15px;
  background-image: url('/images/home/placeholder_thorus.png');
  background-repeat: no-repeat;
  background-position: center;
`

const BlockPartner4 = styled.div`
  width: 192px;
  height: 132px ;
  background: #FFFFFF;
  box-shadow: 0px 4px 95px rgba(179, 165, 209, 0.31);
  border-radius: 8px;
  background-image: url('/images/home/placeholder_pyramid.png');
  background-repeat: no-repeat;
  background-position: center;
`

const RowGrid = styled.div`
  gap: 1rem;
  grid-auto-flow: column;
  margin: 15px;
`


const styleBlack = {color: 'black'}


const PartnershipsCard = () => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const isMobile = !isXl

  return (
    <StyledPredictionCard>
      <CardBody>
        <Flex height="100%" alignItems="center">

          <Flex flexDirection="column" maxWidth="50%">
            <Heading style={styleBlack} scale="lg" mb="24px">
              {t('Partnerships')}
            </Heading>
            <Text style={styleBlack} fontSize={isMobile ? '22px' : '22px'}>
              {t('Sit tight! We have amazing partnerships coming soon')}
            </Text>
          </Flex>

          <Flex flexGrow={1} justifyContent="right">
            <RowGrid>
              <BlockPartner1/>
              <BlockPartner2 />               
            </RowGrid>
            <RowGrid>
              <BlockPartner3 />
              <BlockPartner4 />               
            </RowGrid>
          </Flex>

        </Flex>
      </CardBody>
    </StyledPredictionCard>
  )
}

export default PartnershipsCard
