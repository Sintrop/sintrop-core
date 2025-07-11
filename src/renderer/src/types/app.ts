export interface AppProps {
  id: number
  publisher: string /// @notice Wallet address that published the ImpactApp.
  name: string /// @notice Name of the ImpactApp.
  description: string /// @notice Detailed description of the ImpactApp.
  icon: string /// @notice URL to an icon image.
  repositoryUrl: string /// @notice URL to the code repository (e.g., GitHub, GitLab).
  externalLink: string /// @notice URL to the ImpactApp's website or external interface.
  contractAddresses: string[] /// @notice List of smart contract addresses that compose the ImpactApp.
  positiveVotes: number /// @notice Count of positive votes for socio-environmental impact.
  negativeVotes: number
}
