/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
//@ts-ignore
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* tslint:disable:no-unused-variable */
import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type PassScoreToRoundContract = {
  $$type: 'PassScoreToRoundContract';
  checked_address: Address;
  return_score: bigint;
};

export function storePassScoreToRoundContract(src: PassScoreToRoundContract) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3858595625, 32);
    b_0.storeAddress(src.checked_address);
    b_0.storeUint(src.return_score, 64);
  };
}

export function loadPassScoreToRoundContract(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3858595625) {
    throw Error('Invalid prefix');
  }
  let _checked_address = sc_0.loadAddress();
  let _return_score = sc_0.loadUintBig(64);
  return {
    $$type: 'PassScoreToRoundContract' as const,
    checked_address: _checked_address,
    return_score: _return_score,
  };
}

function loadTuplePassScoreToRoundContract(source: TupleReader) {
  let _checked_address = source.readAddress();
  let _return_score = source.readBigNumber();
  return {
    $$type: 'PassScoreToRoundContract' as const,
    checked_address: _checked_address,
    return_score: _return_score,
  };
}

function storeTuplePassScoreToRoundContract(source: PassScoreToRoundContract) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.checked_address);
  builder.writeNumber(source.return_score);
  return builder.build();
}

function dictValueParserPassScoreToRoundContract(): DictionaryValue<PassScoreToRoundContract> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storePassScoreToRoundContract(src)).endCell()
      );
    },
    parse: (src) => {
      return loadPassScoreToRoundContract(src.loadRef().beginParse());
    },
  };
}

export type StakingData = {
  $$type: 'StakingData';
  index: bigint;
  this_contract_jettonWallet: Address;
};

export function storeStakingData(src: StakingData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(src.index, 64);
    b_0.storeAddress(src.this_contract_jettonWallet);
  };
}

export function loadStakingData(slice: Slice) {
  let sc_0 = slice;
  let _index = sc_0.loadUintBig(64);
  let _this_contract_jettonWallet = sc_0.loadAddress();
  return {
    $$type: 'StakingData' as const,
    index: _index,
    this_contract_jettonWallet: _this_contract_jettonWallet,
  };
}

function loadTupleStakingData(source: TupleReader) {
  let _index = source.readBigNumber();
  let _this_contract_jettonWallet = source.readAddress();
  return {
    $$type: 'StakingData' as const,
    index: _index,
    this_contract_jettonWallet: _this_contract_jettonWallet,
  };
}

function storeTupleStakingData(source: StakingData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.index);
  builder.writeAddress(source.this_contract_jettonWallet);
  return builder.build();
}

function dictValueParserStakingData(): DictionaryValue<StakingData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStakingData(src)).endCell());
    },
    parse: (src) => {
      return loadStakingData(src.loadRef().beginParse());
    },
  };
}

export type StakeRecord = {
  $$type: 'StakeRecord';
  stake_address: Address;
  jettonStakeAmount: bigint;
};

export function storeStakeRecord(src: StakeRecord) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.stake_address);
    b_0.storeCoins(src.jettonStakeAmount);
  };
}

export function loadStakeRecord(slice: Slice) {
  let sc_0 = slice;
  let _stake_address = sc_0.loadAddress();
  let _jettonStakeAmount = sc_0.loadCoins();
  return {
    $$type: 'StakeRecord' as const,
    stake_address: _stake_address,
    jettonStakeAmount: _jettonStakeAmount,
  };
}

function loadTupleStakeRecord(source: TupleReader) {
  let _stake_address = source.readAddress();
  let _jettonStakeAmount = source.readBigNumber();
  return {
    $$type: 'StakeRecord' as const,
    stake_address: _stake_address,
    jettonStakeAmount: _jettonStakeAmount,
  };
}

function storeTupleStakeRecord(source: StakeRecord) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.stake_address);
  builder.writeNumber(source.jettonStakeAmount);
  return builder.build();
}

function dictValueParserStakeRecord(): DictionaryValue<StakeRecord> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStakeRecord(src)).endCell());
    },
    parse: (src) => {
      return loadStakeRecord(src.loadRef().beginParse());
    },
  };
}

export type AmountTime = {
  $$type: 'AmountTime';
  for: Address;
  stakedAmount: bigint;
  time: bigint;
  calculatedAmount: bigint;
};

