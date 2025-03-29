use crate::CustomError;
use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct SolPayment {
    pub user: Pubkey,
    pub amount: u64,
}

impl SolPayment {
    pub fn validate(&self, minter: &AccountInfo<'_>, sol_payment_user: &Pubkey) -> Result<()> {
        if self.user != sol_payment_user.key() {
            return err!(CustomError::WrongSolPaymentUser);
        }

        if minter.lamports() < self.amount {
            return err!(CustomError::InsufficientBalance);
        }
        Ok(())
    }
}
