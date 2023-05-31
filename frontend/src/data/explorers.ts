const EXPLORERS: Explorer[] = [
  {
    name: "Blockchair",
    url: "https://blockchair.com/",
  },
  {
    name: "Etherscan",
    url: "https://etherscan.io/",
  },
  {
    name: "BscScan",
    url: "https://bscscan.com/",
  },
  {
    name: "Solscan",
    url: "https://solscan.io/",
  },
  {
    name: "Subscan",
    url: "https://polkadot.subscan.io/",
  },
  {
    name: "Polygonscan",
    url: "https://polygonscan.com/",
  },
  {
    name: "Tronscan",
    url: "https://tronscan.org/",
  },
  {
    name: "Atomscan",
    url: "https://atomscan.com/",
  },
  {
    name: "Neoscan",
    url: "https://dora.coz.io/",
  },
  {
    name: "Kucoin",
    url: "https://scan.kcc.io/",
  },
];

type Explorer = {
  name: string;
  url: string;
};

export { EXPLORERS };