export function storeAmountTime(src: AmountTime) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.for);
    b_0.storeInt(src.stakedAmount, 257);
    b_0.storeInt(src.time, 257);
    let b_1 = new Builder();
    b_1.storeInt(src.calculatedAmount, 257);
    b_0.storeRef(b_1.endCell());
  };
}

export function loadAmountTime(slice: Slice) {
  let sc_0 = slice;
  let _for = sc_0.loadAddress();
  let _stakedAmount = sc_0.loadIntBig(257);
  let _time = sc_0.loadIntBig(257);
  let sc_1 = sc_0.loadRef().beginParse();
  let _calculatedAmount = sc_1.loadIntBig(257);
  return {
    $$type: 'AmountTime' as const,
    for: _for,
    stakedAmount: _stakedAmount,
    time: _time,
    calculatedAmount: _calculatedAmount,
  };
}

function loadTupleAmountTime(source: TupleReader) {
  let _for = source.readAddress();
  let _stakedAmount = source.readBigNumber();
  let _time = source.readBigNumber();
  let _calculatedAmount = source.readBigNumber();
  return {
    $$type: 'AmountTime' as const,
    for: _for,
    stakedAmount: _stakedAmount,
    time: _time,
    calculatedAmount: _calculatedAmount,
  };
}

function storeTupleAmountTime(source: AmountTime) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.for);
  builder.writeNumber(source.stakedAmount);
  builder.writeNumber(source.time);
  builder.writeNumber(source.calculatedAmount);
  return builder.build();
}

function dictValueParserAmountTime(): DictionaryValue<AmountTime> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAmountTime(src)).endCell());
    },
    parse: (src) => {
      return loadAmountTime(src.loadRef().beginParse());
    },
  };
}

export type PrevNextCells = {
  $$type: 'PrevNextCells';
  previous: Address;
  next: Address;
};

export function storePrevNextCells(src: PrevNextCells) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.previous);
    b_0.storeAddress(src.next);
  };
}

export function loadPrevNextCells(slice: Slice) {
  let sc_0 = slice;
  let _previous = sc_0.loadAddress();
  let _next = sc_0.loadAddress();
  return { $$type: 'PrevNextCells' as const, previous: _previous, next: _next };
}

function loadTuplePrevNextCells(source: TupleReader) {
  let _previous = source.readAddress();
  let _next = source.readAddress();
  return { $$type: 'PrevNextCells' as const, previous: _previous, next: _next };
}

function storeTuplePrevNextCells(source: PrevNextCells) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.previous);
  builder.writeAddress(source.next);
  return builder.build();
}

function dictValueParserPrevNextCells(): DictionaryValue<PrevNextCells> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storePrevNextCells(src)).endCell());
    },
    parse: (src) => {
      return loadPrevNextCells(src.loadRef().beginParse());
    },
  };
}

export type TransferEvent = {
  $$type: 'TransferEvent';
  sender_address: Address;
  jetton_amount: bigint;
  score: bigint;
};

export function storeTransferEvent(src: TransferEvent) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1382804827, 32);
    b_0.storeAddress(src.sender_address);
    b_0.storeCoins(src.jetton_amount);
    b_0.storeUint(src.score, 128);
  };
}

export function loadTransferEvent(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1382804827) {
    throw Error('Invalid prefix');
  }
  let _sender_address = sc_0.loadAddress();
  let _jetton_amount = sc_0.loadCoins();
  let _score = sc_0.loadUintBig(128);
  return {
    $$type: 'TransferEvent' as const,
    sender_address: _sender_address,
    jetton_amount: _jetton_amount,
    score: _score,
  };
}

function loadTupleTransferEvent(source: TupleReader) {
  let _sender_address = source.readAddress();
  let _jetton_amount = source.readBigNumber();
  let _score = source.readBigNumber();
  return {
    $$type: 'TransferEvent' as const,
    sender_address: _sender_address,
    jetton_amount: _jetton_amount,
    score: _score,
  };
}

function storeTupleTransferEvent(source: TransferEvent) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.sender_address);
  builder.writeNumber(source.jetton_amount);
  builder.writeNumber(source.score);
  return builder.build();
}

