import React from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@duhd4h/global-uikit'
import { useGlobalVaultApprove } from 'hooks/useApprove'
import { useTranslation } from 'contexts/Localization'
import { useERC20 } from 'hooks/useContract'
import { getAddress } from 'utils/addressHelpers'
import { GlobalVaultLocked, GlobalVaultStaked, GlobalVaultVested } from 'state/types'

interface ApprovalActionProps {
  vault: GlobalVaultLocked | GlobalVaultStaked | GlobalVaultVested
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ vault, isLoading = false }) => {
  const { sousId, stakingToken, earningToken } = vault
  const { t } = useTranslation()
  const stakingTokenContract = useERC20(stakingToken.address ? getAddress(stakingToken.address) : '')
  const { handleApprove, requestedApproval } = useGlobalVaultApprove(
    stakingTokenContract,
    sousId,
    earningToken[0].symbol,
  )

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
          variant="full_gradient_pool"
        >
          {t('Enable')}
        </Button>
      )}
    </>
  )
}

export default ApprovalAction
