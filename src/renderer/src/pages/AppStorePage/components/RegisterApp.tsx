import { SEQUOIA_APP_STORE_ABI } from '@renderer/abis'
import { APP_STORE_ADDRESS, SEQUOIA_APP_STORE_ADDRESS } from '@renderer/variables'
import { JSX, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

  const chainId = useChainId()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading, isSuccess, isError } = useWaitForTransactionReceipt({ hash })

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
        className="w-full h-10 flex justify-between items-center px-5 text-gray-400"
        onClick={toggleOpenForm}
      >
        {t('registerApp')}
      </button>

      {openForm && (
        <div className="flex gap-10">
          <div className="flex flex-col">
            <label className="text-gray-400">{t('name')}:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[300px] px-3 h-10 rounded-2xl bg-card-2 text-white"
              placeholder={t('typeHere')}
            />

            <label className="text-gray-400 mt-3">{t('description')}:</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[300px] px-3 h-10 rounded-2xl bg-card-2 text-white"
              placeholder={t('typeHere')}
            />

            <label className="text-gray-400 mt-3">{t('iconURL')}:</label>
            <input
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-[300px] px-3 h-10 rounded-2xl bg-card-2 text-white"
              placeholder={t('typeHere')}
            />

            <label className="text-gray-400 mt-3">{t('repositoryUrl')}:</label>
            <input
              value={repositoryUrl}
              onChange={(e) => setRepositoryUrl(e.target.value)}
              className="w-[300px] px-3 h-10 rounded-2xl bg-card-2 text-white"
              placeholder={t('typeHere')}
            />

            <label className="text-gray-400 mt-3">{t('externalLink')}:</label>
            <input
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-[300px] px-3 h-10 rounded-2xl bg-card-2 text-white"
              placeholder={t('typeHere')}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-gray-400">{t('contracts')}</p>

            {contracts.map((item, index) => (
              <div key={index} className="flex items-center mb-2 gap-5">
                <p className="text-white">{item}</p>
                <button
                  className="w-10 h-10 bg-red-500 hover:cursor-pointer"
                  onClick={() => removeContract(item)}
                >
                  rem
                </button>
              </div>
            ))}

            <div className="flex gap-5">
              <label className="text-gray-400 mt-3">{t('contractAddress')}:</label>
              <input
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className="w-[300px] px-3 h-10 rounded-2xl bg-card-2 text-white"
                placeholder={t('typeHere')}
              />
              <button
                className="px-5 h-10 bg-green-primary text-white rounded-2xl hover:cursor-pointer"
                onClick={handleAddContract}
              >
                {t('addContract')}
              </button>
            </div>

            <button
              className="px-5 h-10 bg-green-primary text-white rounded-2xl mt-10 hover:cursor-pointer"
              onClick={handleRegisterApp}
            >
              {isPending && 'pending'}
              {isLoading && 'confirming'}
              {!isPending && !isLoading && t('registerApp')}
            </button>

            <p className="text-white mt-5">
              {isSuccess && 'success transaction'}
              {isError && 'error on transaction'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