function dictValueParserTransferEvent(): DictionaryValue<TransferEvent> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeTransferEvent(src)).endCell());
    },
    parse: (src) => {
      return loadTransferEvent(src.loadRef().beginParse());
    },
  };
}

export type Mint = {
  $$type: 'Mint';
  to: Address;
  amount: bigint;
};

export function storeMint(src: Mint) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(275720840, 32);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.amount, 257);
  };
}

export function loadMint(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 275720840) {
    throw Error('Invalid prefix');
  }
  let _to = sc_0.loadAddress();
  let _amount = sc_0.loadIntBig(257);
  return { $$type: 'Mint' as const, to: _to, amount: _amount };
}

function loadTupleMint(source: TupleReader) {
  let _to = source.readAddress();
  let _amount = source.readBigNumber();
  return { $$type: 'Mint' as const, to: _to, amount: _amount };
}

function storeTupleMint(source: Mint) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserMint(): DictionaryValue<Mint> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeMint(src)).endCell());
    },
    parse: (src) => {
      return loadMint(src.loadRef().beginParse());
    },
  };
}

export type Stake = {
  $$type: 'Stake';
  query_id: bigint;
  amount: bigint;
};

export function storeStake(src: Stake) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2655029411, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
  };
}

export function loadStake(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2655029411) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  return { $$type: 'Stake' as const, query_id: _query_id, amount: _amount };
}

function loadTupleStake(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  return { $$type: 'Stake' as const, query_id: _query_id, amount: _amount };
}

function storeTupleStake(source: Stake) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  return builder.build();
}

function dictValueParserStake(): DictionaryValue<Stake> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeStake(src)).endCell());
    },
    parse: (src) => {
      return loadStake(src.loadRef().beginParse());
    },
  };
}

export type AddingJettonAddress = {
  $$type: 'AddingJettonAddress';
  this_contract_jettonWallet: Address;
};

export function storeAddingJettonAddress(src: AddingJettonAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(36111069, 32);
    b_0.storeAddress(src.this_contract_jettonWallet);
  };
}

export function loadAddingJettonAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 36111069) {
    throw Error('Invalid prefix');
  }
  let _this_contract_jettonWallet = sc_0.loadAddress();
  return {
    $$type: 'AddingJettonAddress' as const,
    this_contract_jettonWallet: _this_contract_jettonWallet,
  };
}

function loadTupleAddingJettonAddress(source: TupleReader) {
  let _this_contract_jettonWallet = source.readAddress();
  return {
    $$type: 'AddingJettonAddress' as const,
    this_contract_jettonWallet: _this_contract_jettonWallet,
  };
}

function storeTupleAddingJettonAddress(source: AddingJettonAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.this_contract_jettonWallet);
  return builder.build();
}

function dictValueParserAddingJettonAddress(): DictionaryValue<AddingJettonAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeAddingJettonAddress(src)).endCell()
      );
    },
    parse: (src) => {
      return loadAddingJettonAddress(src.loadRef().beginParse());
    },
  };
}

export type Unstake = {
  $$type: 'Unstake';
  applied_user_address: Address;
};

export function storeUnstake(src: Unstake) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2202233003, 32);
    b_0.storeAddress(src.applied_user_address);
  };
}

export function loadUnstake(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2202233003) {
    throw Error('Invalid prefix');
  }
  let _applied_user_address = sc_0.loadAddress();
  return {
    $$type: 'Unstake' as const,
    applied_user_address: _applied_user_address,
  };
}

function loadTupleUnstake(source: TupleReader) {
  let _applied_user_address = source.readAddress();
  return {
    $$type: 'Unstake' as const,
    applied_user_address: _applied_user_address,
  };
}

function storeTupleUnstake(source: Unstake) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.applied_user_address);
  return builder.build();
}

function dictValueParserUnstake(): DictionaryValue<Unstake> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUnstake(src)).endCell());
    },
    parse: (src) => {
      return loadUnstake(src.loadRef().beginParse());
    },
  };
}

export type Redeem = {
  $$type: 'Redeem';
  to: Address;
  stakedAmount: bigint;
  rewardAmount: bigint;
};

export function storeRedeem(src: Redeem) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1954841201, 32);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.stakedAmount, 257);
    b_0.storeInt(src.rewardAmount, 257);
  };
}

