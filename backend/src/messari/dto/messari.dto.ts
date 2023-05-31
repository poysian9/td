export interface MessariDataDto {
  id: string;
  serial_id: number;
  symbol: string;
  name: string;
  slug: string;
  contract_addresses: null;
  internal_temp_agora_id: string;
  profile: profileDto;
}

export interface profileDto {
  general: profile_generalDto;
  contributors: ioDto;
  advisors: ioDto;
  investors: ioDto;
  ecosystem: ecosystemDto;
  economics: economicsDto;
  technology: technologyDto;
  governance: governanceDto;
  metadata: metadataDto;
}

export interface ioDto {
  individuals: individualsDto[];
  organisations: organisationsDto[];
}

export interface individualsDto {
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  description: null | string;
  avatar_url: null | string;
}

export interface organisationsDto {
  slug: string;
  name: string;
  logo: null | string;
  description: null | string;
}

export interface economicsDto {
  token: tokenDto;
  launch: launchDto;
  consensus_and_emission: consensus_and_emissionDto;
  native_treasury: native_treasuryDto;
}

export interface consensus_and_emissionDto {
  supply: supplyDto;
  consensus: consensusDto;
}

export interface consensusDto {
  consensus_details: string;
  general_consensus_mechanism: string;
  precise_consensus_mechanism: string;
  targeted_block_time: number;
  block_reward: number;
  mining_algorithm: string;
  next_halving_date: Date;
  is_victim_of_51_percent_attack: boolean;
}

export interface supplyDto {
  supply_curve_details: string;
  general_emission_type: string;
  precise_emission_type: string;
  is_capped_supply: boolean;
  max_supply: number;
}

export interface launchDto {
  general: launch_generalDto;
  fundraising: fundraisingDto;
  initial_distribution: initial_distributionDto;
}

export interface fundraisingDto {
  sales_rounds: sales_roundDto[];
  sales_documents: any[];
  sales_treasury_accounts: any[];
  treasury_policies: null;
  projected_use_of_sales_proceeds: any[];
}

export interface sales_roundDto {
  title: string;
  start_date: Date;
  type: string;
  details: string;
  end_date: Date;
  native_tokens_allocated: null;
  asset_collected: null;
  price_per_token_in_asset: null;
  equivalent_price_per_token_in_usd: null;
  amount_collected_in_asset: null;
  amount_collected_in_usd: number;
  is_kyc_required: boolean | null;
  restricted_jurisdictions: null;
}

export interface launch_generalDto {
  launch_style: string;
  launch_details: string;
}

export interface initial_distributionDto {
  initial_supply: number;
  initial_supply_repartition: initial_supply_repartitionDto;
  token_distribution_date: Date;
  genesis_block_date: Date;
}

export interface initial_supply_repartitionDto {
  allocated_to_investors_percentage: number;
  allocated_to_organization_or_founders_percentage: number;
  allocated_to_premined_rewards_or_airdrops_percentage: number;
}

export interface native_treasuryDto {
  accounts: any[];
  treasury_usage_details: null;
}

export interface tokenDto {
  token_name: string;
  token_type: string;
  token_address: null;
  block_explorers: block_explorerDto[];
  multitoken: any[];
  token_usage: string;
  token_usage_details: string;
}

export interface block_explorerDto {
  name: string;
  link: string;
}

export interface ecosystemDto {
  assets: assetDto[];
  organizations: any[];
}
export interface assetDto {
  id: string;
  name: string;
}
export interface profile_generalDto {
  overview: general_overviewDto;
  background: backgroundDto;
  roadmap: roadmapDto[];
  regulation: regulationDto;
}

export interface backgroundDto {
  background_details: string;
  issuing_organizations: any[];
}

export interface general_overviewDto {
  is_verified: boolean;
  tagline: string;
  category: string;
  sector: string;
  tags: string;
  project_details: string;
  official_links: block_explorerDto[];
}

export interface regulationDto {
  regulatory_details: string;
  sfar_score: number;
  sfar_summary: string;
}

export interface roadmapDto {
  title: string;
  date: Date;
  type: null | string;
  details: string;
}

export interface governanceDto {
  governance_details: string;
  onchain_governance: onchain_governanceDto;
  grants: any[];
}

export interface onchain_governanceDto {
  onchain_governance_type: null;
  onchain_governance_details: null;
  is_treasury_decentralized: boolean;
}

export interface metadataDto {
  updated_at: Date;
}

export interface technologyDto {
  overview: technology_overviewDto;
  security: securityDto;
}

export interface technology_overviewDto {
  technology_details: string;
  client_repositories: client_repositoryDto[];
}

export interface client_repositoryDto {
  name: string;
  link: string;
  license_type: string;
}

export interface securityDto {
  audits: any[];
  known_exploits_and_vulnerabilities: any[];
}
