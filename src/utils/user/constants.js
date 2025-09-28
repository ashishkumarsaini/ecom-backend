const UserRolesEnum = Object.freeze({
  ADMIN: 'admin',
  SUB_ADMIN: 'sub-admin',
  USER: 'user',
});

const AvailableUserRoles = Object.values(UserRolesEnum);

module.exports = {
  UserRolesEnum,
  AvailableUserRoles,
};