export function loadRedeem(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1954841201) {
    throw Error('Invalid prefix');
  }
  let _to = sc_0.loadAddress();
  let _stakedAmount = sc_0.loadIntBig(257);
  let _rewardAmount = sc_0.loadIntBig(257);
  return {
    $$type: 'Redeem' as const,
    to: _to,
    stakedAmount: _stakedAmount,
    rewardAmount: _rewardAmount,
  };
}

function loadTupleRedeem(source: TupleReader) {
  let _to = source.readAddress();
  let _stakedAmount = source.readBigNumber();
  let _rewardAmount = source.readBigNumber();
  return {
    $$type: 'Redeem' as const,
    to: _to,
    stakedAmount: _stakedAmount,
    rewardAmount: _rewardAmount,
  };
}

function storeTupleRedeem(source: Redeem) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.to);
  builder.writeNumber(source.stakedAmount);
  builder.writeNumber(source.rewardAmount);
  return builder.build();
}

function dictValueParserRedeem(): DictionaryValue<Redeem> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeRedeem(src)).endCell());
    },
    parse: (src) => {
      return loadRedeem(src.loadRef().beginParse());
    },
  };
}

export type Add = {
  $$type: 'Add';
  queryId: bigint;
  amount: bigint;
  stakerWallet: Address;
  previousCell: Address;
  nextCell: Address;
};

export function storeAdd(src: Add) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2290755529, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeUint(src.amount, 32);
    b_0.storeAddress(src.stakerWallet);
    b_0.storeAddress(src.previousCell);
    b_0.storeAddress(src.nextCell);
  };
}

export function loadAdd(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2290755529) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _amount = sc_0.loadUintBig(32);
  let _stakerWallet = sc_0.loadAddress();
  let _previousCell = sc_0.loadAddress();
  let _nextCell = sc_0.loadAddress();
  return {
    $$type: 'Add' as const,
    queryId: _queryId,
    amount: _amount,
    stakerWallet: _stakerWallet,
    previousCell: _previousCell,
    nextCell: _nextCell,
  };
}

function loadTupleAdd(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _stakerWallet = source.readAddress();
  let _previousCell = source.readAddress();
  let _nextCell = source.readAddress();
  return {
    $$type: 'Add' as const,
    queryId: _queryId,
    amount: _amount,
    stakerWallet: _stakerWallet,
    previousCell: _previousCell,
    nextCell: _nextCell,
  };
}

function storeTupleAdd(source: Add) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.stakerWallet);
  builder.writeAddress(source.previousCell);
  builder.writeAddress(source.nextCell);
  return builder.build();
}

function dictValueParserAdd(): DictionaryValue<Add> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeAdd(src)).endCell());
    },
    parse: (src) => {
      return loadAdd(src.loadRef().beginParse());
    },
  };
}

export type GetWeighted = {
  $$type: 'GetWeighted';
  applied_user_address: Address;
};

export function storeGetWeighted(src: GetWeighted) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(323774586, 32);
    b_0.storeAddress(src.applied_user_address);
  };
}

export function loadGetWeighted(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 323774586) {
    throw Error('Invalid prefix');
  }
  let _applied_user_address = sc_0.loadAddress();
  return {
    $$type: 'GetWeighted' as const,
    applied_user_address: _applied_user_address,
  };
}

function loadTupleGetWeighted(source: TupleReader) {
  let _applied_user_address = source.readAddress();
  return {
    $$type: 'GetWeighted' as const,
    applied_user_address: _applied_user_address,
  };
}

function storeTupleGetWeighted(source: GetWeighted) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.applied_user_address);
  return builder.build();
}

function dictValueParserGetWeighted(): DictionaryValue<GetWeighted> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeGetWeighted(src)).endCell());
    },
    parse: (src) => {
      return loadGetWeighted(src.loadRef().beginParse());
    },
  };
}

export type UpdateNext = {
  $$type: 'UpdateNext';
  nextCell: Address;
};

export function storeUpdateNext(src: UpdateNext) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3437680479, 32);
    b_0.storeAddress(src.nextCell);
  };
}

export function loadUpdateNext(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3437680479) {
    throw Error('Invalid prefix');
  }
  let _nextCell = sc_0.loadAddress();
  return { $$type: 'UpdateNext' as const, nextCell: _nextCell };
}

