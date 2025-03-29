use crate::{CandyStore, CreateCandyStoreEvent, CustomError, Settings, CANDYSTORE, SETTINGS};
use anchor_lang::prelude::*;
use mpl_core::{accounts::BaseAssetV1, instructions::{AddCollectionPluginV1Builder, AddCollectionPluginV1CpiBuilder, AddPluginV1CpiBuilder}, types::{Plugin, PluginAuthority, UpdateAuthority, UpdateDelegate}, ID as MPL_CORE_ID};
use solana_program::program::invoke;

#[derive(Accounts)]
#[instruction(name: String, url: String, manifest_id: String)]
pub struct InitializeCandyStore<'info> {
    #[account(mut)]
    /// CHECK: this account is checked by the address constraint
    pub collection: UncheckedAccount<'info>,
 
    #[account(mut)]
    pub owner: Signer<'info>,
   
    #[account(
        init, 
        payer = owner, 
        space = CandyStore::get_size(&name, &url, &manifest_id, &Vec::new()), 
        seeds=[CANDYSTORE.as_bytes(), collection.key().as_ref()],
        bump
    )]
    pub candy_store: Account<'info, CandyStore>,

    #[account(
        mut,
        seeds = [SETTINGS.as_bytes()],
        bump = settings.bump
    )]
    pub settings: Account<'info, Settings>,
    /// CHECK: This should be the treasury wallet (validated at runtime)
    #[account(mut, address = settings.treasury)]
    pub treasury_wallet: UncheckedAccount<'info>,
    /// CHECK: This should be the treasury wallet (validated at runtime)
    #[account(mut, address = settings.collection)]
    pub settings_collection: UncheckedAccount<'info>,
    #[account(
        mut,
    )]
    pub settings_collection_asset: Option<Account<'info, BaseAssetV1>>,
    #[account(address = MPL_CORE_ID)]
    /// CHECK: this account is checked by the address constraint
    pub mpl_core_program: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,

}



pub fn create_candy_store(
    ctx: Context<InitializeCandyStore>,
    name: String,
    url: String, 
    manifest_id: String,
    number_of_items: u64,
) -> Result<()> {
    let collection_key = ctx.accounts.collection.to_account_info().key().clone();

    if MPL_CORE_ID != *ctx.accounts.collection.owner {
        return Err(CustomError::CollectionNotMplCore.into());
    }
 
    let settings_collection_asset = &ctx.accounts.settings_collection_asset;


    if let Some(asset) = settings_collection_asset {
        if asset.owner != ctx.accounts.owner.key() {
            return Err(CustomError::NotTheOwnerOfCollection.into());
        }
    }

    if ctx.accounts.settings_collection_asset
    .as_ref()
    .map_or(true, |asset| asset.update_authority != UpdateAuthority::Collection(ctx.accounts.settings_collection.key()))
    {
        invoke(
            &solana_program::system_instruction::transfer(
                &ctx.accounts.owner.key(),
                &ctx.accounts.settings.treasury,
                ctx.accounts.settings.transaction_fee,
            ),
            &[
                ctx.accounts.owner.to_account_info(),
                ctx.accounts.treasury_wallet.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;
    }

    ctx.accounts.candy_store.set_inner(CandyStore {
        owner: ctx.accounts.owner.key(),
        name: name.clone(),
        url: url.clone(),
        number_of_items: number_of_items,
        minted: 0,
        manifest_id: manifest_id.clone(),
        collection: ctx.accounts.collection.key(),
        phases: Vec::new(),
        bump: ctx.bumps.candy_store
    });

  
    // CreateV2CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
    //     .payer(&ctx.accounts.user.to_account_info())
    //     .owner(Some(&ctx.accounts.user.to_account_info()))
    //     .name(name)
    //     .uri(uri)
    //     .asset(&ctx.accounts.asset.to_account_info())
    //     .collection(Some(&ctx.accounts.collection.as_ref()))
    //     // TODO: Investigate authority. Collection owner can only update
    //     .authority(Some(&ctx.accounts.user.to_account_info()))
    //     // .update_authority(Some(&ctx.accounts.user.to_account_info()))
    //     .system_program(&ctx.accounts.system_program.to_account_info())
    //     .invoke_signed(&[seeds])
    //     .map_err(|error| error.into())


    let seeds = &[
        CANDYSTORE.as_bytes(),
        collection_key.as_ref(),
        &[ctx.bumps.candy_store], // Pass the PDA bump seed
    ];
    AddCollectionPluginV1CpiBuilder::new(&ctx.accounts.mpl_core_program.to_account_info())
        .collection(&ctx.accounts.collection.to_account_info())
        .payer(&ctx.accounts.owner.to_account_info())
        .authority(Some(&ctx.accounts.owner.to_account_info()))
        .system_program(&ctx.accounts.system_program.to_account_info())
        .plugin(Plugin::UpdateDelegate(UpdateDelegate {
            additional_delegates: [ctx.accounts.candy_store.key()].to_vec(),
        }))
        .init_authority(PluginAuthority::UpdateAuthority)
        .invoke_signed(&[seeds])

        .map_err(|error| error)?;

 

    emit!(CreateCandyStoreEvent {
        candy_store: ctx.accounts.candy_store.key(), 
        owner: ctx.accounts.owner.key(), 
        collection: ctx.accounts.collection.key(), 
        name, 
        url, 
        manifest_id, 
        number_of_items 
    });
    Ok(())

}
