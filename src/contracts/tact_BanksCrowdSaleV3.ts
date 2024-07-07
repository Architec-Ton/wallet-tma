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

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: 'FactoryDeploy' as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwner' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error('Invalid prefix');
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: 'ChangeOwnerOk' as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
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

export type ReferralAddress = {
  $$type: 'ReferralAddress';
  referral: Address;
};

export function storeReferralAddress(src: ReferralAddress) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(282374089, 32);
    b_0.storeAddress(src.referral);
  };
}

export function loadReferralAddress(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 282374089) {
    throw Error('Invalid prefix');
  }
  let _referral = sc_0.loadAddress();
  return { $$type: 'ReferralAddress' as const, referral: _referral };
}

function loadTupleReferralAddress(source: TupleReader) {
  let _referral = source.readAddress();
  return { $$type: 'ReferralAddress' as const, referral: _referral };
}

function storeTupleReferralAddress(source: ReferralAddress) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.referral);
  return builder.build();
}

function dictValueParserReferralAddress(): DictionaryValue<ReferralAddress> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeReferralAddress(src)).endCell());
    },
    parse: (src) => {
      return loadReferralAddress(src.loadRef().beginParse());
    },
  };
}

export type SetBankOffset = {
  $$type: 'SetBankOffset';
  offset: bigint;
};

export function storeSetBankOffset(src: SetBankOffset) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(828153449, 32);
    b_0.storeUint(src.offset, 32);
  };
}

export function loadSetBankOffset(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 828153449) {
    throw Error('Invalid prefix');
  }
  let _offset = sc_0.loadUintBig(32);
  return { $$type: 'SetBankOffset' as const, offset: _offset };
}

function loadTupleSetBankOffset(source: TupleReader) {
  let _offset = source.readBigNumber();
  return { $$type: 'SetBankOffset' as const, offset: _offset };
}

function storeTupleSetBankOffset(source: SetBankOffset) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.offset);
  return builder.build();
}

function dictValueParserSetBankOffset(): DictionaryValue<SetBankOffset> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetBankOffset(src)).endCell());
    },
    parse: (src) => {
      return loadSetBankOffset(src.loadRef().beginParse());
    },
  };
}

export type SetJettonWallet = {
  $$type: 'SetJettonWallet';
  jetton_wallet: Address;
};

export function storeSetJettonWallet(src: SetJettonWallet) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1999771523, 32);
    b_0.storeAddress(src.jetton_wallet);
  };
}

export function loadSetJettonWallet(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1999771523) {
    throw Error('Invalid prefix');
  }
  let _jetton_wallet = sc_0.loadAddress();
  return { $$type: 'SetJettonWallet' as const, jetton_wallet: _jetton_wallet };
}

function loadTupleSetJettonWallet(source: TupleReader) {
  let _jetton_wallet = source.readAddress();
  return { $$type: 'SetJettonWallet' as const, jetton_wallet: _jetton_wallet };
}

function storeTupleSetJettonWallet(source: SetJettonWallet) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.jetton_wallet);
  return builder.build();
}

function dictValueParserSetJettonWallet(): DictionaryValue<SetJettonWallet> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetJettonWallet(src)).endCell());
    },
    parse: (src) => {
      return loadSetJettonWallet(src.loadRef().beginParse());
    },
  };
}

export type SetNewOwner = {
  $$type: 'SetNewOwner';
  new_owner: Address;
};

export function storeSetNewOwner(src: SetNewOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(3228428161, 32);
    b_0.storeAddress(src.new_owner);
  };
}

export function loadSetNewOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 3228428161) {
    throw Error('Invalid prefix');
  }
  let _new_owner = sc_0.loadAddress();
  return { $$type: 'SetNewOwner' as const, new_owner: _new_owner };
}

function loadTupleSetNewOwner(source: TupleReader) {
  let _new_owner = source.readAddress();
  return { $$type: 'SetNewOwner' as const, new_owner: _new_owner };
}

function storeTupleSetNewOwner(source: SetNewOwner) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.new_owner);
  return builder.build();
}

function dictValueParserSetNewOwner(): DictionaryValue<SetNewOwner> {
  return {
    serialize: (src, builder) => {
      builder.storeRef(beginCell().store(storeSetNewOwner(src)).endCell());
    },
    parse: (src) => {
      return loadSetNewOwner(src.loadRef().beginParse());
    },
  };
}

type BanksCrowdSaleV3_init_args = {
  $$type: 'BanksCrowdSaleV3_init_args';
  jetton_master: Address;
};

