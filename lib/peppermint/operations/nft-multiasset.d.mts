export default function _default(tezos: any, { contract_address }: {
    contract_address: any;
}): Promise<{
    create: ({ token_id, metadata_ipfs }: {
        token_id: any;
        metadata_ipfs: any;
    }, batch: any) => boolean;
    mint: ({ token_id, to_address, amount }: {
        token_id: any;
        to_address: any;
        amount: any;
    }, batch: any) => boolean;
    create_and_mint: ({ token_id, to_address, metadata_ipfs, amount }: {
        token_id: any;
        to_address: any;
        metadata_ipfs: any;
        amount: any;
    }, batch: any) => boolean;
    create_and_mint_multiple: ({ token_id, metadata_ipfs, destinations }: {
        token_id: any;
        metadata_ipfs: any;
        destinations: any;
    }, batch: any) => boolean;
    transfer: ({ token_id, from_address, to_address, amount }: {
        token_id: any;
        from_address: any;
        to_address: any;
        amount: any;
    }, batch: any) => boolean;
    burn: ({ token_id, from_address, amount }: {
        token_id: any;
        from_address: any;
        amount: any;
    }, batch: any) => boolean;
}>;
