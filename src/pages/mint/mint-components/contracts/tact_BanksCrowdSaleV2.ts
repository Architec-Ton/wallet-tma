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
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

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
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
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
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

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
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

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
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

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
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type ReferralAddress = {
    $$type: 'ReferralAddress';
    referral: Address;
}

export function storeReferralAddress(src: ReferralAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(282374089, 32);
        b_0.storeAddress(src.referral);
    };
}

export function loadReferralAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 282374089) { throw Error('Invalid prefix'); }
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReferralAddress(src)).endCell());
        },
        parse: (src) => {
            return loadReferralAddress(src.loadRef().beginParse());
        }
    }
}

export type ChangePrice1stage = {
    $$type: 'ChangePrice1stage';
    price: bigint;
}

export function storeChangePrice1stage(src: ChangePrice1stage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2408991813, 32);
        b_0.storeInt(src.price, 257);
    };
}

export function loadChangePrice1stage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2408991813) { throw Error('Invalid prefix'); }
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'ChangePrice1stage' as const, price: _price };
}

function loadTupleChangePrice1stage(source: TupleReader) {
    let _price = source.readBigNumber();
    return { $$type: 'ChangePrice1stage' as const, price: _price };
}

function storeTupleChangePrice1stage(source: ChangePrice1stage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserChangePrice1stage(): DictionaryValue<ChangePrice1stage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangePrice1stage(src)).endCell());
        },
        parse: (src) => {
            return loadChangePrice1stage(src.loadRef().beginParse());
        }
    }
}

export type ChangePrice2stage = {
    $$type: 'ChangePrice2stage';
    price: bigint;
}

export function storeChangePrice2stage(src: ChangePrice2stage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1793354119, 32);
        b_0.storeInt(src.price, 257);
    };
}

export function loadChangePrice2stage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1793354119) { throw Error('Invalid prefix'); }
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'ChangePrice2stage' as const, price: _price };
}

function loadTupleChangePrice2stage(source: TupleReader) {
    let _price = source.readBigNumber();
    return { $$type: 'ChangePrice2stage' as const, price: _price };
}

function storeTupleChangePrice2stage(source: ChangePrice2stage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserChangePrice2stage(): DictionaryValue<ChangePrice2stage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangePrice2stage(src)).endCell());
        },
        parse: (src) => {
            return loadChangePrice2stage(src.loadRef().beginParse());
        }
    }
}

export type ChangePrice3stage = {
    $$type: 'ChangePrice3stage';
    price: bigint;
}

export function storeChangePrice3stage(src: ChangePrice3stage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1118352818, 32);
        b_0.storeInt(src.price, 257);
    };
}

export function loadChangePrice3stage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1118352818) { throw Error('Invalid prefix'); }
    let _price = sc_0.loadIntBig(257);
    return { $$type: 'ChangePrice3stage' as const, price: _price };
}

function loadTupleChangePrice3stage(source: TupleReader) {
    let _price = source.readBigNumber();
    return { $$type: 'ChangePrice3stage' as const, price: _price };
}

function storeTupleChangePrice3stage(source: ChangePrice3stage) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.price);
    return builder.build();
}

function dictValueParserChangePrice3stage(): DictionaryValue<ChangePrice3stage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangePrice3stage(src)).endCell());
        },
        parse: (src) => {
            return loadChangePrice3stage(src.loadRef().beginParse());
        }
    }
}

export type Bonus = {
    $$type: 'Bonus';
    to: Address;
    amount: bigint;
}

export function storeBonus(src: Bonus) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3122429960, 32);
        b_0.storeAddress(src.to);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadBonus(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3122429960) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Bonus' as const, to: _to, amount: _amount };
}

function loadTupleBonus(source: TupleReader) {
    let _to = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Bonus' as const, to: _to, amount: _amount };
}

function storeTupleBonus(source: Bonus) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBonus(): DictionaryValue<Bonus> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBonus(src)).endCell());
        },
        parse: (src) => {
            return loadBonus(src.loadRef().beginParse());
        }
    }
}

export type SetManager = {
    $$type: 'SetManager';
    to: Address;
}

export function storeSetManager(src: SetManager) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2674325770, 32);
        b_0.storeAddress(src.to);
    };
}

export function loadSetManager(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2674325770) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    return { $$type: 'SetManager' as const, to: _to };
}

function loadTupleSetManager(source: TupleReader) {
    let _to = source.readAddress();
    return { $$type: 'SetManager' as const, to: _to };
}

function storeTupleSetManager(source: SetManager) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserSetManager(): DictionaryValue<SetManager> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetManager(src)).endCell());
        },
        parse: (src) => {
            return loadSetManager(src.loadRef().beginParse());
        }
    }
}

export type SetBankOffset = {
    $$type: 'SetBankOffset';
    offset: bigint;
}