function loadTupleUpdateNext(source: TupleReader) {
  let _nextCell = source.readAddress();
  return { $$type: 'UpdateNext' as const, nextCell: _nextCell };
}

function storeTupleUpdateNext(source: UpdateNext) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.nextCell);
  return builder.build();
}

function dictValueParserUpdateNext(): DictionaryValue<UpdateNext> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeUpdateNext(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateNext(src.loadRef().beginParse());
    },
  };
}

export type ChangeMinter = {
  $$type: 'ChangeMinter';
  newMinter: Address;
  isMinter: boolean;
};

export function storeChangeMinter(src: ChangeMinter) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2718943373, 32);
    b_0.storeAddress(src.newMinter);
    b_0.storeBit(src.isMinter);
  };
}

export function loadChangeMinter(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2718943373) {
    throw Error('Invalid prefix');
  }
  let _newMinter = sc_0.loadAddress();
  let _isMinter = sc_0.loadBit();
  return {
    $$type: 'ChangeMinter' as const,
    newMinter: _newMinter,
    isMinter: _isMinter,
  };
}

function loadTupleChangeMinter(source: TupleReader) {
  let _newMinter = source.readAddress();
  let _isMinter = source.readBoolean();
  return {
    $$type: 'ChangeMinter' as const,
    newMinter: _newMinter,
    isMinter: _isMinter,
  };
}

function storeTupleChangeMinter(source: ChangeMinter) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.newMinter);
  builder.writeBoolean(source.isMinter);
  return builder.build();
}

function dictValueParserChangeMinter(): DictionaryValue<ChangeMinter> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeMinter(src)).endCell());
    },
    parse: (src) => {
      return loadChangeMinter(src.loadRef().beginParse());
    },
  };
}

export type JettonTransfer = {
  $$type: 'JettonTransfer';
  query_id: bigint;
  amount: bigint;
  destination: Address;
  response_destination: Address;
  custom_payload: Cell | null;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeJettonTransfer(src: JettonTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(260734629, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.destination);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 260734629) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _destination = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'JettonTransfer' as const,
    query_id: _query_id,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _destination = source.readAddress();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: 'JettonTransfer' as const,
    query_id: _query_id,
    amount: _amount,
    destination: _destination,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.destination);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadJettonTransfer(src.loadRef().beginParse());
    },
  };
}

export type JettonTransferNotification = {
  $$type: 'JettonTransferNotification';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  forward_payload: Cell;
};

export function storeJettonTransferNotification(
  src: JettonTransferNotification
) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1935855772, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.sender);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonTransferNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1935855772) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'JettonTransferNotification' as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonTransferNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _forward_payload = source.readCell();
  return {
    $$type: 'JettonTransferNotification' as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonTransferNotification(
  source: JettonTransferNotification
) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonTransferNotification(): DictionaryValue<JettonTransferNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonTransferNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonTransferNotification(src.loadRef().beginParse());
    },
  };
}

export type JettonBurn = {
  $$type: 'JettonBurn';
  query_id: bigint;
  amount: bigint;
  response_destination: Address;
  custom_payload: Cell | null;
};

export function storeJettonBurn(src: JettonBurn) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1499400124, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.response_destination);
    if (src.custom_payload !== null && src.custom_payload !== undefined) {
      b_0.storeBit(true).storeRef(src.custom_payload);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadJettonBurn(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1499400124) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _response_destination = sc_0.loadAddress();
  let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'JettonBurn' as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
  };
}

function loadTupleJettonBurn(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _response_destination = source.readAddress();
  let _custom_payload = source.readCellOpt();
  return {
    $$type: 'JettonBurn' as const,
    query_id: _query_id,
    amount: _amount,
    response_destination: _response_destination,
    custom_payload: _custom_payload,
  };
}

function storeTupleJettonBurn(source: JettonBurn) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.response_destination);
  builder.writeCell(source.custom_payload);
  return builder.build();
}

function dictValueParserJettonBurn(): DictionaryValue<JettonBurn> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonBurn(src)).endCell());
    },
    parse: (src) => {
      return loadJettonBurn(src.loadRef().beginParse());
    },
  };
}

export type JettonExcesses = {
  $$type: 'JettonExcesses';
  query_id: bigint;
};

export function storeJettonExcesses(src: JettonExcesses) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3576854235, 32);
    b_0.storeUint(src.query_id, 64);
  };
}

