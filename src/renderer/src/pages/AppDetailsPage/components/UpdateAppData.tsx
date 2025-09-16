import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { TransactionLoading } from '@renderer/components/TransactionLoading/TransactionLoading'
import { AppProps } from '@renderer/types/app'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { JSX, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdClose, MdEdit } from 'react-icons/md'
import { useAccount, useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

interface Props {
  appData: AppProps
  updatedApp: () => void
}
export function UpdateAppData({ appData, updatedApp }: Props): JSX.Element {
  const { t } = useTranslation()
  const { address } = useAccount()
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState<string>(appData.name)
  const [description, setDescription] = useState<string>(appData.description)
  const [icon, setIcon] = useState<string>(appData.icon)
  const [repositoryUrl, setRepositoryUrl] = useState<string>(appData.repositoryUrl)
  const [externalLink, setExternalLink] = useState<string>(appData.externalLink)
  const [disableUpdate, setDisableUpdate] = useState(false)
  const [displayLoadingTx, setDisplayLoadingTx] = useState(false)

  useEffect(() => {
    if (
      name.length < 1 ||
      description.length < 1 ||
      icon.length < 1 ||
      repositoryUrl.length < 1 ||
      externalLink.length < 1
    ) {
      setDisableUpdate(true)
    } else {
      setDisableUpdate(false)
    }
  }, [name, description, icon, repositoryUrl, externalLink])

  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error, isError } = useWriteContract()
  const {
    isLoading,
    isSuccess,
    isError: isErrorTx,
    error: errorTx
  } = useWaitForTransactionReceipt({ hash })
  const errorMessage = error ? error.message : errorTx ? errorTx.message : ''

  function handleShowModal(): void {
    setShowModal(true)
  }

  function handleCloseModal(): void {
    setShowModal(false)
  }

  async function handleUpdateData(): Promise<void> {
    if (!name.trim()) return
    if (!description.trim()) return
    if (!repositoryUrl.trim()) return
    if (!externalLink.trim()) return
    if (!icon.trim()) return

    setDisplayLoadingTx(true)
    writeContract({
      address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
      abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
      functionName: 'updateImpactApp',
      args: [appData.id, name, description, icon, repositoryUrl, externalLink]
    })
  }

  return (
    <div>
      {appData.publisher === address && (
        <button
          className="underline text-white hover:cursor-pointer flex items-center justify-center gap-1"
          onClick={handleShowModal}
        >
          <MdEdit color="white" />
          {t('appDetails.updateAppData')}
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="bg-card-2 p-6 rounded-2xl shadow-2xl w-[500px]">
            <div className="flex items-center justify-between w-full mb-5">
              <div className="w-5" />
              <p className="text-white">{t('appDetails.updateAppData')}</p>
              <button onClick={handleCloseModal} className="hover:cursor-pointer">
                <MdClose color="white" size={25} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <label className="text-gray-400">{t('appStore.name')}:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mt-3">{t('appStore.description')}:</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mt-3">{t('appStore.iconURL')}:</label>
                <input
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mt-3">{t('appStore.repositoryURL')}:</label>
                <input
                  value={repositoryUrl}
                  onChange={(e) => setRepositoryUrl(e.target.value)}
                  className="w-full px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mt-3">{t('appStore.externalLink')}:</label>
                <input
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="w-full px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />
              </div>

              <button
                className="px-10 w-full h-10 bg-green-primary text-white rounded-2xl mt-10 hover:cursor-pointer disabled:cursor-default disabled:opacity-50 duration-200"
                onClick={handleUpdateData}
                disabled={disableUpdate}
              >
                {t('appDetails.updateApp')}
              </button>
            </div>
          </div>
        </div>
      )}

      {displayLoadingTx && (
        <TransactionLoading
          transactionHash={hash}
          loading={isLoading}
          isPending={isPending}
          isError={isError || isErrorTx}
          errorMessage={errorMessage}
          isSuccess={isSuccess}
          ok={() => {
            setDisplayLoadingTx(false)
            handleCloseModal()
            updatedApp()
          }}
          close={() => setDisplayLoadingTx(false)}
        />
      )}
    </div>
  )
}