function initBanksCrowdSaleV3_init_args(src: BanksCrowdSaleV3_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.jetton_master);
  };
}

async function BanksCrowdSaleV3_init(jetton_master: Address) {
  const __code = Cell.fromBase64(
    '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'
  );
  const __system = Cell.fromBase64(
    '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'
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initBanksCrowdSaleV3_init_args({
    $$type: 'BanksCrowdSaleV3_init_args',
    jetton_master,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const BanksCrowdSaleV3_errors: { [key: number]: { message: string } } = {
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
  12123: { message: `Sale stopped` },
  13105: { message: `JettonWallet: Not enough jettons to transfer` },
  26611: { message: `Sale ended` },
  27831: { message: `Only owner can call this function` },
  29133: {
    message: `JettonWallet: Not allow negative balance after internal transfer`,
  },
  30220: { message: `Referral wrong` },
  37185: { message: `Not enough funds to transfer` },
  47048: { message: `JettonWallet: Only owner can burn tokens` },
  49469: { message: `Access denied` },
  60354: { message: `JettonWallet: Not enough balance to burn tokens` },
};

const BanksCrowdSaleV3_types: ABIType[] = [
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
    name: 'Deploy',
    header: 2490013878,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'DeployOk',
    header: 2952335191,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
    ],
  },
  {
    name: 'FactoryDeploy',
    header: 1829761339,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'cashback',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ChangeOwner',
    header: 2174598809,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'newOwner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'ChangeOwnerOk',
    header: 846932810,
    fields: [
      {
        name: 'queryId',
        type: { kind: 'simple', type: 'uint', optional: false, format: 64 },
      },
      {
        name: 'newOwner',
        type: { kind: 'simple', type: 'address', optional: false },
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
  {
    name: 'ReferralAddress',
    header: 282374089,
    fields: [
      {
        name: 'referral',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'SetBankOffset',
    header: 828153449,
    fields: [
      {
        name: 'offset',
        type: { kind: 'simple', type: 'uint', optional: false, format: 32 },
      },
    ],
  },
  {
    name: 'SetJettonWallet',
    header: 1999771523,
    fields: [
      {
        name: 'jetton_wallet',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
  {
    name: 'SetNewOwner',
    header: 3228428161,
    fields: [
      {
        name: 'new_owner',
        type: { kind: 'simple', type: 'address', optional: false },
      },
    ],
  },
];

const BanksCrowdSaleV3_getters: ABIGetter[] = [
  {
    name: 'TotalBanks',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'owner',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
];

const BanksCrowdSaleV3_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'empty' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetJettonWallet' } },
  { receiver: 'internal', message: { kind: 'text', text: 'buyBank' } },
  { receiver: 'internal', message: { kind: 'text', text: 'stopSale' } },
  { receiver: 'internal', message: { kind: 'text', text: 'resumeSale' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ReferralAddress' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetBankOffset' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetNewOwner' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ChangeOwner' } },
];

export class BanksCrowdSaleV3 implements Contract {
  static async init(jetton_master: Address) {
    return await BanksCrowdSaleV3_init(jetton_master);
  }

  static async fromInit(jetton_master: Address) {
    const init = await BanksCrowdSaleV3_init(jetton_master);
    const address = contractAddress(0, init);
    return new BanksCrowdSaleV3(address, init);
  }

  static fromAddress(address: Address) {
    return new BanksCrowdSaleV3(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: BanksCrowdSaleV3_types,
    getters: BanksCrowdSaleV3_getters,
    receivers: BanksCrowdSaleV3_receivers,
    errors: BanksCrowdSaleV3_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | null
      | SetJettonWallet
      | 'buyBank'
      | 'stopSale'
      | 'resumeSale'
      | ReferralAddress
      | SetBankOffset
      | SetNewOwner
      | Deploy
      | ChangeOwner
  ) {
    let body: Cell | null = null;
    if (message === null) {
      body = new Cell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetJettonWallet'
    ) {
      body = beginCell().store(storeSetJettonWallet(message)).endCell();
    }
    if (message === 'buyBank') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'stopSale') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === 'resumeSale') {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ReferralAddress'
    ) {
      body = beginCell().store(storeReferralAddress(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetBankOffset'
    ) {
      body = beginCell().store(storeSetBankOffset(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetNewOwner'
    ) {
      body = beginCell().store(storeSetNewOwner(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Deploy'
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ChangeOwner'
    ) {
      body = beginCell().store(storeChangeOwner(message)).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getTotalBanks(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('TotalBanks', builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get('owner', builder.build())).stack;
    let result = source.readAddress();
    return result;
  }
}
