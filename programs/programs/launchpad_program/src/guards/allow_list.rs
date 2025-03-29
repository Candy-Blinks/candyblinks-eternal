use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct AllowList {
    pub merkle_root: [u8; 32],
}

impl AllowList {
    pub fn validate(&self) -> Result<()> {
        Ok(())
    }
}