export function loadJettonExcesses(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3576854235) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function loadTupleJettonExcesses(source: TupleReader) {
  let _query_id = source.readBigNumber();
  return { $$type: 'JettonExcesses' as const, query_id: _query_id };
}

function storeTupleJettonExcesses(source: JettonExcesses) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  return builder.build();
}

function dictValueParserJettonExcesses(): DictionaryValue<JettonExcesses> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeJettonExcesses(src)).endCell());
    },
    parse: (src) => {
      return loadJettonExcesses(src.loadRef().beginParse());
    },
  };
}

export type JettonInternalTransfer = {
  $$type: 'JettonInternalTransfer';
  query_id: bigint;
  amount: bigint;
  from: Address;
  response_address: Address;
  forward_ton_amount: bigint;
  forward_payload: Cell;
};

export function storeJettonInternalTransfer(src: JettonInternalTransfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(395134233, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.from);
    b_0.storeAddress(src.response_address);
    b_0.storeCoins(src.forward_ton_amount);
    b_0.storeBuilder(src.forward_payload.asBuilder());
  };
}

export function loadJettonInternalTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 395134233) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _from = sc_0.loadAddress();
  let _response_address = sc_0.loadAddress();
  let _forward_ton_amount = sc_0.loadCoins();
  let _forward_payload = sc_0.asCell();
  return {
    $$type: 'JettonInternalTransfer' as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    response_address: _response_address,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function loadTupleJettonInternalTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _from = source.readAddress();
  let _response_address = source.readAddress();
  let _forward_ton_amount = source.readBigNumber();
  let _forward_payload = source.readCell();
  return {
    $$type: 'JettonInternalTransfer' as const,
    query_id: _query_id,
    amount: _amount,
    from: _from,
    response_address: _response_address,
    forward_ton_amount: _forward_ton_amount,
    forward_payload: _forward_payload,
  };
}

function storeTupleJettonInternalTransfer(source: JettonInternalTransfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.from);
  builder.writeAddress(source.response_address);
  builder.writeNumber(source.forward_ton_amount);
  builder.writeSlice(source.forward_payload);
  return builder.build();
}

function dictValueParserJettonInternalTransfer(): DictionaryValue<JettonInternalTransfer> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonInternalTransfer(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonInternalTransfer(src.loadRef().beginParse());
    },
  };
}

export type JettonBurnNotification = {
  $$type: 'JettonBurnNotification';
  query_id: bigint;
  amount: bigint;
  sender: Address;
  response_destination: Address;
};

export function storeJettonBurnNotification(src: JettonBurnNotification) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2078119902, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeCoins(src.amount);
    b_0.storeAddress(src.sender);
    b_0.storeAddress(src.response_destination);
  };
}

export function loadJettonBurnNotification(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2078119902) {
    throw Error('Invalid prefix');
  }
  let _query_id = sc_0.loadUintBig(64);
  let _amount = sc_0.loadCoins();
  let _sender = sc_0.loadAddress();
  let _response_destination = sc_0.loadAddress();
  return {
    $$type: 'JettonBurnNotification' as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    response_destination: _response_destination,
  };
}

function loadTupleJettonBurnNotification(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _amount = source.readBigNumber();
  let _sender = source.readAddress();
  let _response_destination = source.readAddress();
  return {
    $$type: 'JettonBurnNotification' as const,
    query_id: _query_id,
    amount: _amount,
    sender: _sender,
    response_destination: _response_destination,
  };
}

function storeTupleJettonBurnNotification(source: JettonBurnNotification) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.sender);
  builder.writeAddress(source.response_destination);
  return builder.build();
}

function dictValueParserJettonBurnNotification(): DictionaryValue<JettonBurnNotification> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(
        beginCell().store(storeJettonBurnNotification(src)).endCell()
      );
    },
    parse: (src) => {
      return loadJettonBurnNotification(src.loadRef().beginParse());
    },
  };
}

export type WalletData = {
  $$type: 'WalletData';
  balance: bigint;
  owner: Address;
  jetton: Address;
  jetton_wallet_code: Cell;
};

export function storeWalletData(src: WalletData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeCoins(src.balance);
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.jetton);
    b_0.storeRef(src.jetton_wallet_code);
  };
}

