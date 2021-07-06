import 'reflect-metadata';
import { setup } from 'setup-server';

before(async () => {
  await setup();
});

// require all test files here
require('api/rest/module/user/list-users.test');
require('api/rest/module/user/register-user.test');
require('api/rest/module/user/register-multiple-user.test');
require('api/rest/module/address/get-address-from-postal-code.test');
