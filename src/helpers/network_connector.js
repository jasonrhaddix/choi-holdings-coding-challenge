/* eslint-disable */

import { ethers } from 'ethers/lib.esm';
import detectEthereumProvider from '@metamask/detect-provider';

const ETH_NETWORK = 'ropsten';
const CHAIN_ID = 3;
const TOKEN_CONTRACT_ADDRESS = '0xc7f76f6C6d4f2BdfDc4BD43a75Ba7CB2F191790C';

// Get an ethersjs wallet provider, if available
export async function getProvider() {
  const provider = await detectEthereumProvider();
  if(provider) {
    provider.on('networkChanged', async (_networkId) => {
      location.reload();
    })
    return new ethers.providers.Web3Provider(provider);
  } else {
    throw new Error('Metamask not installed');
  }
}

// Connect a wallet, given a Web3 provider
export async function connectWallet(provider) {
  try {
    await provider.request({
      method: 'wallet_requestPermissions',
      params: [{eth_accounts: {}}],
    })
    await provider.request({
      method: 'eth_requestAccounts',
      params: [{ eth_accounts: {}}],
    });

    return provider
  } catch(e) {
    throw new Error('Unable to connect wallet');
  }
}


// Get an ethersjs contract object for the Token
export function tokenContract(signer) {
  return new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TokenABI, signer);
}

export function getBalance(contract) {
  return contract.balanceOf(TOKEN_CONTRACT_ADDRESS);
}

// ABI for an ERC20 token
export const TokenABI = [
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      }
    ],
    'name': 'allowance',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'spender',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'who',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'value',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];