export function loadWalletData(slice: Slice) {
  let sc_0 = slice;
  let _balance = sc_0.loadCoins();
  let _owner = sc_0.loadAddress();
  let _jetton = sc_0.loadAddress();
  let _jetton_wallet_code = sc_0.loadRef();
  return {
    $$type: 'WalletData' as const,
    balance: _balance,
    owner: _owner,
    jetton: _jetton,
    jetton_wallet_code: _jetton_wallet_code,
  };
}

function loadTupleWalletData(source: TupleReader) {
  let _balance = source.readBigNumber();
  let _owner = source.readAddress();
  let _jetton = source.readAddress();
  let _jetton_wallet_code = source.readCell();
  return {
    $$type: 'WalletData' as const,
    balance: _balance,
    owner: _owner,
    jetton: _jetton,
    jetton_wallet_code: _jetton_wallet_code,
  };
}

function storeTupleWalletData(source: WalletData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.balance);
  builder.writeAddress(source.owner);
  builder.writeAddress(source.jetton);
  builder.writeCell(source.jetton_wallet_code);
  return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
    },
    parse: (src) => {
      return loadWalletData(src.loadRef().beginParse());
    },
  };
}

type StakeStorage_init_args = {
  $$type: 'StakeStorage_init_args';
  _owner: Address;
  _factory: Address;
};

function initStakeStorage_init_args(src: StakeStorage_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src._owner);
    b_0.storeAddress(src._factory);
  };
}

