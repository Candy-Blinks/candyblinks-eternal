use anchor_lang::prelude::*;
use mpl_core::{instructions::CreateCollectionV2CpiBuilder, ID as MPL_CORE_ID};

#[derive(Accounts)]
pub struct InitializeCollection<'info> {
    #[account(mut)]
    pub collection: Signer<'info>,
    /// CHECK: this account will be checked by the mpl_core program
    pub update_authority: Option<UncheckedAccount<'info>>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(address = MPL_CORE_ID)]
    /// CHECK: this account is checked by the address constraint
    pub mpl_core_program: UncheckedAccount<'info>,
}

pub fn create_collection(
    ctx: Context<InitializeCollection>,
    name: String,
    uri: String,
) -> Result<()> {
    let update_authority = match &ctx.accounts.update_authority {
        Some(update_authority) => Some(update_authority.to_account_info()),
        None => None,
    };

    CreateCollectionV2CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
        .collection(&ctx.accounts.collection.to_account_info())
        .payer(&ctx.accounts.payer.to_account_info())
        .update_authority(update_authority.as_ref())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .name(name)
        .uri(uri)
        .invoke()?;

    Ok(())
}
