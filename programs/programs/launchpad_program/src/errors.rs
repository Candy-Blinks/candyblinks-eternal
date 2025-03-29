use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("Phase Does Not Exist")]
    PHaseDoesNotExist,
    #[msg("Collection is not Metaplex Core")]
    CollectionNotMplCore,

    #[msg("Not the owner of collection")]
    NotTheOwnerOfCollection,

    #[msg("Phase not started")]
    PhaseNotStarted,

    #[msg("Phase ended")]
    PhaseEnded,

    #[msg("Insufficient Balance")]
    InsufficientBalance,

    #[msg("Wrong Sol Payment User")]
    WrongSolPaymentUser,

    #[msg("Allocation Tracker Invalid")]
    AllocationTrackerInvalid,
}
