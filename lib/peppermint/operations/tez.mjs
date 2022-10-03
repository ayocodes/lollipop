export default async function (_) {
    return {
        transfer: async function ({ to_address, amount }, batch) {
            let transfer_arg = {
                to: to_address,
                amount: amount
            };
            batch.withTransfer(transfer_arg);
            return true;
        }
    };
}
//# sourceMappingURL=tez.mjs.map