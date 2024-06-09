export enum ErrorEnum {
  invalid_token = 'invalid_token',
  confirm_email = 'confirm_email',
  email_already_registered = 'email_already_registered',
  invalid_credentials = 'invalid_credentials',
  mail_already_confirmed = 'mail_already_confirmed',
  invalid_validation_token = 'invalid_validation_token',
  invalid_reset_password_token = 'invalid_reset_password_token',
  expired_reset_password_token = 'expired_reset_password_token',
  new_password_is_same_as_old = 'new_password_is_same_as_old',
  user_already_has_profile = 'user_already_has_profile',
  user_not_found = 'user_not_found',
  user_already_has_role = 'user_already_has_role',
  invalid_refresh_token = 'invalid_refresh_token',
  members_must_be_json = 'members_must_be_json',
  access_denied = 'access_denied',
  user_not_found_or_invalid = 'user_not_found_or_invalid',
  user_is_not_in_band = 'user_is_not_in_band',
  user_already_in_band = 'user_already_in_band',
  band_must_have_at_least_one_member = 'band_must_have_at_least_one_member',
  invalid_date = 'invalid_date',
  invalid_type = 'invalid_type',
  invalid_duration = 'invalid_duration',
  conflict = 'conflict',
  invalid_user = 'invalid_user',
  member_not_in_guild = 'member_not_in_guild',
  minor = 'minor',
}

export enum ErrorMessageEnum {
  invalid_token = 'Token invalide',
  confirm_email = 'Confirmez votre email',
  email_already_registered = 'Email déjà enregistré',
  invalid_credentials = 'Credentiels invalides',
  mail_already_confirmed = 'Votre email est déjà confirmé',
  invalid_validation_token = 'Token de validation invalide',
  invalid_reset_password_token = 'Token de réinitialisation invalide',
  expired_reset_password_token = 'Token de réinitialisation expiré',
  new_password_is_same_as_old = "Le nouveau mot de passe est identique à l'ancien",
  user_already_has_profile = "L'utilisateur a déjà un profil",
  user_not_found = 'Utilisateur non trouvé',
  user_already_has_role = "L'utilisateur a déjà un rôle",
  invalid_refresh_token = 'Token de rafraîchissement invalide',
  members_must_be_json = 'members doit être un tableau JSON',
  access_denied = 'Accès refusé',
  user_not_found_or_invalid = 'Utilisateur non trouvé ou invalide',
  user_is_not_in_band = "L'utilisateur n'est pas dans le groupe",
  user_already_in_band = "L'utilisateur est déjà dans le groupe",
  band_must_have_at_least_one_member = 'Les groupes doivent avoir au moins un membre',
  invalid_date = 'Impossible de réserver dans le passé',
  invalid_type = 'Type invalide',
  invalid_duration = 'Durée invalide',
  conflict = 'Conflit',
  invalid_user = 'Utilisateur invalide',
  member_not_in_guild = "Le membre n'est pas dans la guilde",
  minor = "L'utilisateur est mineur",
}
