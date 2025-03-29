use crate::{CustomError, InitializeSettingsEvent, Settings, SETTINGS};
use anchor_lang::prelude::*;
use mpl_core::ID as MPL_CORE_ID;

#[derive(Accounts)]
pub struct InitializeSettings<'info> {
    #[account(mut)]
    pub admin: Signer<'info>, 
    #[account(
        init,
        payer = admin,
        space = Settings::LEN, 
        seeds = [SETTINGS.as_bytes()],
        bump
    )]
    pub settings: Account<'info, Settings>,
    #[account(mut)]
    /// CHECK: this account is checked by the address constraint
    pub collection: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}
// TODO: Create update settings

pub fn create_settings(
    ctx: Context<InitializeSettings>,
    treasury: Pubkey,
    transaction_fee: u64,
) -> Result<()> {

    if MPL_CORE_ID != *ctx.accounts.collection.owner {
        return Err(CustomError::CollectionNotMplCore.into());
    }

    ctx.accounts.settings.set_inner(Settings {
        admin: ctx.accounts.admin.key(),
        treasury: treasury,
        transaction_fee: transaction_fee,
        collection: ctx.accounts.collection.key(),
        bump: ctx.bumps.settings
    });

    emit!(InitializeSettingsEvent { 
        admin: ctx.accounts.admin.key(), 
        treasury, transaction_fee, 
        collection: ctx.accounts.collection.key() 
    });


    Ok(())
}
