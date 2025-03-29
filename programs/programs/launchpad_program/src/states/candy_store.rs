use anchor_lang::prelude::*;

use crate::{
    Allocation, AllowList, EndDate, MintLimit, SolPayment, StartDate, ANCHOR_DISCRIMINATOR,
};

#[account]
pub struct CandyStore {
    pub name: String,
    pub url: String,
    pub manifest_id: String,
    pub number_of_items: u64,
    pub minted: u64,
    pub owner: Pubkey,
    pub collection: Pubkey,
    pub phases: Vec<Phase>,
    pub bump: u8,
}

impl CandyStore {
    pub const LEN: usize = ANCHOR_DISCRIMINATOR
    + 4  // String prefix for `name`
    + 4  // String prefix for `url`
    + 4  // String prefix for `manifest_id`
    + 8  // `number_of_items` (u64)
    + 8  // `minted` (u64)
    + 32 // `owner` (Pubkey)
    + 32 // `collection` (Pubkey)
    + 4  // Vec prefix for `phases`
    + 1;

    pub fn get_size(name: &str, url: &str, manifest_id: &str, phases: &Vec<Phase>) -> usize {
        let mut size = Self::LEN + name.len() + url.len() + manifest_id.len();

        for phase in phases {
            size += 4 + phase.label.len();

            size += 1 + 1 + 1 + 1 + 1 + 1; //option flags flag

            if phase.start_date.is_some() {
                size += 8;
            }

            if phase.end_date.is_some() {
                size += 8;
            }

            if phase.sol_payment.is_some() {
                size += 8 + 32;
            }

            if phase.allocation.is_some() {
                size += 8 + 1;
            }

            if phase.mint_limit.is_some() {
                size += 8 + 1;
            }

            if phase.allow_list.is_some() {
                size += 32;
            }
        }

        size
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Phase {
    pub label: String,
    pub start_date: Option<StartDate>,
    pub end_date: Option<EndDate>,
    pub sol_payment: Option<SolPayment>,
    pub allocation: Option<Allocation>,
    pub mint_limit: Option<MintLimit>,
    pub allow_list: Option<AllowList>,
}