async function StakeStorage_init(_owner: Address, _factory: Address) {
  const __code = Cell.fromBase64(
    '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'
  );
  const __system = Cell.fromBase64(
    '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'
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initStakeStorage_init_args({
    $$type: 'StakeStorage_init_args',
    _owner,
    _factory,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const StakeStorage_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack underflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  2296: {
    message: `JettonWallet: Only Jetton master or Jetton wallet can call this function`,
  },
  2299: { message: `wrong call` },
  4429: { message: `Invalid sender` },
  13105: { message: `JettonWallet: Not enough jettons to transfer` },
  14534: { message: `Not owner` },
  27831: { message: `Only owner can call this function` },
  28498: { message: `Already filled` },
  29133: {
    message: `JettonWallet: Not allow negative balance after internal transfer`,
  },
  37185: { message: `Not enough funds to transfer` },
  47048: { message: `JettonWallet: Only owner can burn tokens` },
  60354: { message: `JettonWallet: Not enough balance to burn tokens` },
};

const StakeStorage_types: ABIType[] = [
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      {
        name: 'bounced',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
      {
        name: 'sender',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'value',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      {
        name: 'bounce',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
      {
        name: 'to',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'value',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'mode',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'PassScoreToRoundContract',
    header: 3858595625,
    fields: [
      {
        name: 'checked_address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'return_score',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'StakingData',
    header: null,
    fields: [
      {
        name: 'index',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'this_contract_jettonWallet',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'StakeRecord',
    header: null,
    fields: [
      {
        name: 'stake_address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'jettonStakeAmount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
    ],
  },
  {
    name: 'AmountTime',
    header: null,
    fields: [
      {
        name: 'for',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'stakedAmount',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'time',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'calculatedAmount',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'PrevNextCells',
    header: null,
    fields: [
      {
        name: 'previous',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'next',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'TransferEvent',
    header: 1382804827,
    fields: [
      {
        name: 'sender_address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'jetton_amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'score',
        type: { kind: 'simple', type: 'uint', optional: false, format: 128 },
      },
    ],
  },
  {
    name: 'Mint',
    header: 275720840,
    fields: [
      {
        name: 'to',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'amount',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'Stake',
    header: 2655029411,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
    ],
  },
  {
    name: 'AddingJettonAddress',
    header: 36111069,
    fields: [
      {
        name: 'this_contract_jettonWallet',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'Unstake',
    header: 2202233003,
    fields: [
      {
        name: 'applied_user_address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'Redeem',
    header: 1954841201,
    fields: [
      {
        name: 'to',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'stakedAmount',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
      {
        name: 'rewardAmount',
        type: { kind: 'simple', type: 'int', optional: false, format: 257 },
      },
    ],
  },
  {
    name: 'Add',
    header: 2290755529,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: { kind: 'simple', type: 'uint', optional: false, format: 32 },
      },
      {
        name: 'stakerWallet',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'previousCell',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'nextCell',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'GetWeighted',
    header: 323774586,
    fields: [
      {
        name: 'applied_user_address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'UpdateNext',
    header: 3437680479,
    fields: [
      {
        name: 'nextCell',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ChangeMinter',
    header: 2718943373,
    fields: [
      {
        name: 'newMinter',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'isMinter',
        type: { kind: 'simple', type: 'bool', optional: false },
      },
    ],
  },
  {
    name: 'JettonTransfer',
    header: 260734629,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'destination',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'response_destination',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'custom_payload',
        type: { kind: 'simple', type: 'cell', optional: true },
      },
      {
        name: 'forward_ton_amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'forward_payload',
        type: {
          kind: 'simple',
          type: 'slice',
          optional: false,
          format: 'remainder',
        },
      },
    ],
  },
  {
    name: 'JettonTransferNotification',
    header: 1935855772,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'sender',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'forward_payload',
        type: {
          kind: 'simple',
          type: 'slice',
          optional: false,
          format: 'remainder',
        },
      },
    ],
  },
  {
    name: 'JettonBurn',
    header: 1499400124,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'response_destination',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'custom_payload',
        type: { kind: 'simple', type: 'cell', optional: true },
      },
    ],
  },
  {
    name: 'JettonExcesses',
    header: 3576854235,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'JettonInternalTransfer',
    header: 395134233,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'from',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'response_address',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'forward_ton_amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'forward_payload',
        type: {
          kind: 'simple',
          type: 'slice',
          optional: false,
          format: 'remainder',
        },
      },
    ],
  },
  {
    name: 'JettonBurnNotification',
    header: 2078119902,
    fields: [
      {
        name: 'query_id',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'amount',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'sender',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'response_destination',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'WalletData',
    header: null,
    fields: [
      {
        name: 'balance',
        type: {
          kind: 'simple',
          type: 'uint',
          optional: false,
          format: 'coins',
        },
      },
      {
        name: 'owner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'jetton',
        type: { kind: 'simple', type: 'address', optional: false },
      },
      {
        name: 'jetton_wallet_code',
        type: { kind: 'simple', type: 'cell', optional: false },
      },
    ],
  },
];

const StakeStorage_getters: ABIGetter[] = [
  {
    name: 'amountTime',
    arguments: [
      {
        name: '_for',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
    returnType: { kind: 'simple', type: 'AmountTime', optional: false },
  },
  {
    name: 'prevnextcells',
    arguments: [],
    returnType: { kind: 'simple', type: 'PrevNextCells', optional: false },
  },
];

const StakeStorage_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'Add' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'GetWeighted' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Unstake' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'UpdateNext' } },
  { receiver: 'internal', message: { kind: 'text', text: 'GetPrevNextCells' } },
];

export class StakeStorage implements Contract {
  static async init(_owner: Address, _factory: Address) {
    return await StakeStorage_init(_owner, _factory);
  }

  static async fromInit(_owner: Address, _factory: Address) {
    const init = await StakeStorage_init(_owner, _factory);
    const address = contractAddress(0, init);
    return new StakeStorage(address, init);
  }

  static fromAddress(address: Address) {
    return new StakeStorage(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: StakeStorage_types,
    getters: StakeStorage_getters,
    receivers: StakeStorage_receivers,
    errors: StakeStorage_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: Add | GetWeighted | Unstake | UpdateNext | 'GetPrevNextCells'
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Add'
    ) {
      body = beginCell().store(storeAdd(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'GetWeighted'
    ) {
      body = beginCell().store(storeGetWeighted(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Unstake'
    ) {
      body = beginCell().store(storeUnstake(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'UpdateNext'
    ) {
      body = beginCell().store(storeUpdateNext(message)).endCell();
    }
    if (message === 'GetPrevNextCells') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getAmountTime(provider: ContractProvider, _for: Address) {
    let builder = new TupleBuilder();
    builder.writeAddress(_for);
    let source = (await provider.get('amountTime', builder.build())).stack;
    const result = loadTupleAmountTime(source);
    return result;
  }

  async getPrevnextcells(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('prevnextcells', builder.build())).stack;
    const result = loadTuplePrevNextCells(source);
    return result;
  }
}
