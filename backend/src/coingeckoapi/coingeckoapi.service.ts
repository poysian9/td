import { HttpService } from '@nestjs/axios';
import { Dependencies, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Model } from 'mongoose';
import { lastValueFrom, map, Observable } from 'rxjs';
import { CoingeckoCryptoDataDto } from './dto/coingeckoapi.dto';
import { coingecko, coingeckoDocument } from './schema/coingeckoapi.schema';
import { CsvService } from 'src/csv/csv.service';

const exchanges = ['binance', 'ftx_spot', 'huobi', 'kucoin', 'gdax'];
const alltokens = [
  '0x',
  '1inch',
  'aave',
  'aelf',
  'aergo',
  'aion',
  'absolute-sync-token',
  'akropolis',
  'algorand',
  'alien-worlds',
  'aavegotchi-alpha',
  'adex',
  'amp-token',
  'ankr',
  'ape',
  'api3',
  'ardor',
  'ark',
  'arweave',
  'audius',
  'augur',
  'aurory',
  'avalanche-2',
  'axie-infinity',
  'badger-dao',
  'balancer',
  'bancor',
  'band-protocol',
  'basic-attention-token',
  'bella-protocol',
  'biconomy',
  'binancecoin',
  'binance-usd',
  'bitcoin',
  'binance-peg-bitcoin-cash',
  'bitshares',
  'BitTorrent',
  'boba-network',
  'binance-peg-cardano',
  'cartesi',
  'celer-network',
  'celo',
  'celsius-degree-token',
  'chainlink',
  'chiliz',
  'civic',
  'compound-coin',
  'contentos',
  'convex-finance',
  'cosmos',
  'coti',
  'covalent',
  'crypterium',
  'crypto-com-chain',
  'curve-dao-token',
  'dai',
  'darwinia-network-native-token',
  'decentraland',
  'dent',
  'dextools',
  'yfii-finance',
  'dia-data',
  'digibyte',
  'district0x',
  'dodo',
  'binance-peg-dogecoin',
  'dydx',
  'elrond-erd-2',
  'ecowatt',
  'enjincoin',
  'melon',
  'binance-peg-eos',
  'ethereum',
  'ethereum-classic',
  'ethereum-name-service',
  'ethernity-chain',
  'fantom',
  'fetch-ai',
  'binance-peg-filecoin',
  'flamingo-finance',
  'flow',
  'frax-share',
  'frontier-token',
  'ftx-token',
  'funfair',
  'gala',
  'gas',
  'gemini-dollar',
  'game',
  'gnosis',
  'golem',
  'harmony',
  'hedera-hashgraph',
  'helium',
  'mainframe',
  'hive',
  'holotoken',
  'huobi-token',
  'icon',
  'aurora-dao',
  'iexec-rlc',
  'illuvium',
  'immutable-x',
  'injective-protocol',
  'internet-computer',
  'iostoken',
  'binance-peg-iotex',
  'iris-network',
  'kava',
  'rook',
  'kusama',
  'kyber-network-crystal',
  'lcx',
  'lever',
  'lido-dao',
  'lisk',
  'binance-peg-litecoin',
  'livepeer',
  'loom-network-new',
  'laro',
  'lto-network',
  'lukso-token',
  'maker',
  'mantra-dao',
  'marlin',
  'mandala-exchange-token',
  'meta',
  'metal',
  'mina-protocol',
  'mithril',
  'moonbeam',
  'moonriver',
  'my-neighbor-alice',
  'nano',
  'near',
  'nem',
  'neo',
  'nervos-network',
  'nest',
  'nkn',
  'nuls',
  'numeraire',
  'ocean-protocol',
  'omega-finance',
  'binance-peg-ontology',
  'ong',
  'ooki',
  'orchid-protocol',
  'origin-protocol',
  'origintrail',
  'orion-protocol',
  'pancakeswap-token',
  'perlin',
  'binance-peg-polkadot',
  'matic-network',
  'power-ledger',
  'pundi-x-2',
  'qtum',
  'quant-network',
  'quantstamp',
  'quark-chain',
  'ravencoin',
  'raydium',
  'redfox-labs-2',
  'reef',
  'republic-protocol',
  'render-token',
  'request-network',
  'reserve-rights-token',
  'revv',
  'rocket-pool',
  'key',
  'serum',
  'siacoin',
  'singularitynet',
  'skale',
  'smooth-love-potion',
  'solana',
  'spell-token',
  'ssv-network',
  'blockstack',
  'atlantis',
  'star-atlas-dao',
  'share-nft',
  'stellar',
  'gmt-token',
  'storj',
  'storm',
  'stratis',
  'data-economy-index',
  'superciety',
  'rare',
  'sushi',
  'swipe',
  'havven',
  'telcoin',
  'tellor',
  'the-virtua-kolect',
  'tether',
  'tezos',
  'theta-fuel',
  'green-ride-token',
  'san-diego-coin',
  'theta-token',
  'rune',
  'tomochain',
  'concierge-io',
  'tron',
  'truebit-protocol',
  'true-usd',
  'ultra',
  'uma',
  'unibright',
  'unifi-protocol-dao',
  'unicorn-token',
  'usd-coin',
  'utrust',
  'vechain',
  'venus',
  'verasity',
  'vethor-token',
  'v-id-blockchain',
  'ethos',
  'waltonchain',
  'wanchain',
  'playground-waves-floor-index',
  'wax',
  'wazirx',
  'weth',
  'wink',
  'woo-network',
  'wrapped-bitcoin',
  'xdce-crowd-sale',
  'binance-peg-xrp',
  'xyo-network',
  'yearn-finance',
  'zilliqa',
  '88mph',
  'apy-finance',
  'bidao',
  'dos-network',
  'iota',
  'kin',
  'mcdex',
  'neblio',
  'paid-network',
  'parsiq',
  'pillar',
  'qlink',
  'sharering',
  'shiba-inu',
  'spartan-index',
  'oracolxor',
  'sparkpoint',
  'swissborg',
  'safeswap-online',
  'zero-exchange',
  'the-abyss',
  'adbank',
  'adex',
  'aeon',
  'aeternity',
  'agrinovuscoin',
  'ampleforth',
  'aragon',
  'aura-finance',
  'axpire',
  'beam',
  'bitcoin-private',
  'bitdegree',
  'bittube',
  'blockasset',
  'blox',
  'bytecoin',
  'calluna-wallet',
  'cappasity',
  'cardstack',
  'cashaa',
  'clearpoll',
  'cloakcoin',
  'covesting',
  'credits',
  'punk-network',
  'dash',
  'anduschain',
  'decred',
  'deepbrain-chain',
  'digitex-futures-exchange',
  'digixdao',
  'dig-chain',
  'dmm-governance',
  'wozx',
  'electrify-asia',
  'electroneum',
  'energi',
  'eng-crypto',
  'erc20',
  'exchange-union',
  'factom',
  'foam-protocol',
  'fsn',
  'gifto',
  'grin',
  'giresunspor-token',
  'handshake',
  'hempcoin-thc',
  'hitbtc-token',
  'zencash',
  'headstarter',
  'htmlcoin',
  'hxro',
  'hydro',
  'hashland-coin',
  'hyperion',
  'kadena',
  'keep-network',
  'komodo',
  'litecoin-cash',
  'lit',
  'medibloc',
  'metatrone',
  'mona',
  'monero',
  'tokencard',
  'mad-usd',
  'nav-coin',
  'netcoincapital',
  'nexo',
  'nucleus-vision',
  'odyssey',
  'one-ledger',
  'openanx',
  'chainium',
  'paladin',
  'pax-gold',
  'paxos-gold-wormhole',
  'paypie',
  'peculium-2',
  'phenix-finance',
  'pivx',
  'prometheus-token',
  'qash',
  'quick',
  'ramp',
  'rari-governance-token',
  'rarible',
  'rchain',
  'phoenix',
  'berry',
  'ruff',
  'salt',
  'sentinel-protocol',
  'sentivate',
  'seth',
  'secured-ship',
  'skrumble-network',
  'somee-social',
  'sonm',
  'spectre-dividend-token',
  'splyt',
  'subme',
  'swarm',
  'switch',
  'switcheo',
  'luna-wormhole',
  'terrausd',
  'tether-gold',
  'thetadrop',
  'trueaud',
  'unlend-finance',
  'uptrend',
  'uquid-coin',
  'v-systems',
  'verge',
  'vertcoin',
  'wabi',
  'wepower',
  'wirex',
  'zcash',
  'zclassic',
  'zebi',
];
@Injectable()
export class CoingeckoapiService {
  constructor(
    private httpService: HttpService,
    private readonly CsvService: CsvService,

    @InjectModel(coingecko.name)
    private coingeckoModel: Model<coingeckoDocument>,
  ) {}

