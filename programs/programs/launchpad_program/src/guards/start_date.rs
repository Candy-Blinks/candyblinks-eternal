use anchor_lang::prelude::*;

use crate::CustomError;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct StartDate {
    pub timestamp: i64,
}

impl StartDate {
    pub fn validate(&self) -> Result<()> {
        let now = Clock::get()?.unix_timestamp;

        if now < self.timestamp {
            return err!(CustomError::PhaseNotStarted);
        }

        Ok(())
    }
}
