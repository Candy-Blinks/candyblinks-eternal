pub mod constants;
pub mod errors;
pub mod events;
pub mod guards;
pub mod instructions;
pub mod states;
pub mod utils;

use anchor_lang::prelude::*;

pub use constants::*;
pub use errors::*;
pub use events::*;
pub use guards::*;
pub use instructions::*;
pub use states::*;
declare_id!("CVAFtjYiNHVxmPjRnBb9pnzuZrSR4pqeEuTyqAVEYPiU");

#[program]
pub mod launchpad_program {
    use super::*;

    pub fn initialize_settings(
        ctx: Context<InitializeSettings>,
        treasury: Pubkey,
        transaction_fee: u64,
    ) -> Result<()> {
        create_settings(ctx, treasury, transaction_fee)
    }

    pub fn initialize_candy_store(
        ctx: Context<InitializeCandyStore>,
        name: String,
        url: String,
        manifest_id: String,
        number_of_items: u64,
    ) -> Result<()> {
        create_candy_store(ctx, name, url, manifest_id, number_of_items)
    }

    pub fn update_phases(ctx: Context<UpdatePhases>, phases: Vec<Phase>) -> Result<()> {
        edit_phases(ctx, phases)
    }

    pub fn mint(ctx: Context<InitializeAsset>, label: String) -> Result<()> {
        create_asset(ctx, label)
    }

    pub fn initialize_collection(
        ctx: Context<InitializeCollection>,
        name: String,
        uri: String,
    ) -> Result<()> {
        create_collection(ctx, name, uri)
    }

    pub fn initialize_proof(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn initialize_allocation_tracker(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }

    pub fn initialize_mint_limit_tracker(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
