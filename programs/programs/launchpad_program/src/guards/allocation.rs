use anchor_lang::prelude::*;
use solana_program::{program_memory::sol_memcmp, pubkey::PUBKEY_BYTES};

use crate::ALLOCATION;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Allocation {
    pub id: u8,
    pub limit: i64,
}

pub fn get_allocation_seeds<'a>(id: &'a [u8], candy_store: &'a [u8]) -> [&'a [u8]; 3] {
    [ALLOCATION.as_ref(), id, candy_store]
}

pub fn compare_pubkeys(first: &Pubkey, second: &Pubkey) -> bool {
    sol_memcmp(first.as_ref(), second.as_ref(), PUBKEY_BYTES) != 0
}

impl Allocation {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}
