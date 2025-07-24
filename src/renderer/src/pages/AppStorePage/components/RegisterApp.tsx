import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { TransactionLoading } from '@renderer/components/TransactionLoading/TransactionLoading'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTrash } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { useChainId, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'

export function RegisterApp(): JSX.Element {
  const { t } = useTranslation()
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [icon, setIcon] = useState<string>('')
  const [repositoryUrl, setRepositoryUrl] = useState<string>('')
  const [externalLink, setExternalLink] = useState<string>('')
  const [contracts, setContracts] = useState<string[]>([])
  const [contractAddress, setContractAddress] = useState<string>('')

  const [displayLoadingTx, setDisplayLoadingTx] = useState(false)

  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash })
  console.log(error)

  function toggleOpenForm(): void {
    setOpenForm((value) => !value)
  }

  function removeContract(contract: string): void {
    const filter = contracts.filter((item) => item !== contract)
    setContracts(filter)
  }

  function handleAddContract(): void {
    contracts.push(contractAddress)
    setContractAddress('')
  }

  async function handleRegisterApp(): Promise<void> {
    if (!name.trim()) return
    if (!description.trim()) return
    if (!repositoryUrl.trim()) return
    if (!externalLink.trim()) return
    if (!icon.trim()) return
    if (contracts.length === 0) return

    setDisplayLoadingTx(true)
    writeContract({
      address: chainId === 250225 ? APP_STORE_ADDRESS : SEQUOIA_APP_STORE_ADDRESS,
      abi: chainId === 250225 ? SEQUOIA_APP_STORE_ABI : SEQUOIA_APP_STORE_ABI,
      functionName: 'registerImpactApp',
      args: [name, description, icon, repositoryUrl, externalLink, contracts]
    })
  }

  return (
    <div className="flex flex-col">
      <button
        className="px-10 h-10 w-fit rounded-2xl flex justify-between items-center text-white bg-green-600 hover:cursor-pointer"
        onClick={toggleOpenForm}
      >
        {t('appStore.registerNewApp')}
      </button>

      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-card-2 p-6 rounded-2xl shadow-2xl w-[800px] h-[500px]">
            <div className="flex items-center justify-between w-full mb-5">
              <div className="w-5" />
              <button onClick={() => setOpenForm(false)} className="hover:cursor-pointer">
                <MdClose color="white" size={25} />
              </button>
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col">
                <label className="text-gray-400">{t('appStore.name')}:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-[300px] px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />

                <label className="text-gray-400 mt-3">{t('appStore.description')}:</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[300px] px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />

                <label className="text-gray-400 mt-3">{t('appStore.iconURL')}:</label>
                <input
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-[300px] px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />

                <label className="text-gray-400 mt-3">{t('appStore.repositoryURL')}:</label>
                <input
                  value={repositoryUrl}
                  onChange={(e) => setRepositoryUrl(e.target.value)}
                  className="w-[300px] px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />

                <label className="text-gray-400 mt-3">{t('appStore.externalLink')}:</label>
                <input
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  className="w-[300px] px-3 h-10 rounded-2xl bg-card-3 text-white"
                  placeholder={t('appStore.typeHere')}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-gray-400">{t('appStore.contracts')}</p>

                <div className="flex flex-col max-h-[200px] overflow-auto gap-3 mb-5">
                  {contracts.map((item, index) => (
                    <div key={index} className="flex items-center gap-5">
                      <p className="text-white text-ellipsis truncate max-w-[85%]">{item}</p>
                      <button className="hover:cursor-pointer" onClick={() => removeContract(item)}>
                        <FaTrash color="red" size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-5">
                  <input
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="w-[250px] px-3 h-10 rounded-2xl bg-card-3 text-white"
                    placeholder={t('appStore.typeAddressHere')}
                  />
                  <button
                    className="px-5 h-10 bg-green-primary text-white rounded-2xl hover:cursor-pointer"
                    onClick={handleAddContract}
                  >
                    {t('appStore.addContract')}
                  </button>
                </div>

                <button
                  className="px-10 w-[400px] h-10 bg-green-primary text-white rounded-2xl mt-10 hover:cursor-pointer"
                  onClick={handleRegisterApp}
                >
                  {t('appStore.registerApp')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayLoadingTx && (
        <TransactionLoading
          transactionHash={hash}
          loading={isLoading}
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          ok={() => {
            setDisplayLoadingTx(false)
            setOpenForm(false)
          }}
          close={() => setDisplayLoadingTx(false)}
        />
      )}
    </div>
  )
}
