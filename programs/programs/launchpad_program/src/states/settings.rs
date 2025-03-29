use anchor_lang::prelude::*;

use crate::ANCHOR_DISCRIMINATOR;

#[account]
pub struct Settings {
    pub admin: Pubkey,
    pub treasury: Pubkey,
    pub collection: Pubkey,
    pub transaction_fee: u64,
    pub bump: u8,
}

impl Settings {
    pub const LEN: usize = ANCHOR_DISCRIMINATOR + 32 + 32 + 32 + 8 + 1;
}
