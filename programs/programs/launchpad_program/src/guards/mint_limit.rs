use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct MintLimit {
    pub id: u8,
    pub limit: i64,
}

impl MintLimit {
    pub fn validate(&self) -> Result<()> {
        // let mint_limit_id_bytes = self.id.to_le_bytes();
        // let mint_limit_id = mint_limit_id_bytes.as_ref();

        // let seeds = get_mint_limit_seeds(mint_limit_id, user.as_ref(), candy_store.as_ref());

        // let (pda, _) = Pubkey::find_program_address(&seeds, &crate::ID);

        // if compare_pubkeys(&mint_limit.key(), &pda) {
        //     return err!(PhaseError::MintLimitTrackerInvalid);
        // }

        // let mint_tracker: MintLimitTrackerStruct = MintLimitTrackerStruct::try_from_slice(&data)?;

        // if mint_tracker.count >= self.limit as u32 {
        //     return err!(PhaseError::MintLimitReached);
        // }

        Ok(())
    }
}
