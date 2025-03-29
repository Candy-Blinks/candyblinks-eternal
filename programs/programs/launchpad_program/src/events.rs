use anchor_lang::prelude::*;

use crate::Phase;

#[event]
pub struct MintAssetEvent {
    pub candy_store: Pubkey,
    pub phase: String,
    pub metadata: String,
    pub current_mints: u64,
    pub asset: Pubkey,
    pub minter: Pubkey,
    pub collection: Pubkey,
}

#[event]
pub struct CreateCandyStoreEvent {
    pub candy_store: Pubkey,
    pub owner: Pubkey,
    pub collection: Pubkey,
    pub name: String,
    pub url: String,
    pub manifest_id: String,
    pub number_of_items: u64,
}

#[event]
pub struct InitializeSettingsEvent {
    pub admin: Pubkey,
    pub treasury: Pubkey,
    pub transaction_fee: u64,
    pub collection: Pubkey,
}

#[event]
pub struct UpdatePhasesEvent {
    pub candy_store: Pubkey,
    pub phases: Vec<Phase>,
}
