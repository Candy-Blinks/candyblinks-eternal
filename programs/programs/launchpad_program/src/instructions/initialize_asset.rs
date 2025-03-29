use crate::{CandyStore, CustomError, MintAssetEvent, Settings, CANDYSTORE};
use anchor_lang::prelude::*;
use mpl_core::{
    instructions::{AddPluginV1CpiBuilder, CreateV2CpiBuilder},
    types::Plugin,
    ID as MPL_CORE_ID,
};
use solana_program::program::invoke;

#[derive(Accounts)]

pub struct InitializeAsset<'info> {
    #[account(mut)]
    pub asset: Signer<'info>,
    #[account(mut)]
    /// CHECK: this account is checked by the address constraint
    pub collection: UncheckedAccount<'info>,
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds=[CANDYSTORE.as_bytes(), collection.key().as_ref()],
        bump,
    )]
    pub candy_store: Account<'info, CandyStore>,
    #[account(mut)]
    pub sol_payment_user: Option<SystemAccount<'info>>,
    pub system_program: Program<'info, System>,
    #[account(
        mut,
        seeds = [b"settings"],
        bump = settings.bump
    )]
    pub settings: Account<'info, Settings>,
    /// CHECK: This should be the treasury wallet (validated at runtime)
    #[account(mut, address = settings.treasury)]
    pub treasury_wallet: UncheckedAccount<'info>,
    #[account(address = MPL_CORE_ID)]
    /// CHECK: this account is checked by the address constraint
    pub mpl_core_program: UncheckedAccount<'info>,
}

pub fn create_asset(ctx: Context<InitializeAsset>, label: String) -> Result<()> {
    let candy_store = &mut ctx.accounts.candy_store;

    let candy_store_key = candy_store.key().clone();
    let asset_key = ctx.accounts.asset.to_account_info().key().clone();
    let collection_key = ctx.accounts.collection.to_account_info().key().clone();

    let result = candy_store
        .phases
        .iter()
        .find(|&phase| phase.label.starts_with(&label))
        .ok_or(CustomError::PHaseDoesNotExist)?;

    // if let Some(start_date) = &result.start_date {
    //     start_date.validate()?
    // }

    // if let Some(end_date) = &result.end_date {
    //     end_date.validate()?
    // }

    invoke(
        &solana_program::system_instruction::transfer(
            &ctx.accounts.user.key(),              // From: payer
            &ctx.accounts.settings.treasury,       // To: treasury
            ctx.accounts.settings.transaction_fee, // Amount (in lamports)
        ),
        &[
            ctx.accounts.user.to_account_info(),            // Payer's account
            ctx.accounts.treasury_wallet.to_account_info(), // Treasury account
            ctx.accounts.system_program.to_account_info(),  // System program
        ],
    )?;

    let uri = format!("{}/{}.json", candy_store.url, candy_store.minted);

    let name = format!("{} #{}", candy_store.name, candy_store.minted);

    candy_store.minted += 1;

    let seeds = &[
        CANDYSTORE.as_bytes(),
        collection_key.as_ref(),
        &[ctx.bumps.candy_store], // Pass the PDA bump seed
    ];

    emit!(MintAssetEvent {
        candy_store: candy_store_key,
        minter: ctx.accounts.user.to_account_info().key(),
        collection: ctx.accounts.collection.key(),
        phase: label,
        current_mints: candy_store.minted,
        asset: asset_key,
        metadata: uri.clone()
    });

    CreateV2CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
        .payer(&ctx.accounts.user.to_account_info())
        .owner(Some(&ctx.accounts.user.to_account_info()))
        .name(name)
        .uri(uri)
        .asset(&ctx.accounts.asset.to_account_info())
        .collection(Some(&ctx.accounts.collection.as_ref()))
        // TODO: Investigate authority. Collection owner can only update
        .authority(Some(&ctx.accounts.candy_store.to_account_info()))
        // .update_authority(Some(&ctx.accounts.user.to_account_info()))
        .system_program(&ctx.accounts.system_program.to_account_info())
        .invoke_signed(&[seeds])
        .map_err(|error| error.into())

    // Plugin::UpdateDelegate(())
    // Plugin::Attributes(Attributes {
    //     attribute_list: vec![
    //         Attribute {
    //             key: "staked".to_string(),
    //             value: Clock::get()?.unix_timestamp.to_string(),
    //         },
    //         Attribute {
    //             key: "staked_time".to_string(),
    //             value: 0.to_string(),
    //         },
    //     ],
    // })
    // AddPluginV1CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
    //     .asset(&ctx.accounts.asset.to_account_info())
    //     .collection(Some(&ctx.accounts.collection.to_account_info()))
    //     .payer(&ctx.accounts.payer.to_account_info())
    //     .authority(Some(&ctx.accounts.update_authority.to_account_info()))
    //     .system_program(&ctx.accounts.system_program.to_account_info())
    //     .plugin()
    //     .init_authority(PluginAuthority::UpdateAuthority)
    //     .invoke()
    //     .map_err(|error| error.into())
}