export function storeSetBankOffset(src: SetBankOffset) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(828153449, 32);
        b_0.storeUint(src.offset, 32);
    };
}

export function loadSetBankOffset(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 828153449) { throw Error('Invalid prefix'); }
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
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetBankOffset(src)).endCell());
        },
        parse: (src) => {
            return loadSetBankOffset(src.loadRef().beginParse());
        }
    }
}

export type SetBankersOffset = {
    $$type: 'SetBankersOffset';
    offset: bigint;
}

export function storeSetBankersOffset(src: SetBankersOffset) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4064495408, 32);
        b_0.storeUint(src.offset, 32);
    };
}

export function loadSetBankersOffset(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4064495408) { throw Error('Invalid prefix'); }
    let _offset = sc_0.loadUintBig(32);
    return { $$type: 'SetBankersOffset' as const, offset: _offset };
}

function loadTupleSetBankersOffset(source: TupleReader) {
    let _offset = source.readBigNumber();
    return { $$type: 'SetBankersOffset' as const, offset: _offset };
}

function storeTupleSetBankersOffset(source: SetBankersOffset) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.offset);
    return builder.build();
}

function dictValueParserSetBankersOffset(): DictionaryValue<SetBankersOffset> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetBankersOffset(src)).endCell());
        },
        parse: (src) => {
            return loadSetBankersOffset(src.loadRef().beginParse());
        }
    }
}

 type BanksCrowdSaleV2_init_args = {
    $$type: 'BanksCrowdSaleV2_init_args';
}

function initBanksCrowdSaleV2_init_args(src: BanksCrowdSaleV2_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function BanksCrowdSaleV2_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBanksCrowdSaleV2_init_args({ $$type: 'BanksCrowdSaleV2_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BanksCrowdSaleV2_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
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
    12123: { message: `Sale stopped` },
    26611: { message: `Sale ended` },
    30220: { message: `Referral wrong` },
    49469: { message: `Access denied` },
    50218: { message: `Bank's must be not zero` },
}

const BanksCrowdSaleV2_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReferralAddress","header":282374089,"fields":[{"name":"referral","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangePrice1stage","header":2408991813,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangePrice2stage","header":1793354119,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ChangePrice3stage","header":1118352818,"fields":[{"name":"price","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Bonus","header":3122429960,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SetManager","header":2674325770,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"SetBankOffset","header":828153449,"fields":[{"name":"offset","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SetBankersOffset","header":4064495408,"fields":[{"name":"offset","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const BanksCrowdSaleV2_getters: ABIGetter[] = [
    {"name":"Banks","arguments":[{"name":"addr","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"TotalBanks","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"Bankers","arguments":[],"returnType":{"kind":"dict","key":"address","value":"uint","valueFormat":32}},
    {"name":"TotalBankers","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const BanksCrowdSaleV2_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"buyBank"}},
    {"receiver":"internal","message":{"kind":"text","text":"stopSale"}},
    {"receiver":"internal","message":{"kind":"text","text":"resumeSale"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReferralAddress"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetManager"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetBankOffset"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetBankersOffset"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangePrice1stage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangePrice2stage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangePrice3stage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Bonus"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]

export class BanksCrowdSaleV2 implements Contract {
    
    static async init() {
        return await BanksCrowdSaleV2_init();
    }
    
    static async fromInit() {
        const init = await BanksCrowdSaleV2_init();
        const address = contractAddress(0, init);
        return new BanksCrowdSaleV2(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BanksCrowdSaleV2(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BanksCrowdSaleV2_types,
        getters: BanksCrowdSaleV2_getters,
        receivers: BanksCrowdSaleV2_receivers,
        errors: BanksCrowdSaleV2_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'buyBank' | 'stopSale' | 'resumeSale' | ReferralAddress | SetManager | SetBankOffset | SetBankersOffset | ChangePrice1stage | ChangePrice2stage | ChangePrice3stage | Bonus | Deploy | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
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
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReferralAddress') {
            body = beginCell().store(storeReferralAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetManager') {
            body = beginCell().store(storeSetManager(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetBankOffset') {
            body = beginCell().store(storeSetBankOffset(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetBankersOffset') {
            body = beginCell().store(storeSetBankersOffset(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangePrice1stage') {
            body = beginCell().store(storeChangePrice1stage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangePrice2stage') {
            body = beginCell().store(storeChangePrice2stage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangePrice3stage') {
            body = beginCell().store(storeChangePrice3stage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Bonus') {
            body = beginCell().store(storeBonus(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBanks(provider: ContractProvider, addr: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(addr);
        let source = (await provider.get('Banks', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getTotalBanks(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('TotalBanks', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBankers(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Bankers', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.Uint(32), source.readCellOpt());
        return result;
    }
    
    async getTotalBankers(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('TotalBankers', builder.build())).stack;
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