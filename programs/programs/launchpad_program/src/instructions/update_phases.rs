use crate::{CandyStore, CustomError, Phase, UpdatePhasesEvent, CANDYSTORE};
use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};


#[derive(Accounts)]
#[instruction()]
pub struct UpdatePhases<'info> {
    #[account(mut)]
    /// CHECK: this account is checked by the address constraint
    pub collection: UncheckedAccount<'info>,
 
    #[account(mut)]
    pub owner: Signer<'info>,
   
    #[account(
        mut, 
        seeds=[CANDYSTORE.as_bytes(), collection.key().as_ref()],
        bump = candy_store.bump
    )]
    pub candy_store: Account<'info, CandyStore>,
    pub system_program: Program<'info, System>,

}

pub fn edit_phases(
    ctx: Context<UpdatePhases>,
    phases: Vec<Phase>,
) -> Result<()> {

    if ctx.accounts.owner.key() != ctx.accounts.candy_store.owner {
        return Err(CustomError::NotTheOwnerOfCollection.into());
    }

 
    let candy_store = &mut ctx.accounts.candy_store;

    let old_size = CandyStore::get_size(&candy_store.name, &candy_store.url, &candy_store.manifest_id, &candy_store.phases);
    let new_size = CandyStore::get_size(&candy_store.name, &candy_store.url, &candy_store.manifest_id, &phases);


    if new_size > old_size {
        let rent = Rent::get()?;
        let rent_exemption: u64 = rent.minimum_balance(new_size);

        let current_balance = candy_store.to_account_info().lamports();
        if current_balance < rent_exemption {
            invoke(
                &system_instruction::transfer(
                    &ctx.accounts.owner.key(),
                    candy_store.to_account_info().key,
                    rent_exemption - current_balance,
                ),
                &[
                    ctx.accounts.owner.to_account_info().clone(),
                    candy_store.to_account_info().clone(),
                    ctx.accounts.system_program.to_account_info(),
                ],
            )?;
        }

        candy_store.to_account_info().realloc(new_size, false)?;

    }

    let candy_store = &mut ctx.accounts.candy_store;

    candy_store.phases = phases.clone();
  
    emit!(UpdatePhasesEvent { 
        candy_store: candy_store.key(), 
        phases: phases
    });
    
    Ok(())
}