  getbinanceData({ coinid }) {
    return this.httpService
      .get(
        `https://api.coingecko.com/api/v3/exchanges/binance/tickers?coin_ids=${coinid}&depth=true`,
      )
      .pipe(map((response) => response.data));
  }
  getftxData({ coinid }) {
    return this.httpService
      .get(
        `https://api.coingecko.com/api/v3/exchanges/ftx_spot/tickers?coin_ids=${coinid}&depth=true`,
      )
      .pipe(map((response) => response.data));
  }

  formatNomics(rows: CoingeckoCryptoDataDto[]): coingecko[] {
    const allCG: coingecko[] = [];
    rows.map((exchange) => {
      exchange.tickers.map((ticker) => {
        const formatted: coingecko = {
          exchange: exchange.name,
          base: ticker.base,
          target: ticker.target,
          volume: ticker.volume,
          cost_to_move_up_usd: ticker.cost_to_move_up_usd,
          cost_to_move_down_usd: ticker.cost_to_move_down_usd,
          coin_id: ticker.coin_id,
        };

        allCG.push(formatted);
      });
    });

    return allCG;
  }

  async getdepthData({ coinid }) {
    let data = [];

    // const assets = await this.CsvService.readAll();
    // const coingeckoid = assets.map((e) =>
    //   e.coingeckoid !== null ? e.coingeckoid : '',
    // );
    // console.log(coingeckoid);
    for (let i = 0; i < exchanges.length; i++) {
      data.push(
        await lastValueFrom(
          this.httpService
            .get(
              `https://api.coingecko.com/api/v3/exchanges/${exchanges[i]}/tickers?coin_ids=${coinid}&depth=true`,
            )
            .pipe(map((response) => response.data)),
        ),
      );
    }
    return this.filterdata(data);
  }

  filterdata(data: CoingeckoCryptoDataDto[]) {
    const filtered = data.map((exchange) => {
      const filteredticker = exchange.tickers.filter(
        (ticker) => ticker.volume > 100,
      );

      exchange.tickers = filteredticker;
      return exchange;
    });
    return filtered;
  }

  async getcoingeckomarketdepth({ coinid }) {
    const rows: CoingeckoCryptoDataDto[] = this.filterdata(
      await this.getdepthData({ coinid }),
    );

    const formatted: coingecko[] = this.formatNomics(rows);

    // return this.create(formatted);
    return formatted;
  }

  async create(docs: coingecko[]) {
    return await this.coingeckoModel.insertMany(docs);
  }

  // async upsert(docs: coingecko[]) {
  //   return await this.coingeckoModel.bulkWrite(
  //     docs.map((doc) => ({
  //       updateOne: {
  //         filter: {
  //           id: doc.id,
  //         },
  //         update: doc,
  //         upsert: true,
  //         setDefaultsOnInsert: true,
  //       },
  //     })) as any,
  //   );
  // }

  async readAll() {
    return await this.coingeckoModel.find().lean().exec();
  }
}
